import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../features/students/studentSlice";
import markReducer from "../features/marks/markSlice";
import teacherReducer from "../features/teachers/teacherSlice"

export const store = configureStore({
    reducer: {
        students: studentReducer,
        marks: markReducer,
        teachers: teacherReducer
    }
})