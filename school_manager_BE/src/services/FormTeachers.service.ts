import {teacherDetailRepo, teacherRepo} from "../models/repository/repository";
import {TeacherDetails} from "../models/TeacherDetails";


export class FormTeachersService {
    static async getFormTeachers(req, res) {
        const formTeachers = await teacherRepo.createQueryBuilder('teachers')
            .select(['teachers.id', 'teachers.name'])
            .innerJoinAndSelect('teachers.teacherDetails', 'teacherdetails')

            .innerJoin('teacherdetails.studyClass', 'studyClass')
            .addSelect(['studyClass.className'])
            .where('teacherdetails.formTeacher = :formTeacher', {formTeacher: 1})
            .getMany();
        console.log(formTeachers)
        return formTeachers;
    }

    static async updateFormTeacher(req, res) {
        let idClass = req.query.idClass;
        let idTeacher = req.query.idTeacher;
        const formTeachers = await teacherRepo.createQueryBuilder('teachers')
            .innerJoinAndSelect('teachers.teacherDetails', 'teacherdetails')
            .innerJoinAndSelect('teacherdetails.studyClass', 'studyClass')
            .where('teachers.id=:id', {id:idTeacher})
            .andWhere('studyClass.id = :id', {id: idClass})
            .getOne();
        console.log(formTeachers)
        const idFormTeacher = formTeachers.teacherDetails[0].id;
        console.log(req.body)
        await teacherDetailRepo.update(idFormTeacher,req.body)

    }


}