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
import { UpdateThesis } from "../service/service.js";
import { ValidateScoring } from "../service/validate.js";
export default class ScoringController {
  static async getByThesisID(req, res) {
    try {
      const thesisId = req.params.thesisId;
      if (!mongoose.Types.ObjectId.isValid(thesisId)) {
        return SendError404(res, EMessage.NotFound + " thesisId");
      }
      const scoring = await Models.Scoring.find({
        isActive: true,
        thesisId: thesisId,
      });
      return SendSuccess(res, SMessage.SelOne, scoring);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getOne(req, res) {
    try {
      const scoringId = req.params.scoringId;
      if (!mongoose.Types.ObjectId.isValid(scoringId)) {
        return SendError404(res, EMessage.NotFound + " scoringId");
      }
      const scoring = await Models.Scoring.findOne({
        isActive: true,
        _id: scoringId,
      });
      return SendSuccess(res, SMessage.SelOne, scoring);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getAll(req, res) {
    try {
      const scoring = await Models.Scoring.find({ isActive: true });
      return SendSuccess(res, SMessage.SelAll, scoring);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateScoring(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { thesisId, title, point } = req.body;
      if (!mongoose.Types.ObjectId.isValid(thesisId)) {
        return SendError404(res, EMessage.NotFound + " thesisId");
      }
      const scoring = await Models.Scoring.create({
        thesisId,
        title,
        point,
      });
      // await Models.Thesis.findByIdAndUpdate(thesisId,{
      //   scoringId: scoring._id,
      // });
      const isMacth = await UpdateThesis(thesisId, scoring._id);
      if (!isMacth) {
        return SendError404(res, "Error Update Thesis");
      }
      return SendCreate(res, SMessage.Create, scoring);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }

  static async updateScoring(req, res) {
    try {
      const scoringId = req.params.scoringId;
      if (!mongoose.Types.ObjectId.isValid(scoringId)) {
        return SendError404(res, EMessage.NotFound + " scoringId");
      }
      const validate = ValidateScoring(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { /*thesisMemberId ,*/ title, point } = req.body;
      const scoring = await Models.Scoring.findByIdAndUpdate(
        scoringId,
        {
          /*thesisMemberId ,*/
          title,
          point,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, scoring);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async deleteScoring(req, res) {
    try {
      const scoringId = req.params.scoringId;
      if (!mongoose.Types.ObjectId.isValid(scoringId)) {
        return SendError404(res, EMessage.NotFound + " scoringId");
      }
      const scoring = await Models.Scoring.findByIdAndUpdate(
        scoringId,
        {
          isActive: false,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Delete, scoring);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
}
