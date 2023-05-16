import {TeacherService} from "../services/teacher.service";

export class TeacherController {

    static async getAllTeacher(req, res) {
        try {
            const teachers = await TeacherService.queryAllTeacher(req, res);
            if (teachers) {
                res.status(200).json(teachers)
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    static async getTeacher(req, res) {
        try {
            const teachers = await TeacherService.findTeacherById(req, res);
            if (teachers) {
                res.status(200).json({message: "Sucess", teachers: teachers});
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    static async addTeachers(req, res) {
        try {
             await TeacherService.addOneTeacher(req, res);
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    static async deleteTeacher(req, res) {
        try {
            let teacherDelete = await TeacherService.findTeacherById(req, res);

            if (!teacherDelete) {
                res.status(404).json({message: "the teacher doesn't exist"})
            } else {
                await TeacherService.deleteOneTeacher(req, res);
                res.status(204).json();
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    static async updateteacher(req, res) {
        try {
            let teacherEdit = await TeacherService.findTeacherById(req, res);

            if (!teacherEdit) {
                res.status(404).json({ message: "the teacher doesn't exist" })
            } else {
                await TeacherService.editTeacher(req, res);
            }
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    static async searchTeacher(req, res){
        try {
            let teachers = await TeacherService.searchTeacher(req, res)
            if (!teachers) {
                res.status(404).json({ message: "the teacher doesn't exist" })
            } else {
                res.status(200).json({ teachers: teachers});
            }
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    static async getDetailTeacher(req, res) {
        try {
            let teacherDetail = await TeacherService.getTeacherDetail(req, res);
            if (teacherDetail.length == 0) {
                res.status(404).json({ message: "the teacher doesn't exist" });
            } else {
                res.status(200).json(teacherDetail);
            }
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

}