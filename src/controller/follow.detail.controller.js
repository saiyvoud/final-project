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
import {
  ValidateFollowDetail,
  ValidateUpdateFollowDetail,
} from "../service/validate.js";

export default class FollowDetailController {
  static async getByFollowID(req, res) {
    try {
      const followId = req.params.followId;
      if (!mongoose.Types.ObjectId.isValid(followId)) {
        return SendError404(res, EMessage.NotFound + " followId");
      }
      const follow = await Models.FollowDetail.find({
        isActive: true,
        follow_id: followId,
      });
      return SendSuccess(res, SMessage.SelAll, follow);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getOne(req, res) {
    try {
      const followDetailId = req.params.followDetailId;
      if (!mongoose.Types.ObjectId.isValid(followDetailId)) {
        return SendError404(res, EMessage.NotFound + " followDetailId");
      }
      const follow = await Models.FollowDetail.findOne({
        isActive: true,
        _id: followDetailId,
      });
      return SendSuccess(res, SMessage.SelOne, follow);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getAll(req, res) {
    try {
      const follow = await Models.FollowDetail.find({
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
      const validate = ValidateFollowDetail(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const {
        follow_id,
        appointment,
        presentNow,
        presentEdit,
        nextAppointment,
        presentNext,
      } = req.body;
      if (!mongoose.Types.ObjectId.isValid(follow_id)) {
        return SendError404(res, EMessage.NotFound + " followId");
      }
      const follow = await Models.FollowDetail.create({
        follow_id,
        appointment,
        presentNow,
        presentEdit,
        nextAppointment,
        presentNext,
      });
      return SendCreate(res, SMessage.Create, follow);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateFollowDetail(req, res) {
    try {
      const followDetailId = req.params.followDetailId;
      if (!mongoose.Types.ObjectId.isValid(followDetailId)) {
        return SendError404(res, EMessage.NotFound + " followDetailId");
      }
      const validate = ValidateUpdateFollowDetail(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { nextAppointment, presentNext } = req.body;
      const follow = await Models.FollowDetail.findByIdAndUpdate(
        followDetailId,
        {
          nextAppointment,
          presentNext,
          
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, follow);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async deleteFollowDetail(req, res) {
    try {
      const followDetailId = req.params.followDetailId;
      if (!mongoose.Types.ObjectId.isValid(followDetailId)) {
        return SendError404(res, EMessage.NotFound + " followDetailId");
      }

      const follow = await Models.FollowDetail.findByIdAndUpdate(
        followDetailId,
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
