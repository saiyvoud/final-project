import dotenv from "dotenv";
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL || ""
const DATABASE_DEV = process.env.DATABASE_DEV || ""
const PORT = process.env.PORT || 8001

export {PORT,DATABASE_DEV,DATABASE_URL}