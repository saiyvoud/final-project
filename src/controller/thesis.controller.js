import mongoose from "mongoose";
import Models from "../model/index.js";
import { EMessage, SMessage, Status } from "../service/message.js";
import {
  SendCreate,
  SendError400,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import { ValidateThesis, ValidateUpdateThesis } from "../service/validate.js";
export default class ThesisController {
  static async getOne(req, res) {
    try {
      const thesisId = req.params.thesisId;
      if (!mongoose.Types.ObjectId.isValid(thesisId)) {
        return SendError404(res, EMessage.NotFound + " thesisId");
      }
      const thesis = await Models.Thesis.findOne({
        isActive: true,
        _id: thesisId,
      });
      return SendSuccess(res, SMessage.getOne, thesis);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getAll(req, res) {
    try {
      const thesis = await Models.Thesis.find({
        isActive: true,
      });
      return SendSuccess(res, SMessage.getAll, thesis);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateThesis(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const {
        studentID,
        studentName,
        studentRoom,
        memberID,
        memberName,
        memberRoom,
        thesisTitle,
        thesisDetail,
        thesisAbstract,
        thesisFile,
        proposalFile,
      } = req.body;

      const thesis = await Models.Thesis.create({
        studentID,
        studentName,
        studentRoom,
        memberID,
        memberName,
        memberRoom,
        thesisTitle,

        thesisDetail,
        thesisAbstract,
        thesisFile,
        proposalFile,
      });
      return SendCreate(res, SMessage.Create, thesis);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateThesis(req, res) {
    try {
      const thesisId = req.params.thesisId;
      if (!mongoose.Types.ObjectId.isValid(thesisId)) {
        return SendError404(res, EMessage.NotFound + " ThesisId");
      }
      const validate = ValidateUpdateThesis(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const {
        scoringId,
        studentID,
        studentName,
        studentRoom,
        memberID,
        memberName,
        memberRoom,
        thesisTitle,

        thesisDetail,
        thesisAbstract,
        thesisFile,
        proposalFile,
        thesisStatus,
      } = req.body;
      if (!mongoose.Types.ObjectId.isValid(scoringId)) {
        return SendError404(res, EMessage.NotFound + " scoringId");
      }
      const status = Object.values(Status);
      if (!status.includes(thesisStatus)) {
        return SendError400(res, "Error Status Thesis");
      }
      const thesis = await Models.Thesis.findByIdAndUpdate(
        thesisId,
        {
          scoringId,
          studentID,
          studentName,
          studentRoom,
          memberID,
          memberName,
          memberRoom,
          thesisTitle,

          thesisDetail,
          thesisAbstract,
          thesisFile,
          proposalFile,
          thesisStatus,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, thesis);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }

  static async updateClassAndTime(req, res) {
    try {
      const thesisId = req.params.thesisId;
      if (!mongoose.Types.ObjectId.isValid(thesisId)) {
        return SendError404(res, EMessage.NotFound + " ThesisId");
      }
      const { classId, timeId } = req.body;
      if (
        !mongoose.Types.ObjectId.isValid(classId) ||
        !mongoose.Types.ObjectId.isValid(timeId)
      ) {
        return SendError404(res, EMessage.NotFound + " classId, timeId");
      }
      const thesis = await Models.Thesis.findByIdAndUpdate(
        thesisId,
        {
          classId,
          timeId,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, thesis);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }

  static async deleteThesis(req, res) {
    try {
      const thesisId = req.params.thesisId;
      if (!mongoose.Types.ObjectId.isValid(thesisId)) {
        return SendError404(res, EMessage.NotFound + " ThesisId");
      }
      const thesis = await Models.Thesis.findByIdAndUpdate(
        thesisId,
        {
          isActive: false,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Delete, thesis);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateStatusSuccess(req, res) {
    try {
      const thesisId = req.params.thesisId;
      if (!mongoose.Types.ObjectId.isValid(thesisId)) {
        return SendError404(res, EMessage.NotFound + " ThesisId");
      }
      const thesis = await Models.Thesis.findByIdAndUpdate(
        thesisId,
        {
          thesisStatus: Status.complete,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, thesis);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateStatusEdit(req, res) {
    try {
      const thesisId = req.params.thesisId;
      if (!mongoose.Types.ObjectId.isValid(thesisId)) {
        return SendError404(res, EMessage.NotFound + " ThesisId");
      }
      const thesis = await Models.Thesis.findByIdAndUpdate(
        thesisId,
        {
          thesisStatus: Status.edit,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, thesis);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
}
