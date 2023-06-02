import mongoose from "mongoose";
import { DATABASE_DEV } from "./globalKey.js";

mongoose
  .connect(DATABASE_DEV)
  .then(() => {
    console.log(`Connected Database!`);
  })
  .catch(() => {
    console.log(`Faild Connect Database!`);
  });
