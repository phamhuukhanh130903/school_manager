import { markRepo, subjectRepo } from "../models/repository/repository";

export class MarkService {
    static async queryMark (req, res){
        const id = req.params.idStudent;        
        const mark = await markRepo.createQueryBuilder("mark")                                                                
                                    .innerJoinAndSelect("mark.subject","subject")                                                                    
                                    .where("mark.student = :id",{id: id})
                                    .getMany();
        return mark;
        
    }

    static async addOneMark(req, res){
        const idStudent = req.params.idStudent;
        const markCreate= {...req.body, student: idStudent};
        let subject = await subjectRepo.findOneBy({ id: req.body.subject });
        
        const mark = await markRepo.create(markCreate);
        const markSave = await markRepo.save(mark);
        const markNew = {...markSave, subject: subject}
        console.log(markNew);
        
        res.status(201).json(markNew);
    }

    static async deleteOneMark(req, res){
        let idMark = req.params.idMark;
        await markRepo.delete({id:idMark});
    }

    static async editMark(req, res){
        const id = +req.params.idMark;
        let mark = req.body;
        let newMark = {...mark, id: id}
        await markRepo.update(id, mark);
        res.status(200).json(newMark)
        
    }
    
    
}