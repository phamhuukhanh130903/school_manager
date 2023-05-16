import bcrypt from 'bcrypt';
import { accountRepo } from '../models/repository/repository';

export class AuthService {
    static async getUser(req, res) {
        let phone = req.body.phone;
        let user = await accountRepo.findOneBy({ phone: phone });
        return user;
    }

    static async addUser(req, res){
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        
        let user = await accountRepo.create({...req.body, password: passwordHash});
        await accountRepo.save(user);
    }
}