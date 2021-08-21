import React, { useEffect, useState } from "react";
import axios from "axios";

const LoginPage = (props) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      props.history.push("/");
    }
    console.log(token, "=Token");
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [pwerror, setPwError] = useState(false);
  const [credentialsError, setCredentialsError] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (email === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (password === "") {
      setPwError(true);
    } else {
      setPwError(false);
    }
    if (password !== "" && email !== "") {
      const payload = {
        email: email,
        password: password,
      };
      try {
        const response = await axios.post(
          "https://reqres.in/api/login",
          payload
        );
        console.log(response);
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        props.history.push("/");
      } catch (error) {
        setCredentialsError(true);
        console.log(error);
      }
    } else {
      console.log("One Field is Empty");
    }
  };
  return (
    <div className="loginform">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        {emailError ? <span> Email is Empty</span> : null}
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {pwerror ? <p> Password is Empty</p> : null}

        <br />
        <button>Login</button>
        <br />
        {credentialsError ? <span>Invalid Credentials</span> : null}
      </form>
    </div>
  );
};

export default LoginPage;
