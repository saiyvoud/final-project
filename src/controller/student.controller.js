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
import { ValidateStudent, ValidateUpdateStudent } from "../service/validate.js";

export default class StudentController {
  static async getOne(req, res) {
    try {
      const studentId = req.params.studentId;
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return SendError404(res, EMessage.NotFound);
      }
      const student = await Models.Student.findOne({
        isActive: true,
        _id: studentId,
      });
      return SendSuccess(res, SMessage.SelOne, student);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getByUser(req, res) {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError404(res, EMessage.NotFound);
      }
      const student = await Models.Student.findOne({
        isActive: true,
        user_id: userId,
      });
      return SendSuccess(res, SMessage.SelOne, student);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getAll(req, res) {
    try {
      const students = await Models.Student.find({
        isActive: true,
      });
      return SendSuccess(res, SMessage.SelAll, students);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async insert(req, res) {
    try {
      const { studentID, studentName, studentRoom, user_id } = req.body;
      const validate = ValidateStudent(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return SendError404(res, EMessage.NotFound + "UserID");
      }
      const student = await Models.Student.findOne({
        isActive: true,
        studentID,
      });
      if (student) {
        return SendError400(res, EMessage.Already + "Student");
      }
      const data = await Models.Student.create({
        studentID,
        studentName,
        user_id,
        studentRoom,
      });
      return SendCreate(res, SMessage.Create, data);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateStudent(req, res) {
    try {
      const studentId = req.params.studentId;
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return SendError404(res, EMessage.NotFound);
      }
      const validate = ValidateUpdateStudent(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const { studentID, studentName, studentRoom } = req.body;
     
      const student = await Models.Student.findByIdAndUpdate(
        studentId,
        {
          studentID,
          studentName,
          studentRoom,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, student);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async deleteStudent(req, res) {
    try {
      const studentId = req.params.studentId;
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return SendError404(res, EMessage.NotFound);
      }
      const student = await Models.Student.findByIdAndUpdate(
        studentId,
        {
          isActive: false,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Delete, student);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
}
