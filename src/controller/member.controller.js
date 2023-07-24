import mongoose from "mongoose";
import Models from "../model/index.js";
import { EMessage, SMessage } from "../service/message.js";
import {
  SendCreate,
  SendError400,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import { ValidateMember, ValidateUpdateMember } from "../service/validate.js";

export default class MemberController {
  static async getOne(req, res) {
    try {
      const memberId = req.params.memberId;
      if (!mongoose.Types.ObjectId.isValid(memberId)) {
        return SendError404(res, EMessage.NotFound);
      }
      const member = await Models.Member.findOne({
        isActive: true,
        _id: memberId,
      });
      return SendSuccess(res, SMessage.SelOne, member);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getAll(req, res) {
    try {
      const members = await Models.Member.find({
        isActive: true,
      });
      return SendSuccess(res, SMessage.SelAll, members);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async insert(req, res) {
    try {
      const { memberID, memberName, memberRoom, user_id } = req.body;
      const validate = ValidateMember(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return SendError404(res, EMessage.NotFound + "UserID");
      }
      const member = await Models.Member.findOne({
        isActive: true,
        memberID,
      });
      if (member) {
        return SendError400(res, EMessage.Already + "member");
      }
      const data = await Models.Member.create({
        memberID,
        memberName,
        user_id,
        memberRoom,
      });
      return SendCreate(res, SMessage.Create, data);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateMember(req, res) {
    try {
      const memberId = req.params.memberId;
      if (!mongoose.Types.ObjectId.isValid(memberId)) {
        return SendError404(res, EMessage.NotFound);
      }
      const validate = ValidateUpdateMember(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { memberID, memberName, memberRoom } = req.body;

      const member = await Models.Member.findByIdAndUpdate(
        memberId,
        {
          memberID,
          memberName,
          memberRoom,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, member);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async deleteMember(req, res) {
    try {
      const memberId = req.params.memberId;
      if (!mongoose.Types.ObjectId.isValid(memberId)) {
        return SendError404(res, EMessage.NotFound);
      }
      const member = await Models.Member.findByIdAndUpdate(
        memberId,
        {
          isActive: false,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Delete, member);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
}
