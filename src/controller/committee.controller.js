import mongoose from "mongoose";
import Models from "../model/index.js";
import { EMessage, Role, SMessage } from "../service/message.js";
import {
  SendCreate,
  SendError400,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import {
  ValidateCommittee,
  ValidateUpdateCommittee,
} from "../service/validate.js";
export default class CommitteeController {
  static async getOne(req, res) {
    try {
      const committeeId = req.params.committeeId;
      if (!mongoose.Types.ObjectId.isValid(committeeId)) {
        return SendError404(res, EMessage.NotFound);
      }
      const committee = await Models.Committee.findOne({
        isActive: true,
        _id: committeeId,
      });
      return SendSuccess(res, SMessage.SelOne, committee);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getByUser(req, res) {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError404(res, EMessage.NotFound);
      }
      const checkRole = await Models.User.findById(userId);
      if (checkRole.role == Role.committee) {
        const committee = await Models.Committee.findOne({
          isActive: true,
          user_id: userId,
        });
        return SendSuccess(res, SMessage.SelOne, committee);
      }
      return SendError404(res, "Not match role");
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }

  static async getAll(req, res) {
    try {
      const committee = await Models.Committee.find({
        isActive: true,
      });
      return SendSuccess(res, SMessage.SelAll, committee);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateCommittee(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { committeeID, committeeName, committeeDescription, user_id } =
        req.body;
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return SendError404(res, EMessage.NotFound + " userId");
      }
      const committee = await Models.Committee.findOne({
        isActive: true,
        committeeID,
      });

      if (committee) {
        return SendError400(res, EMessage.Already + "Committee");
      }

      const role = await Models.User.findByIdAndUpdate(
        user_id,
        {
          role: Role.committee,
        },
        { new: true }
      );
      if (!role) {
        return SendError400(res, "Error Update Role");
      }
      const data = await Models.Committee.create({
        committeeID,
        committeeName,
        committeeDescription,
        user_id,
      });
      return SendCreate(res, SMessage.Create, data);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateCommittee(req, res) {
    try {
      const committeeId = req.params.committeeId;
      if (!mongoose.Types.ObjectId.isValid(committeeId)) {
        return SendError404(res, EMessage.NotFound + " committeeId");
      }
      const validate = ValidateUpdateCommittee(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { committeeID, committeeName, committeeDescription } = req.body;
      const committee = await Models.Committee.findByIdAndUpdate(
        committeeId,
        {
          committeeID,
          committeeName,
          committeeDescription,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, committee);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async deleteCommittee(req, res) {
    try {
      const committeeId = req.params.committeeId;
      if (!mongoose.Types.ObjectId.isValid(committeeId)) {
        return SendError404(res, EMessage.NotFound + " committeeId");
      }
      const committee = await Models.Committee.findByIdAndUpdate(
        committeeId,
        {
          isActive: false,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Delete, committee);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
}
