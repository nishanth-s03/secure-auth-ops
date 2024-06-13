import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { xss } from "express-xss-sanitizer";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import indexRoute from "./routes/index.js";

const app = express();
dotenv.config();

//Middleware to provide Secure CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//Header Security MiddleWare
app.use(helmet());

//Security Middleware for XSS protection
app.use(xss());

//Middleware
app.use(bodyParser.json());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  })
);

//Cookie Handling Middleware
app.use(cookieParser());

// Sanitize data against NoSQL injection
app.use(mongoSanitize());

//Routes
app.use("/api", indexRoute);

//Error Handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

export default app;
