import {Router} from "express";
import {MarkController} from "../controllers/mark.controller";
export const markRoutes = Router();

markRoutes.get("/:idStudent", MarkController.getMark);
markRoutes.post("/:idStudent", MarkController.addMark);
markRoutes.delete("/:idMark", MarkController.deleteMark);
markRoutes.put("/:idMark", MarkController.updateMark)