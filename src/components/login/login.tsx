import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export function Login() {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });
  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = () => {
    console.log("submit");
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <div className="login login-wrapper">
      <form
        className="login login-form login-form__wrapper"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h2" className="login login-form login-form__title">
          Login or SignUp
        </Typography>
        <div className="login login-form login-form__login-wrapper">
          <TextField
            label={"Username"}
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            className="login login-form login-form__input"
          />
          <TextField
            label={"Password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            className="login login-form login-form__input"
            type="password"
          />
          <div className="login login-form login-form__button-wrapper">
            <Button
              variant="contained"
              className="login login-form login-form__button"
              type="submit"
            >
              <Typography variant="body2">Login</Typography>
            </Button>
            <Button
              variant="contained"
              className="login login-form login-form__button"
            >
              <Typography variant="body2">SignUp</Typography>
            </Button>
          </div>
        </div>
        <div className="login login-form login-form__divider">
          <div className="login login-form login-form__divider-line1" />
          <h3>OR</h3>
          <div className="login login-form login-form__divider-line2" />
        </div>
        <div className="login login-form login-form__provider-wrapper">
          <Button
            variant="contained"
            className="login login-form login-form__provider-button"
          >
            <Typography variant="body2">G Login with Google</Typography>
          </Button>
        </div>
      </form>
    </div>
  );
}
