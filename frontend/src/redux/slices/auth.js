import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { ShowSnackBar } from "./app";

const initialState = {
  isLoggedIn: false,
  token: "",
  user: null,
  user_id: null,
  email: "",
  new_otp: "",
  error: false,
  isLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
      state.user = action.payload.user
    },
    signOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
      state.user_id = null;
    },
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
    otp(state, action) {
      state.new_otp = action.payload.new_otp
    }
  },
});

export default slice.reducer;

// log in
export function LoginUser(formValues) {
  console.log(formValues, "formValues");
  return async (dispatch, getState) => {

    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "/auth/login",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
            user_id: response.data.user_id,
            user: response.data.user
          })
        );
        window.localStorage.setItem("user_id", response.data.user_id);
        dispatch(ShowSnackBar({ severity: "success", message: response.data.message }))
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (err) {
        console.log(err);
        dispatch(ShowSnackBar({ severity: "error", message: err.message }))
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

export function LogoutUser() {
  return async (dispatch, getState) => {
    window.localStorage.removeItem("user_id");
    dispatch(slice.actions.signOut());
    dispatch(ShowSnackBar({ severity: "success", message: "Logged out successfully!" }))
  };
}

export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post(
        "/auth/register",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          slice.actions.updateRegisterEmail({ email: formValues.email })
        );
        dispatch(slice.actions.otp({ new_otp: response.data.new_otp }))
        dispatch(ShowSnackBar({ severity: "success", message: response.data.message }))
        dispatch(slice.actions.updateIsLoading({ isLoading: false, error: false }));
      })
      .catch((error) => {
        console.log(error);
        dispatch(slice.actions.updateIsLoading({ isLoading: false, error: true }));
      })
    // .finally(() => {
    //   if (!getState().auth.error) {
    //     window.location.href = "/auth/verify";
    //   }
    // });
  };
}


export function VerifyEmail(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/verify-otp",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);

      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        if (!getState().auth.error) {
          window.location.href = "/auth/login";
        }
      });
  };
}
