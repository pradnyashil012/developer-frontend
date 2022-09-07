import { Container, Box, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import InternshipCard from './internships/Internship-Card';
import JobCardLoading from './Job-Card/JobCardLoading';
import Axios from 'axios';

const InternshipPage = () => {
    const [dataArr, setDataArr] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [datarr, setDataArr] = React.useState([]);


    useEffect(async ()=>{
        setLoading(true);
        const response = await Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/internship/findInternship`)
        .then((res)=>{
            //console.log(res);
            const resp = res.data;
            //console.log(resp.data);
            setDataArr(resp.data);
            //console.log(dataArr);
            setLoading(false);
            
        })
        .catch((err)=>{
            setLoading(false);
        });
    } ,[]);
    return (
        <div className="bg-gray-800 pt-16">
        <div className="text-white bg-gray-800 p-4 max-w-7xl m-auto">
            <div className="text-white text-lg bg-gray-800 p-2 w-fit border rounded-md">Discover Internships</div>
            <div className="mt-3 flex flex-wrap gap-3">
                {
                    loading === true ?
                    <>
                        <JobCardLoading />
                        <JobCardLoading />
                        <JobCardLoading />
                        <JobCardLoading />
                        <JobCardLoading />
                    </> :
                    <>
                        {
                            dataArr.slice(0).reverse().map((internship) => {
                                return (
                                    <InternshipCard 
                                        position={internship.internshipTitle} 
                                        cmp={internship.postedByDetails.companyName} 
                                        opn={internship.openings}
                                        responsibilities={internship.responsibilities}
                                        perks={internship.perks.split}
                                        key={internship._id}
                                        srId={internship._id}
                                        type={"internship"}
                                        duration={internship.duration}
                                    />
                                )
                            })
                        }
                    </>
                }
            </div>
        </div>
    </div>
    )
}
export default InternshipPage;


// ** old material ui

// const useStyles = makeStyles((theme) => ({
//     body:{
//         marginTop:'70px'
//     }
// }));

// const classes = useStyles();

{/* <>
<div className={classes.body} >
    <Container>
        <Box sx={{
            paddingTop: '20px'
        }}>
            <h1 style={{ margin: '10px 0' }}>Discover Internships</h1>
            {loading?
                <>
                    <JobCardLoading />
                    <JobCardLoading />
                    <JobCardLoading />
                </>:<>
                    {
                        dataArr.slice(0).reverse().map((internship) => {
                            //console.log(internship);

                            return( 
                                <InternshipCard 
                                    position={internship.internshipTitle} 
                                    cmp={internship.postedByDetails.companyName} 
                                    opn={internship.openings}
                                    responsibilities={internship.responsibilities}
                                    perks={internship.perks.split}
                                    key={internship._id}
                                    srId={internship._id}
                                    type={"internship"}
                                    duration={internship.duration}
                                />);
                        })
                    } 
            </>}
        </Box>
    </Container>
</div>
</> */}