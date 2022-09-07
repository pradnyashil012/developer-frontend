import React,{useState} from 'react';
import { Button, Container,Box, makeStyles, ButtonGroup, TextField,Typography,InputAdornment,IconButton,OutlinedInput } from "@material-ui/core";
import { Visibility,VisibilityOff } from "@material-ui/icons";
import { toast } from "react-toastify";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const useStyles=makeStyles((theme)=>({
  formContainer: {
    padding: "40px 20%",
    marginTop:'70px'
  },
  boxbtn:{
    display:'flex'
  },
  box:{
    border:'1px solid',
    borderColor:theme.palette.primary.main,
  },
  btn: {
    marginLeft: '10px',
    border: '1px solid',
    borderColor:theme.palette.primary.main,
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
    }
  },
  heading: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "5px",
    padding: "10px",
    boxShadow: "0 0 10px #6292E8",
  },
  inputContainer: {
    margin: "30px 0",
  },
  buttonBox: {
    textAlign: "center",
  },
  Button: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  cont:{
    padding:'10px'
  }
}))

const LoginSignup=()=>{
  const navigate = useNavigate();
  const [active,setActive]=useState("Sign Up");
  //These below 2 are for login
  const [password, setPass] = useState('');
  const [loginemail,setLoginemail]=useState('');
  //These below 3 are for signup
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password2, setPassword2] = useState('');

  const [values, setValues] = useState({
    showPassword: false,
  });

  const [loading, setLoading] = useState(false);

  const handlePassChange = (e) => {
    setPass(e.target.value)
  }
  const handleLoginEmailChange = (e) => {
    setLoginemail(e.target.value)
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

  const handleSubmitlogin = async (e) => {

    e.preventDefault();

    if (!loginemail || !password) {

      return toast.error('Enter all the values !!');
    }
    if (loginemail && password) {
      try {
        setLoading(true);
        const API = process.env.URL;
        console.log(API)
        const response = await Axios.post(`https://cryptonaukribackend.herokuapp.com/api/v1/user/login`, { loginemail, password });
        const data = response.data;
        setLoading(false);
        if (data.login) {
          localStorage.setItem('login', true);
          localStorage.setItem('cUser', data.cUser);
          toast.success(data.status);
          if (data.admin) {
            localStorage.setItem('boss', true);
          }
          navigate('/')
        }
        else {
          toast.error(data.status)
        }
      } catch (error) {
        setLoading(false);
        toast.error('Login Failed ,please try again !!')
      }
    }
  };
  const handleSubmitSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password2) {
        toast.error('Enter All the Values');
    }
    if (name && email && password2) {
        try {
          setLoading(true);
            const response = await Axios.post('https://cryptonaukribackend.herokuapp.com/api/v1/user/signup', { name, email, password });
            // const data = response.data;
            toast.success('Account Created !!');
            toast.success('U can Now LogIn!!');
            navigate('/login');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error('Could not create account ,try again !!');
        }
    }

};
  const classes = useStyles();
  return(
    <div>
      <Container>
        <Box component='form' className={classes.formContainer}>
          <Box className={classes.boxbtn}>
            <ButtonGroup>
              <Button className={classes.btn} onClick={()=> setActive("Login")} variant='outlined'>Login</Button>
              <Button className={classes.btn} onClick={()=> setActive("Sign Up")} variant='outlined'>Sign Up</Button>
            </ButtonGroup>
          </Box>
          <Box className={classes.box}>
            {active === "Login" && 
            <Box className={classes.cont}>
            <div className={classes.heading} >
              <Typography variant="h4" > Login </Typography> </div>
              < hr />
              <Box className={classes.inputContainer} >
              <Typography variant="h6" >email *</Typography>
              <TextField id="outlined-basic"
                placeholder="Enter your email"
                className={classes.input}
                fullWidth 
                value={loginemail}
                onChange={handleLoginEmailChange}
                variant="outlined"
                color="primary" />
              </Box>
              <Box className={classes.inputContainer} >
              <Typography variant="h6" > Password * </Typography> <
                OutlinedInput variant="outlined"
                placeholder="Enter Password"
                name="password"
                fullWidth
                type={values.showPassword ? "text" : "password"}
                value={password}
                onChange={handlePassChange}
                endAdornment={<InputAdornment position="end" >
                <IconButton aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end" >
                  {values.showPassword ? < VisibilityOff /> : < Visibility />}
                </IconButton> </InputAdornment>
              }
              /> </Box>
              <Box className={classes.buttonBox} >
                <Button 
                  onClick={handleSubmitlogin}
                  variant="outlined"
                  color="primary"
                  className={classes.Button} >
                  Login </Button> </Box>
            </Box> }
            {active === "Sign Up" && 
            <Box className={classes.cont}>
                <div className={classes.heading}>
                        <Typography variant='h4'>Create New Account!</Typography>
                    </div><hr />
                  <Box className={classes.inputContainer}>
                        <Typography variant='h6'>Your Fullname*</Typography>
                        <TextField id="outlined-basic" placeholder="Enter your Fullname" className={classes.input} fullWidth variant="outlined"
                            value={name}
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            color="primary"
                        />
                  </Box>
                  <Box className={classes.inputContainer}>
                        <Typography variant='h6'>Email Address*</Typography>
                        <TextField id="outlined-basic" placeholder="Enter your email address" className={classes.input} fullWidth variant="outlined" value={email}
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            color="primary" />
                    </Box>

                    <Box className={classes.inputContainer}>
                        <Typography variant='h6'>Create Password*</Typography>
                        <OutlinedInput
                            variant="outlined"
                            placeholder="Enter Password"
                            name="password"
                            fullWidth
                            type={values.showPassword ? 'text' : 'password'}
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}

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
                        />
                    </Box>

                    <Box className={classes.buttonBox}>
                        {loading?<CircularProgress /> :<Button onClick={handleSubmitSignup} variant="outlined" color="primary" className={classes.Button}  >
                            Create Account
                        </Button>}
                    </Box>
            </Box> }
          </Box>
        </Box>
      </Container>
    </div>
  )
}
export default LoginSignup;