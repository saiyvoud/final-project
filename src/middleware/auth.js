import { EMessage } from "../service/message.js";
import { SendError401, SendError500 } from "../service/response.js";
import { VerifyToken,VerifyTokenAdmin } from "../service/service.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) return SendError401(res, EMessage.Unauthorization);
    const user = await VerifyToken(token);
    if (!user) return SendError401(res, EMessage.Unauthorization);
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
      return SendError401(res, EMessage.NotFound+ ' Token');
    }
    const admin = await VerifyTokenAdmin(token);
    if (!admin) return SendError401(res, EMessage.Unauthorization);
    next();
  } catch (error) {
    console.log(error);
    SendError500(res, "Error Uauthorization", error);
  }
};
