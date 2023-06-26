import mongoose from "mongoose";
import { uploadImageServer } from "../config/uploadImageServer.js";
import UploadImage from "../config/uploadImage.js";
import Models from "../model/index.js";
import { EMessage, SMessage } from "../service/message.js";
import {
  SendCreate,
  SendError400,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import {
  GenerateToken,
  ComparePassword,
  GeneraterPassword,VerifyRefreshToken,
} from "../service/service.js";
import {
  ValidateRegister,
  ValidateLogin,
  ValidateForget,
  ValidateChangePassword,
  ValidateUpdateProfile,
  ValidateUpdateProfileImage,ValidateRefreshToken
} from "../service/validate.js";

export default class UserController {
  static async RefreshToken(req,res){
    try {
      const validate = ValidateRefreshToken(req.body);
      if(validate.length > 0){
        return SendError400(res,EMessage.PleaseInput+validate.join(","))
      }
      const {token ,refreshToken } = req.body;
      const data = await VerifyRefreshToken(token,refreshToken);
      if(!data){
        return SendError400(res,"Error RefreshToken");
      }
      return SendSuccess(res,SMessage.Update,data);
    } catch (error) {
      console.log(error);
      return SendError500(res,EMessage.FaildServer,error);
    }
  }
  static async updateProfile(req, res) {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError404(res, EMessage.NotFound + "User ID");
      }
      const validate = ValidateUpdateProfile(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { username, email } = req.body;
      const user = await Models.User.findByIdAndUpdate(
        userId,
        {
          username,
          email,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, user);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
 
  static async updateProfileImageCloud(req, res) {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError404(res, EMessage.NotFound);
      }
      const validate = ValidateUpdateProfileImage(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { oldImage, image } = req.body;
      const imageUrl = await UploadImage(oldImage,image);
      if(!imageUrl){
        return SendError404(res,"Base64")
      }
      const user = await Models.User.findByIdAndUpdate(
        userId,
        {
          profile: imageUrl,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, user);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateProfileImageServer(req, res) {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError404(res, EMessage.NotFound + "User ID");
      }
      const validate = ValidateUpdateProfileImage(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { oldImage, image } = req.body;
      const imageUrl = await uploadImageServer(oldImage, image);

      const user = await Models.User.findByIdAndUpdate(
        userId,
        {
          profile: imageUrl,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, user);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getProfile(req, res) {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError404(res, EMessage.NotFound);
      }
      const user = await Models.User.findOne({ isActive: true, _id: userId });
      return SendSuccess(res, SMessage.SelOne, user);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getAll(req, res) {
    try {
      const user = await Models.User.find({ isActive: true });
      return SendSuccess(res, SMessage.SelAll, user);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async changePassword(req, res) {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError404(res, EMessage.NotFound + "User ID");
      }
      const { oldPassword, newPassword } = req.body;
      const validate = ValidateChangePassword(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const userExit = await Models.User.findById(userId);
      const isMacth = await ComparePassword(oldPassword, userExit.password);
      if (!isMacth) {
        return SendError400(res, "Not Match Password");
      }
      const password = await GeneraterPassword(newPassword);

      const user = await Models.User.findByIdAndUpdate(
        userId,
        {
          password,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, user);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async forget(req, res) {
    try {
      const validate = ValidateForget(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { email, newpassword } = req.body;
      if (!email) {
        return SendError400(res, "email is require!");
      }
      const emailExit = await Models.User.findOne({ isActive: true, email });
      if (!emailExit) {
        return SendError404(res, "Not Found Email");
      }
      const newPassword = await GeneraterPassword(newpassword);
      if (!newPassword) {
        return SendError404(res, "Error GeneratePassword");
      }
      const user = await Models.User.findByIdAndUpdate(
        emailExit._id,
        {
          password: newPassword,
        },
        { new: true }
      );
      return SendSuccess(res, "Forget Password Success", user);
    } catch (error) {
      return SendError500(res, "Error Forget", error);
    }
  }
  static async register(req, res) {
    try {
      const validate = ValidateRegister(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { username, email, password } = req.body;
      const emailExit = await Models.User.findOne({ isActive: true, email });
      if (emailExit) {
        return SendError400(res, "Already is email");
      }
      const user = new Models.User({
        username,
        email,
        password,
      });
      console.log(user);
      await user.save();
      const token = await GenerateToken(user);
      if (!token) {
        return SendError400(res, "Token Faild!", token);
      }
      const data = Object.assign(
        JSON.parse(JSON.stringify(user)),
        JSON.parse(JSON.stringify(token))
      );

      return SendCreate(res, SMessage.Register, data);
    } catch (error) {
      return SendError500(res, "Error Register", error);
    }
  }
  static async login(req, res) {
    try {
      const validate = ValidateLogin(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { email, password } = req.body;
      const emailExit = await Models.User.findOne({ isActive: true, email });
      if (!emailExit) {
        return SendError404(res, "Not Found Email");
      }
      const isMatch = await ComparePassword(password, emailExit.password);
      if (!isMatch) {
        return SendError404(res, "Not Match Password");
      }
      const token = await GenerateToken(emailExit);
      if (!token) {
        return SendError400(res, "Token Faild!", token);
      }
      const data = Object.assign(
        JSON.parse(JSON.stringify(emailExit)),
        JSON.parse(JSON.stringify(token))
      );

      return SendSuccess(res, SMessage.Login, data);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Login", error);
    }
  }
}
