import express from "express";
import {
  GetMe,
  Login,
  Logout,
  refreshToken,
  Register,
  UpdateName,
  AddImage,
} from "../controllers/usercontroller.js";
import { VerifyAuth } from "../middleware/VerifyAuth.js";

export const UserRoute = express.Router();

UserRoute.post("/register", Register);
UserRoute.post("/login", Login);
UserRoute.post("/logout", Logout);
UserRoute.get("/getme", VerifyAuth, GetMe);
UserRoute.post("/refresh", refreshToken);
UserRoute.use(VerifyAuth);
UserRoute.post("/updatename", VerifyAuth, UpdateName);
UserRoute.post("/addimage", VerifyAuth, AddImage);
