import {
  GET_PATIENT_REQUEST,
  GET_PATIENT_FAILURE,
  GET_PATIENT_SUCCESS,
} from "./actionTypes";
import axios from "axios";

export const getPatientRequest = () => ({
  type: GET_PATIENT_REQUEST,
});

export const getPatientSuccess = (payload) => ({
  type: GET_PATIENT_SUCCESS,
  payload,
});

export const getPatientFailure = (payload) => ({
  type: GET_PATIENT_FAILURE,
  payload,
});

export const getPatient = (payload) => (dispatch) => {
  const { page, sort, gender, search } = payload;
  dispatch(getPatientRequest());
  axios
    .get(
      `http://localhost:8000/api/patientsData?page=${page}&limit=6&age=${sort}&gender=${gender}&name=${search}`
    )
    .then((res) => dispatch(getPatientSuccess(res)))
    .catch((err) => dispatch(getPatientFailure(err.response)));
};
