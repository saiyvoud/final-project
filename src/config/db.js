import mongoose from "mongoose";
import { DATABASE_DEV, DATABASE_URL } from "./globalKey.js";

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log(`Connected Database!`);
  })
  .catch(() => {
    console.log(`Faild Connect Database!`);
  });
