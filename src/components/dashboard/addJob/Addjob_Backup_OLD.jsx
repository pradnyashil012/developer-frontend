import { Box, makeStyles, Typography, TextField, OutlinedInput, Button, Container, Select, InputLabel, MenuItem, FormControl, Grid, ButtonGroup } from '@material-ui/core';
import { useEffect, useState } from 'react';
import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useSearchParams } from "react-router-dom";
import Axios from 'axios';

import Jobform from "./Jobform"
import Internshipform from "./Internshipform"


import 'antd/dist/antd.min.css';


const useStyles = makeStyles((theme) => ({
    
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

const Addjob = (theme) => {
    const token = localStorage.getItem('tokenNew');
    //console.log("On job form ",token);
    const postjobAPI = 'https://cryptonaukribackend.herokuapp.com/api/v1/jobs/postJob';
    const postIntAPI = 'https://cryptonaukribackend.herokuapp.com/api/v1/internship/postInternship';


    const [formdata,setFormdata] = useState({
        title:"",
        type:"",
        contractDuration:"",
        locationType:"",
        location:"Work From Home",
        openings:"",
        experience:"",
        ctc:0,
        skills:"",
        description:"",
        payType:"",
        incentives:"",
        salary:"",
        perks:"",
        probation:"",
        probationSalary:"",
        resp:"",
        stipend:"",
        startDate:"",
        btnState:2,
    })


    // const [title, setTitle] = useState();
    // const [type, setType] = useState();
    // const [contractDuration, setContractDuration] = useState('');
    // const [locationType, setLocationType] = useState('');
    // const [location, setLocation] = useState('Work From Home');
    // const [openings, setOpenings] = useState();
    // const [experience, setExperience] = useState('');
    // const [ctc, setctc] = useState();
    // const [skills, setSkills] = useState('');
    // const [description, setDescription] = useState('');
    // const [payType, setPayType] = useState('');
    // const [incentives, setIncentives] = useState('');
    // const [salary, setSalary] = useState();
    // const [perks, setPerks] = useState('');
    // const [probation, setProbation] = useState('');
    // const [probationSalary, setProbationSalary] = useState();
    // const [resp, setResp] = useState('');
    // const [stipend, setStipend] = useState('');
    // const [startDate, setStartDate] = useState('');
    // const [btnState, setBtnState] = useState(2);


    const CurrentDate = new Date();
    const day = CurrentDate.getDate().toString();
    const month = (CurrentDate.getMonth() + 1).toString();
    const year = CurrentDate.getFullYear().toString();
    const date = (year + '-0' + month + '-' + day).toString();
    console.log(date)

    const classes = useStyles();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    let urlParamId = searchParams.get("id");


    let admin = true;


    useEffect(()=>{
        if(!token){
            navigate('/companyLogin');
            toast.error('Please login first');
        }
    },[])

    const handleBtn1Toggle = () => {
        // setBtnState(1)
        setFormdata({...formdata, btnState: 1})
    }

    const handleBtn2Toggle = () => {
        // setBtnState(2)
        setFormdata({...formdata, btnState: 2})
    }

    const handletitleChange = (event) => {
        // setTitle(event.target.value)
        setFormdata({...formdata, title: event.target.value})
    };

    const handletypeChange = (event) => {
        // setType(event.target.value)
        setFormdata({...formdata, type: event.target.value})
    };

    const handleCDurationChange = (event) => {
        // setContractDuration(event.target.value)
        setFormdata({...formdata, contractDuration: event.target.value})
    };

    const handleLocTypeChange = (event) => {
        // setLocationType(event.target.value)
        setFormdata({...formdata, locationType: event.target.value})
    };

    const handleLocationChange = (event) => {
        // setLocation(event.target.value)
        setFormdata({...formdata, location: event.target.value})
    };

    const handleOpnChange = (event) => {
        // setOpenings(event.target.value)
        setFormdata({...formdata, openings: event.target.value})
    };

    const handleExpChange = (event) => {
        // setExperience(event.target.value)
        setFormdata({...formdata, experience: event.target.value})
    };

    const handlectcChange = (event) => {
        // setctc(event.target.value)
        setFormdata({...formdata, ctc: event.target.value})
    };

    const handleDescChange = (event) => {
        // setDescription(event.target.value)
        setFormdata({...formdata, description: event.target.value})
    };

    const handleSkillChange = (event) => {
        // setSkills((event.target.value));
        setFormdata({...formdata, skills: event.target.value})
    };

    const handlePayTypeChange = (event) => {
        // setPayType(event.target.value)
        setFormdata({...formdata, payType: event.target.value})
    };

    const handleSalaryChange = (event) => {
        // setSalary(event.target.value)
        setFormdata({...formdata, salary: event.target.value})
    };

    const handleIncentivesChange = (event) => {
        // setIncentives(event.target.value);
        setFormdata({...formdata, incentives: event.target.value})
    };

    const handlePerksChange = (event) => {
        // setPerks(event.target.value)
        setFormdata({...formdata, perks: event.target.value})
    };

    const handleProbationChange = (event) => {
        // setProbation(event.target.value)
        setFormdata({...formdata, probation: event.target.value})
    };

    const handleProbSalaryChange = (event) => {
        // setProbationSalary(event.target.value)
        setFormdata({...formdata, probationSalary: event.target.value})
    };

    const handleDateChange = (event) => {
        // setStartDate(event.target.value)
        setFormdata({...formdata, startDate: event.target.value})
    };

    const handleRespChange = (event) => {
        // setResp(event.target.value)
        setFormdata({...formdata, resp: event.target.value})
    };

    const handleStipendChange = (event) => {
        // setStipend(event.target.value)
        setFormdata({...formdata, stipend: event.target.value})
    };
    // console.log(location);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const date = new Date();
        // console.log(date);
        // console.log(btnState);
        if(formdata.btnState === 2 ){
            if ( (!formdata.title || !formdata.location || !formdata.openings || !formdata.experience || !formdata.description || !formdata.ctc  || !formdata.probation) ) {
                toast.error('Enter All the Values !');
            }
        }else if(formdata.btnState === 1 ){
                if ( (!formdata.title || !formdata.location || !formdata.openings || !formdata.description || !formdata.salary)) {
                    toast.error('Enter All the Values !');
                }
        }
        const jobData = {
            "jobTitle":formdata.title,
            "location":formdata.location,
            "openings":formdata.openings,
            "experience":formdata.experience,
            "jobDescription":formdata.description,
            "ctc":formdata.ctc,
            "fixedPay":formdata.salary,
            "variablePay":formdata.salary,
            "incentives": formdata.incentives,
            "probationPeriod":formdata.probation,
            "probationDuration":formdata.probation,
            "probationSalary":formdata.probationSalary,
            "perks":[formdata.perks],
            "fiveDaysWeek":false,
            "isRemote":!formdata.location,
            "transportation":false,
            "informalDress":true,
            "healthInsurance":false,
            "snacks":false,
            "skills":formdata.skills.split(","),
            "candidatePreferences":"pref",
            "status":"status"
        }

        const intData={
            "internshipTitle": formdata.title,
            "location": formdata.location,
            "isRemote" : !formdata.location,
            "openings": formdata.openings,
            "duration": formdata.probation,
            "responsibilities": formdata.resp,
            "stipend" : {
                "amountType": formdata.stipend,
                "currencyType": "Indian Rupess",
                "amount":formdata.salary 
            },
            "perks" : {
                "certificate": true,
                "letterOfRecommendation": true,
                "workHours": 4,
                "dressCode": false,
                "food": true,
                "isPPO": true,
                "fiveDaysWeek" : true
            },
            "skills": [formdata.skills],
            "status": "status"
        };


        try {
            

            if (formdata.btnState === 2) {
                // console.log(jobData);
                const response = await Axios.post(postjobAPI,jobData,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                  });

                const data = response.data;
                //  console.log(data);
                toast.success('jobCard Created!!');
                navigate('/businessprofile');

            }
            else if (formdata.btnState !== 2) {
                // console.log(intData);
                const response = await Axios.post(postIntAPI,intData,{ 
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = response.data;
                    // console.log(data);
                toast.success('Internship Created!!');
                navigate('/businessprofile')
            }


        } catch (error) {
            console.log(error.response);
            toast.error(error.response.data.message);
        }

    };
    // const handleEdit = async () => {

    //     if (type === 1) {

    //         const response = await Axios.patch(`https://cryptonaukri-backend.herokuapp.com/jobs/${urlParamId}`, { position, company, experience, openings, link });

    //         toast.success('jobCard Updated !!');
    //         navigate('/')

    //     } else if (type === 2) {

    //         const response = await Axios.patch(`https://cryptonaukri-backend.herokuapp.com/internships/${urlParamId}`, { position, company, openings, link });

    //         toast.success('InternshipCard Updated !!');
    //         navigate('/')

    //     }
    // }
    return (
        <div>
        <div className='mt-8 md:mt-24 flex items-center justify-center'>
            {admin ? <Container>
                <div className='my-{20px} mx-[10%] font-extrabold text-center' >
                    <Typography variant="h4" >
                        <Box sx={{
                            fontWeight:'bold'
                        }}>
                            Post Job/Internship
                        </Box>
                    </Typography>
                </div>
                <Box component='form' className="p-[30px] my-[20px] md:mx-[10%] bg-white rounded-[5px] shadow-2xl">
                    <Box className='flex py=[20px]'>
                        <ButtonGroup className='flex flex-col md:flex-row mb-4' >
                            <Button onClick={handleBtn2Toggle} type='button' variant={formdata.btnState === 2 ? "contained" : "outlined"} color="primary" className={`${classes.btn}`}  >
                                Post Job
                            </Button>
                            <Button onClick={handleBtn1Toggle} type='button' variant={formdata.btnState === 1 ? "contained" : "outlined"} color="primary" className={classes.btn} >
                                Post Internship
                            </Button>
                        </ButtonGroup>
                        {/* <div className='mb-8 '>
                            <button  onClick={handleBtn2Toggle} className={`border-2 w-[12rem] mr-4 border-[#003979] text-[#003979]  font-semibold rounded-full px-12 py-2 mt-7 inline-block ${btnState === 2 && "bg-[#003979] text-white" } hover:bg-[#003979] hover:text-white`}>Add Job</button>
                            <button  onClick={handleBtn1Toggle} className={`border-2 border-[#003979] text-[#003979] font-semibold rounded-full px-12 py-2 mt-7 inline-block ${btnState === 1 && "bg-[#003979] text-white" } hover:bg-[#003979] hover:text-white`}>Add Internship</button>
                        </div> */}
                    </Box>

                    {formdata.btnState === 2 ?
                        <Grid container spacing={3}>
                            <Grid item md={8} xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-name">Job Title</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-name"
                                        type='text'
                                        value={formdata.title}
                                        onChange={handletitleChange}
                                        name='title'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white md:py=[2px] md:px-[5px] mt-[-5px]' id="demo-simple-select-helper-label">Job Type</InputLabel>
                                    <Select
                                        variant='outlined'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formdata.type}
                                        onChange={handletypeChange}
                                        name='type'
                                    >
                                        <MenuItem value={1}>Part Time</MenuItem>
                                        <MenuItem value={2}>Full Time</MenuItem>
                                        <MenuItem value={3}>Contract</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {formdata.type === 3 ?
                                <Grid item xs={12}>
                                    <Box >
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' id="demo-simple-select-helper-label">Duration Of COntract</InputLabel>
                                            <Select
                                                variant='outlined'
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={formdata.contractDuration}
                                                onChange={handleCDurationChange}
                                                name='contractDuration'
                                            >
                                                <MenuItem value={1}>1 month</MenuItem>
                                                <MenuItem value={2}>2 months</MenuItem>
                                                <MenuItem value={3}>3 months</MenuItem>
                                                <MenuItem value={6}>6 months</MenuItem>
                                                <MenuItem value={9}>9 months</MenuItem>
                                                <MenuItem value={12}>1 year</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid> : <></>}
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' id="demo-simple-select-helper-label">Location type</InputLabel>
                                    <Select
                                        variant='outlined'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formdata.locationType}
                                        onChange={handleLocTypeChange}
                                        name='locationType'
                                    >
                                        <MenuItem value={1}>Work From Home</MenuItem>
                                        <MenuItem value={2}>In Office</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={8} xs={12}>
                                {formdata.locationType === 2 ?
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-location">City/Location</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-location"
                                            type='text'
                                            placeholder='location'
                                            value={formdata.location}
                                            onChange={handleLocationChange}
                                            name='location'
                                        />
                                    </FormControl> : <></>}
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-location">No. Of Openings</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-location"
                                        type='number'
                                        value={formdata.openings}
                                        onChange={handleOpnChange}
                                        name='openings'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' id="demo-simple-select-helper-label">Experience</InputLabel>
                                    <Select
                                        variant='outlined'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formdata.experience}
                                        onChange={handleExpChange}
                                        name='experience'
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
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-location">CTC Upto</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-location"
                                        type='text'
                                        placeholder='in Inr'
                                        value={formdata.ctc}
                                        onChange={handlectcChange}
                                        name='ctc'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <TextField
                                        variant="outlined"
                                        id="outlined-multiline-static"
                                        label="Job Description"
                                        multiline
                                        rows={4}
                                        value={formdata.description}
                                        onChange={handleDescChange}
                                        name='description'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-location">Required Skils</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-location"
                                        type='text'
                                        placeholder='Add Comma Seperated Skills'
                                        value={formdata.skills}
                                        onChange={handleSkillChange}
                                        name='skills'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' id="demo-simple-select-helper-label">Payment type</InputLabel>
                                    <Select
                                        variant='outlined'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formdata.payType}
                                        onChange={handlePayTypeChange}
                                        name='payType'
                                    >
                                        <MenuItem value={1}>Fixed Pay</MenuItem>
                                        <MenuItem value={2}>Variable Pay</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                {formdata.payType === 1 ?
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-location">Salary</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-location"
                                            type='text'
                                            value={formdata.salary}
                                            onChange={handleSalaryChange}
                                            name='salary'
                                        />
                                    </FormControl> : <></>}
                                {formdata.payType === 2 ?
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-location">Variable pay</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-location"
                                            type='text'
                                            value={formdata.salary}
                                            onChange={handleSalaryChange}
                                            name='salary'
                                        />
                                    </FormControl> : <></>}
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel 
                                        className='bg-white py=[2px] px-[5px] mt-[-5px]'
                                        id="demo-simple-select-helper-label">Incentives</InputLabel>
                                    <Select
                                        variant='outlined'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formdata.incentives}
                                        onChange={handleIncentivesChange}
                                        name='locationType'
                                    >
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-location">Perks</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-location"
                                        type='text'
                                        placeholder='Add comma separated perks'
                                        value={formdata.perks}
                                        onChange={handlePerksChange}
                                        name='perks'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' id="demo-simple-select-helper-label">Probation period</InputLabel>
                                    <Select
                                        variant='outlined'
                                        value={formdata.probation}
                                        type='text'
                                        onChange={handleProbationChange}
                                        name='probation'
                                    >
                                        <MenuItem value={"No probation"}>No probation</MenuItem>
                                        <MenuItem value={"1 week"}>1 week</MenuItem>
                                        <MenuItem value={"2 week"}>2 weeks</MenuItem>
                                        <MenuItem value={"3 week"}>3 weeks</MenuItem>
                                        <MenuItem value={"1 month"}>1 month</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                {formdata.probation === undefined || formdata.probation === 0 ? <></> :
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-location">Probation Salary</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-location"
                                            value={formdata.probationSalary}
                                            onChange={handleProbSalaryChange}
                                            name='probationSalary'
                                        />
                                    </FormControl>}
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' id="demo-simple-select-helper-label">Start Date</InputLabel>
                                    <Select
                                        variant='outlined'
                                        value={formdata.startDate}
                                        onChange={handleDateChange}
                                    >
                                        <MenuItem value={0}>Immidiately</MenuItem>
                                        <MenuItem value={1}>Next week</MenuItem>
                                        <MenuItem value={2}>After 2 weeks</MenuItem>
                                        <MenuItem value={3}>Next month</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid> :
                        <Grid container spacing={3}>
                            <Grid item md={8} sm={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-name">Internship Title</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-name"
                                        type='text'
                                        onChange={handletitleChange}
                                        value={formdata.title}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' id="demo-simple-select-helper-label">Internships Type</InputLabel>
                                    <Select
                                        variant='outlined'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={handletypeChange}
                                        value={formdata.type}
                                    >
                                        <MenuItem value={1}>Part Time</MenuItem>
                                        <MenuItem value={2}>Full Time</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' id="demo-simple-select-helper-label">Location type</InputLabel>
                                    <Select
                                        variant='outlined'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={handleLocTypeChange}
                                        value={formdata.locationType}
                                    >
                                        <MenuItem value={1}>Work From Home</MenuItem>
                                        <MenuItem value={2}>In Office</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                {formdata.locationType === 2 ?
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-location">City/Location</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-location"
                                            type='text'
                                            onChange={handleLocationChange}
                                            value={formdata.location}
                                        />
                                    </FormControl> : <></>}
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-location">Openings</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-location"
                                        type='number'
                                        onChange={handleOpnChange}
                                        value={formdata.openings}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <TextField
                                        variant="outlined"
                                        id="outlined-multiline-static"
                                        label="Internship Description"
                                        multiline
                                        rows={4}
                                        onChange={handleDescChange}
                                        value={formdata.description}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <TextField
                                        variant="outlined"
                                        id="outlined-multiline-static"
                                        label="Intern's Day-to-day responsibilities"
                                        multiline
                                        rows={4}
                                        onChange={handleRespChange}
                                        value={formdata.resp}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-location">Required Skils</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-location"
                                        type='text'
                                        placeholder='Add Comma Seperated Skills'
                                        onChange={handleSkillChange}
                                        value={formdata.skills}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' id="demo-simple-select-helper-label">Stipend </InputLabel>
                                    <Select
                                        variant='outlined'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formdata.stipend}
                                        onChange={handleStipendChange}
                                    >
                                        <MenuItem value={1}>Unpaid</MenuItem>
                                        <MenuItem value={2}>Fixed Stipend</MenuItem>
                                        <MenuItem value={3}>Performance Based</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                {formdata.stipend === 3 ?
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-location">Expected Range</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-location"
                                            type='text'
                                            placeholder='Stipend will upto'
                                            value={formdata.salary}
                                            onChange={handleSalaryChange}
                                        />
                                    </FormControl> : <></>}
                                {formdata.stipend === 2 ?
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-location">Stipend Amount</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-location"
                                            type='number'
                                            value={formdata.salary}
                                            onChange={handleSalaryChange}
                                        />
                                    </FormControl> : <></>}
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel 
                                        className='bg-white py=[2px] px-[5px] mt-[-5px]' 
                                        id="demo-simple-select-helper-label">Incentives</InputLabel>
                                    <Select
                                        variant='outlined'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formdata.incentives}
                                        onChange={handleIncentivesChange}
                                        name='locationType'
                                    >
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-location">Incentives</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-location"
                                        type='text'
                                        placeholder='Add comma separated incentives'
                                        value={incentives}
                                        onChange={handleIncentivesChange}
                                    />
                                </FormControl>
                            </Grid> */}
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-location">Perks</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-location"
                                        type='text'
                                        placeholder='Add comma separated perks'
                                        value={formdata.perks}
                                        onChange={handlePerksChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' id="demo-simple-select-helper-label">Probation period</InputLabel>
                                    <Select
                                        variant='outlined'
                                        value={formdata.probation}
                                        type='text'
                                        onChange={handleProbationChange}

                                    >
                                        <MenuItem value={"No probation"}>No probation</MenuItem>
                                        <MenuItem value={"1 week"}>1 week</MenuItem>
                                        <MenuItem value={"2 week"}>2 weeks</MenuItem>
                                        <MenuItem value={"3 week"}>3 weeks</MenuItem>
                                        <MenuItem value={"1 month"}>1 month</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                {formdata.probation === 0 || formdata.probation === undefined ? <></> :
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' htmlFor="outlined-adornment-location">Probation Salary</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-location"
                                            value={formdata.probationSalary}
                                            onChange={handleProbSalaryChange}
                                        />
                                    </FormControl>}
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel className='bg-white py=[2px] px-[5px] mt-[-5px]' id="demo-simple-select-helper-label">Start Date</InputLabel>
                                    <Select
                                        variant='outlined'
                                        value={formdata.startDate}
                                        onChange={handleDateChange}
                                    >
                                        <MenuItem value={0}>Immidiately</MenuItem>
                                        <MenuItem value={1}>Next week</MenuItem>
                                        <MenuItem value={2}>After 2 weeks</MenuItem>
                                        <MenuItem value={3}>Next month</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                    }

                    <Box className="text-center pt-[20px]">
                        {formdata.btnState === 2 ?
                            <Button
                                //  onClick={urlParamId === null ? handleSubmit : handleEdit}
                                 onClick={handleSubmit }
                                type='button' variant="outlined" color="primary" className={classes.Button}  >
                                {urlParamId === null ? 'Create Job Card' : 'Update Job Card'}
                            </Button> :
                            <Button
                                //  onClick={urlParamId === null ? handleSubmit : handleEdit}
                                onClick={handleSubmit }
                                type='button' variant="outlined" color="primary" className={classes.Button}  >
                                {urlParamId === null ? 'Create internship Card' : 'Update internship Card'}
                            </Button>}
                    </Box>
                </Box>
            </Container>

             : 

             <Container>
                <Box className='min-h-[80vh] flex flex-col items-center justify-center'>
                    <Box sx={{ padding: '10px' }} className="text-center pt-[20px]">
                        <Typography variant="h4">You are not authorised to this Page</Typography>
                    </Box>
                    <Box className="text-center pt-[20px]">
                        <Button onClick={() => { navigate('/'); }} type='button' variant="outlined" color="primary" className={classes.Button}  >
                            return Home
                        </Button>
                    </Box>
                </Box>
            </Container>
            };

        </div >



        <div className='sm:mx-4 md:py-12 md:my-16 md:mx-24 bg-gray-50 md:shadow-2xl'>

            {admin ?  
                <>
                <div className='mb-8 md:ml-36  '>
                    <button href='jobform' onClick={handleBtn2Toggle} className={`border-2 w-[12rem] mr-4 border-[#003979] text-[#003979]  font-semibold rounded-full px-12 py-2 mt-7 inline-block ${formdata.btnState === 2 && "bg-[#003979] text-white" } hover:bg-[#003979] hover:text-white`}>Add Job</button>
                    <button href='internshipform' onClick={handleBtn1Toggle} className={`border-2 border-[#003979] text-[#003979] font-semibold rounded-full px-12 py-2 mt-7 inline-block ${formdata.btnState === 1 && "bg-[#003979] text-white" } hover:bg-[#003979] hover:text-white`}>Add Internship</button>
                </div>

                {formdata.btnState === 2 && <Jobform formdata={formdata} setFormdata={setFormdata} />  }
                {formdata.btnState === 1 && <Internshipform formdata={formdata} setFormdata={setFormdata} />}
                </>

                :
                <b>You are not authorised to view this page</b>
            }

      
    
    </div>




        </div >
    )
}
export default Addjob;
