import { Box, makeStyles, Typography, TextField, OutlinedInput, Button, InputAdornment, FormControlLabel, Checkbox, IconButton, Container, Select, InputLabel, MenuItem, FormControl, Snackbar } from '@material-ui/core';
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useEffect, useState } from 'react';
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useSearchParams } from "react-router-dom";
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        padding: '20px 20%'
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
    buttonBox: {
        textAlign: 'center'
    },
    vhcontainer: {
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        marginTop: '100px',
        height:'80vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }

}))

const Resume = () => {
    const [type, setType] = useState('');
    const [position, setPosition] = useState('');
    const [company, setCompany] = useState('');
    const [experience, setExperience] = useState('');
    const [openings, setOpenings] = useState('');
    const [link, setLink] = useState('');
    
    const classes = useStyles();
    const navigate = useNavigate();
    //  const [role, setRole] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();
    let urlParamId = searchParams.get("id");

    useEffect(async (e) => {
        let id = searchParams.get("id");
        const response = await Axios.get(`https://cryptonaukribackend.herokuapp.com/jobs/:${id}`)
            .then((res) => {
                setPosition(res.data[0].position)
                setCompany(res.data[0].company)
                setType(1);
                setExperience(res.data[0].experience)
                setOpenings(res.data[0].openings)
                setLink(res.data[0].link)
            })
            .catch((err) => {
                
            });
    }, []);

    useEffect(async (e) => {
        let id = searchParams.get("id");
        const response = await Axios.get(`https://cryptonaukribackend.herokuapp.com/internships/:${id}`)
            .then((res) => {
                setPosition(res.data[0].position)
                setCompany(res.data[0].company)
                setType(2);
                setOpenings(res.data[0].openings)
                setLink(res.data[0].link)
            })
            .catch((err) => {
            });
    }, []);

    // let admin = localStorage.getItem("admin");
    let admin = true;

    const handleChange = (event) => {
        setType(event.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const date = new Date();
        console.log(date);

        if ((!position || !company || !openings || !experience || !link) && type == 1) {
            toast.error('Enter All the Values !');
        }

        if ((!position || !company || !openings || !link) && type != 1) {
            toast.error('Enter All the Values !');
        }


        try {

            if (type == 1) {
                const response = await Axios.post('https://cryptonaukribackend.herokuapp.com/jobs', { position, company, experience, openings, link ,date });

                const data = response.data;

                toast.success('jobCard Created!!');
                navigate('/')

            }
            else if (type == 2) {
                const response = await Axios.post('https://cryptonaukribackend.herokuapp.com/internships', { position, company, openings, link ,date });

                const data = response.data;

                toast.success('Internship Created!!');
                navigate('/')
            }


        } catch (error) {
            toast.error('jobCard Creation Failed!!');
        }

    };
    const handleEdit = async () => {

        if (type === 1) {
            
            const response = await Axios.patch(`https://cryptonaukribackend.herokuapp.com/jobs/${urlParamId}`, { position, company, experience, openings, link });
            
            toast.success('jobCard Updated !!');
            navigate('/')

        } else if (type === 2) {

            const response = await Axios.patch(`https://cryptonaukribackend.herokuapp.com/internships/${urlParamId}`, { position, company, openings, link });
          
            toast.success('InternshipCard Updated !!');
            navigate('/')

        }
    }
    return ( 
        <div className={classes.body}> 
            {admin ? <Container>
                <Box component='form' className={classes.formContainer}>
                    <Box className={classes.inputContainer}>
                        <TextField id="outlined-basic" label="position" name="position" className={classes.input} fullWidth variant="outlined" value={position} onChange={(e) => setPosition(e.target.value)} color="primary" />
                    </Box>
                    <Box className={classes.inputContainer}>
                        <TextField id="outlined-basic" label="Company" name="company" className={classes.input} fullWidth variant="outlined" value={company} onChange={(e) => setCompany(e.target.value)} color="primary" />
                    </Box>
                    {urlParamId === null ?
                        <Box className={classes.inputContainer}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="demo-simple-select-helper-label">Role type</InputLabel>
                                <Select
                                    variant='outlined'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value = {position}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={1}>Job</MenuItem>
                                    <MenuItem value={2}>Inernship</MenuItem>
                                </Select>
                            </FormControl>
                        </Box> : <></>
                    }
                    <Box sx={(type === 1) ? ({ display: 'block' }) : ({ display: 'none' })} className={classes.inputContainer}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="demo-simple-select-helper-label">Experience</InputLabel>
                            <Select
                                variant='outlined'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                                name="experience"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            >
                                <MenuItem value={'Fresher'}>Fresher</MenuItem>
                                <MenuItem value={'3 months'}>3 months</MenuItem>
                                <MenuItem value={'6 months'}>6 months</MenuItem>
                                <MenuItem value={'1 year'}>1 year</MenuItem>
                                <MenuItem value={'2 years'}>2 years</MenuItem>
                                <MenuItem value={'3 years'}>3 years</MenuItem>
                                <MenuItem value={'4 years'}>4 years</MenuItem>
                                <MenuItem value={'5 years'}>5 years</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box className={classes.inputContainer}>
                        <TextField type={'number'} id="outlined-basic" label="openings" name="openings" className={classes.input} fullWidth variant="outlined" value={openings} onChange={(e) => setOpenings(e.target.value)} color="primary" />
                    </Box>
                    <Box className={classes.inputContainer}>
                        <TextField id="outlined-basic" label="Company's Page Link" className={classes.input} fullWidth variant="outlined" name="link" value={link} onChange={(e) => setLink(e.target.value)} color="primary" />
                    </Box>

                    <Box className={classes.buttonBox}>
                        <Button onClick={urlParamId === null ? handleSubmit : handleEdit} type='button' variant="outlined" color="primary" className={classes.Button}  >
                            {urlParamId === null ?'Create Job Card':'Update Job Card'}
                        </Button>
                    </Box>
                </Box>
            </Container> : <Container>
                <Box className={classes.vhcontainer}>
                    <Box sx={{ padding: '10px' }} className={classes.buttonBox}>
                        <Typography variant="h4">You are not authorised to this Page</Typography>
                    </Box>
                    <Box className={classes.buttonBox}>
                        <Button onClick={() => { navigate('/'); }} type='button' variant="outlined" color="primary" className={classes.Button}  >
                            return Home
                        </Button>
                    </Box>
                </Box>
            </Container>
            };

            <ToastContainer />

        </div >
    )
}
export default Resume;