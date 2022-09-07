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
          </Box>
          <Box className={classes.buttonBox}>
            <Button
              // onClick={handleForgotPassword}
              onClick={() => {
                navigate("/resetPassWord");
              }}
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
  );
};

export default Login;