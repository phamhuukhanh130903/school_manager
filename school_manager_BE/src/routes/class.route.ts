import { Router } from "express";
import { ClassController } from "../controllers/class.controller";
export const classRoutes = Router();

classRoutes.get("/", ClassController.getAllClass);
classRoutes.get("/:id", ClassController.getClass);
classRoutes.post("/", ClassController.addClass);
classRoutes.delete("/:id", ClassController.deleteClass);
classRoutes.put("/:id", ClassController.updateClass);


