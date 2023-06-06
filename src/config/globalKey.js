import dotenv from "dotenv";
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL || "";
const DATABASE_DEV = process.env.DATABASE_DEV || "";
const PORT = process.env.PORT || 8001;
const SECRET_KEY = process.env.SECRET_KEY;
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
export {
  PORT,
  DATABASE_DEV,
  DATABASE_URL,
  SECRET_KEY,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
};
