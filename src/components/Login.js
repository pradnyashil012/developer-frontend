import {
  Box,
  makeStyles,
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
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

import { useCookies } from "react-cookie";

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

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  var url_string = window.location.href;
  var url = new URL(url_string);
  var redirectType = url.searchParams.get("redirecttype");
  var redirectid = url.searchParams.get("redirectid");

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const navigate = useNavigate();
  const classes = useStyles();

  const API = "https://cryptonaukribackend.herokuapp.com/";

  const [values, setValues] = useState({                                    /* For what? */
    showPassword: false,
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value.toLowerCase());
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/resetPassWord");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Enter all the values !!");
    }
    if (email && password) {
      if (props.route === "company") {
        try {
          setLoading(true);
          const response = await axios.post(`${API}api/v1/business/login`, {
            email,
            password,
          });
          // console.log(email, password)
          localStorage.setItem("tokenNew", response.headers["authorization"]);
          console.log(response.data);
          console.log(response.headers["authorization"]);
          setLoading(false);
          if (response.data.userLoggedIn) {
            const timestamp = new Date().getTime();
            const expire = timestamp + 60 * 60 * 24 * 1000 * 2;
            const expireDate = new Date(expire);
            console.log(expireDate);
            await props.setCookie("token", response.headers.authorization, {
              expires: expireDate,
              path: "/",
              domain: ".cryptonaukri.com",
            });

            toast.success(response.data.message);
            localStorage.setItem("login", true);
            localStorage.setItem("cUser", "BUISNESS");
            navigate("/businessprofile");
          } else {
            toast.success(response.data.message);
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
          toast.error("Login Failed ,please try again !!");
        }
      } else if (props.route === "user") {
        try {
          setLoading(true);
          const response = await axios.post(`${API}api/v1/user/login`, {
            email,
            password,
          });
          const data = response.data;
          setLoading(false);
          console.log(data);
          
          localStorage.setItem("token", response.headers["authorization"]);
          localStorage.setItem("login", true);
          localStorage.setItem("cUser", "DEVELOPER");
          const timestamp = new Date().getTime();
          const expire = timestamp + 60 * 60 * 24 * 1000 * 2;
          const expireDate = new Date(expire);
          setCookie("token", response.headers.authorization, {
            expires: expireDate,
            path: "/",
            //domain: ".cryptonaukri.com",
          });
          toast.success(data.message);
          if (redirectType === "internship" || redirectType === "job") {
            navigate(`/jobapplication?id=${redirectid}&type=${redirectType}`);
            return;
          }
          navigate("/jobs");
        } catch (error) {
          const errorResponse = JSON.parse(error.request.response);
          //console.log((errorResponse));
          //console.log(typeof(errorResponse))
          if (errorResponse?.code == "NOT_FOUND") {
            toast.error(
              "You are not yet registered with us yet, Please create a Account and continue."
            );
            setLoading(false);
            return;
          }
          toast.error(error);
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className={classes.body}>
      <Container>
        <div className={classes.heading}>
          <Typography variant="h4">
            <Box
              sx={{
                fontWeight: "bold",
              }}
            >
              {props.route == "user" ? "Developer Login" : "Company Login"}
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
                  {props.route == "user" ? "Email" : "Official Email"}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-name"
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
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
                Login{" "}
              </Button>
            )}
          </Box>
          <Box className={classes.buttonBox}>
            <Button
              onClick={handleForgotPassword}
              variant="outlined"
              color="primary"
              className={classes.Button}
            >
              Forgot Password ?{" "}
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
