import * as React from 'react';
import PropTypes from 'prop-types';
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
    Avatar,
    Fab,
    MenuItem,
    InputLabel,
    Select
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { editTeacherApi, getSubject } from '../../../../services/teacherService';
// components
import { PreviewImage } from '../../../../components/previewImage/PriviewImage';
import { editOneTeacher } from '../../../../features/teachers/teacherSlice';
// ----------------------------------------------------------------------

FormEditTeacher.propTypes = {
    teacher: PropTypes.object,
};
const phoneRegExp = /(0[3|5|7|8|9])+([0-9]{8})\b/g;

export default function FormEditTeacher({ teacher }) {
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
            id: teacher.id,
            name: teacher.name,
            phone: teacher.phone,
            gender: teacher.gender,
            image: "",
            subjectId: teacher.subject.id,
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

        onSubmit: (values) => {
            editTeacherApi(values).then((res) => {
                dispatch(editOneTeacher(res.data))
                toast.success("edit teacher successfully")
            });

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
                        Update Teacher
                    </LoadingButton>
                </Stack>

            </form>

        </>
    );
}
