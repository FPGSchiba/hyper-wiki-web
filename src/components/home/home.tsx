import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { doSignOut } from "../../store/actions/user";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../store/format";

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: AppState) => state.userState.user);
  console.log(user);
  const onSignOut = () => {
    dispatch(
      doSignOut((err) => {
        if (err) {
          console.log(err);
        } else {
          navigate("/login");
        }
      })
    );
  };

  return (
    <div>
      <h1>Home</h1>
      <h2>{user?.getUsername()}</h2>
      <Button variant="contained" onClick={onSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
