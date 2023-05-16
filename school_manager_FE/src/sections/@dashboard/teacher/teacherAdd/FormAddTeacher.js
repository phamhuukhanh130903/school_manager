import * as React from 'react';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
// @mui
import {
    Stack,
    TextField,
    FormControlLabel,
    FormControl,
    RadioGroup,
    FormLabel,
    Radio,
    Button,
    Fab,
    MenuItem,
    InputLabel,
    Select
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { addTeacher, getSubject } from '../../../../services/teacherService';
// components

import { addOneTeacher } from '../../../../features/teachers/teacherSlice';
import { PreviewImage } from '../../../../components/previewImage/PriviewImage';
// ----------------------------------------------------------------------

const phoneRegExp = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
export default function FormAddStudent() {
    const dispatch = useDispatch();
    const [subjects, setSubjects] = useState([])
    useEffect(() => {
        getSubject().then(res => {
            setSubjects(res.data)
        })
    }, [])

    const onFileChange = (files) => {
        formik.values.image = files
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            gender: "",
            image: "",
            subjectId: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("must be fill")
                .min(2, "too short")
                .max(30, "too long"),
            phone: Yup.string()
                .required("must be fill")
                .matches(phoneRegExp, 'Phone number is not valid')
                .min(10, "too short")
                .max(10, "too long"),
            gender: Yup.string()
                .required("must be fill"),
        }),

        onSubmit: (values, { resetForm }) => {
            addTeacher(values).then((res) => {
                dispatch(addOneTeacher(res.data))
                toast.success("add teacher successfully")
            });
            resetForm();
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Stack spacing={3}>
                    <TextField
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="name"
                        focused />
                    {formik.errors.name && formik.touched.name &&
                        (<p style={{ color: 'red' }}>{formik.errors.name}</p>)}
                    <TextField
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="phone"
                        focused />
                    {formik.errors.phone && formik.touched.phone &&
                        (<p style={{ color: 'red' }}>{formik.errors.phone}</p>)}

                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>

                    <PreviewImage onFileChange={(files) => onFileChange(files)} />

                    <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Subject</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            name="subjectId"
                            value={formik.values.subjectId}
                            onChange={formik.handleChange}
                            label="Subject"
                        >
                            <MenuItem value="">
                                <em>--choose subject--</em>
                            </MenuItem>
                            {subjects.length !== 0 && subjects.map((item) =>
                                <MenuItem key={item.id} value={item.id}>{item.subjectName}</MenuItem>
                            )}

                        </Select>
                    </FormControl>

                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                    <LoadingButton fullWidth size="large" type="submit" variant="contained" >
                        Add Teacher
                    </LoadingButton>
                </Stack>

            </form>

        </>
    );
}
