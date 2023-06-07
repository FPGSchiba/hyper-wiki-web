import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doSignOut } from "../../store/actions/user";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../store/format";
import { getCurrentUser } from "../../services/amplify";

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      console.log(user);
    };

    fetchData();
  }, []);
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
      <h2>{user ? user.attributes.sub : "loading..."}</h2>
      <Button variant="contained" onClick={onSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
