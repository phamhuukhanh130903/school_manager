
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import * as Yup from 'yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { login } from '../../../services/userService';
// ----------------------------------------------------------------------

const phoneRegExp = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
export default function LoginForm() {

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      phone: "",
      password: ""
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required("must be fill")
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, "too short")
        .max(10, "too long"),
      password: Yup.string()
        .required("must be fill")
    }),

    onSubmit: (values, { resetForm }) => {
      login(values).then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate('/dashboard', { replace: true });
      })
        .catch(err => {
          console.log(err);
        })
      resetForm();
    },
  });


  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
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
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" >
          Login
        </LoadingButton>
      </form>

    </>
  );
}
