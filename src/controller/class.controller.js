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
import { ValidateClass, ValidateUpdateClass } from "../service/validate.js";
export default class ClassController {
  static async getOne(req, res) {
    try {
      const classId = req.params.classId;
      if (!mongoose.Types.ObjectId.isValid(classId)) {
        return SendError404(res, EMessage.NotFound + " classId");
      }
      const result = await Models.Class.findOne({
        isActive: true,
        _id: classId,
      });
      return SendSuccess(res, SMessage.SelOne, result);
    } catch (error) {
      return SendError500(res, EMessage.FaildServer);
    }
  }
  static async getAll(req, res) {
    try {
      const result = await Models.Class.find({
        isActive: true,
      });
      return SendSuccess(res, SMessage.SelAll, result);
    } catch (error) {
      return SendError500(res, EMessage.FaildServer);
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateClass(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { room, department } = req.body;
      const result = await Models.Class.create({
        room,
        department,
      });
      if (!result) {
        return SendError400(res, "Error Create Class Room");
      }
      return SendCreate(res, SMessage.Create, result);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateClass(req, res) {
    try {
      const classId = req.params.classId;
      if (!mongoose.Types.ObjectId.isValid(classId)) {
        return SendError404(res, EMessage.NotFound + " classId");
      }
      const { room, department } = req.body;
      const validate = ValidateUpdateClass(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const result = await Models.Class.findByIdAndUpdate(
        classId,
        {
          room,
          department,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, result);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async deleteClass(req, res) {
    try {
      const classId = req.params.classId;
      if (!mongoose.Types.ObjectId.isValid(classId)) {
        return SendError404(res, EMessage.NotFound + " classId");
      }
      const result = await Models.Class.findByIdAndUpdate(
        classId,
        {
          isActive: false,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Delete, result);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
}
