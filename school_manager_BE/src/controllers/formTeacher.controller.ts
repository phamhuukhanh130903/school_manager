import {FormTeachersService} from "../services/FormTeachers.service";



import {TeacherService} from "../services/teacher.service";

export class FormTeacherController {
   static async getAllFormTeacher (req,res) {
       try {
           const formTeachers = await FormTeachersService.getFormTeachers(req,res);
           res.status(200).json(formTeachers);
       } catch (e) {
           console.log(e.message);
       }
   }
   static async updateFormTeacher (req, res) {
       try {
           let teacher = await TeacherService.findTeacherById(req,res);
           if (teacher) {
               await FormTeachersService.updateFormTeacher(req,res);
               res.status(200).json({message:'success'});
           }
       }
       catch (e) {
           console.log(e.message)
       }
   }
}