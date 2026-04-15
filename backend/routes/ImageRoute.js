import express from "express";
import { GenerateImage } from "../controllers/Imagecontroller.js";

export const ImageRoute = express.Router();
ImageRoute.post("/generateimage", GenerateImage);
