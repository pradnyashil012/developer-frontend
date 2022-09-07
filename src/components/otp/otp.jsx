import {
  Box, makeStyles, Typography, TextField, OutlinedInput, Button, InputAdornment, FormControlLabel, Checkbox, IconButton, Container, Select, InputLabel, MenuItem, Grid, FormControl,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles((theme) => ({
  label: {
    backgroundColor: 'white',
    padding: '2px 5px',
    marginTop: '-5px',
  },
  Button: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  buttonBox: {
    textAlign: "center",
    paddingTop: '20px'
  },
}));

const Login = (props) => {

  const APIUrl = `http://localhost:3001`;


  const [otp, setOtp] = useState('')
  const [state, setState] = useState('verify')
  const navigate = useNavigate();
  const classes = useStyles();

  const OtpUrl = props.APIUrl
  // console.log('this is otpURL ' + OtpUrl)
  // console.log(APIUrl + OtpUrl)

  const email = props.Email
  // console.log(email)

  // function handleCallBack() {
  //   props.callBack(state);
  //   console.log('this is from otp and state is verified');
  // }

  const handleOtpChange = (e) => {
    setOtp(e.target.value)
  }

  const handleOtp = async (e) => {

    e.preventDefault();

    if (!otp) {
      return toast.error('Enter otp !!');
    }
    if (otp) {
      try { 
        const response = await Axios.post(`${APIUrl}${OtpUrl}`, { otp, email })
          .then((res) => {
            const data = res.data;
            if (data.code == 'success') {
              setState('verified')
              props.callBack('verified');
              return toast.success(data.message);
            }
            else if (data.code == 'error') {
              return toast.error(data.message);
            }
            else if (data.code == 'info') {
              return toast.info(data.message);
            }
          })
          .catch((err) => {
            toast.error(err)
          })
      } catch (error) {
        toast.error('Login Failed ,please try again !!')
      }
    }
  };

  return (
    <div>
      <Grid container spacing={3} >
        <Grid item xs={8} >
          <FormControl fullWidth variant="outlined">
            <InputLabel className={classes.label} htmlFor="outlined-adornment-name">Enter Otp</InputLabel>
            <OutlinedInput variant="outlined"
              name="password"
              fullWidth
              type="text"
              value={otp}
              onChange={handleOtpChange}
              disabled={state == 'verified' ? true : false}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4} >
          <Button onClick={handleOtp}
            variant="outlined"
            color="primary"
            className={classes.Button}
            disabled={state == 'verified' ? true : false}
          >
            {state == 'verified' ? 'verified' : 'verify Otp'} </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
