import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FiHome} from 'react-icons/fi';
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {MdOutlineOutbond, MdPeopleOutline, MdDateRange, MdMapsHomeWork} from 'react-icons/md'
import {GiMoneyStack} from 'react-icons/gi'
import {BiLinkExternal} from 'react-icons/bi'
import ApplyJobLoading from './applyJobLoading';

const ApplyJob = (props) => {
  const token = localStorage.getItem('token');
  const API = process.env.REACT_APP_API_ENDPOINT;
  var url_string = window.location.href;
  var url = new URL(url_string);
  var jobid = url.searchParams.get('id');
  var jobtype = url.searchParams.get('type');

  const [applied, setApplied] = useState(false);
  const [open, setOpen] = useState(false);
  const [jobInfo, setJobInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(1);
  const [avl, setAvl] = useState('');
  const [whyHire, setWhyHire] = useState('');
  const [resumeLink, setResumeLink] = useState('');

  const login = localStorage.getItem('login');
  const navigate = useNavigate();

  const jobAPI = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/jobs/`;
  const internAPI = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/internship/`;

  useEffect(() => {

    const fetchJob = async () => {
      try {
        setLoading(true);
        var endpoint = '';
        jobtype === 'internship'
          ? (endpoint = internAPI + 'findInternship')
          : (endpoint = jobAPI + 'findJob');
        console.log(endpoint);
        const response = await axios.get(`${endpoint}/${jobid}`);
        console.log(response.data);
        const jobdata = response.data.details;
        setJobInfo(jobdata);
        //console.log(jobdata);
        //console.log(jobInfo);
        setLoading(false);
      } catch (error) {
        //console.log(error.response);
        toast.error('Something went wrong !!');
      }
    };
    fetchJob();
  }, []);

  var jobPostedTime = jobInfo ? jobInfo.postedOn.split('T') : '';
  //console.log(jobPostedTime);

  const response = axios.get(`${API}/api/v1/user/loggedInUserDetails`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  response.then((data) => {
    // console.log(data);
    setResumeLink(data?.data?.userResume?.links?.otherLinks[0]);
    // setUser(data.data);
  });

  const handleStage2 = () => {
    if (resumeLink) {
      setStage(2);
      console.log(resumeLink);
    } else {
      toast.error('Please update your resume link in your profile first 😔');
    }
  };

  const handleApply = async () => {
    //console.log("ok apply krneka idhhr handle kari bhai !!");
    //console.log(whyHire, avl);
    var token = localStorage.getItem('token');

    try {
      var endpoint = '';
      jobtype === 'internship'
        ? (endpoint = internAPI + 'applyInternship')
        : (endpoint = jobAPI + 'applyJob');

      if (jobtype === 'internship') {
        const response = await axios.post(
          endpoint,
          {
            internshipAssociated: jobInfo._id,
            whyHire: whyHire,
            candidateAvailability: avl,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.code === 'INTERNSHIP_APPLIED') {
          toast.success('You have success fully applied for the job !!');
          setStage(3);
        }
      } else {
        const response = await axios.post(
          endpoint,
          {
            jobAssociated: jobInfo._id,
            whyHire: whyHire,
            candidateAvailability: avl,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //console.log(response);
        if (response.data.code === 'JOB_APPLIED') {
          toast.success('You have success fully applied for the job !!');
          setStage(3);
        }
      }
    } catch (error) {
      //console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  if (loading) {
    return (
      <ApplyJobLoading />
    );
  }

  return (
    <div className='w-full bg-gray-800 text-white'>
    {
      jobInfo && stage === 1 ? 
        <div className="px-3 pt-28 mx-auto w-full max-w-4xl md:px-0 pb-5">
          <div className='text-2xl'>
            {
            jobtype === 'job' ? 
              <>{jobInfo.jobTitle}</> :
              <>{jobInfo.internshipTitle}</>
            }
          </div>
          <div className='text-base text-gray-300 flex items-center'><MdMapsHomeWork/><span className='ml-1.5'>{jobInfo.postedByDetails.companyName}</span></div>
          <div className='mt-3 flex items-center'>
            {
              jobInfo.isRemote === true ?
              <FiHome /> :
              <HiOutlineLocationMarker />
            }
            <p className='ml-1'>{jobInfo.location}</p>
          </div>
          {
            jobtype === 'job' ? 
            <div className='flex items-center justify-between mt-2'>
              <div className='flex flex-col items-start justify-center'>
                <div className='flex items-center'><GiMoneyStack/><p className='ml-1'>CTC</p></div>
                <div className='text-sm text-gray-300'>
                  {(jobInfo.ctc)?.toLocaleString('en-US',{style:'currency', currency:'INR'})}
                </div>
              </div>
              <div className='flex flex-col items-start justify-center'>
                <div className='flex items-center'><MdOutlineOutbond /><p className='ml-1'>Fixed Pay</p></div>
                <div className='text-sm text-gray-300'>
                  {
                    jobInfo.fixedPay !== undefined ?
                    <>{jobInfo.fixedPay}</> :
                    "NA"
                  }
                </div>
              </div>
              <div className='flex flex-col items-start justify-center'>
                <div className='flex items-center'><MdPeopleOutline/><p className='ml-1'>Applicants</p></div>
                <div className='text-sm text-gray-300'>{jobInfo.numberOfApplicants}</div>
              </div>
            </div> : 
            <div className='flex items-center justify-between mt-2'>
              <div className='flex flex-col items-start justify-center'>
                <div className='flex items-center'><GiMoneyStack/><p className='ml-1'>Stipend</p></div>
                <div className='text-sm text-gray-300'>
                  {(jobInfo.stipend.amount)?.toLocaleString('en-US',{style:'currency', currency:'INR'})}
                </div>
              </div>
              <div className='flex flex-col items-start justify-center'>
                <div className='flex items-center'><MdDateRange /><p className='ml-1'>Duration</p></div>
                <div className='text-sm text-gray-300'>
                  {jobInfo.duration===""?"NA":jobInfo.duration}
                </div>
              </div>
              <div className='flex flex-col items-start justify-center'>
                <div className='flex items-center'><MdPeopleOutline/><p className='ml-1'>Applicants</p></div>
                <div className='text-sm text-gray-300'>{jobInfo.usersApplied.length}</div>
              </div>
            </div>
          }
          <div className='mt-3'>
            <div className='text-sm'>Posted by <span className='text-gray-300'>{jobInfo.postedByDetails.executiveName}</span> on <span className='text-gray-300'>{jobPostedTime[0]}</span></div>
          </div>
          <div className='w-full my-2 text-gray-300 border-t'></div>
          <div className='mt-3'>
            <div className='text-xl'>About Company</div>
            {
              jobtype === 'job' ?
              <a href={jobInfo.postedByDetails.websiteLink} target="_blank" className='text-cyan-600 w-fit'>
                <div className='flex items-center w-fit'><span className='mr-1'>Website</span><BiLinkExternal/></div>
              </a> :
              <a href={jobInfo.postedBy.websiteLink} target="_blank" className='text-cyan-600 w-fit'>
                <div className='flex items-center w-fit'><span className='mr-1'>Website</span><BiLinkExternal/></div>
              </a>
            }
            {
              jobInfo.postedBy.description === undefined ?
              <div className='text-base text-gray-300'>NA</div> :
              <div className='text-base text-gray-300'>{jobInfo.postedBy.description}</div>
            }
          </div>

          <div className='mt-3'>
            <div className='text-xl'>Perks</div>
            {
              jobtype === 'job' ?
              <div className='flex flex-wrap gap-2 mt-2'>
                {
                  jobInfo.healthInsurance ?
                  <div className='grow-0 shrink py-1 px-2 rounded-2xl bg-slate-500 text-white text-sm w-fit'>Health Insurance</div> : null
                }
                {jobInfo.informalDress ? 
                  <div className='grow-0 shrink py-1 px-2 rounded-2xl bg-slate-500 text-white text-sm w-fit'>Informal Dress</div> : null 
                }
                {jobInfo.incentives ? 
                  <div className='grow-0 shrink py-1 px-2 rounded-2xl bg-slate-500 text-white text-sm w-fit'>Incentives</div> : null
                }
              </div> :
              <div className='flex flex-wrap gap-2 mt-2'>
              {
                jobInfo.perks.certificate ?
                <div className='grow-0 shrink py-1 px-2 rounded-2xl bg-slate-500 text-white text-sm w-fit'>Certificate</div> : null
              }
              {jobInfo.perks.food ? 
                <div className='grow-0 shrink py-1 px-2 rounded-2xl bg-slate-500 text-white text-sm w-fit'>Food</div> : null 
              }
              <div className='grow-0 shrink py-1 px-2 rounded-2xl bg-slate-500 text-white text-sm w-fit'>Work Hours: {jobInfo.perks.workHours}</div>
              {jobInfo.perks.letterOfRecommendation ? 
                <div className='grow-0 shrink py-1 px-2 rounded-2xl bg-slate-500 text-white text-sm w-fit'>Letter Of Recommendation</div> : null
              }
              {jobInfo.perks.isPPO ? 
                <div className='grow-0 shrink py-1 px-2 rounded-2xl bg-slate-500 text-white text-sm w-fit'>PPO</div> : null
              }
            </div>
            }
          </div>
          
          <div className='mt-3'>
            <div className='text-xl'>{jobtype === 'job' ? "Job Description" : "Responsibilities"}</div>
            {
              jobtype === 'job' ?
              <div className='text-base text-gray-300'>
                {
                  jobInfo.jobDescription === "" ?
                  "NA" : jobInfo.jobDescription === undefined ? "NA" : <>{jobInfo.jobDescription}</>
                }
              </div> : 
              <div className='text-base text-gray-300'>
                {
                  jobInfo.responsibilities === "" ?
                  "NA" : jobInfo.responsibilities === undefined ? "NA" : <>{jobInfo.responsibilities}</>
                }
              </div>
            }
          </div>

          <div className='mt-3'>
            <div className='text-xl'>Required Skills</div>
            <div className='flex gap-2 flex-wrap'>
              {
                jobInfo.skills.map((skill, index)=>{
                  return (
                    <div key={index} className='grow-0 shrink py-1 px-2 rounded-2xl bg-slate-500 text-white text-sm w-fit'>{skill}</div>
                    )
                  })
                }
            </div>
          </div>

          <div className='mt-3'>
            <div className='text-xl'>Number of openings</div>
            <div className='text-base text-gray-300'>{jobInfo.openings}</div>
          </div>

          <div className='mt-3'>
            {
              token ?
              <>
              {
                applied ?
                  <button className='px-3 py-1.5 rounded-md bg-blue-800 hover:bg-blue-900'>ALREADY APPLIED</button> :
                  <button onClick={() => {
                    handleStage2();
                  }} className='px-3 py-1.5 rounded-md bg-blue-800 hover:bg-blue-900'>APPLY</button>
                  
              }
              </> :
              <>
                <button onClick={() => {
                  navigate(`/auth/devlogin?redirectid=${jobid}&redirecttype=${jobtype}`)
                  }} className='px-3 py-1.5 rounded-md bg-blue-800 hover:bg-blue-900'>LOGIN TO APPLY</button>
              </>

            }
          </div>
        </div> : 
      null
    }

    {
      stage === 2 ? 
        <div className='px-3 pt-28 mx-auto w-full max-w-4xl md:px-0 h-screen'>
          <div className=''>
            <div className='text-2xl flex items-center'>Answer the following to questions to move forward</div>
            <div className='text-sm text-gray-300'><span className=' text-red-600'>Note: </span>Before applying, make sure you have lastest resume updated in your dashboard.</div>

            <div>
              <div class="mt-4">
                <input required value={whyHire} onChange={(e) => {setWhyHire(e.target.value)}} type="textarea" placeholder='Be creative, think what makes you different.' id='whyhire' className="text-gray-300 w-full bg-transparent border-b py-1 focus:outline-none focus:border-cyan-600 focus:border-b-2 focus:mt-0.5 transition-colors peer" autocomplete="off" />
                <label for='whyhire' className="text-gray-300 cursor-text text-sm peer-focus:text-cyan-600 transition-all">
                  Why Should we hire you?
                </label>
              </div>
              <div class="mt-4">
                <input required value={avl} onChange={(e) => {setAvl(e.target.value)}} type="textarea" placeholder='Can you join immediately? Tell us more about you availability.' id='whenstart' className="text-gray-300 w-full bg-transparent border-b py-1 focus:outline-none focus:border-cyan-600 focus:border-b-2 focus:mt-0.5 transition-colors peer" autocomplete="off" />
                <label for='whenstart' className="text-gray-300 cursor-text text-sm peer-focus:text-cyan-600 transition-all">
                  When can you start working?
                </label>
              </div>
            </div>

            <div className='mt-5 flex flex-row items-center gap-3.5'>
              <button onClick={() => {handleApply(1)}} className='px-3 py-1.5 rounded-md bg-blue-800 hover:bg-blue-900'>SUBMIT</button>
              <button onClick={() => {setStage(1)}} className='px-3 py-1.5 rounded-md bg-slate-400 hover:bg-slate-500'>BACK</button>
            </div>
          </div>
          <div className='px-3 pt-28 mx-auto w-full max-w-4xl md:px-0 h-screen'>
            <div className='flex flex-col items-center'>
              <div className='flex items-center text-2xl text-green-600 text-center'>Congratulations! you have successfully applied for the job.</div>
              <div className='text-center '>Rest assured your application is sent to the recruiter.</div>
              <button onClick={() => {setStage(1)}} className='mt-4 px-3 py-1.5 rounded-md bg-slate-400 hover:bg-slate-500' >BACK</button>
            </div>
          </div> : 
          </div> : 
        <></>
      }
    </div>
  );
};

export default ApplyJob;