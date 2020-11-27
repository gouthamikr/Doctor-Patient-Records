import {
  GET_PATIENT_REQUEST,
  GET_PATIENT_FAILURE,
  GET_PATIENT_SUCCESS,
} from "./actionTypes";

export const initState = {
  patient: [],
  error: "",
  totalPage: 1,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PATIENT_REQUEST:
      return {
        ...state,
        error: "",
        patient: "",
      };
    case GET_PATIENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case GET_PATIENT_SUCCESS:
      return {
        ...state,
        error: "",
        patient: action.payload.data,
        totalPage: action.payload.finalPage,
      };
    default:
      return state;
  }
};

export default reducer;
