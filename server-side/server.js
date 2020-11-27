const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Patients = require("./Models/patientSchema");
const patientsData = require("./MockData/database.json");
const patientsRoutes = require("./Routes/patientRoutes");
const userRoutes = require("./Routes/doctorRoutes");
const cors = require("cors");

dotenv.config();

const app = express();
const db = mongoose.connection;

mongoose.connect(
  process.env.ATLAS_URI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (err, res, req) => {
    if (err) {
      console.log(err);
    } else {
      console.log("The database is connected");
    }
  }
);
db.once("open", async (req, res) => {
  if ((await Patients.countDocuments().exec()) > 0) {
    console.log("Patients Data already added in the collection");
    return;
  }

  Patients.insertMany(patientsData)
    .then(() => console.log("Patients Data collections added Successfully"))
    .catch((err) => console.log(`Error : ${err}`));
});

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/api", patientsRoutes);

const port = 8000;

app.listen(port, () => {
  console.log("The server is up and running on port " + port);
});
