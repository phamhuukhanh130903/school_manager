import { toast } from 'react-toastify';
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/';

export const getMarkApi = async (id) =>{
    try {
        const url = `/marks/${id}`
        return await axios.get(url)
    } 
    catch(e) {
        return (toast.error(e.response.data.message))
    };
}

export const getSubjectsApi = async () =>{
    return axios.get("/subjects")
}

export const addMarkApi = async (values) =>{
    try {
        return await axios({
             method: 'post',
             url: `/marks/${values.studentId}`,
             data: {
                 mark: values.mark,
                 semester: values.semester,
                 subject: values.subjectId
             }
         })
     }
     catch (e) {
         return (toast.error(e.response.data.message))
     };
}

export const deleteMarkApi = async (id) =>{
    try {
        const url = `/marks/${id}`
        return await axios.delete(url)
    } 
    catch(e) {
        return (toast.error(e.response.data.message))
    };
    
}

export const editMarkApi = async (values) =>{
    try {  
        console.log(values)
        return await axios({
            method: 'put',
            url: `/marks/${values.markId}`,
            data: {
                mark: values.mark,
                semester: values.semester
            }
        })
    } 
    catch(e) {
        return (toast.error(e.response.data.message))
    };
}