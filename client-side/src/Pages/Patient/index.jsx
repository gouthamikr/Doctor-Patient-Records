import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "50px",
  },
  paper: {
    padding: "10px",
    width: "100%",
  },
  control: {
    padding: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
  },
  button: {
    margin: "10px",
  },
}));

export default function PollingStations(props) {
  const name = props.match.params.patient;
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/patientsData?name=${name}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [name]);

  return (
    <Grid container className={classes.root} spacing={2} justify="center">
      <h1>Patient Details</h1>

      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid item justify="center" container>
            {data.length > 0 &&
              data.map((item, index) => (
                <Grid key={index}>
                  <h3>Name: {item.name}</h3>
                  <h3>Age: {item.age}</h3>
                  <h3>Gender: {item.gender}</h3>
                  <h3>No of Medicines: {item.noOfMedicines}</h3>
                  {item.medicines.map((a, i) => (
                    <Grid key={i} container spacing={2}>
                      <h5 style={{ marginLeft: "-1%" }}>
                        {i + 1}. name: {a.name} , Dosage: {a.quantity}
                      </h5>
                    </Grid>
                  ))}
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>

      <Link to={"/dashboard"} className={classes.link}>
        <Button variant="contained" color="secondary">
          Go Back
        </Button>
      </Link>
    </Grid>
  );
}
