import { AuthService } from "../services/auth.service";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
export class AuthController {
    static async login(req, res) {
        try {
            const user = await AuthService.getUser(req, res);     
            if (user) {
                const comparePass = await bcrypt.compare(req.body.password, user.password);                
                if (!comparePass) {
                    return res.status(401).json({message: "password wrongs"})
                }
                let payload = {
                    phone: user.phone,
                    userName: user.userName,
                    role: user.role
                }
                const token = jwt.sign(payload, '123456789', {
                    expiresIn: 30 * 60 * 1000,
                });

                // let options = {
                //     maxAge: 1000 * 60 * 30, 
                //     httpOnly: true, 
                // }
                
                // res.cookie('token', token, options);

                res.status(200).json({token: token});

            } else {
                res.status(401).json({message: "user dosen't exist"})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    static async register(req, res){
        try {
            const user = await AuthService.getUser(req, res);
            if (!user) {
                await AuthService.addUser(req, res);
                res.status(201).json({ message: "add user complete" });
            } else {
                res.status(409).json({message: "phone number did exist"})
            }
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    static async getUser(req, res){
        try {
        
            let tokenUser = req.query.token;
            
            if (tokenUser) {
                jwt.verify(tokenUser, "123456789", (err, decoded) => {
                    if (err) {
                        res.status(401).json({ message: err.message });
                    } else {
                        res.status(200).json(decoded)
                    }
                });
            } else {
                res.status(401).json({ message: "token dosen't exist" });
            }
    
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}
