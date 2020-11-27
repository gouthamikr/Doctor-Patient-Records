import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Button, Toolbar, Typography } from "@material-ui/core";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <>
      <AppBar className={styles.color}>
        <Toolbar>
          <Typography variant="h5" style={{ flex: 1 }}>
            Doctor Patient Records
          </Typography>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="default">
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}
