import {
  Box, makeStyles, Typography, TextField, OutlinedInput, Button,ButtonGroup, InputAdornment, FormControlLabel, Checkbox, IconButton, Container, Select, InputLabel, MenuItem, Grid, FormControl,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import Otp from '../otp/otp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: '30px',
    margin: '20px 20%',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0 0 10px silver'
  },
  heading: {
    margin: '20px 10%',
    color: theme.palette.primary.main,
    fontWeight: 'bolder',
    textAlign: 'center'
  },
  label: {
    backgroundColor: 'white',
    padding: '2px 5px',
    marginTop: '-5px',
  },
  inputContainer: {
    margin: "30px 0",
  },
  Button: {
    marginTop: "5px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  buttonBox: {
    textAlign: "center",
    paddingTop: '20px',
  },
  btnBox: {
    display: 'flex',
    padding: '20px 0'
},
// btn:{
//   margin:"auto"
// },
  body: {
    marginTop: '100px',
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Reset = (props) => {

  const baseAPI = "https://cryptonaukribackend.herokuapp.com/";


  const [state, setState] = useState(1)
  const [prevState, setPrevState] = useState('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [pass, setPass] = useState('')
  const [confPass, setConfPass] = useState('')
  const [btnState, setBtnState] = useState("user")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();

  const handleEmailState = (e) => {
    setEmail(e.target.value.toLowerCase());

  }
  const handleOtpState = (e) => {
    setOtp(e.target.value);
  }
  const handlePassword1 = (e) =>{
    setPass(e.target.value);
  }
  const handlePassword2 = (e) =>{
    setConfPass(e.target.value);
  }
  const handleBtn2Toggle = () => {
    setBtnState("user")
  }
  const handleBtn1Toggle = () => {
    setBtnState("business")
}



  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if(email){
      try{
        setLoading(true);
        const response = await Axios.get(`${baseAPI}api/v1/${btnState}/forgetPasswordOTP?email=${email}`);
        const data = response.data;
        if(data.code == "OTP_SENT"){
          toast.success(data.message);
          setState(2);
        }
        setLoading(false);
      } catch(error){
        console.log(error);
      }
      
    }
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!email || !otp){
      toast.error("OTP is required !!")
    }
    if(email && otp && pass === confPass){
      console.log("pass same ready to payload");
      try{
        setLoading(true);
        const response = await Axios.post(`${baseAPI}api/v1/${btnState}/forgetPassword`,{
                        email: email,
                        otp: Number(otp),
                        newPassword: pass,
                        });
        const data = response.data;
        if(data.code == "CHANGED_PASSWORD"){
          toast.success("Password changes successfully !!")
        }
        navigate('/userLogin');
        return;
      }catch(error){
        const err = JSON.parse(error.request.response);
        toast.error(err.message);
        setLoading(false);
      }
      
                
    }else{
      toast.error("Passwords must be same")
    }
  }

  return (
    <div className={classes.body} >
      <Container >
        <div className={classes.heading} >
          <Typography variant="h4" >
            <Box sx={{
              fontWeight: 'bold'
            }}>
              Reset Password
            </Box>
          </Typography> </div>
        <Box component="form" className={classes.formContainer} >

          <Grid container spacing={3}>

              {state===1?<Grid item xs={12} >
              <Box className={classes.btnBox}>
                        <ButtonGroup >
                            <Button onClick={handleBtn2Toggle} type='button' variant={btnState === "user" ? "contained" : "outlined"} color="primary" className={classes.btn}  >
                                User
                            </Button>
                            <Button onClick={handleBtn1Toggle} type='button' variant={btnState === "business" ? "contained" : "outlined"} color="primary" className={classes.btn} >
                                Business
                            </Button>
                        </ButtonGroup>
                    </Box>
                  <FormControl fullWidth variant="outlined">
                  <InputLabel className={classes.label} htmlFor="outlined-adornment-name">Enter Email</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-name"
                      type='email'
                      value={email}
                      onChange={handleEmailState}
                      name='comp'
                      label='Company Name'
                    />
                  </FormControl>
              </Grid>:<></>}
              {
                state === 1?
                  <Grid item xs={12} >

                    { loading?<CircularProgress />:<Button onClick={handleOtpSubmit}
                        color="primary"
                        fullWidth 
                        variant="contained"
                        type="submit"
                        className={classes.Button}
                      >
                        Send OTP</Button>
                    }

                  </Grid>:<></>
              }

              {
                state === 2? 
                  <Grid item xs={12} spacing={10}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel className={classes.label} htmlFor="outlined-adornment-name">OTP</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-name"
                        type='number'
                        value={otp}
                        onChange={handleOtpState}
                        name='otp'
                        label='OTP'
                      />
                    </FormControl>
                    <br /> <br />
                    <FormControl fullWidth variant="outlined">
                      <InputLabel className={classes.label} htmlFor="outlined-adornment-name">New Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-name"
                        type='password'
                        value={pass}
                        onChange={handlePassword1}
                        name='Password'
                        label='Pass'
                      />
                    </FormControl>
                    <br /> <br />
                    <FormControl fullWidth variant="outlined">
                      <InputLabel className={classes.label} htmlFor="outlined-adornment-name">Re-enter Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-name"
                        type='password'
                        value={confPass}
                        onChange={handlePassword2}
                        name='Re Password'
                        label='Pass'
                      />
                    </FormControl>
                    <Grid item xs={12} >

                    { loading?<CircularProgress />:<Button onClick={handleSubmit}
                        color="primary"
                        fullWidth 
                        variant="contained"
                        type="submit"
                        className={classes.Button}
                      >
                        Change Password</Button>
                    }

                  </Grid>

                </Grid>
                : <></>
              }
            
          </Grid>
        </Box>
      </Container>
    </div >
  );
};

export default Reset;
