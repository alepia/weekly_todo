import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: localStorage.getItem("token") !== null || false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const signupThunk =
  ({ username, password }) =>
  async () => {
    let response = await axios.post(`http://localhost:8080/auth/signup`, {
      username,
      password,
    });
    console.log(response.data);
  };

export const loginThunk =
  ({ username, password }) =>
  async (dispatch) => {
    let response = await axios.post(`http://localhost:8080/auth/login`, {
      username,
      password,
    }); 
    localStorage.setItem("token", response.data.token);
    dispatch(login());
  };

export const logoutThunk = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch(logout());
};

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
