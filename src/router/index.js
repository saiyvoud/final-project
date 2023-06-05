import express from "express";
import UserController from "../controller/user.controller.js";
const router = express.Router();

router.post("/user/login", UserController.login);
router.post("/user/register", UserController.register);
router.put("/user/forget", UserController.forget);
export default router;
