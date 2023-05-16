import {Router} from "express";
import {TeacherController} from "../controllers/teacher.controller";
import multer from "multer";
export const teacherRoutes = Router();
const upload = multer({
    storage: multer.memoryStorage()
});

teacherRoutes.get("/", TeacherController.getAllTeacher);
teacherRoutes.get("/:id", TeacherController.getTeacher);
teacherRoutes.get("/detail/:id", TeacherController.getDetailTeacher);
teacherRoutes.post("/", upload.single("image"), TeacherController.addTeachers);
teacherRoutes.delete("/:id", TeacherController.deleteTeacher);
teacherRoutes.put("/:id", TeacherController.updateteacher);
teacherRoutes.get('/searchs/*', TeacherController.searchTeacher);
// teacherRoutes.get("/formteacher",)


