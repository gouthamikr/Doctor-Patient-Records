import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Axios from "axios";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    marginTop: "10%",
  },
});
export default function Register() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    Axios.get(
      `http://localhost:8000/user/register?email=${email}&name=${username}&password=${password}`
    )
      .then((res) => {
        console.log(res);
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <form className={classes.root}>
        <Typography variant="h3">Register</Typography>
        <br />
        <br />
        <TextField
          label="DoctorName"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          required
        />
        <br />
        <br />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          required
        />
        <br />
        <br />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          required
        />
        <br />
        <br />
        <Button variant="contained" color="secondary" onClick={handleRegister}>
          Register
        </Button>
      </form>
      <br />
      <small>{message}</small>
      <br />
      <br />
      <Link to="/login">Already registered</Link>
    </>
  );
}
