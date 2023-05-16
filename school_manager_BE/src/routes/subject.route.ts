import {Router} from "express";
import {subjectController} from "../controllers/subject.controller";
export  const subjectRoutes = Router();

subjectRoutes.get('/',subjectController.getAllSubject);
subjectRoutes.get('/:id',subjectController.getSubject);
subjectRoutes.post('/',subjectController.addSubject);
subjectRoutes.delete('/:id',subjectController.deleteSubject);
subjectRoutes.put('/:id',subjectController.updateSubject);