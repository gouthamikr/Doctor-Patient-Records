const express = require("express");
const router = express.Router();
const { getPatientsDetails } = require("../Controllers/patientController");
const { PatientId } = require("../Controllers/patientController");

router.get("/patientsData", getPatientsDetails);
router.get("/patientsData/Id", PatientId);

module.exports = router;
