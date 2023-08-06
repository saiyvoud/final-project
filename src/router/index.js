import express from "express";
import AdminController from "../controller/admin.controller.js";
import ClassController from "../controller/class.controller.js";
import CommitteeController from "../controller/committee.controller.js";
import FollowController from "../controller/follow.controller.js";
import FollowDetailController from "../controller/follow.detail.controller.js";
import MajorController from "../controller/major.controller.js";
import MemberController from "../controller/member.controller.js";
import ResourceCodeController from "../controller/resourceCode.controller.js";
import ScheduleController from "../controller/schedule.controller.js";
import ScoringController from "../controller/scoring.controller.js";
import StudentController from "../controller/student.controller.js";
import ThesisController from "../controller/thesis.controller.js";
import ThesisScheduleController from "../controller/thesis.schedule.controller.js";
import ThesisMemberController from "../controller/thesisMember.controllr.js";
import TimeController from "../controller/time.controller.js";
import UserController from "../controller/user.controller.js";
import { auth, auth_admin } from "../middleware/auth.js";
const router = express.Router();
// ---------- auth ----------
router.post("/user/login", UserController.login);
router.post("/user/register", UserController.register);
router.post("/user/refreshToken", auth, UserController.RefreshToken);
router.put("/user/forget", UserController.forget);
router.get("/user/getProfile/:userId",auth,UserController.getProfile);
router.get("/user/getAll",auth_admin,UserController.getAll);
router.put("/user/changePassword/:userId",auth,UserController.changePassword);
router.put("/user/updateProfile/:userId",auth,UserController.updateProfile);
router.put("/user/updateProfileImageToCloud/:userId",auth,UserController.updateProfileImageCloud);
router.put("/user/updateProfileImageToServer/:userId",auth,UserController.updateProfileImageServer);
// ---------- student -------
router.get("/student/getOne/:studentId",auth,StudentController.getOne);
router.get("/student/getByUser/:userId",auth,StudentController.getByUser);
router.get("/student/getAll",auth,StudentController.getAll);
router.post("/student/insert",auth, StudentController.insert);
router.put("/student/update/:studentId",auth,StudentController.updateStudent);
router.put("/student/delete/:studentId",auth,StudentController.deleteStudent);
// ------------ member -------
router.get("/member/getOne/:memberId",auth,MemberController.getOne);
router.get("/member/getAll",auth,MemberController.getAll);
router.post("/member/insert",auth, MemberController.insert);
router.put("/member/update/:memberId",auth,MemberController.updateMember);
router.put("/member/delete/:memberId",auth,MemberController.deleteMember);
// --------- committee ------
router.get("/committee/getOne/:committeeId",auth,CommitteeController.getOne);
router.get("/committee/getByUser/:userId",auth,CommitteeController.getByUser);
router.get("/committee/getAll",auth_admin,CommitteeController.getAll);
router.post("/committee/insert",auth, CommitteeController.insert);
router.put("/committee/update/:committeeId",auth,CommitteeController.updateCommittee);
router.put("/committee/delete/:committeeId",auth_admin,CommitteeController.deleteCommittee);
// ---------- admin ----------
router.post("/admin/login", AdminController.login);
router.post("/admin/register", AdminController.register);
router.post("/admin/refreshToken", auth_admin, AdminController.RefreshToken);
router.put("/admin/forget", AdminController.forget);
router.get("/admin/getProfile/:adminId",auth_admin,AdminController.getProfile);
router.get("/admin/getAll",auth_admin,AdminController.getAll);
router.put("/admin/changePassword/:adminId",auth_admin,AdminController.changePassword);
router.put("/admin/updateProfile/:adminId",auth_admin,AdminController.updateProfile);
router.put("/admin/updateProfileImageToCloud/:adminId",auth_admin,AdminController.updateProfileImageCloud);
router.put("/admin/updateProfileImageToServer/:adminId",auth_admin,AdminController.updateProfileImageServer);
// ------------ class room -------
router.get("/class/getOne/:classId",auth,ClassController.getOne);
router.get("/class/getAll",auth,ClassController.getAll);
router.post("/class/insert",auth, ClassController.insert);
router.put("/class/update/:classId",auth,ClassController.updateClass);
router.put("/class/delete/:classId",auth,ClassController.deleteClass);
// ------------ schedule -------
router.get("/schedule/getOne/:scheduleId",auth,ScheduleController.getOne);
router.get("/schedule/getByMajor/:majorId",auth,ScheduleController.getByMajor);
router.get("/schedule/getAll",auth_admin,ScheduleController.getAll);
router.post("/schedule/insert",auth_admin, ScheduleController.insert);
router.put("/schedule/update/:scheduleId",auth_admin,ScheduleController.updateSchedule);
router.put("/schedule/delete/:scheduleId",auth_admin,ScheduleController.deleteSchedule);
// -------------- thesis ------
router.get("/thesis/getOne/:thesisId",auth,ThesisController.getOne);
router.get("/thesis/getAll",auth,ThesisController.getAll);
router.post("/thesis/insert",auth, ThesisController.insert);
router.put("/thesis/update/:thesisId",auth,ThesisController.updateThesis);
router.put("/thesis/updateMember/:thesisId",auth,ThesisController.updateMember);
router.put("/thesis/updateStatus/:thesisId",auth,ThesisController.updateStatus);
router.put("/thesis/updateSuccess/:thesisId",auth,ThesisController.updateStatusSuccess);
router.put("/thesis/updateEdit/:thesisId",auth,ThesisController.updateStatusEdit);
router.put("/thesis/updateAll/:thesisId",auth,ThesisController.updateClassAndTime);
router.put("/thesis/delete/:thesisId",auth,ThesisController.deleteThesis);
// -------------- thesisMember ------
router.get("/thesisMember/getOne/:thesisMemberId",auth,ThesisMemberController.getOne);
router.get("/thesisMember/getAll",auth,ThesisMemberController.getAll);
router.post("/thesisMember/insert",auth, ThesisMemberController.insert);
router.put("/thesisMember/update/:thesisMemberId",auth,ThesisMemberController.updateThesisMember);
router.put("/thesisMember/delete/:thesisMemberId",auth,ThesisMemberController.deleteThesisMember);
// -------------- scoring ------
router.get("/scoring/getOne/:scoringId",auth,ScoringController.getOne);
router.get("/scoring/getByThesisID/:thesisId",auth,ScoringController.getByThesisID);
router.get("/scoring/getAll",auth,ScoringController.getAll);
router.post("/scoring/insert",auth, ScoringController.insert);
router.put("/scoring/update/:scoringId",auth,ScoringController.updateScoring);
router.put("/scoring/delete/:scoringId",auth,ScoringController.deleteScoring);
// -------------- resourceCode ------
router.get("/resourceCode/getOne/:resourceCodeId",auth,ResourceCodeController.getOne);
router.get("/resourceCode/getAll",auth,ResourceCodeController.getAll);
router.post("/resourceCode/insert",auth, ResourceCodeController.insert);
router.put("/resourceCode/update/:resourceCodeId",auth,ResourceCodeController.updateResourceCode);
router.put("/resourceCode/delete/:resourceCodeId",auth,ResourceCodeController.deleteResourceCode);
// ------------- time ----------
router.get("/time/getOne/:timeId",auth,TimeController.getOne);
router.get("/time/getAll",auth,TimeController.getAll);
router.post("/time/insert",auth, TimeController.insert);
router.put("/time/update/:timeId",auth,TimeController.updateTime);
router.put("/time/delete/:timeId",auth,TimeController.deleteTime);
// ------------- major ----------
router.get("/major/getOne/:majorId",auth_admin,MajorController.getOne);
router.get("/major/getAll",auth_admin,MajorController.getAll);
router.post("/major/insert",auth_admin, MajorController.insert);
router.put("/major/update/:majorId",auth_admin,MajorController.updateMajor);
router.put("/major/delete/:majorId",auth_admin,MajorController.deleteMajor);
// ------------- follow ----------
router.get("/follow/getOne/:follow_id",auth,FollowController.getOne);
router.get("/follow/getByStudent/:student_id",auth,FollowController.getByStudentId);
router.get("/follow/getByCommittee/:committee_id",auth,FollowController.getByCommitteeId);
router.get("/follow/getAll",auth,FollowController.getAll);
router.post("/follow/insert",auth, FollowController.insert);
router.put("/follow/update/:follow_id",auth,FollowController.updateFollow);
router.put("/follow/delete/:follow_id",auth,FollowController.deleteFollow);
// ------------- follow Detail ----------
router.get("/followDetail/getOne/:followDetailId",auth,FollowDetailController.getOne);
router.get("/followDetail/getAll",auth,FollowDetailController.getAll);
router.get("/followDetail/getByFollowID/:followId",auth,FollowDetailController.getByFollowID);
router.post("/followDetail/insert",auth, FollowDetailController.insert);
router.put("/followDetail/update/:followDetailId",auth,FollowDetailController.updateFollowDetail);
router.put("/followDetail/delete/:followDetailId",auth,FollowDetailController.deleteFollowDetail);
// ------------- thesis schedule --------
router.get("/thesisSchedule/getOne/:thesisScheduleId",auth_admin,ThesisScheduleController.getOne);
router.get("/thesisSchedule/getOne/:majorId",auth,ThesisScheduleController.getByMajor);
router.get("/thesisSchedule/getAll",auth_admin,ThesisScheduleController.getAll);
router.post("/thesisSchedule/insert",auth_admin, ThesisScheduleController.insert);
router.put("/thesisSchedule/update/:thesisScheduleId",auth_admin,ThesisScheduleController.updateThesisSchedule);
router.put("/thesisSchedule/delete/:thesisScheduleId",auth_admin,ThesisScheduleController.deleteThesisSchedule);
export default router;
