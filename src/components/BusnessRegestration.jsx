import React, { useState } from "react";
import { Container, Grid, Typography, TextField,InputAdornment, OutlinedInput,IconButton, Button, Box, InputLabel, FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Email, Visibility, VisibilityOff } from "@material-ui/icons";
import { useSearchParams, useNavigate } from
    "react-router-dom";
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Otp from './otp/otp'

const useStyles = makeStyles((theme) => ({
    formContainer: {
        padding: '30px',
        margin: '20px 10%',
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
    first: {
        display: 'flex',
    },
    body: {
        marginTop: '100px',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        backgroundColor: 'white',
        padding: '2px 5px',
        marginTop: '-5px',
    },
    buttonBox: {
        textAlign: 'center',
        paddingTop: '20px'
    },
    inputContainer: {
        margin: '30px 0'
    },
    Button: {
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: 'white'
        }
    },
}))

const BusReg = () => {

    const navigate = useNavigate();
    const classes = useStyles();

    const [searchParams, setSearchParams] = useSearchParams();
    let codeParamId = searchParams.get("Invite");


    const [exec, setExec] = useState('');
    const [comp, setComp] = useState('');
    const [email, setEmail] = useState('');
    const [desc, setDesc] = useState('');
    const [year, setYear] = useState('');
    const [gstin, setGstin] = useState('');
    const [hq, setHq] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [website, setWebsite] = useState('');
    const [pass, setPass] = useState('');
    const [state, setState] = useState('otp');
    const [coupon, setCoupon] = useState(codeParamId);
    const [otp, setOtp] = useState('');
    const [values, setValues] = useState({
        showPassword: false,
    });


    // const [searchParams, setSearchParams] = useSearchParams();
    // // let urlParamId = searchParams.get("id");
    const APIUrl = `https://cryptonaukribackend.herokuapp.com/`;
    const otpAPI = `https://cryptonaukribackend.herokuapp.com/api/v1/business/otp?email=`;

    const handleExecChange = (e) => {
        setExec(e.target.value);
        // console.log(exec);
    }
    const handleCompChange = (e) => {
        setComp(e.target.value);
        // console.log(comp);
    }
    const handleOtpChange = (event) =>{
        setOtp(event.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value.toLowerCase());
        // console.log(email);
    }
    const handleDescChange = (e) => {
        setDesc(e.target.value);
        // console.log(desc);
    }
    const handleYearChange = (e) => {
        setYear(e.target.value);
        // console.log(year);
    }
    const handleGstinChange = (e) => {
        setGstin(e.target.value);
        // console.log(gstin);
    }
    const handleHqChange = (e) => {
        setHq(e.target.value);
        // console.log(hq);
    }
    const handlePhoneNoChange = (e) => {
        setPhoneNo(e.target.value);
        // console.log(phoneNo);
    }
    const handleCoupon = (e) => {
        setCoupon(e.target.value);
        // console.log(coupon);
    }
    
    const handleWebsiteChange = (e) => {
        setWebsite(e.target.value);
        // console.log(website);
    }
    const handleCallback = (IncomingState) => {
        setState(IncomingState);
        console.log('handlecallback is called !!')
        console.log(state);

    }

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const handleOtp = async (e) => {
        e.preventDefault();
        if (!exec || !email || !pass || !comp || !desc || !year  || !hq || !phoneNo || !website) {
            return toast.error('Enter all values !');
        }
        if (exec && email && pass && comp && desc && year  && hq && phoneNo && website) {
            
        try {
            if (state === 'verify') {
                let payload = JSON.stringify({
                        executiveName : exec,
                        officialEmail : email,
                        password : pass,
                        companyName : comp,
                        description : desc,
                        establishedYear : year,
                        GSTIN : gstin,
                        headquarters : hq,
                        phoneNumber : phoneNo,
                        websiteLink : website,
                        otp:Number(otp)
                    
                })
                console.log(payload);
               let resp =  await Axios.post(`${APIUrl}api/v1/business/signup?coupon=${coupon}`,
               {    executiveName : exec,
                    officialEmail : email,
                    password : pass,
                    companyName : comp,
                    description : desc,
                    establishedYear : year,
                    GSTIN : gstin,
                    headquarters : hq,
                    phoneNumber : phoneNo,
                    websiteLink : website,
                    otp:Number(otp)
                });
                    console.log(resp.data);
                
                     if(resp.data.userAdded){
                    toast.success("You are successfully registered");
                     }
                    
                     setTimeout(() => {
                        navigate('/companyLogin');
                      }, 3000);

                     
            }
        }
         catch (error) {
            toast.error(error);
        }
    }

    }

    const  handleSubmit = async (e) => {
        e.preventDefault();

        if(state === 'otp'){
            if (!exec || !email || !pass || !comp || !desc || !year  || !hq || !phoneNo || !website) {
             toast.error('Enter all values !')
             return;
            }
            if (exec && email && pass && comp && desc && year  && hq && phoneNo && website) {
                if (state === 'otp') {
                    try {
                    
                        const response = await Axios.get(otpAPI+email);
                        const data = response.data;
                        console.log(data);
                        if(data.otpSent === true){
                            toast.success('OTP sent to your registered email address.');
                            setState('verify');
                        }
                    

                    } catch (error) {
                        const err = JSON.parse(error.request.response);
                        toast.error(err.message);
                    }
                }
            }
        }


    };
    return (
        <div className={classes.body}>
            <Container>
                <div className={classes.heading} >
                    <Typography variant="h4" >
                        <Box sx={{
                            fontWeight: 'bold'
                        }}>
                            New Business SignUp
                        </Box>
                    </Typography>
                </div>
                <Box component='form' className={classes.formContainer}>
                    <Grid container spacing={3}>
                            {/*            company name                   */}
                        <Grid item xs={12} md={8}  >
                            <FormControl fullWidth variant="outlined">
                                <InputLabel className={classes.label} htmlFor="outlined-adornment-name">Company Name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-name"
                                    type='text'
                                    value={comp}
                                    onChange={handleCompChange}
                                    name='comp'
                                    label='Company Name'
                                    required
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4} >
                            <FormControl fullWidth variant="outlined">
                                <InputLabel className={classes.label} htmlFor="outlined-adornment-name">Website Link</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-name"
                                    type='text'
                                    value={website}
                                    onChange={handleWebsiteChange}
                                    name='website'
                                    required
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4} >
                            <FormControl fullWidth variant="outlined">
                                <InputLabel className={classes.label} htmlFor="outlined-adornment-name">Official Email</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-name"
                                    type='email'
                                    value={email}
                                    onChange={handleEmailChange}
                                    name='email'
                                    required
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4} >
                            <FormControl fullWidth variant="outlined">
                                <InputLabel className={classes.label} htmlFor="outlined-adornment-name">Executive Name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-name"
                                    type='text'
                                    value={exec}
                                    onChange={handleExecChange}
                                    name='exec'
                                    required
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={12} >
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    variant="outlined"
                                    id="outlined-multiline-static"
                                    label="Company Description"
                                    multiline
                                    rows={4}
                                    value={desc}
                                    onChange={handleDescChange}
                                    name='email'
                                    required
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} >
                            <FormControl fullWidth variant="outlined">
                                <InputLabel className={classes.label} htmlFor="outlined-adornment-name">Establishment Year</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-name"
                                    type='number'
                                    value={year}
                                    onChange={handleYearChange}
                                    name='year'
                                    required
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} >
                            <FormControl fullWidth variant="outlined">
                                <InputLabel className={classes.label} htmlFor="outlined-adornment-name">GSTIN(Optional)</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-name"
                                    type='text'
                                    value={gstin}
                                    onChange={handleGstinChange}
                                    name='gstin'
                                    required
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={8} >
                            <FormControl fullWidth variant="outlined">
                                <InputLabel className={classes.label} htmlFor="outlined-adornment-name">Office Location</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-name"
                                    type='text'
                                    value={hq}
                                    onChange={handleHqChange}
                                    name='hq'
                                    required
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4} >
                            <FormControl fullWidth variant="outlined">
                                <InputLabel className={classes.label} htmlFor="outlined-adornment-name">Executive's Phone</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-name"
                                    type='number'
                                    value={phoneNo}
                                    onChange={handlePhoneNoChange}
                                    name='phoneNo'
                                    required
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={5} >
                        <FormControl fullWidth variant="outlined">
                                <InputLabel className={classes.label} autoComplete="on" htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={(e) => setPass(e.target.value)}
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

                        <Grid item xs={12} md={5} >
                            <FormControl fullWidth variant="outlined">
                                <InputLabel className={classes.label} htmlFor="outlined-adornment-name">Coupon Code</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-name"
                                    type='text'
                                    value={coupon}
                                    onChange={handleCoupon}
                                    name='coupon'
                                    required
                                />
                            </FormControl>
                        </Grid>

                        {state=='verify'?
                        <>
                            <Grid item xs={12} md={5} >
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
                            <Box className={classes.buttonBox}>
                                {<Button onClick={handleOtp}
                                        variant="outlined"
                                        color="primary"
                                        className={classes.Button}
                                        disabled={state == 'verified' ? true : false}
                                    >
                                    {state == 'verified' ? 'verified' : 'verify Otp and Signup'} </Button>}
                            </Box>
                        </>:<></>}
                    </Grid>
                    {state=='verify'?<></>:<Box className={classes.buttonBox}>
                        {<Button
                            onClick={handleSubmit}
                            type='submit'
                            variant="outlined"
                            color="primary"
                            disabled={state === 'verify'}
                            className={classes.Button}  >
                            {state === 'otp' ? 'send Otp' : 'Create Account'}
                        </Button>}
                        </Box>}
                </Box>
            </Container>
        </div >
    )
}
export default BusReg;
