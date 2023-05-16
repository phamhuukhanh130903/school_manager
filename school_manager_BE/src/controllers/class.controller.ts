import {ClassService} from "../services/class.service";

export class ClassController {
    static async getAllClass(req, res) {
        try {
            const classes = await ClassService.queryAllClass();

            if (classes) {

                res.status(200).json(classes)

            }

        } catch (err) {

            res.status(500).json({message: err.message})

        }
    }

    static async getClass(req, res) {
        try {
            const className = await ClassService.findClassById(req, res);
            if (className) {
                res.status(200).json({message: "Sucess", className: className})

            } else {
                res.status(404).json({message: "class don't exist "})
            }

        } catch (err) {

            res.status(500).json({message: err.message})

        }
    }

    static async addClass(req, res) {
        try {
            let classNew = await ClassService.findClassByName(req, res);

            if (classNew) {
                res.status(500).json({message: "class did exist"})
            } else {
                await ClassService.addOneClass(req, res);
                res.status(201).json({message: "add class complete"});
            }
        } catch (err) {

            res.status(500).json({message: err.message})

        }
    }

    static async deleteClass(req, res) {
        try {
            let classDelete = await ClassService.findClassById(req, res);

            if (!classDelete) {
                res.status(404).json({message: "class don't exist"})
            } else {
                await ClassService.deleteOneClass(req, res);
                res.status(204).json();
            }
        } catch (err) {

            res.status(500).json({message: err.message})

        }
    }

    static async updateClass(req, res) {
        try {
            let classEdit = await ClassService.findClassById(req, res);

            if (!classEdit) {
                res.status(404).json({message: "class don't exist"})
            } else {
                let className = await ClassService.findClassByName(req, res);
                if (className) {
                    return res.status(409).json({message: "class did exist"})
                }
                await ClassService.editClass(req, res);
                res.status(200).json({message: "update class complete"});
            }
        } catch (err) {

            res.status(500).json({message: err.message})

        }
    }
}