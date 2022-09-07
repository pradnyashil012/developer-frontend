import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/homepage/Components/Header";
import InternshipPage from "./components/internshipPage";
import JobsPage from "./components/JobsPage";
import Footer from "./components/homepage/Components/Footer.jsx";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { Box, createTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import LandingPage from "./components/homepage/landingPage.jsx";

import JobForm from "./components/jobPost/jobForm";
import { ToastContainer } from "react-toastify";
import Resume from "./components/userResume/rsume";
import { responsiveFontSizes } from "@mui/material/styles/";
import BusReg from "./components/BusnessRegestration";
import LoginSignup from "./components/LoginSignup";
import BussinessProfile from "./components/BusinessProfile";
import AboutUS from "./components/AboutUS";
import Contact from "./components/Contact";
import Privacy from "./components/Privacy";
import DCMA from "./components/DCMA.js";
import GeneralQueries from "./components/GeneralQueries";
import Terms from "./components/Terms";
import Reset from "./components/forgotPass/forgotPass";
import Otp from "./components/otp/otp";
import JobDetails from "./components/JobDetails/JobDetails";
import ApplyJob from "./components/applyJob/applyjob";
import Profile from "./components/User/UserDashbaord";

import AuthDevLogin from "./components/auth/DevLogin";
import AuthDevSignUp from "./components/auth/DevSignup";
import AuthDevLogout from "./components/auth/Logout";

import { useCookies } from "react-cookie";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  contentBody: {
    height: "auto",
    margin: 0,
    padding: 0,
    minHeight: "90vh",
  },
  body: {
    overflow: "hidden",
  },
  link: {
    textDecoration: "none",
  },
}));
let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      tab: 770,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#003979",
      home: "#02142A",
    },
    secondary: {
      main: "#D3DCEE",
    },
    text: {
      main: "#003979",
      white: "#fff",
    },
  },
  link: {},
});

theme = responsiveFontSizes(theme);

const App = () => {
  const classes = useStyles();

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_ENDPOINT;

  const fetchData = async (token) => {
    try {
      await axios.get(`${API}/api/v1/user/loggedInUserDetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      try {
        await axios.get(`${API}/api/v1/business/loggedInBusinessDetails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (e) {
        console.error(error);
        navigate("/auth/logout");
      }
    }
  };
  // this useEffect used just for - to validate the jwt token
  // it validate jwt by fetching userdata
  // it fetches userData but if the token expires already it
  // will auto logout
  useEffect(() => {
    if (cookies.token) {
      fetchData(cookies.token);
    } else {
      console.log("token not exits");
    }
  }, []);

  return (
    <>
      <div className={classes.body}>
        <ToastContainer />
        <ThemeProvider theme={theme}>
          <Header />
          <Box className={classes.contentBody}>
            <Routes>
              <Route path="/" element={<LandingPage />}></Route>
              <Route
                path="/businessprofile"
                element={<BussinessProfile />}
              ></Route>
              <Route path="/details" element={<JobDetails />}></Route>
              <Route path="/jobapplication" element={<ApplyJob />}></Route>
              <Route path="/loginsignup" element={<LoginSignup />}></Route>
              <Route path="/dev-login" element={<Login route="user" />}></Route>
              <Route
                path="/company-login"
                element={
                  <Login
                    route="company"
                    setCookie={setCookie}
                    cookies={cookies}
                  />
                }
              ></Route>
              <Route path="/dev-signup" element={<SignUp />}></Route>
              <Route path="/company-signup" element={<BusReg />}></Route>
              <Route path="/jobs" element={<JobsPage />}></Route>
              <Route path="/internships" element={<InternshipPage />}></Route>
              <Route path="/jobform" element={<JobForm />}></Route>
              <Route path="/about-us" element={<AboutUS />}></Route>
              <Route path="/contact-us" element={<Contact />}></Route>
              <Route path="/privacy" element={<Privacy />}></Route>
              <Route path="/dcma" element={<DCMA />}></Route>
              <Route
                path="/generalQueries"
                element={<GeneralQueries />}
              ></Route>
              <Route path="/terms" element={<Terms />}></Route>
              <Route path="/userResume" element={<Resume />}></Route>
              <Route path="/resetPassWord" element={<Reset />}></Route>
              <Route path="/Otp" element={<Otp />}></Route>
              <Route
                path="/auth/devlogin"
                element={
                  <>
                    <AuthDevLogin setCookie={setCookie} cookies={cookies} />
                  </>
                }
              ></Route>
              <Route
                path="/auth/logout"
                element={
                  <>
                    <AuthDevLogout removeCookie={removeCookie} />
                  </>
                }
              ></Route>
              <Route path="/auth/logout" element={<AuthDevLogout />}></Route>
              <Route
                path="/auth/devsignup"
                element={
                  <AuthDevSignUp setCookie={setCookie} cookies={cookies} />
                }
              ></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </Routes>
          </Box>
          <Footer />
        </ThemeProvider>
      </div>
    </>
  );
};

export default App;