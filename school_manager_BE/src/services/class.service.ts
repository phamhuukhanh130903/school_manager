import { classRepo } from "../models/repository/repository";

export class ClassService {
    static async queryAllClass() {
        return await classRepo.find();
    }

    static async findClassById(req, res) {
        let id = req.params.id;
        // let classOne = await classRepo
        //                     .createQueryBuilder("class")
        //                     .where("class.id = :id", { id: id })
        //                     .getOne();
        let classOne = await classRepo.findOneBy({id: id});
        return classOne;
    }

    static async findClassByName(req, res){
        let className = req.body.className;
        let classOne = await classRepo.findOneBy({className: className});
        return classOne;                    
    }

    static async addOneClass (req, res){
        let className = req.body.className;
        await classRepo.insert({className: className});
    }

    static async deleteOneClass (req, res) {
        const id = req.params.id;
        await classRepo.delete({id: id});
    }

    static async editClass (req, res) {
        const id = req.params.id;
        let className = req.body;
        await classRepo.update(id, className);
    }


}