import express from "express";
import {
  getUserDetails,
  loginUser,
  registerInfo,
} from "../../controllers/user.controller.js";
import { verifyToken } from "../../middlewares/auth.midlleware.js";

const router = express.Router();

//Register Router
router.post("/register-user", registerInfo);

//Login Register
router.post("/login-user", loginUser);

//Get User
router.get("/get-user", verifyToken, getUserDetails);

export default router;
