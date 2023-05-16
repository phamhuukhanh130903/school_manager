import {
    Column,
    Entity,
    PrimaryColumn,
    OneToMany,
    JoinColumn,
    ManyToOne

} from "typeorm";
import { TeacherDetails } from "./TeacherDetails";
import { Subjects } from "./Subjects";
export type GenderType = "male" | "female" ;
@Entity()
export class Teachers {
    @PrimaryColumn()
    readonly id: string;

    @Column({type:'varchar'})
    name: string;

    @Column({type:'enum' , enum:[ 'male', 'female' ]})
    gender: GenderType;

    @Column()
    phone:string;

    @Column({type: "varchar"})
    image: string;

    @OneToMany(() => TeacherDetails, (teacherDetail) => teacherDetail.teacher)
    teacherDetails: TeacherDetails[];

    @ManyToOne (() => Subjects, subject => subject.teachers)
    subject: Subjects;
}
