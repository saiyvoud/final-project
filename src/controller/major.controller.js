import Models from "../model/index.js";
import mongoose from "mongoose";
import {
  SendSuccess,
  SendCreate,
  SendError400,
  SendError404,
  SendError500,
} from "../service/response.js";
import { EMessage, SMessage } from "../service/message.js";
import { ValidateMajor } from "../service/validate.js";
export default class MajorController {
  static async getOne(req, res) {
    try {
      const majorId = req.params.majorId;
      if (!mongoose.Types.ObjectId.isValid(majorId)) {
        return SendError404(res, EMessage.NotFound + " majorId");
      }
      const major = await Models.Major.findOne({
        isActvie: true,
        _id: majorId,
      });
      return SendSuccess(res, SMessage.SelOne, major);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getAll(req, res) {
    try {
      const majors = await Models.Major.find({ isActive: true });
      return SendSuccess(res, SMessage.SelAll, majors);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateMajor(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { fullname, nickname } = req.body;

      const major = await Models.Major.create({
        fullname,
        nickname,
      });
      return SendCreate(res, SMessage.Create, major);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateMajor(req, res) {
    try {
      const majorId = req.params.majorId;
      if (!mongoose.Types.ObjectId.isValid(majorId)) {
        return SendError404(res, EMessage.NotFound + " majorId");
      }
      const validate = Validatemajor(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { fullname, nickname } = req.body;

      const major = await Models.Major.findByIdAndUpdate(
        majorId,
        {
          fullname,
          nickname,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, major);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async deleteMajor(req, res) {
    try {
      const majorId = req.params.majorId;
      if (!mongoose.Types.ObjectId.isValid(majorId)) {
        return SendError404(res, EMessage.NotFound + " majorId");
      }
      const major = await Models.Major.findByIdAndUpdate(
        majorId,
        {
          isActvie: false,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Delete, major);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
}
