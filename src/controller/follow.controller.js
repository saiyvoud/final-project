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
import { ValidateFollow } from "../service/validate.js";

export default class FollowController {
  static async getOne(req, res) {
    try {
      const follow_id = req.params.follow_id;
      if (!mongoose.Types.ObjectId.isValid(follow_id)) {
        return SendError404(res, EMessage.NotFound + " follow_id");
      }
      const follow = await Models.Follow.findOne({
        isActive: true,
        _id: follow_id,
      });
      return SendSuccess(res, SMessage.SelOne, follow);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getByUserId(req, res) {
    try {
      const student_id = req.params.student_id;
      if (!mongoose.Types.ObjectId.isValid(student_id)) {
        return SendError404(res, EMessage.NotFound + " student_id");
      }
      const follow = await Models.Follow.findOne({
        isActive: true,
        student_id,
      });
      return SendSuccess(res, SMessage.SelOne, follow);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getByCommitteeId(req, res) {
    try {
      const committee_id = req.params.committee_id;
      if (!mongoose.Types.ObjectId.isValid(committee_id)) {
        return SendError404(res, EMessage.NotFound + " committee_id");
      }
      const follow = await Models.Follow.find({
        isActive: true,
        committee_id,
      });
      return SendSuccess(res, SMessage.SelAll, follow);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getAll(req, res) {
    try {
      const follow = await Models.Follow.find({
        isActive: true,
      });
      return SendSuccess(res, SMessage.SelAll, follow);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateFollow(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { student_id, thesis_id, committee_id, schoolYear } = req.body;
      if (
        !mongoose.Types.ObjectId.isValid(thesis_id) ||
        !mongoose.Types.ObjectId.isValid(committee_id) ||
        !mongoose.Types.ObjectId.isValid(student_id)
      ) {
        return SendError404(
          res,
          EMessage.NotFound + " userId, thesisId , committeeId"
        );
      }
      const follow = await Models.Follow.create({
        student_id,
        thesis_id,
        committee_id,
        schoolYear,
      });
      return SendCreate(res, SMessage.Create, follow);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateFollow(req, res) {
    try {
      const follow_id = req.params.follow_id;
      if (!mongoose.Types.ObjectId.isValid(follow_id)) {
        return SendError404(res, EMessage.NotFound + " follow_id");
      }
      const validate = ValidateFollow(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { thesis_id, committee_id, schoolYear } = req.body;
      if (
        !mongoose.Types.ObjectId.isValid(thesis_id) ||
        !mongoose.Types.ObjectId.isValid(committee_id)
      ) {
        return SendError404(
          res,
          EMessage.NotFound + "  thesisId , committeeId"
        );
      }
      const follow = await Models.Follow.findByIdAndUpdate(
        follow_id,
        {
          thesis_id,
          committee_id,
          schoolYear,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, follow);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async deleteFollow(req, res) {
    try {
      const follow_id = req.params.follow_id;
      if (!mongoose.Types.ObjectId.isValid(follow_id)) {
        return SendError404(res, EMessage.NotFound + " follow_id");
      }

      const follow = await Models.Follow.findByIdAndUpdate(
        follow_id,
        {
          isActive: false,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Delete, follow);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
}
