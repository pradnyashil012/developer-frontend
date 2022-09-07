import React, { useState, useEffect } from "react";
import { Container, Grid, Box, makeStyles, Typography, ButtonGroup, Button, Card, CardHeader, CardContent, CardActions, List, ListItem, Paper, MenuList, MenuItem, Divider } from "@material-ui/core";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { Navigate, useNavigate } from "react-router-dom";
import Axios from 'axios';
//import { ListItemButton } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    mainbox: {
        marginTop: '100px',

    },
    leftNav: {
        //   border:'2px solid black',
        width: '29%',
        height: '500px',
        //   position:'fixed',
    },
    fixedWidthContainer: {
        marginLeft: '2px',
        width: '70%',
        // border:'2px solid red',
        height: '500px',
        overflowY: 'scroll'
    },
    list: {
        height: '100%',
    },
    G: {
        height: '20%',
        alignItems: 'center'
    },
    Button: {
        color: 'blue',
        padding: '0px',
        height: '100%',
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "white",
        },

    },
    card: {
        marginTop: '5px',
        margin: '3px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    text: {
        fontSize: '15px',
    }
}))

const BussinessProfile = () => {
    const navigate = useNavigate();
    const [buisnessDetails, setBuisnessDetails] = useState();
    const token = localStorage.getItem('tokenNew');
    console.log(token);

    useEffect(async ()=>{
        if(token){
            const response = await Axios.get('https://cryptonaukribackend.herokuapp.com/api/v1/business/loggedInBusinessDetails', {
                                headers: {
                                    "Authorization": `Bearer ${token}`,
                                }
                            });
            setBuisnessDetails(response.data);
            console.log(response);
        }
    },[])

    const classes = useStyles();
    const [option, setOption] = useState('Posted Jobs');

    if(!buisnessDetails){
        return("Loading...")
    }

    return (
        <div className={classes.mainbox}>
            <Container>
                <Grid container className={classes.root}>
                    <Grid item className={classes.leftNav}>
                        <Box sx={{
                            margin: '35px 10px'
                        }}>
                            <Paper sx={{ width: 320, maxWidth: '100%' }}>
                                <MenuList>
                                    <MenuItem onClick={() => { setOption('Posted Internships') }}>
                                        <ListItemText>Your Internships</ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={() => { setOption('Posted Jobs') }}>
                                        <ListItemText>Your Jobs</ListItemText>
                                    </MenuItem>
                                </MenuList>
                            </Paper>
                            </Box>
                            <Box sx={{
                            margin: '35px 10px',justifyContent:'center'
                        }}>
                            <Paper sx={{ width: 320, maxWidth: '100%',margin: '35px'}}>
                                <MenuList>
                                    
                                    <MenuItem style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
                                    <Button variant="contained" color="primary" endIcon={<AddCircleOutlineSharpIcon/> }  onClick={() => {navigate('/jobform')}} >Add Job </Button>  
                                    </MenuItem>
                                </MenuList>
                            </Paper>
                        </Box>
                    </Grid>

                    <Grid item className={classes.fixedWidthContainer}>
                        {option === "Posted Internships" &&
                            <Grid >
                                <Typography variant="h5">
                                    <Box sx={{
                                        fontWeight: 'bold',
                                    }}>
                                        Your Internships Jobs
                                    </Box>
                                </Typography>
                                <Grid item >
                                    {buisnessDetails.internshipsAdded.length===0?<>You have not yet posted any jobs</>:<></>}
                                    {buisnessDetails.internshipsAdded.reverse().map((job)=>{
                                        console.log(job)
                                        return(
                                        <Card sx={{ maxWidth: 20 }} className={classes.card}>
                                            <CardHeader
                                                title={job.internshipTitle}
                                                subheader={job.postedOn.split("T")[0]}
                                            />
                                            <CardContent>
                                                <Typography variant="subtitle2">
                                                    <span>Details : </span>
                                                    {job.responsibilities.substring(0,160)}...
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary" onClick={() => {navigate(`/details?id=${job._id}`)}} >Details</Button>
                                            </CardActions>
                                        </Card>);
                                    })}
                                </Grid>
                            </Grid>}
                        {option === "Posted Jobs" &&
                            <Grid >
                                <Typography variant="h5">
                                    <Box sx={{
                                        fontWeight: 'bold',

                                    }}>
                                        Your Posted Jobs
                                    </Box>
                                </Typography>
                                <Grid item >
                                    {buisnessDetails.jobsAdded.length===0?<>You have not yet posted any jobs</>:<></>}
                                    {buisnessDetails.jobsAdded.reverse().map((job)=>{
                                        console.log(job)
                                        return(
                                        <Card sx={{ maxWidth: 20 }} className={classes.card}>
                                            <CardHeader
                                                title={job.jobTitle}
                                                subheader={job.postedOn.split("T")[0]}
                                            />
                                            <CardContent>
                                                <Typography variant="subtitle2">
                                                    <span>Details : </span>
                                                    {job.jobDescription.substring(0,160)}...
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary" onClick={() => {navigate(`/details?id=${job._id}`)}} >Details</Button>
                                            </CardActions>
                                        </Card>);
                                    })}
                                </Grid>
                            </Grid>}
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
export default BussinessProfile;
