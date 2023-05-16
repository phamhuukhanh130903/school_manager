import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    JoinColumn,
    PrimaryColumn,
} from "typeorm";
import { Class } from "./Class";
import { Marks } from "./Marks";
export type GenderType = "male" | "female";

@Entity()
export class Students {
    @PrimaryColumn()
    readonly id: string;

    @Column({ type: "varchar", length: 50 })
    studentName: string;

    @Column({ type: "date" })
    dateOfBirth: Date;

    @Column({ type: "varchar", length: 50 })
    address: string;

    @Column({ type: "enum", enum: ['male', 'female'] })
    gender: GenderType;

    @Column({type: "varchar"})
    image: string;

    @ManyToOne(() => Class, studyClass => studyClass.students)
    studyClass: Class;

    @OneToMany(() => Marks, (mark) => mark.student)
    marks: Marks[];

}