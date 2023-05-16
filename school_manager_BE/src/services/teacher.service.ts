import axios from "axios";
import { Like } from "typeorm";
import { teacherRepo, subjectRepo, teacherDetailRepo } from "../models/repository/repository";
import { v4 as uuidv4 } from 'uuid';
const firebase = require('../configs/firebase');

export class TeacherService {
    static async queryAllTeacher(req, res) {
        const teachers = await teacherRepo.createQueryBuilder("teacher")
            .innerJoinAndSelect("teacher.subject", "subject")
            .getMany();
        return teachers;

    }

    static async findTeacherById(req, res) {
        let id = req.params.id;
        let teacher = await teacherRepo.findOneBy({ id: id });
        return teacher;
    }

    // static async findTeacherByPhone(req, res) {
    //     let phone = req.body.phone;
    //     let teacher = await teacherRepo.findOneBy({ phone: phone });
    //     return teacher;
    // }


    static async addOneTeacher(req, res) {
        if (!req.file) {
            return res.status(400).send("Error: No files found");
        }

        let imageNameFireBase = req.file.originalname + Date.now();

        const blob = firebase.bucket.file("teachers-upload/" + imageNameFireBase);

        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        })

        blobWriter.on('error', (err) => {
            console.log(err)
        })

        blobWriter.on('finish', async () => {
            let apiImg = await axios.get(`https://firebasestorage.googleapis.com/v0/b/student-manager-md5.appspot.com/o/teachers-upload%2F${imageNameFireBase}`)
            let imageToken = apiImg.data.downloadTokens;
            let imageName = `https://firebasestorage.googleapis.com/v0/b/student-manager-md5.appspot.com/o/teachers-upload%2F${imageNameFireBase}?alt=media&token=${imageToken}`;
            let idTeacher = uuidv4().substring(0, 8);
            let teacherCreate = { ...req.body, image: imageName, id: idTeacher };
            let subject = await subjectRepo.findOneBy({ id: req.body.subject });
            let newTeacher = { ...teacherCreate, subject: subject };
            let teacher = await teacherRepo.create(teacherCreate);
            await teacherRepo.save(teacher);
            res.status(200).json(newTeacher)
        })

        blobWriter.end(req.file.buffer);

    }

    static async deleteOneTeacher(req, res) {
        const id = req.params.id;
        let teacher = await teacherRepo.findOneBy({ id: id });
        let image = teacher.image;

        const baseUrl = "https://firebasestorage.googleapis.com/v0/b/student-manager-md5.appspot.com/o/";

        let imagePath: string = image.replace(baseUrl, "");

        const indexOfEndPath = imagePath.indexOf("?");

        imagePath = imagePath.substring(0, indexOfEndPath);

        imagePath = imagePath.replace("%2F", "/");

        await firebase.bucket.file(imagePath).delete();

        await teacherRepo.delete({ id: id });
    }

    static async editTeacher(req, res) {
        

        const id = req.params.id;

        //delete image in firebase
        let teacher = await teacherRepo.findOneBy({ id: id });
        let image = teacher.image;

        const baseUrl = "https://firebasestorage.googleapis.com/v0/b/student-manager-md5.appspot.com/o/";

        let imagePath: string = image.replace(baseUrl, "");

        const indexOfEndPath = imagePath.indexOf("?");

        imagePath = imagePath.substring(0, indexOfEndPath);

        imagePath = imagePath.replace("%2F", "/");

        await firebase.bucket.file(imagePath).delete().then(()=>{console.log(" delete image success")});

        //update teacher
        if (!req.file) {
            return res.status(400).send("Error: No files found")
        }

        let imageNameFireBase = req.file.originalname + Date.now();

        const blob = firebase.bucket.file("teachers-upload/" + imageNameFireBase);

        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        })

        blobWriter.on('error', (err) => {
            console.log(err)
        })

        blobWriter.end(req.file.buffer);

        blobWriter.on('finish', async () => {

            let apiImg = await axios.get(`https://firebasestorage.googleapis.com/v0/b/student-manager-md5.appspot.com/o/teachers-upload%2F${imageNameFireBase}`)
            let imageToken = apiImg.data.downloadTokens;
            let imageName = `https://firebasestorage.googleapis.com/v0/b/student-manager-md5.appspot.com/o/teachers-upload%2F${imageNameFireBase}?alt=media&token=${imageToken}`;

            let teacherCreate = { ...req.body, image: imageName };
            let subject = await subjectRepo.findOneBy({ id: req.body.subject });
            let newTeacher = { ...teacherCreate, subject: subject, id: teacher.id };
            await teacherRepo.update(id, teacherCreate);
            res.status(200).json(newTeacher);
        })
    }

    static async searchTeacher(req, res) {
        const values = req.query.name;
        const teachers = await teacherRepo.findBy({
            name: Like(`%${values}%`)
        })
        return teachers;
    }

    static async getTeacherDetail(req, res) {
        const idTeacher = req.params.id;
        const teacherDetails = await teacherDetailRepo.createQueryBuilder("teacherDetail")
            .innerJoin("teacherDetail.teacher", "teacher")
            .innerJoin("teacherDetail.studyClass", "studyClass")
            .select('studyClass')
            .where("teacher.id = :id", { id: idTeacher })
            .getRawMany();
        return teacherDetails;
    }

    // static async getTeacher(req, res) {
    //     const id = req.params.id;
    //     const teacher = await teacherRepo.createQueryBuilder("teacher")
    //         .innerJoinAndSelect("student.studyClass", "studyClass")
    //         .where("student.id = :id", {id: id})
    //         .getOne();
    //     return student;


}