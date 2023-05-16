import { AppDataSource } from "../../configs/dataSource";
import { Class } from "../Class";
import { Marks } from "../Marks";
import { Students } from "../Students";
import { Accounts } from "../Account";
import { Teachers } from "../Teachers";
import {Subjects} from "../Subjects";
import {TeacherDetails} from "../TeacherDetails";

export const classRepo = AppDataSource.getRepository(Class);
export const studentRepo = AppDataSource.getRepository(Students);
export const markRepo = AppDataSource.getRepository(Marks);
export const accountRepo = AppDataSource.getRepository(Accounts);
export const teacherRepo = AppDataSource.getRepository(Teachers);
export const subjectRepo = AppDataSource.getRepository(Subjects);
export const teacherDetailRepo = AppDataSource.getRepository(TeacherDetails);


