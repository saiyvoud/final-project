import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PORT } from "./config/globalKey.js";
import './config/db.js'
const app = express();
app.use(cors());
app.use(bodyParser.json({extended: true,limit: '200mb',parameterLimi: 200}));
app.use(bodyParser.urlencoded({extended: true ,limit: "200mb",parameterLimit: 200}));

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})