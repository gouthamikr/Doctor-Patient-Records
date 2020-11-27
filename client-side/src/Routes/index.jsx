import React from "react";
import Login from "../Components/Login";
import { Route, Switch } from "react-router-dom";
import Register from "../Components/Register";
import Home from "../Pages/Home";
import Patients from "../Pages/Patient";
export default function Routes() {
  return (
    <div style={{ marginTop: "6%" }}>
      <Switch>
        <Route path="/dashboard" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Register} />
        <Route
          path="/:patient"
          exact
          render={(props) => <Patients {...props} />}
        />
      </Switch>
    </div>
  );
}
