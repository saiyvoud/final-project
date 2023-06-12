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
import { ValidateThesisMember } from "../service/validate.js";
export default class ThesisMemberController {
  static async getOne(req, res) {
    try {
      const thesisMemberId = req.params.thesisMemberId;
      if (!mongoose.Types.ObjectId.isValid(thesisMemberId)) {
        return SendError404(res, EMessage.NotFound + " thesisMemberId");
      }
      const thesisMember = await Models.ThesisMembers.findOne({
        isActive: true,
        _id: thesisMemberId,
      });
      return SendSuccess(res, SMessage.SelOne, thesisMember);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getAll(req, res) {
    try {
      const thesisMembers = await Models.ThesisMembers.find({
        isActive: true,
      });
      return SendSuccess(res, SMessage.SelAll, thesisMembers);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateThesisMember(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { memberId, thesisId, committeeId } = req.body;
      if (
        !mongoose.Types.ObjectId.isValid(memberId) ||
        !mongoose.Types.ObjectId.isValid(thesisId) ||
        !mongoose.Types.ObjectId.isValid(committeeId)
      ) {
        return SendError404(
          res,
          EMessage.NotFound + " memberId , thesisId , committeeId"
        );
      }
      const thesisMember = await Models.ThesisMembers.create({
        memberId,
        thesisId,
        committeeId,
      });
      return SendCreate(res, SMessage.Create, thesisMember);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateThesisMember(req, res) {
    try {
      const thesisMemberId = req.params.thesisMemberId;
      if (!mongoose.Types.ObjectId.isValid(thesisMemberId)) {
        return SendError404(res, EMessage.NotFound + " thesisMemberId");
      }
      const validate = ValidateThesisMember(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { memberId, thesisId, committeeId } = req.body;
      if (
        !mongoose.Types.ObjectId.isValid(memberId) ||
        !mongoose.Types.ObjectId.isValid(thesisId) ||
        !mongoose.Types.ObjectId.isValid(committeeId)
      ) {
        return SendError404(
          res,
          EMessage.NotFound + " memberId , thesisId , committeeId"
        );
      }
      const thesisMember = await Models.ThesisMembers.findByIdAndUpdate(
        thesisMemberId,
        {
          memberId,
          thesisId,
          committeeId,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, thesisMember);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async deleteThesisMember(req, res) {
    try {
      const thesisMemberId = req.params.thesisMemberId;
      if (!mongoose.Types.ObjectId.isValid(thesisMemberId)) {
        return SendError404(res, EMessage.NotFound + " thesisMemberId");
      }
      const thesisMember = await Models.ThesisMembers.findByIdAndUpdate(
        thesisMemberId,
        {
          isActive: false,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Delete, thesisMember);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
}
