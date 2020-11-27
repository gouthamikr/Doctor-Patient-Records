import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { Link, useHistory } from "react-router-dom";
import { getPatient } from "../../Redux/auth/action";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 140,
    width: 100,
  },
  margin: {
    margin: "2% 4%",
  },
  control: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    border: "1px solid rgba(0, 0, 0, .125)",
  },
  align: {
    marginLeft: "40%",
  },
  formControl: {
    marginTop: "3%",
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));
export default function Home() {
  let [a, params] = window.location.href.split("?");
  let paramsObject = {};
  if (params !== undefined) {
    params = params.split("&");

    for (let i = 0; i < params.length; i++) {
      const [key, value] = params[i].split("=");
      paramsObject[key] = value;
    }
  }
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [name, setname] = useState(paramsObject["name"] || "");
  const [sort, setSort] = useState(paramsObject["age"] || "");
  const [gender, setGender] = useState(paramsObject["gender"] || "");
  const [search, setSearch] = useState(paramsObject["search"] || "");
  const patients = useSelector((state) => state.auth.patient);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    dispatch(getPatient({ page, sort, gender, search }));
  };

  useEffect(() => {
    dispatch(getPatient({ page, sort, gender, search }));
    history.push(
      `/dashboard?page=${page}&age=${sort}&gender=${gender}&search=${search}`
    );
  }, [page, sort, gender, search, dispatch, history]);

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel> Filter by Gender</InputLabel>
        <Select value={gender} onChange={handleChange}>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel>Sort by age</InputLabel>
        <Select value={sort} onChange={handleSortChange}>
          <MenuItem value="asc">Low to High</MenuItem>
          <MenuItem value="desc">High to Low</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="search patient"
        type="search"
        value={search}
        style={{ marginTop: "2.5%", marginRight: "1%", marginLeft: "1%" }}
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
        required
      />

      <Grid container>
        {patients.data &&
          patients.data.map((item, index) => (
            <Grid item xs={3} className={classes.margin} key={index}>
              <Card className={classes.control}>
                <CardContent>
                  <Typography
                    type="text"
                    value={name === item.name}
                    onClick={(e) => setname(e.target.value)}
                  >
                    <Link to={`/${item.name}`}>
                      Patient Name: <em>{item.name}</em>
                    </Link>
                  </Typography>
                  <Typography>
                    Gender: <em>{item.gender}</em>
                  </Typography>
                  <Typography>
                    age : <em>{Number(item.age)}</em>
                  </Typography>
                  <Typography>
                    Number of Medicines : {item.noOfMedicines}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      <div style={{ marginLeft: "40%" }}>
        <Pagination
          count={patients.finalPage}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
