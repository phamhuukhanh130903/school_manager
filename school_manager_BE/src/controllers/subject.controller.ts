
import {SubjectService} from "../services/subject.service";


export class subjectController {
    static async getAllSubject(req, res) {
        try {
            const subject = await SubjectService.queryAllSubject();

            if (subject) {

                res.status(200).json( subject )

            }

        } catch (err) {

            res.status(500).json({ message: err.message })

        }
    }

    static async getSubject(req, res) {
        try {
            const subjectName = await SubjectService.findSubjectById(req, res);
            if (subjectName) {
                res.status(200).json({ message: "Sucess", subjectName: subjectName})

            } else {
                res.status(404).json({message: "class don't exist "})
            }

        } catch (err) {

            res.status(500).json({ message: err.message })

        }
    }

    static async addSubject(req, res) {
        try {
            let subjectNew = await SubjectService.findSubjectByName(req, res);

            if (subjectNew){
                res.status(500).json({ message: "class did exist" })
            } else {
                await SubjectService.addOnesubject(req,res);
                res.status(201).json({message :"add class complete"});
            }
        } catch (err) {

            res.status(500).json({ message: err.message })

        }
    }

    static async deleteSubject(req, res) {
        try {
            let classDelete = await SubjectService.findSubjectById(req, res);

            if (!classDelete){
                res.status(404).json({ message: "class don't exist" })
            } else {
                await SubjectService.deleteOneSubject(req, res);
                res.status(204).json();
            }
        } catch (err) {

            res.status(500).json({ message: err.message })

        }
    }

    static async updateSubject(req, res) {
        try {
            let subjectEdit = await SubjectService.findSubjectById(req, res);

            if (!subjectEdit){
                res.status(404).json({ message: "class don't exist" })
            } else {
                let className = await SubjectService.findSubjectByName(req, res);
                if(className){
                    return res.status(409).json({ message: "class did exist" })
                }
                await SubjectService.editsubject(req,res);
                res.status(200).json({message: "update class complete"});
            }
        } catch (err) {

            res.status(500).json({ message: err.message })

        }
    }

}