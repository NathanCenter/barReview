import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { ApplicationViews } from "../ApplicationViews";
import Button from "@mui/material/Button";
import "./logInAndRegister.css"
import Box from '@mui/material/Box';
export const LogIn = () => {
  const [email, set] = useState("");
  const existDialog = useRef();
  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((user) => (user.length ? user[0] : false));
  };
  const handleLogin = (e) => {
    e.preventDefault();
    existingUserCheck().then((exists) => {
      if (exists) {
        localStorage.setItem("bar_user", exists.id);
        history.push("/barlist");
      } else {
        window.alert("please enter an email");
      }
    });
  };

  return (
    <>
    
    <div className="logInBackgroundColor">

    

      <form className="logIn"onSubmit={handleLogin}>
       
       
        <h1>Log In</h1>
        <p htmlFor="inputEmail">
          E-mail:{" "}
          <input type="text" onChange={(evt) => set(evt.target.value)} />
        </p>
        <Button variant="contained" type="submit">Enter</Button>
        <p>
          <Link  className="link" to="/register" > New User click here to log in</Link>
        </p>
        
      </form>
    
    </div>
      
    </>
  );
};
