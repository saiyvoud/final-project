import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/globalKey.js";
import bcrypt from "bcryptjs";
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
              resovle(hash)
            });
          });
      } catch (error) {
        console.log(error);
        resovle(false);
      }
    });
  };
