import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/globalKey.js";
import bcrypt from "bcryptjs";
import Jimp from "jimp";
import fs from "fs";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import Models from "../model/index.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const VerifyRefreshToken = (token, refreshToken) => {
  return new Promise(async (resovle, reject) => {
    try {
      jwt.verify(refreshToken, SECRET_KEY, async function (err, decoded) {
        if (err) return reject(err);
        if (decoded.token == token) {
          const data = await GenerateToken(decoded);
          resovle(data);
        }
      });
    } catch (error) {
      console.log(error);
      resovle(false);
    }
  });
};

export const VerifyToken = (token) => {
  return new Promise(async (resovle, reject) => {
    try {
      jwt.verify(token, SECRET_KEY, async function (error, decoded) {
        if (error) return reject(error);
        const user = await Models.User.findOne({
          _id: decoded._id,
          email: decoded.email,
          isActive: true,
        });
        resovle(user);
      });
    } catch (error) {
      console.log(error);
      resovle(false);
    }
  });
};
export const VerifyTokenAdmin = (token) => {
  return new Promise(async (resovle, reject) => {
    try {
      jwt.verify(token, SECRET_KEY, async function (error, decoded) {
        if (error) return reject(error);
        const admin = await Models.Admin.findOne({
          _id: decoded._id,
          email: decoded.email,
          isActive: true,
        });
        resovle(admin);
      });
    } catch (error) {
      console.log(error);
      resovle(false);
    }
  });
};

export const GenerateToken = (user) => {
  return new Promise(async (resovle, reject) => {
    try {
      let token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
        },
        `${SECRET_KEY}`,
        { expiresIn: "1h" }
      );
      const refreshToken = await GenerateRefreshToken(token, user);
      resovle({ token, refreshToken });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const GenerateRefreshToken = (token, user) => {
  return new Promise(async (resovle, reject) => {
    try {
      let refreshToken = jwt.sign(
        { _id: user._id, email: user.email, token },
        `${SECRET_KEY}`
      );
      refreshToken
        ? resovle(refreshToken)
        : reject("Error Generate RefreshToken");
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const ComparePassword = (password, userPassword) => {
  return new Promise(async (resovle, reject) => {
    try {
      const pwd = password + SECRET_KEY;
      bcrypt.compare(pwd, userPassword, (err, isMacth) => {
        if (err) return reject(err);
        resovle(isMacth);
      });
    } catch (error) {
      console.log(error);
      resovle(false);
    }
  });
};
export const GeneraterPassword = (newpassword) => {
  return new Promise(async (resovle, reject) => {
    try {
      const pwd = newpassword + SECRET_KEY;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject(err);
        bcrypt.hash(pwd, salt, (err, hash) => {
          if (err) return reject(err);
          resovle(hash);
        });
      });
    } catch (error) {
      console.log(error);
      resovle(false);
    }
  });
};

export const UploadImageToServer = (imageBase64) => {
  return new Promise(async (resovle, reject) => {
    try {
      const base64Data = imageBase64.replace(
        /^data:image\/(png|jpeg|jpg|webp);base64,/,
        ""
      );
      const imgBuffer = Buffer.from(base64Data, "base64");
      const imgName = `IMG-${Date.now()}.jpg`;
      const imgPath = `${__dirname}/../../assets/images/${imgName}`;
      const jpegBuffer = await sharp(imgBuffer).jpeg().toBuffer();
      const image = await Jimp.read(jpegBuffer);
      if (!image) {
        reject("Upload Image To Server Faild!");
      }
      image.write(imgPath);
      resovle(imgName);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const removeImage = (imgName) => {
  return new Promise((resolve, rejects) => {
    try {
      fs.unlink(`${__dirname}/../../assets/images/${imgName}`, (error) => {
        if (error) {
          //  console.log(error);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } catch (error) {
      resolve(false);
    }
  });
};
