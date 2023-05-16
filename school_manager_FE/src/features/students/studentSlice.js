import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
    name: 'students',
    initialState: [],
    reducers: {
        getAllStudent: (state, action) => {
            state = [];
            const student = action.payload;
            return [...state, ...student]
        },
        addOneStudent: (state, action) => {
            const student = action.payload;
            return [...state, student]
        },
        deleteOneStudent: (state, action) =>{
            const id = action.payload;
            state.forEach((item,index)=>{
                if(item.id === id){
                    state.splice(index,1);
                }
            })
        },
        editOneStudent: (state, action) =>{
            const student = action.payload;
            console.log(student)
            state.forEach((item,index)=>{
                if(item.id === student.id){
                    item.studentName = student.studentName;
                    item.dateOfBirth = student.dateOfBirth;
                    item.gender = student.gender;
                    item.address = student.address;
                    item.image = student.image;
                    item.studyClass = student.studyClass;
                }
            })
        }
    }
})

export const { getAllStudent, addOneStudent, deleteOneStudent, editOneStudent } = studentSlice.actions;
export default studentSlice.reducer