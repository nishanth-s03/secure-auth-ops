import express from "express";
import authRouter from "./v1/auth.route.js";
import mailRouter from "./v1/email.route.js";

const router = express.Router();

router.use("/v1/user", authRouter);
router.use("/v1/mail",mailRouter);

export default router;
