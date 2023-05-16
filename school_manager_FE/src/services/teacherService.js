import { toast } from 'react-toastify';
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/';

export const getTeachers = async ()=>{
    return axios.get("/teachers")
}

export const getTeacher= async (id) =>{
    try {
        const url = `/teachers/${id}`
        return await axios.get(url)
    } 
    catch(e) {
        return (toast.error(e.response.data.message))
    };
    
}

export const getSubject = async ()=>{
    return axios.get("/subjects")
}

export const addTeacher= async (data) =>{
    try {
       return await axios({
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            url: '/teachers',
            data: {
                name: data.name,
                phone: data.phone,
                gender: data.gender,
                image: data.image,
                subject: data.subjectId
            }
        })
    }
    catch (e) {
        return (toast.error(e.response.data.message))
    };
}

export const deleteTeacherApi = async (id) =>{
    try {
        const url = `/teachers/${id}`
        return await axios.delete(url)
    } 
    catch(e) {
        return (toast.error(e.response.data.message))
    };
    
}

export const editTeacherApi = async (values) =>{
    try {
        const url = `/teachers/${values.id}`
        console.log(url)
        return await axios({
            method: 'put',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            url: `/teachers/${values.id}`,
            data: {
                name: values.name,
                phone: values.phone,
                gender: values.gender,
                image: values.image,
                subject: values.subjectId
            }
        })
    } 
    catch(e) {
        return (toast.error(e.response.data.message))
    };
}

export const getClassTeacherDetail = async (id) =>{
    try {
        const url = `/teachers/detail/${id}`
        return await axios.get(url)
    } 
    catch(e) {
        return (toast.error(e.response.data.message))
    };
} 

