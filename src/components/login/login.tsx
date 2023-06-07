import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { federationSignInGoogle, getCurrentUser } from "../../services/amplify";
import { Auth, Hub } from "aws-amplify";
import { doLogin, federationLogin } from "../../store/actions/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Only valid email addresses are accepted!")
      .required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });
  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          dispatch(
            federationLogin(data, (err) => {
              if (err) {
                console.log(err);
              } else {
                navigate("/home");
              }
            })
          );
          break;
        case "signOut":
          dispatch(
            federationLogin(undefined, (err) => {
              if (err) {
                console.log(err);
              }
            })
          );
          break;
      }
    });

    return unsubscribe;
  }, []);

  const onSubmit = (event: any) => {
    console.log(event);
    dispatch(
      doLogin(event.email, event.password, (err, user) => {
        if (err) {
          console.log(err);
        } else {
          navigate("/home");
        }
      })
    );
  };

  const onSignInGoogle = async () => {
    await federationSignInGoogle();
    getCurrentUser();
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
            label={"Email"}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            className="login login-form login-form__input"
            type="email"
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
              onClick={() => navigate("/register")}
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
            onClick={onSignInGoogle}
            className="login login-form login-form__provider-button"
          >
            <Typography variant="body2">G Login with Google</Typography>
          </Button>
        </div>
      </form>
    </div>
  );
}
