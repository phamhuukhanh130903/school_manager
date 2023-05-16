import { AuthController } from "../controllers/auth.controller";
import { Router } from 'express';
import multer from "multer";
export const authRoutes = Router();

const upload = multer();

authRoutes.post("/login", upload.none(), AuthController.login);
authRoutes.post("/register",upload.none(), AuthController.register);
authRoutes.get("/users", AuthController.getUser)