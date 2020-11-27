import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userlogin } from "../../Redux/auth1/action";

const useStyles = makeStyles({
  root: {
    marginTop: "10%",
  },
});
export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [auth, setAuth] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = () => {
    Axios.get(
      `http://localhost:8000/user/login?email=${email}&password=${password}`
    )
      .then((res) => {
        setAuth(true);
        setMessage(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // dispatch(userlogin({ email, password }));
  };
  if (auth) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <>
        <form className={classes.root}>
          <Typography variant="h3">Login</Typography>
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
          <Button variant="contained" color="secondary" onClick={handleLogin}>
            Login
          </Button>
        </form>
        {message}
        <br />
        <Link to="/">wanna register</Link>
      </>
    );
  }
}
