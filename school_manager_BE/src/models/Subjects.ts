import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Teachers } from "./Teachers";
import { Marks } from "./Marks";
@Entity()
export class Subjects {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    subjectName: string;

    @OneToMany(() => Teachers, (teacher) => teacher.subject)
    teachers: Teachers[];

    @OneToMany(() => Marks, (mark) => mark.subject)
    marks: Marks[];
}