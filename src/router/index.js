import express from "express";
import UserController from "../controller/user.controller.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();
// ---------- auth ----------
router.post("/user/login", UserController.login);
router.post("/user/register", UserController.register);
router.put("/user/forget", UserController.forget);
router.get("/user/getProfile/:userId",auth,UserController.getProfile);
router.get("/user/getAll",auth,UserController.getAll);
router.put("/user/changePassword/:userId",auth,UserController.changePassword);
router.put("/user/updateProfile/:userId",auth,UserController.updateProfile);
router.put("/user/updateProfileImageToCloud/:userId",auth,UserController.updateProfileImageCloud);
router.put("/user/updateProfileImageToServer/:userId",auth,UserController.updateProfileImageServer);

export default router;
