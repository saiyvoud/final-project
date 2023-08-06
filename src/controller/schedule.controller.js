import mongoose from "mongoose";
import Models from "../model/index.js";
import { EMessage, SMessage } from "../service/message.js";
import {
  SendCreate,
  SendError400,
  SendError404,
  SendError500,
  SendSuccess,
  SendError401,
} from "../service/response.js";
import {
  ValidateSchedule,
  ValidateUpdateSchedule,
} from "../service/validate.js";

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
      });
      return SendSuccess(res, SMessage.getOne, schedule);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getByMajor(req, res) {
    try {
      const majorId = req.params.majorId;
      if (!mongoose.Types.ObjectId.isValid(majorId)) {
        return SendError404(res, EMessage.NotFound + " majorId");
      }

      const schedule = await Models.Schedule.findOne({
        isActive: true,
        major_id: majorId,
      })
        .populate({
          path: "thesis_id",
          select: "thesisTitle",
          populate: {
            path: "student_id",
            select: "studentName studentRoom",
          },
        })
        .populate({
          path: "major_id",
          select: "nickname",
        });
      if (!schedule) {
        return SendError401(res, EMessage.NotFound + " majorId");
      }
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
      })
        .populate({
          path: "thesis_id",
          select: "thesisTitle",
          populate: {
            path: "student_id",
            select: "studentName studentRoom",
          },
        })
        .populate({
          path: "major_id",
          select: "nickname",
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
      const {
        admin_id,
        major_id,
        thesis_id,
        times,
        committeeName,
        classRoom,
        dateTime,
        schoolYear,
      } = req.body;
      if (
        !mongoose.Types.ObjectId.isValid(admin_id) ||
        !mongoose.Types.ObjectId.isValid(major_id)
      ) {
        return SendError404(res, EMessage.NotFound + " committeeId,classId");
      }
      const schedule = await Models.Schedule.create({
        admin_id,
        major_id,
        thesis_id,
        times,
        committeeName,
        classRoom,
        dateTime,
        schoolYear,
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
      const { thesis_id, times, committeeName } = req.body;
      if (!committeeName) {
        const schedule = await Models.Schedule.findByIdAndUpdate(
          scheduleId,
          {
            $push: {
              thesis_id: thesis_id,
              times: times,
            },
          }, // set
          { new: true }
        );
        return SendSuccess(res, SMessage.Update, schedule);
      }
      const schedule = await Models.Schedule.findByIdAndUpdate(
        scheduleId,
        {
          $push: {
            thesis_id: thesis_id,
            times: times,
            committeeName: committeeName,
          },
        }, // set
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
