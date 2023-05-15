import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  isLoggedIn: true,
  snackbar: {
    open: null,
    message: null,
    severity: null,
  },
  display: null,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openSnackBar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackBar(state, action) {
      state.snackbar.open = false;
      state.snackbar.message = null;
    },
    displayTree(state, action) {
      state.display = action.payload.display
    }
  },
});

export default slice.reducer;

export const ShowSnackBar =
  ({ severity, message }) =>
    async (dispatch, getState) => {
      dispatch(
        slice.actions.openSnackBar({
          message,
          severity,
        })
      );
      setTimeout(() => {
        dispatch(slice.actions.closeSnackBar());
      }, 4000);
    };

export const CloseSnackBar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackBar());
};


export function CreateCategory(formValues) {
  console.log(formValues, "formValues");

  return async (dispatch, getState) => {
    await axios
      .post(
        "/app/create-category",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(function (response) {
        console.log(response);

      }).catch(function (response) {
        console.log(response);

      })
  }
}

export function GetCategory(formValues) {
  console.log(formValues, "formValues");

  return async (dispatch, getState) => {
    await axios
      .get(
        `/app/get-category/?slug=${formValues.name}`,
        {
          formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(function (response) {
        console.log(response, "ffffffffffffffffffffffffff");
        dispatch(slice.actions.displayTree({
          display: response.data.result
        }))

      }).catch(function (response) {
        console.log(response);

      })
  }
}