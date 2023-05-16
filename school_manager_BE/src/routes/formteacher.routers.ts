import {Router} from "express";
import {FormTeacherController} from "../controllers/formTeacher.controller";
export const formTeacherRoutes = Router();

formTeacherRoutes.get('/', FormTeacherController.getAllFormTeacher);
formTeacherRoutes.put('/*',FormTeacherController.updateFormTeacher);