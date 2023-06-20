
import express from "express";
import router from "../router/index.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

app.use(cors());
app.use(bodyParser.json({extended: true,limit: '200mb',parameterLimi: 200}));
app.use(bodyParser.urlencoded({extended: true ,limit: "200mb",parameterLimit: 200}));
app.use(fileUpload());
// Body parser middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // res.header("Access-Control-Allow-Headers", true);
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
//
app.use("/api/v1.0.0",router);
app.use("/api/v1.0.0/upload", express.static('assets'))
app.use((req, res, next) => {
  const error = new Error("Not found API");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
export default app;