import { subjectRepo} from "../models/repository/repository";

export class SubjectService {
    static async queryAllSubject() {
        return await subjectRepo.find();
    }
    static async findSubjectById(req, res) {
        let id = req.params.id;
        let studentone = await subjectRepo.findOneBy({id: id});
        return studentone;
    }
    static async findSubjectByName(req, res){
        let subjectName = req.body.subjectName;
        let subjectOne = await subjectRepo.findOneBy({subjectName: subjectName});
        return subjectOne;
    }

    static async addOnesubject (req, res){
        let subjectName = req.body.subjectName;
        await subjectRepo.insert({subjectName: subjectName});
    }

    static async deleteOneSubject (req, res) {
        const id = req.params.id;
        await subjectRepo.delete({id: id});
    }

    static async editsubject (req, res) {
        const id = req.params.id;
        let subjectName = req.body;
        await subjectRepo.update(id, subjectName);
    }

}