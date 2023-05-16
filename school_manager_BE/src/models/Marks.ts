import {
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Students } from "./Students";
import { Subjects } from "./Subjects";
export type SemesterType = "semester 1" | "semester 2" ;

@Entity()
export class Marks {
    @PrimaryGeneratedColumn()
    readonly id: number;
    
    @Column({ type: "int"})
    mark: number;

    @Column({ type: "enum", enum: ['semester 1', 'semester 2'] })
    semester: SemesterType;

    @Column({type: "year", default: new Date().getFullYear() })
    year: number;

    @ManyToOne (() => Subjects, subject => subject.marks)
    subject: Subjects;

    @ManyToOne (() => Students, student => student.marks)
    student: Subjects; 

}