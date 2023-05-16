import * as React from 'react';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom"
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
import { addMarkApi, getSubjectsApi } from '../../../../services/markService';
// components

import { addOneMark } from '../../../../features/marks/markSlice';

// ----------------------------------------------------------------------


export default function FormAddMark() {
    const id = useParams().id;
    const dispatch = useDispatch();
    const [subjects, setSubjects] = useState([])
    useEffect(() => {
        getSubjectsApi().then(res => {
            setSubjects(res.data)
        })
    }, [])
    const formik = useFormik({
        initialValues: {
            mark: "",
            semester: "",
            subjectId: "",
            studentId: id
        },
        validationSchema: Yup.object({
            mark: Yup.number()
                .required("must be fill")
                .min(0, "mark from 0 to 10")
                .max(10, "mark from 0 to 10"),
            semester: Yup.date()
                .required("must be fill"),
            subjectId: Yup.number()
                .required("must be fill")

        }),

        onSubmit: (values, { resetForm }) => {
            console.log(values)
            addMarkApi(values).then((res) => {
                if (res.data) {
                    dispatch(addOneMark(res.data));
                    toast.success("add mark successfully")
                }
            });
            resetForm();
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Stack spacing={3}>
                    <TextField
                        name="mark"
                        type="number"
                        value={formik.values.mark}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="mark"
                        focused />
                    {formik.errors.mark && formik.touched.mark &&
                        (<p style={{ color: 'red' }}>{formik.errors.mark}</p>)}
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Semester</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="semester"
                            value={formik.values.semester}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel value="semester 1" control={<Radio />} label="Semester 1" />
                            <FormControlLabel value="semester 2" control={<Radio />} label="Semester 2" />
                        </RadioGroup>
                    </FormControl>

                    {formik.errors.semester && formik.touched.semester &&
                        (<p style={{ color: 'red' }}>{formik.errors.semester}</p>)}
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
                    {formik.errors.subjectId && formik.touched.subjectId &&
                        (<p style={{ color: 'red' }}>{formik.errors.subjectId}</p>)}
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                    <LoadingButton fullWidth size="large" type="submit" variant="contained" >
                        Add Mark
                    </LoadingButton>
                </Stack>

            </form>

        </>
    );
}
