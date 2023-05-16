import { createSlice } from "@reduxjs/toolkit";

export const markSlice = createSlice({
    name: 'marks',
    initialState: [],
    reducers: {
        getAllMark: (state, action) => {
            state = [];
            const marks = action.payload;
            return [...state, ...marks]
        },
        addOneMark: (state, action) => {
            const mark = action.payload;
            return [...state, mark]
        },

        deleteOneMark: (state, action) =>{
            const id = action.payload;
            state.forEach((item,index)=>{
                if(item.id === id){
                    state.splice(index,1);
                }
            })
        },

        editOneMark: (state, action) =>{
            const mark = action.payload;
            console.log(mark)
            state.forEach((item,index)=>{
                if(item.id === mark.id){
                    item.mark = mark.mark;
                    item.semester = mark.semester;
                }
            })
        }
        
    }
})

export const { getAllMark, addOneMark, deleteOneMark, editOneMark } = markSlice.actions;
export default markSlice.reducer