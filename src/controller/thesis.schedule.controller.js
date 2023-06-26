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
  ValidateThesisSchedule,
  ValidateUpdateThesisSchedule,
} from "../service/validate.js";
export default class ThesisScheduleController {
  static async getOne(req, res) {
    try {
      const thesisScheduleId = req.params.thesisScheduleId;
      if (!mongoose.Types.ObjectId.isValid(thesisScheduleId)) {
        return SendError404(res, EMessage.NotFound + " thesisScheduleId");
      }
      const thesisSchedule = await Models.ThesisSchedule.findOne({
        isActive: true,
        _id: thesisScheduleId,
      });
      return SendSuccess(res, SMessage.SelOne, thesisSchedule);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getAll(req, res) {
    try {
      const thesisSchedule = await Models.ThesisSchedule.find({
        isActive: true,
      });
      return SendSuccess(res, SMessage.SelAll, thesisSchedule);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateThesisSchedule(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const {
        admin_id,
        major_id,
        thesis_id,
        committeeName,
        times,
        classRoom,
        dateTime,
        schoolYear,
      } = req.body;
      if (
        !mongoose.Types.ObjectId.isValid(admin_id) ||
        !mongoose.Types.ObjectId.isValid(major_id) ||
        !mongoose.Types.ObjectId.isValid(thesis_id)
      ) {
        return SendError404(
          res,
          EMessage.NotFound + " adminId, majorId, thesisId"
        );
      }
      const thesisSchedule = await Models.ThesisSchedule.create({
        admin_id,
        major_id,
        thesis_id,
        committeeName,
        times,
        classRoom,
        dateTime,
        schoolYear,
      });
      return SendCreate(res, SMessage.Create, thesisSchedule);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateThesisSchedule(req, res) {
    try {
      const thesisScheduleId = req.params.thesisScheduleId;
      if (!mongoose.Types.ObjectId.isValid(thesisScheduleId)) {
        return SendError404(res, EMessage.NotFound + " thesisScheduleId");
      }
      const validate = ValidateUpdateThesisSchedule(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { thesis_id, committeeName, times } = req.body;
      if (!committeeName) {
        const thesisSchedule = await Models.ThesisSchedule.findByIdAndUpdate(
          thesisScheduleId,
          {
            $push: {
              thesis_id: thesis_id,
              times: times,
            },
          }, // set
          { new: true }
        );
        return SendSuccess(res, SMessage.Update, thesisSchedule);
      }
      const thesisSchedule = await Models.ThesisSchedule.findByIdAndUpdate(
        thesisScheduleId,
        {
          $push: {
            thesis_id: thesis_id,
            times: times,
            committeeName: committeeName,
          },
        }, // set
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, thesisSchedule);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async deleteThesisSchedule(req, res) {
    try {
      const thesisScheduleId = req.params.thesisScheduleId;
      if (!mongoose.Types.ObjectId.isValid(thesisScheduleId)) {
        return SendError404(res, EMessage.NotFound + " thesisScheduleId");
      }
      const thesisSchedule = await Models.ThesisSchedule.findByIdAndUpdate(
        thesisScheduleId,
        {
          isActive: false,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Delete, thesisSchedule);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
}
