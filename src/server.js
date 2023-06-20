
import { PORT } from "./config/globalKey.js";
import './config/db.js'
import { createServer } from "http";
import app from "./config/config.js"
const server = createServer(app);
server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})