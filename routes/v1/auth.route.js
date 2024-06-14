import express from "express";
import {
  getUserDetails,
  loginUser,
  registerInfo,
  userLogout,
} from "../../controllers/user.controller.js";
import { verifyToken } from "../../middlewares/auth.midlleware.js";

const router = express.Router();

//Register Router
router.post("/register-user", registerInfo);

//Login Register
router.post("/login-user", loginUser);

//Get User
router.get("/get-user", verifyToken, getUserDetails);

//Logout User
router.post("/logout-user",verifyToken,userLogout);

export default router;
