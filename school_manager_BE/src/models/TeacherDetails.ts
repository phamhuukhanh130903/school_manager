import { Entity, Column, ManyToOne,PrimaryGeneratedColumn, JoinColumn} from "typeorm"
import { Teachers } from "./Teachers";
import { Class } from "./Class";
@Entity()
export class TeacherDetails {
    @PrimaryGeneratedColumn()
    readonly id: number;
    
    @Column({type:'boolean', default: 0})
    formTeacher: boolean;
    
    @ManyToOne(() => Teachers, (teacher) => teacher.teacherDetails)
    teacher: Teachers;

    @ManyToOne(() => Class, (studyClass) => studyClass.teacherDetails)
    studyClass: Class;
}