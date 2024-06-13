import express from "express";
import authRouter from "./v1/auth.route.js";

const router = express.Router();

router.use("/v1/user", authRouter);

export default router;
