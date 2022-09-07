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
import InputField from "./business/InputField";

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
        <div>
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
                            {state === 'otp' ? 'send Otp ' : 'Create Account'}
                        </Button>}
                        </Box>}
                </Box>
            </Container>
        </div >

        <div className="w-full bg-gray-200 flex flex-col items-center justify-center py-6">
            <h1 className="text-3xl mt-3 text-center font-bold text-[#003979] mb-2">
              Sign up as a new business!
            </h1>
        < div className="bg-white mt-8 rounded-2xl">
         <div className='w-full md:w-[48rem] py-16 flex flex-col items-center shadow-2xl rounded-2xl px-10 md:px-0'>

        <div className='w-full flex md:pl-12 mb-8'>
            <a href='/' className='flex flex-row justify-center text-black'>
                <p>ar</p>
                <p>back</p>
            </a>
        </div>

        <div className='w-full md:flex md:flex-row justify-between md:w-[70%]'>
            <div className='my-8 md:my-0'> 
              <p className='ml-2'>Company Name</p>
              <InputField size="large" value={comp} onChange={handleCompChange} placeholder='Company Name' />
            </div>

            <div className='my-8 md:my-0'>
             <p className='ml-2'>Company website</p>
             <InputField size="large" value={website} onChange={handleWebsiteChange} placeholder='Website URL' />
            </div>
        </div>

        <div className='w-full md:flex md:flex-row justify-between md:w-[70%] md:my-6'>
             <div className='mt-2 mb-8 md:my-0'>
               <p className='ml-2'>E-mail</p>
               <InputField size="large" value={email} onChange={handleEmailChange} placeholder='E-mail' />
             </div>

            <div className='my-8 md:my-0'>
              <p className='ml-2'>Executive's Name</p>
              <InputField size="large" value={exec} onChange={handleExecChange} placeholder='Executive name' />
            </div>
        </div>


        <div className='w-full md:px-28'>
            <p className='ml-2'>Company info</p>
            <InputField size="large" value={desc} onChange={handleDescChange} placeholder='Description' rows={4} />
        </div>

        <div className='w-full md:flex md:flex-row justify-between md:w-[70%] md:my-6'>
            <div className='my-8 md:my-0'>
                <p className='ml-2'>Establishment year</p>
                <InputField size="large" value={year} onChange={handleYearChange} placeholder='Extablishment year' />
            </div>

            <div className='my-8 md:my-0'>
                <p className='ml-2'>GST number</p>
                <InputField size="large" value={gstin} onChange={handleGstinChange} placeholder='GSTIN (optional)' />
            </div>
        </div>

        <div className='w-full md:flex md:flex-row justify-between md:w-[70%] md:my-6'>
          <div className='mt-2 mb-8 md:my-0'>
            <p className='ml-2'>Office Location</p>
            <InputField size="large" value={hq} onChange={handleHqChange} placeholder='Office location' />
          </div>

          <div className='my-8 md:my-0'>
            <p className='ml-2'>Contact number</p>
            <InputField size="large" value={phoneNo} onChange={handlePhoneNoChange} placeholder="Executive's contact" />
          </div>
        </div>

        <div className='w-full md:flex md:flex-row justify-between md:w-[70%] md:my-6'>
          <div className='mt-2 mb-8 md:my-0'>       
            <p className='ml-2'>Password</p>
            <InputField type="password" size="large" value={values.password} onChange={(e) => setPass(e.target.value)} placeholder='password' />
          </div>

          <div className='my-8 md:my-0'>
            <p className='ml-2'>Copoun Code</p>
            <InputField size="large" value={coupon} onChange={handleCoupon} placeholder='Copoun code' />
          </div>
        </div>

        {state=="verify" ? 
        <>
            <div className='w-full md:w-[70%] md:px-28'>
                <p className='ml-2'>Enter OTP</p>
                <InputField size="large" value={otp} onChange={handleOtpChange} placeholder='OTP' rows={4} />
             </div>
             <button onClick={handleSubmit} className='border-2 border-[#003979] text-[#003979] font-semibold rounded-full px-12 py-2 mt-7 inline-block hover:bg-[#003979] hover:text-white'>{state == 'verified' ? 'verified' : 'Verify OTP and SignUP'}</button>
        </> 
        : <></>}

        {state=="verify" ?
          <></>
         : <button onClick={handleSubmit} className='border-2 border-[#003979] text-[#003979] font-semibold rounded-full px-12 py-2 mt-7 inline-block hover:bg-[#003979] hover:text-white'>{state === 'otp' ? 'SEND OTP ' : 'Create Account'}</button>
        }

        </div>
        </div>

        </div>
        </div>
    )
}
export default BusReg;
