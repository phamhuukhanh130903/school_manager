import { Router } from "express";
import { StudentController } from "../controllers/student.controller";
import { MarkController } from "../controllers/mark.controller";
import multer from "multer";
export const studentRoutes = Router();
const upload = multer({
    storage: multer.memoryStorage()
});

studentRoutes.get("/", StudentController.getAllStudents);
studentRoutes.get("/:id", StudentController.getStudent);
studentRoutes.post("/", upload.single("image"), StudentController.addStudent);
studentRoutes.delete("/:id", StudentController.deleteStudent);
studentRoutes.put("/:id",upload.single("image"), StudentController.updateStudent);
studentRoutes.get("/search/*",StudentController.searchStudent);

