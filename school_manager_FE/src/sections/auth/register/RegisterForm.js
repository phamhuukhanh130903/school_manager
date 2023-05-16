
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { register } from '../../../services/userService';
// ----------------------------------------------------------------------

const phoneRegExp = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
export default function RegisterForm() {

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            userName: "",
            phone: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .required("must be fill")
                .min(2, "too short")
                .max(30, "too long"),
            phone: Yup.string()
                .required("must be fill")
                .matches(phoneRegExp, 'Phone number is not valid')
                .min(10, "too short")
                .max(10, "too long"),
            password: Yup.string()
                .required("must be fill"),
            confirmPassword: Yup.string().oneOf(
                [Yup.ref('password')],
                "password don't match")
        }),

        onSubmit: (values, { resetForm }) => {
            register(values).then((res) => {
                if(res.data){
                    navigate('/login');
                    toast.success("register success!!!");
                }
                
            })
                .catch(err => {
                    console.log(err);
                })
            resetForm();
        },
    });


    const [showPassword, setShowPassword] = useState(false);
    const [showConFirmPassword, setShowConFirmPassword] = useState(false);
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        name="userName"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="name" />
                    {formik.errors.userName && formik.touched.userName &&
                        (<p style={{ color: 'red' }}>{formik.errors.userName}</p>)}
                    <TextField
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="phone" />
                    {formik.errors.phone && formik.touched.phone &&
                        (<p style={{ color: 'red' }}>{formik.errors.phone}</p>)}
                    <TextField
                        name="password"
                        label="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {formik.errors.password && formik.touched.password &&
                        (<p style={{ color: 'red' }}>{formik.errors.password}</p>)}
                    <TextField
                        name="confirmPassword"
                        label="ConfirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type={showConFirmPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowConFirmPassword(!showConFirmPassword)} edge="end">
                                        <Iconify icon={showConFirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                        (<p style={{ color: 'red' }}>{formik.errors.confirmPassword}</p>)}
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                    <LoadingButton fullWidth size="large" type="submit" variant="contained" >
                        Register
                    </LoadingButton>
                </Stack>

            </form>

        </>
    );
}
