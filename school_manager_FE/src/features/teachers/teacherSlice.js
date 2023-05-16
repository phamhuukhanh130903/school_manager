import { createSlice } from "@reduxjs/toolkit";

export const teacherSlice = createSlice({
    name: 'teachers',
    initialState: [],
    reducers: {
        getAllTeacher: (state, action) => {
            state = [];
            const teacher = action.payload;
            return [...state, ...teacher]
        },
        addOneTeacher: (state, action) => {
            const teacher = action.payload;
            return [...state, teacher]
        },
        deleteOneTeacher: (state, action) =>{
            const id = action.payload;
            state.forEach((item,index)=>{
                if(item.id === id){
                    state.splice(index,1);
                }
            })
        },
        editOneTeacher: (state, action) =>{
            const teacher = action.payload;
            console.log(teacher)
            state.forEach((item,index)=>{
                if(item.id === teacher.id){
                    item.name = teacher.studentName;
                    item.phone = teacher.phone;
                    item.gender = teacher.gender;
                    item.image = teacher.image;
                    item.subject = teacher.subject;
                }
            })
        }
    }
})

export const { getAllTeacher, addOneTeacher, deleteOneTeacher, editOneTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;
