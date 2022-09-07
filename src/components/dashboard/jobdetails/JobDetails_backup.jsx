import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  makeStyles,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "axios";
import { useCookies } from "react-cookie";
import {AiOutlineFilePdf} from 'react-icons/ai';

const useStyles = makeStyles((theme) => ({
  mainbox: {
    marginTop: "100px",
  },
  leftNav: {
    //   border:'2px solid black',
    width: "29%",
    height: "500px",
    //   position:'fixed',
  },
  fixedWidthContainer: {
    marginLeft: "2px",
    width: "70%",
    // border:'2px solid red',
    height: "500px",
    overflowY: "scroll",
  },
  list: {
    height: "100%",
  },
  G: {
    height: "20%",
    alignItems: "center",
  },
  Button: {
    color: "blue",
    padding: "0px",
    height: "100%",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  card: {
    marginTop: "5px",
    margin: "3px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  text: {
    fontSize: "15px",
  },
}));

const JobDetails = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  var url_string = window.location.href;
  var url = new URL(url_string);
  var jobid = url.searchParams.get("id");
  var jobtype = url.searchParams.get("type");

  const [jobInfo, setJobInfo] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  console.log(jobtype);
  console.log("LOLO");

  const userApi = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/business/loggedInBusinessDetails`;
  const internAPI = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/internship/findInternship/`;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      console.log("lol");
      setLoading(true);
      const response = await Axios.get(userApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserLoading(true);

      console.log(response);
      let jobdata = response.data.jobsAdded.find(({ _id }) => _id === jobid);

      if (!jobdata) {
        jobdata = response.data.internshipsAdded.find(
          ({ _id }) => _id === jobid
        );
      }

      jobdata?.usersApplied.map(async (user, index) => {
        const response2 = await Axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/v1/user/userDetails?userID=${user.userAssociated}`
        );
        const duser = response2.data.details;
        jobdata.usersApplied[index].email = duser.email;
        jobdata.usersApplied[index].name =
          duser.firstName + " " + duser.lastName;
        setUsersData((usersData) => [...usersData, duser]);
        console.log(usersData);
      });
      setUserLoading(false);

      setJobInfo(jobdata);
      //setJobInfo(jobdata);
      setLoading(false);
      //console.log(jobdata);

      // jobdata.usersApplied.map((user, index)=>{
      //     fetchUserData(user.userAssociated);
      // })
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong !!!");
    }
  }, []);

  if (loading || !jobInfo) {
    return <>Loading...</>;
  }

  console.log(!loading && usersData);

  console.log(!loading && jobInfo.usersApplied);

  return (
    <div>
    <div className={classes.mainbox}>
      <Container>
        <Paper sx={{ width: 320, maxWidth: "100%" }}>
          <Box
            sx={{
              padding: "20px",
            }}
          >
            <Typography variant="h5">
              <Box
                sx={{
                  fontWeight: "bold",
                }}
              >
                {jobInfo.jobTitle}
              </Box>
            </Typography>
            <Typography variant="h6">
              <Box
                sx={{
                  fontWeight: "regular",
                }}
              >
                <a href={jobInfo.postedByDetails.websiteLink}>
                  {jobInfo.postedByDetails.companyName}
                </a>
              </Box>
            </Typography>
            <Typography variant="p">
              <Box
                sx={{
                  fontWeight: "regular",
                }}
              >
                Details : {jobInfo.jobDescription}
              </Box>
            </Typography>

            <Box
              sx={{
                fontWeight: "regular",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                paddingTop: "20px",
              }}
            >
              <div>
                <Typography variant="p">
                  <Box
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Listing Date
                  </Box>
                  <Box
                    sx={{
                      fontWeight: "regular",
                    }}
                  >
                    {jobInfo.postedOn.split("T")[0]}
                  </Box>
                </Typography>
              </div>
              <div>
                <Typography variant="p">
                  <Box
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Experince
                  </Box>
                  <Box
                    sx={{
                      fontWeight: "regular",
                    }}
                  >
                    {jobInfo.experience}
                  </Box>
                </Typography>
              </div>
              <div>
                <Typography variant="p">
                  <Box
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    CTC
                  </Box>
                  <Box
                    sx={{
                      fontWeight: "regular",
                    }}
                  >
                    {jobInfo.ctc}
                  </Box>
                </Typography>
              </div>
              <div>
                <Typography variant="p">
                  <Box
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Applications
                  </Box>
                  <Box
                    sx={{
                      fontWeight: "regular",
                    }}
                  >
                    {jobInfo.numberOfApplicants}
                  </Box>
                </Typography>
              </div>
            </Box>
          </Box>
        </Paper>

        <Typography variant="h5">
          <Box
            sx={{
              fontWeight: "bold",
              padding: "10px",
            }}
          >
            Applicants
          </Box>
        </Typography>
        {jobInfo.usersApplied.length === 0 ? (
          <>Oops you currently have 0 applicants for this job</>
        ) : (
          <></>
        )}
        {userLoading ? (
          <>Loading...</>
        ) : (
          <>
            {usersData.map((user, index) => {
              console.log(user);
              //const  userDetails = user.userDetials;
              return (
                <Paper key={user.userAssociated}>
                  <Box
                    sx={{
                      marginTop: "10px",
                      padding: "10px",
                    }}
                  >
                    <Typography variant="h6">
                      <Box
                        sx={{
                          fontWeight: "regular",
                        }}
                      >
                        {index + 1}. {user.firstName + "" + user.lastName}
                      </Box>
                    </Typography>
                    <Typography variant="subtitle1">
                      <Box
                        sx={{
                          fontWeight: "regular",
                        }}
                      >
                        <b>Email: </b> {user.email}
                      </Box>
                    </Typography>

                    <Typography variant="subtitle1">
                      <Box
                        sx={{
                          fontWeight: "regular",
                        }}
                      >
                        <b>Phone: </b> {user.phoneNumber}
                      </Box>
                    </Typography>

                    <div style={{ margin: "16px 0" }}>
                      {user.userResume?.links ? (
                        <Button
                          type="button"
                          variant="contained"
                          color="primary"
                          href={user.userResume.links.otherLinks[0]}
                        >
                          Resume
                        </Button>
                      ) : (
                        "No resume provided"
                      )}
                    </div>
                    {/* <Button
                      type='button'
                      onClick={() => {
                        setOpen(!open);
                      }}
                      variant='outlined'
                      color='primary'
                    >
                      {open ? <>Close</> : <>Details</>}
                    </Button> */}
                    {/* {open ? (
                      <>
                        <Typography variant='h6'>
                          <Box
                            sx={{
                              fontWeight: 'regular',
                            }}
                          >
                            Q1. Why Hire
                          </Box>
                        </Typography>
                        <Typography variant='p'>
                          <Box
                            sx={{
                              fontWeight: 'regular',
                            }}
                          >
                            Ans : {user.whyHire}
                          </Box>
                        </Typography>
                        <br />
                        <Typography variant='h6'>
                          <Box
                            sx={{
                              fontWeight: 'regular',
                            }}
                          >
                            Q2. Candidate Availability
                          </Box>
                        </Typography>
                        <Typography variant='p'>
                          <Box
                            sx={{
                              fontWeight: 'regular',
                            }}
                          >
                            Ans : {user.candidateAvailability}
                          </Box>
                        </Typography>
                      </>
                    ) : (
                      <></>
                    )} */}
                  </Box>
                </Paper>
              );
            })}
          </>
        )}
      </Container>
    </div>

    <div className="md:mx-44 bg-white">
      <div>
        <p>{jobInfo.jobTitle}</p>
        <a href={jobInfo.postedByDetails.websiteLink} target="_blank">
          {jobInfo.postedByDetails.companyName}
        </a>
        <p>Details : {jobInfo.jobDescription}</p>
        <div className="flex flex-row justify-between">
          <div>
            <p>Listing Date</p>
            <p>{jobInfo.postedOn.split("T")[0]}</p>
          </div>
          <div>
            <p>Experience</p>
            <p>{jobInfo.experience}</p>
          </div>
          <div>
            <p>CTC</p>
            <p>{jobInfo.ctc}</p>
          </div>
          <div>
            <p>Applications</p>
            <p>{jobInfo.numberOfApplicants}</p>
          </div>
        </div>
      </div>


      <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Sr no.
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Applicant Name
                </th>
                <th className="p-3 w-24 text-sm font-semibold tracking-wide text-left">
                  Email
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Contact
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Resume
                </th>
              </tr>
            </thead>

            

            {usersData.map((user,i)  => (
              <tbody className="divide-y divide-gray-100 ">
                <tr className="bg-white">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.firstName + "" + user.lastName}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.phoneNumber}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.userResume?.links ? (
                        <a
                          href={user.userResume.links.otherLinks[0]}
                          target="_blank"
                          className="text-red-800"
                        >
                          <AiOutlineFilePdf className="nav-icon"/>
                        </a>
                        ) : (
                        "Not provided"
                      )}
                    
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          {jobInfo.usersApplied.length === 0 ? ( <>Oops you currently have 0 applicants for this job</>) : (<></>)}
        </div>

        <div className="flex flex-col w-full md:hidden">
          {usersData.map((user,i)=> (
            <div className="bg-white space-y-3 p-4 my-2 rounded-lg shadow">
              <div className="text-sm text-gray-700">{i+1}.<br/><br/> Name: <b>{""+user.firstName + "" + user.lastName}</b></div>
              <div className="flex flex-col items-start text-sm">
                <div className="text-sm font-medium text-gray-500 ">
                  <p>Email: {user.email}</p>
                </div>
                <div className="text-gray-500 ">
                  <p>Contact number: {user.phoneNumber}</p>
                </div>
              </div>
              <div className="flex h-7 flex-row">
                <p>View Resume: </p>
                {user.userResume?.links ? (
                  <a
                    href={user.userResume.links.otherLinks[0]}
                    target="_blank"
                    className="text-red-800 ml-4"
                  >
                    <AiOutlineFilePdf className="nav-icon"/>
                  </a>
                  ) : (
                  "Not provided"
                  )}
              </div>
            </div>
          ))}
        </div>



    </div>


    </div>


  );
};

export default JobDetails;
