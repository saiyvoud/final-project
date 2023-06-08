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
import { ValidateSchedule,ValidateUpdateSchedule } from "../service/validate.js";

export default class ScheduleController {
  static async getOne(req, res) {
    try {
      const scheduleId = req.params.scheduleId;
      if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
        return SendError404(res, EMessage.NotFound + " scheduleId");
      }
      const schedule = await Models.Schedule.findOne({
        isActive: true,
        _id: scheduleId,
      }).populate({
        path: "committeeId thesisId classId",
      });
      return SendSuccess(res, SMessage.getOne, schedule);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getAll(req, res) {
    try {
      const schedule = await Models.Schedule.find({
        isActive: true,
      }).populate({
        path: "committeeId thesisId classId",
      });
      return SendSuccess(res, SMessage.getAll, schedule);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateSchedule(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { scheduleDate, scheduleLocation, committeeId, thesisId, classId } =
        req.body;
      if (
        !mongoose.Types.ObjectId.isValid(committeeId) ||
        !mongoose.Types.ObjectId.isValid(thesisId) ||
        !mongoose.Types.ObjectId.isValid(classId)
      ) {
        return SendError404(
          res,
          EMessage.NotFound + " committeeId,thesisId,classId"
        );
      }
      const schedule = await Models.Schedule.create({
        scheduleDate,scheduleLocation, committeeId,thesisId,classId,
      });
      return SendCreate(res, SMessage.Create, schedule);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateSchedule(req, res) {
    try {
      const scheduleId = req.params.scheduleId;
      if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
        return SendError404(res, EMessage.NotFound + " scheduleId");
      }
      const validate = ValidateUpdateSchedule(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { scheduleDate, scheduleLocation, committeeId, thesisId, classId } =
        req.body;
      const schedule = await Models.Schedule.findByIdAndUpdate(
        scheduleId,
        {
          scheduleDate,
          scheduleLocation,
          committeeId,
          thesisId,
          classId,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, schedule);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async deleteSchedule(req, res) {
    try {
      const scheduleId = req.params.scheduleId;
      if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
        return SendError404(res, EMessage.NotFound + " scheduleId");
      }
      const schedule = await Models.Schedule.findByIdAndUpdate(
        scheduleId,
        {
          isActive: false,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Delete, schedule);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
}
