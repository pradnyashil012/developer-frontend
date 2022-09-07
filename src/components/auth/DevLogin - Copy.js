import React, { useState, useEffect } from "react";
import ForgotPassword from "./ForgotPassword";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

//Importing material UI Components
import { Box, createTheme, makeStyles, ThemeProvider } from "@material-ui/core";

import {
  Typography,
  TextField,
  OutlinedInput,
  Button,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  IconButton,
  Container,
  Select,
  InputLabel,
  MenuItem,
  Grid,
  FormControl,
} from "@material-ui/core";

import { Visibility, VisibilityOff } from "@material-ui/icons";
import CircularProgress from "@mui/material/CircularProgress";


//Adding Styles
const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: "20px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0 0 10px silver",
    maxWidth: "600px",
  },
  heading: {
    margin: "20px 10%",
    color: theme.palette.primary.main,
    fontWeight: "bolder",
    textAlign: "center",
  },
  label: {
    backgroundColor: "white",
    padding: "2px 5px",
    marginTop: "-5px",
  },
  inputContainer: {
    margin: "30px 0",
  },
  Button: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  buttonBox: {
    textAlign: "center",
    paddingTop: "20px",
  },
  body: {
    marginTop: "100px",
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));



const Login = ({ setCookie }) => {
  const navigate = useNavigate();

  //Defining Classes
  const classes = useStyles();

  var url_string = window.location.href;
  var url = new URL(url_string);
  var redirectType = url.searchParams.get("redirecttype");
  var redirectid = url.searchParams.get("redirectid");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  // const [nPassWrongs, setNPassWrongs] = useState(0);

  const API = process.env.REACT_APP_API_ENDPOINT;

  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(email.split('@')[1]);
    // console.log(process.env.REACT_APP_PRODUCTION_API_ENDPOINT);
    if (email && password) {
      setLoginError();
      setLoading(true);

      try {
        const response = await Axios.post(`${API}/api/v1/user/login`, {
          email,
          password,
        });
        const data = response.data;

        if (data.userLoggedIn) {
          // console.log(data);
          // console.log(response.headers.authorization);
          // setLoginError(data.message);
          setLoading(false);
          const timestamp = new Date().getTime();
          const expire = timestamp + 60 * 60 * 24 * 1000 * 2;
          const expireDate = new Date(expire);
          // console.log(expireDate);
          //document.cookie = `token=${response.headers.authorization}; expires=${expireDate}; path=/; domain=.cryptonaukri.com`;
          try {
            setCookie("token", response.headers.authorization, {
              expires: expireDate,
              path: "/",
              domain: ".cryptonaukri.com",
            });
          } catch (error) {
            alert(";p");
            console.log(error);
          }

          // below codes to be removed once cookies is applied accross the site
          localStorage.setItem("token", response.headers.authorization);
          localStorage.setItem("cUser", "DEVELOPER");
          localStorage.setItem("login", true);

          if (redirectType === "internship" || redirectType === "job") {
            navigate(`/jobapplication?id=${redirectid}&type=${redirectType}`);
            return;
          }
          if (redirectType === "community") {
            window.location.href = `https://community.cryptonaukri.com${redirectid}`;
            return;
          }

          navigate("/jobs");
        }

        //console.log(data);
      } catch (error) {
        const errResp = error.response;
        if (errResp.data.code === "NOT_FOUND") {
          setLoginError(
            "You are not yet registered with us. Please Register your account"
          );
          setLoading(false);
        }
        if (errResp.data.code === "INVALID") {
          setLoginError("Account has been disabled(free trial period expired)");
          setLoading(false);
        }
        if (errResp.data.code === "WRONG_PASSWORD") {
          setLoginError("Wrong Email or Password");
          setLoading(false);
        }
        // setLoginError("Something went wrong!");
        setLoading(false);
      }
    } else {
      setLoginError("Something went wrong!");
      console.log("Email and password is required.");
    }
  };

  return (
<<<<<<< HEAD
    <main className="bg-gray-900">
      <div className="max-w-xl mx-auto rounded bg-gray-900">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div className="bg-gray-800 shadow-lg shadow-gray-800 rounded pt-2 pb-16 ml-3 mr-3">
          <br />
          <div className="text-center text-gray-300 mb-6 text-2xl font-semibold">
            👷 Developer Sign-In
          </div>
          <form className="w-4/5 mx-auto" autocomplete="off">
            {loginError ? (
              <div className="mb-4 bg-red-400 text-white px-2 py-2 rounded text-xs">
                {loginError}
              </div>
=======
    <>
    
    {/* NEW code */}


    <div>
      {/* <Header /> */}
    <div className={classes.body}>
      <Container>
        <div className={classes.heading}>
          <Typography variant="h4">
            <Box
              sx={{
                fontWeight: "bold",
              }}
            >
              {"Developer Login"}
            </Box>
          </Typography>{" "}
        </div>
        <Box component="form" className={classes.formContainer}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel
                  className={classes.label}
                  htmlFor="outlined-adornment-name"
                >
                  {"Username"}                   {/* //Asking user for Email */}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-name"
                  type="text"
                  value={email}
                  // onChange={handleEmailChange}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  name="comp"
                  label="Company Name"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel
                  className={classes.label}
                  htmlFor="outlined-adornment-name"
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  variant="outlined"
                  placeholder="Enter Password"
                  name="password"
                  fullWidth
                  type={values.showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePassChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>{" "}
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>

          <Box className={classes.buttonBox}>
            {loading ? (
              <CircularProgress />
>>>>>>> dev
            ) : (
              <Button
                onClick={handleSubmit}
                variant="outlined"
                color="primary"
                className={classes.Button}
              >
                Login{" "}                                                    {/* // The Login Button */}
              </Button>
            )}
<<<<<<< HEAD
            <div className="flex items-center bg-gray-700 rounded shadow-sm mb-4">
              <span className="px-3">
                <svg
                  className="fill-current text-gray-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z" />
                </svg>
              </span>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="text-gray-300 bg-gray-700 w-full h-12 focus:outline-none rounded"
                type="text"
                placeholder="Email "
                autocomplete="do-not-autofill"
              />
            </div>
            <div className="bg-gray-700 flex items-center rounded shadow-sm">
              <span className="px-3">
                <svg
                  className="fill-current text-gray-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 8V6a6 6 0 1 1 12 0h-3v2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                </svg>
              </span>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="text-gray-300 bg-gray-700 w-full h-12 focus:outline-none rounded"
                type="password"
                name="passwordQuicklearn"
                id="quicklrnpassword"
                placeholder="Password"
                autocomplete="do-not-autofill"
              />
            </div>
            {/* <ForgotPassword /> */}
            <button
              type="button"
=======
          </Box>
          <Box className={classes.buttonBox}>
            <Button
              // onClick={handleForgotPassword}
>>>>>>> dev
              onClick={() => {
                navigate("/resetPassWord");
              }}
<<<<<<< HEAD
              className="mb-4 mt-1 text-xs text-md text-gray-500 text-center underline text-cyan-500 rounded-lg py-1 px-2 m-auto"
            >
              Forgot your password ?
            </button>

            {loading ? (
              <button
                type="button"
                className="bg-indigo-400 block mx-auto text-white text-sm rounded shadow-md px-6 py-2"
                disabled
              >
                Loading...
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-blue-600 block mx-auto text-white text-sm rounded shadow-md px-6 py-2 w-full"
              >
                Sign in
              </button>
            )}
            <br />
          </form>
          <div className="text-center">
            <a
              className="text-blue-400 text-md font-semibold"
              href="/auth/devsignup"
            >
              New User ? Signup{" "}
            </a>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </main>
=======
              variant="outlined"
              color="primary"
              className={classes.Button}
            >
              Forgot Password ?{" "}                                            {/* // The Forgot Password Button */}
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
    </div>
    </>
>>>>>>> dev
  );
};

export default Login;