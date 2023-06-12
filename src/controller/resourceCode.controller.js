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
import { ValidateResourceCode } from "../service/validate.js";

export default class ResourceCodeController {
  static async getOne(req, res) {
    try {
      const resourceCodeId = req.params.resourceCodeId;
      if (!mongoose.Types.ObjectId.isValid(resourceCodeId)) {
        return SendError404(res, EMessage.NotFound + " resourceCodeId");
      }
      const resourceCode = await Models.ResourceCode.findOne({
        isActive: true,
        _id: resourceCodeId,
      });
      return SendSuccess(res, SMessage.SelOne, resourceCode);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getAll(req, res) {
    try {
      const resourceCode = await Models.ResourceCode.find({ isActive: true });
      return SendSuccess(res, SMessage.SelAll, resourceCode);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateResourceCode(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { thesisId, fileCode } = req.body;
      if (!mongoose.Types.ObjectId.isValid(thesisId)) {
        return SendError404(res, EMessage.NotFound + " thesisId");
      }
      const resourceCode = await Models.ResourceCode.create({
        thesisId,
        fileCode,
      });
      return SendCreate(res, SMessage.Create, resourceCode);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateResourceCode(req, res) {
    try {
      const resourceCodeId = req.params.resourceCodeId;
      if (!mongoose.Types.ObjectId.isValid(resourceCodeId)) {
        return SendError404(res, EMessage.NotFound + " resourceCodeId");
      }
      const validate = ValidateResourceCode(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { thesisId, fileCode } = req.body;
      if (!mongoose.Types.ObjectId.isValid(thesisId)) {
        return SendError404(res, EMessage.NotFound + " thesisId");
      }
      const resourceCode = await Models.ResourceCode.findByIdAndUpdate(
        resourceCodeId,
        {
          thesisId,
          fileCode,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, resourceCode);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async deleteResourceCode(req, res) {
    try {
      const resourceCodeId = req.params.resourceCodeId;
      if (!mongoose.Types.ObjectId.isValid(resourceCodeId)) {
        return SendError404(res, EMessage.NotFound + " resourceCodeId");
      }
      const resourceCode = await Models.ResourceCode.findByIdAndUpdate(
        resourceCodeId,
        {
          isActive: false,
        }
      );
      return SendSuccess(res, SMessage.Delete, resourceCode);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
}
