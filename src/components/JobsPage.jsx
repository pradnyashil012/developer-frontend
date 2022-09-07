import { Container, Box, makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import JobCard from './Job-Card/JobCard';
import JobCardLoading from './Job-Card/JobCardLoading';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';


const JobsPage = (e) => {
    // const classes = useStyles();
    const [dataArr, setDataArr] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [datarr, setDataArr] = React.useState([]);


    useEffect(async ()=>{
        setLoading(true);
        const response = await Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/jobs/findJob`)
        .then((res)=>{
            //console.log(res);
            const resp = res.data;
            //console.log(resp.data);
            setDataArr(resp.data);
            //console.log(dataArr);
            setLoading(false);
            // setLoading(true);
            
        })
        .catch((err)=>{
            setLoading(false);
        });
    } ,[]);
    return (

        <div className="bg-gray-800 pt-16">
            <div className="text-white bg-gray-800 p-4 max-w-7xl m-auto">
                <div className="text-white text-lg bg-gray-800 p-2 w-fit border rounded-md">Discover Jobs</div>
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
                                dataArr.slice(0).reverse().map((job) => {
                                    return (
                                        <JobCard 
                                            position={job.jobTitle} 
                                            cmp={job.postedByDetails.companyName} 
                                            opn={job.openings}
                                            exp={job.experience}
                                            description={job.jobDescription}
                                            perks={job.perks.split}
                                            key={job._id}
                                            srId={job._id}
                                            type={"job"}
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
export default JobsPage;



// ** old material code -- need to be deprecated

// const useStyles = makeStyles((theme) => ({
//     body:{
//         marginTop:'70px'
//     }
// }));


// <div className={classes.body}>
//     <Container>
//         <Box sx={{
//             paddingTop: '20px'
//         }}>
//             <h1 style={{ margin: '10px 0' }}>Discover Jobs</h1>
//             {loading?
//                 <>
//                     <JobCardLoading />
//                     <JobCardLoading />
//                     <JobCardLoading />
//                 </>:<>
//                     {
//                         dataArr.slice(0).reverse().map((job) => {
//                             //console.log(internship);

//                             return( 
//                                 <JobCard 
//                                     position={job.jobTitle} 
//                                     cmp={job.postedByDetails.companyName} 
//                                     opn={job.openings}
//                                     exp={job.experience}
//                                     description={job.jobDescription}
//                                     perks={job.perks.split}
//                                     key={job._id}
//                                     srId={job._id}
//                                     type={"job"}
//                                 />);
//                         })
//                     } 
//             </>}
//         </Box>
//     </Container>
// </div>
