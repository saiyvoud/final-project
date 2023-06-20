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
import { ValidateTime } from "../service/validate.js";
export default class TimeController {
  static async getOne(req, res) {
    try {
      const timeId = req.params.timeId;
      if (!mongoose.Types.ObjectId.isValid(timeId)) {
        return SendError404(res, EMessage.NotFound + " timeId");
      }
      const time = await Models.Time.findOne({
        isActvie: true,
        _id: timeId,
      });
      return SendSuccess(res, SMessage.SelOne, time);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getAll(req, res) {
    try {
      const times = await Models.Time.find({ isActvie: true });
      return SendSuccess(res, SMessage.SelAll, times);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateTime(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { majorId, room } = req.body;
      if (!mongoose.Types.ObjectId.isValid(majorId)) {
        return SendError404(res, EMessage.NotFound + " majorId");
      }
      const time = await Models.Time.create({
        majorId,
        room,
      });
      return SendCreate(res, SMessage.Create, time);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateTime(req, res) {
    try {
      const timeId = req.params.timeId;
      if (!mongoose.Types.ObjectId.isValid(timeId)) {
        return SendError404(res, EMessage.NotFound + " timeId");
      }
      const validate = ValidateTime(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { majorId, room } = req.body;

      if (!mongoose.Types.ObjectId.isValid(majorId)) {
        return SendError404(res, EMessage.NotFound + " majorId");
      }
      const time = await Models.Time.findByIdAndUpdate(
        timeId,
        {
          majorId,
          room,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, time);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async deleteTime(req, res) {
    try {
      const timeId = req.params.timeId;
      if (!mongoose.Types.ObjectId.isValid(timeId)) {
        return SendError404(res, EMessage.NotFound + " timeId");
      }
      const time = await Models.Time.findByIdAndUpdate(
        timeId,
        {
          isActvie: false,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Delete, time);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
}
