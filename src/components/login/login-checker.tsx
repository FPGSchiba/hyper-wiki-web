import React, { useEffect, useState } from "react";
import { Await, Navigate, Outlet, useLocation } from "react-router-dom";
import { isUserLoggedIn } from "../../services/amplify";
import { CircularProgress } from "@mui/material";
import { Login } from "./login";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PrivateRoute = () => {
  const location = useLocation();
  const [test, setTest] = useState("");

  useEffect(() => {
    setTest(location.pathname);
  }, [location]);

  return (
    <React.Suspense fallback={<Login />}>
      <Await
        resolve={isUserLoggedIn}
        errorElement={
          <div>
            <p>{test}</p>
            <CircularProgress />
          </div>
        }
        children={(isLoggedIn) => (
          <>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</>
        )}
      ></Await>
    </React.Suspense>
  );
};

export default PrivateRoute;
