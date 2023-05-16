import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";
import { TeacherDetails } from "./TeacherDetails";
import { Students } from "./Students";

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: "varchar", length: 30 })
  className: string;

  @OneToMany(() => TeacherDetails, (teacherDetail) => teacherDetail.studyClass)
  teacherDetails: TeacherDetails[];

  @OneToMany(() => Students, (student) => student.studyClass)
  students: Students[];
}


