import { EMessage } from "../service/message.js";
import { SendError401, SendError500 } from "../service/response.js";
import { VerifyToken } from "../service/service.js";
import Models from "../model/index.js";
export const auth = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) return SendError401(res, EMessage.Unauthorization);
    const user = await VerifyToken(token);
    if (!user) return SendError401(res, EMessage.Unauthorization);
    res.locals._id = user._id;
    next();
  } catch (error) {
    console.log(error);
    SendError500(res, "Error Uauthorization", error);
  }
};

export const auth_admin = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) {
      return SendError401(res, EMessage.Unauthorization);
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    req.admin = await Models.Admin.findById(decoded._id);
    next();
  } catch (error) {
    console.log(error);
    SendError500(res, "Error Uauthorization", error);
  }
};
