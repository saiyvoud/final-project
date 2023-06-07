import express from "express";
import AdminController from "../controller/admin.controller.js";
import CommitteeController from "../controller/committee.controller.js";
import StudentController from "../controller/student.controller.js";
import UserController from "../controller/user.controller.js";
import { auth, auth_admin } from "../middleware/auth.js";
const router = express.Router();
// ---------- auth ----------
router.post("/user/login", UserController.login);
router.post("/user/register", UserController.register);
router.post("/user/refreshToken", auth, UserController.RefreshToken);
router.put("/user/forget", UserController.forget);
router.get("/user/getProfile/:userId",auth,UserController.getProfile);
router.get("/user/getAll",auth,UserController.getAll);
router.put("/user/changePassword/:userId",auth,UserController.changePassword);
router.put("/user/updateProfile/:userId",auth,UserController.updateProfile);
router.put("/user/updateProfileImageToCloud/:userId",auth,UserController.updateProfileImageCloud);
router.put("/user/updateProfileImageToServer/:userId",auth,UserController.updateProfileImageServer);
// ---------- student -------
router.get("/student/getOne/:studentId",auth,StudentController.getOne);
router.get("/student/getAll",auth,StudentController.getAll);
router.post("/student/insert",auth, StudentController.insert);
router.put("/student/update/:studentId",auth,StudentController.updateStudent);
router.put("/student/delete/:studentId",auth,StudentController.deleteStudent);
// --------- committee ------
router.get("/committee/getOne/:committeeId",auth_admin,CommitteeController.getOne);
router.get("/committee/getAll",auth_admin,CommitteeController.getAll);
router.post("/committee/insert",auth_admin, CommitteeController.insert);
router.put("/committee/update/:committeeId",auth_admin,CommitteeController.updateCommittee);
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

export default router;
