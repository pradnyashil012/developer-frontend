import { Box, makeStyles, Typography, TextField, OutlinedInput, Button, InputAdornment, FormControlLabel, Checkbox, IconButton, Container, Select, InputLabel, MenuItem, FormControl, Grid } from '@material-ui/core';
import { Email, Visibility, VisibilityOff } from "@material-ui/icons";
import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import React from 'react'
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Otp from '../components/otp/otp'
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        padding: '15px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '5px',
        boxShadow: '0 0 10px silver',
        maxWidth:'600px',
    },
    Button: {
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: 'white'
        }
    },
    label: {
        backgroundColor: 'white',
        padding: '2px 5px',
        marginTop: '-5px',
    },
    para:{
        width:"100%",
        textAlign:"center",
        color: theme.palette.primary.main,
        fontWeight: 'bolder',
        fontSize:'1.5em'
    },
    buttonBox: {
        textAlign: "center",
        paddingTop: '20px',
        marginLeft: '10px'
    },
    heading: {
        margin: '20px 10%',
        color: theme.palette.primary.main,
        fontWeight: 'bolder',
        textAlign: 'center'
    },
    body: {
        marginTop: '120px',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "30px"
    }
}))

const SignUp = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    let urlParamId = searchParams.get("code");

    const navigate = useNavigate();
    const classes = useStyles();
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [coupon, setCoupon] = useState(urlParamId);
    const [location, setLocation] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState('otp');
    const [otp, setOtp] = useState();
    const [values, setValues] = useState({
        showPassword: false,
    });

    const [loading, setLoading] = useState(false);
    const otpAPI = `https://cryptonaukribackend.herokuapp.com/api/v1/user/otp?email=`
    const secretCode = 'GYG89OIK';
    const code1 = "CRYPTONAUKRI100";
    const code2 = "JOINCRYPTONAUKRI";
    const code3 = "JOINCRYPTONAUKRI22";

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleFNameChange = (event) => {
        setFName(event.target.value)
    };
    const handleLNameChange = (event) => {
        setLName(event.target.value)
    };
    const handlesetCoupon = (event) => {
        setCoupon(event.target.value);
    };
    const handlesetLocation = (event) => {
        setLocation(event.target.value);
    };
    const handleCallback = (IncomingState) => {
        setState(IncomingState);
        // console.log('handlecallback is called !!')
        // console.log(state);
    }
    const handleOtpChange = (event) =>{
        setOtp(event.target.value);
    }
    const handleOtp = async (e) =>{
        e.preventDefault();
        
        if (!fname || !lname || !email || !password || !coupon) {
                toast.error('Enter All the Values');
                return;
        }

        if(coupon!== code1 && coupon !== code2 && coupon !== code3){
            toast.error('Invalid Cuopon Code');
            return;
        }

        if (fname && lname && email && password) {
            if(state === 'verify'){

                try{
                    setLoading(true);
                    let payload = JSON.stringify({
                            firstName: fname,
                            lastName: lname,
                            email: email,
                            password: password,
                            location: location,
                            phoneNumber: number,
                            otp: Number(otp),
                        });
                    console.log(payload);
                    console.log("Now verify otp with signup");
                    const response = await Axios.post('https://cryptonaukribackend.herokuapp.com/api/v1/user/signup',{
                            firstName: fname,
                            lastName: lname,
                            email: email,
                            password: password,
                            location: location,
                            phoneNumber: number,
                            otp: Number(otp),
                        }
                    );
                    const data = response.data;
                    console.log(data);
                    toast.success("Developer Created!!, Please login now!!")
                    navigate('/devlogin');
                    setLoading(false);
                    return;
                } catch(error){
                    setLoading(false);
                    console.log( error.request.response );
                    const err = JSON.parse(error.request.response);
                    toast.error(err.message);
                }
                
            }
        }
        
    }
    const   handleSubmit = async (e) => {
        e.preventDefault();

        if(state === 'otp'){
            if(coupon!== code1 && coupon !== code2 && coupon !== code3){
                toast.error('Invalid Cuopon Code');
                return;
            }
            if (!fname || !lname || !email || !password) {
                toast.error('Enter All the Values');
                return;
            }
            if (fname && lname && email && password) {
                if (state === 'otp') {
                    try {
                        setLoading(true);
                        const response = await Axios.get(otpAPI+email);
                        const data = response.data;
                        if(data.otpSent === true){
                            toast.success('Code sent to your registered email address.');
                            setState('verify');
                        }
                        setLoading(false);

                    } catch (error) {
                        setLoading(false);
                        const err = JSON.parse(error.request.response);
                        toast.error(err.message);
                    }
                }
            }
        }

        // if (secretCode === coupon ) {
        //     toast.success('Coupon matched successfully!');
        //     toast.success('Account Created !!');
        //     toast.success('U can Now LogIn!!');
        // } else { toast.error('Wrong code'); };

        // if (!fname || !lname || !email || !password) {
        //     toast.error('Enter All the Values');
        // }
        // if (fname && lname && email && password) {
        //     if (state === 'signup') {
        //         try {
        //             setLoading(true);
        //             const response = await Axios.post('https://cryptonaukribackend.herokuapp.com/api/v1/user/signup', { fname, lname, email, number, password, location })
        //                 .then((res) => {
        //                     const data = res.data;
        //                     setLoading(false);
        //                     // console.log(data)
        //                     if (data.code !== false) {
        //                         toast.success(data.message);
        //                         setState('verify')
        //                         console.log('again in the function')
        //                     } else {
        //                         toast.error(data.message);
        //                     }
        //                 })
        //                 .catch((err) => {
        //                     setLoading(false);
        //                     console.log(err)
        //                 });
        //             // const data = response.data;

        //         } catch (error) {
        //             setLoading(false);
        //             toast.error('Could not create account ,try again !!');
        //         }
        //     } else if (state === 'verified') {
        //         toast.success('Account Created !!');
        //         navigate('/userLogin')
        //         return toast.success('Try logging in !!');

        //     } else if (state === 'verify') {
        //         toast.info('Email is already sent to you !!');
        //     }
        // }
    };
    return (
        <div className={classes.body}>
            <Container>
                <div className={classes.heading}>
                    <Typography variant="h4" >
                        <Box sx={{
                            fontWeight: 'bold'
                        }}>
                            Developer SignUp
                        </Box>
                    </Typography>
                </div>
                <Box component='form' className={classes.formContainer}>

                    <Grid container spacing={2} wrap={'wrap'}>
                    <Grid item xs={12} >
                        <p className={classes.para}>
                        Try 14 days free Trial Offer
                        </p>
                        <p className={classes.para}>
                            Hurry up! Only first 100 Developers!
                        </p>
                        <br/>
                    </Grid>

                    {state!=='verify'?<>

                    <Grid item xs={6} >
                        <FormControl fullWidth variant="outlined">
                            <InputLabel className={classes.label} htmlFor="outlined-adornment-name">First Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-name"
                                type='text'
                                value={fname}
                                onChange={handleFNameChange}
                                name='fname'
                                label='Company Name'
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} >
                        <FormControl fullWidth variant="outlined">
                            <InputLabel className={classes.label} htmlFor="outlined-adornment-lname">Last Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-lname"
                                type='text'
                                value={lname}
                                onChange={handleLNameChange}
                                name='lname'
                                label='Company Name'
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} >
                        <FormControl fullWidth variant="outlined">
                            <InputLabel className={classes.label} htmlFor="outlined-adornment-email">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email"
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>

                    </Grid>
                    <Grid item xs={6} >
                        <FormControl fullWidth variant="outlined">
                            <InputLabel className={classes.label} htmlFor="outlined-adornment-phone">Phone</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-phone"
                                type='tel'
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} >
                        <FormControl fullWidth variant="outlined">
                            <InputLabel className={classes.label} htmlFor="outlined-adornment-city">Location/City</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-city"
                                type='text'
                                value={location}
                                onChange={handlesetLocation}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} >
                        <FormControl fullWidth variant="outlined">
                            <InputLabel className={classes.label} htmlFor="outlined-adornment-coupon">Coupon Code</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-coupon"
                                type='text'
                                value={coupon}
                                onChange={handlesetCoupon}
                            />
                        </FormControl>

                    </Grid>
                    <Grid item xs={12} >
                        <FormControl fullWidth variant="outlined">
                            <InputLabel className={classes.label} autoComplete="on" htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </Grid>

                    </>:<></>}
                        {state=='verify'?
                        <>
                            <Grid item xs={12} >
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className={classes.label} htmlFor="outlined-adornment-name">Enter Verfication Code</InputLabel>
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
                            <Box className={classes.buttonBox}>
                                {loading?<CircularProgress/> :<Button onClick={handleOtp}
                                        variant="outlined"
                                        color="primary"
                                        className={classes.Button}
                                        disabled={state == 'verified' ? true : false}
                                    >
                                    {state == 'verified' ? 'verified' : ' Start Your Free Trail'} </Button>}
                            </Box>
                        </>:<></>}

                    </Grid>

                    {state=='verify'?<></>:<Box className={classes.buttonBox}>
                        {loading?<CircularProgress/> :<Button
                            onClick={handleSubmit}
                            type='submit'
                            variant="outlined"
                            color="primary"
                            disabled={state === 'verify'}
                            className={classes.Button}  >
                            {state === 'otp' ? 'Verify Email' : 'Create Account'}
                        </Button>}
                    </Box>}
                </Box>
            </Container>
        </div>
    )
}
export default SignUp;
