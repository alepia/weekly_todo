import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupThunk } from "../redux-toolkit/authSlice";
import { loginThunk } from "../redux-toolkit/authSlice";
import { useNavigate } from "react-router-dom";
import "../sass/AuthForm.scss";

export default function AuthForm(props) {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  const [credential, setCredential] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated && navigate("/todo");
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredential((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  return (
    <div className="auth__container">
      <h1 className="auth__title">{props.login}</h1>
      <input
        type="text"
        placeholder="Username"
        name="username"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
      />
      <br />
      <br />
      <button
        className="auth__btn"
        onClick={() =>
          dispatch(
            props.login === "Register"
              ? signupThunk(credential)
              : loginThunk(credential)
          ).then(() => navigate(props.login === "Signup" ? "/login" : "/todo"))
        }
      >
        {props.login}
      </button>
    </div>
  );
}
