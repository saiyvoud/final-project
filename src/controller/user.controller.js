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
  GeneraterPassword,
} from "../service/service.js";
import { ValidateRegister, ValidateLogin,ValidateForget } from "../service/validate.js";

export default class UserController {
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
