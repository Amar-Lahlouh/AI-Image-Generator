import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ImageRoute } from "./routes/ImageRoute.js";
import { UserRoute } from "./routes/UserRoute.js";
import { ConnectDB } from "./db/db.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/image", ImageRoute);
app.use("/api/user", UserRoute);
ConnectDB();
app.listen(process.env.PORT, () => console.log("Server Running"));
