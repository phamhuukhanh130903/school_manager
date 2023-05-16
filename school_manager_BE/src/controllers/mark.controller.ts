import { MarkService } from "../services/mark.service";

export class MarkController {
    static async getMark(req, res) {
        try {
            const mark = await MarkService.queryMark(req, res);
            if (mark.length !== 0) {
                res.status(200).json(mark);

            } else {
                res.status(404).json({ message: "mark don't exist " });
            }

        } catch (err) {

            res.status(500).json({ message: err.message });

        }
    }

    static async addMark(req, res) {
        try {
            const marks = await MarkService.queryMark(req, res);
            for (let mark of marks) {
                if (mark.semester === req.body.semester && mark.subject.id === req.body.subject) {
                    return res.status(409).json({ message: "this mark of subject did exist" });
                }

            }
            await MarkService.addOneMark(req, res);
           

        } catch (err) {
            res.status(500).json({ message: err.message })

        }
    }

    static async deleteMark(req, res) {
        try {
            await MarkService.deleteOneMark(req, res);
            res.status(204).json();
        } catch (err) {
            res.status(500).json({ message: err.message })

        }
    }

    static async updateMark(req, res) {
        try {
            await MarkService.editMark(req, res);
        }catch(err) {

        res.status(500).json({ message: err.message })

    }
}



}