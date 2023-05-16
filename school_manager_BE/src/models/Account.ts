import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

export type RoleType = "admin | regular teacher" | "form teacher" ;

@Entity()
export class Accounts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", unique: true})
    phone: string;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column({type:'enum' , enum:[ 'admin','regular teacher', 'form teacher' ], default: 'regular teacher'})
    role: RoleType;

    
}
