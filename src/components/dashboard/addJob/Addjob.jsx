import { useEffect, useState } from 'react';
import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useSearchParams } from "react-router-dom";
import Axios from 'axios';

import Jobform from "./Jobform"
import Internshipform from "./Internshipform"

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw} from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const Addjob = () => {
    const token = localStorage.getItem('tokenNew');
    //console.log("On job form ",token);
    const postjobAPI = 'https://cryptonaukribackend.herokuapp.com/api/v1/jobs/postJob';
    const postIntAPI = 'https://cryptonaukribackend.herokuapp.com/api/v1/internship/postInternship';

    let editorState = EditorState.createEmpty();

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
        description:(editorState),
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

    const CurrentDate = new Date();
    const day = CurrentDate.getDate().toString();
    const month = (CurrentDate.getMonth() + 1).toString();
    const year = CurrentDate.getFullYear().toString();
    const date = (year + '-0' + month + '-' + day).toString();
    console.log(date)

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
        setFormdata({...formdata, btnState: 1})
    }

    const handleBtn2Toggle = () => {
        setFormdata({...formdata, btnState: 2})
    }

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

    //     if (formdata.type === 1) {

    //         const response = await Axios.patch(`https://cryptonaukri-backend.herokuapp.com/jobs/${urlParamId}`, { position, company, experience, openings, link });

    //         toast.success('jobCard Updated !!');
    //         navigate('/')

    //     } else if (formdata.type === 2) {

    //         const response = await Axios.patch(`https://cryptonaukri-backend.herokuapp.com/internships/${urlParamId}`, { position, company, openings, link });

    //         toast.success('InternshipCard Updated !!');
    //         navigate('/')

    //     }
    // }
    return (
        <div className='sm:mx-4 md:py-12 md:my-16 md:mx-24 bg-gray-50 md:shadow-2xl'>

            {admin ?  
                <>
                <div className='mb-8 md:ml-36  '>
                    <button href='jobform' onClick={handleBtn2Toggle} className={`border-2 w-[12rem] mr-4 border-[#003979] text-[#003979]  font-semibold rounded-full px-12 py-2 mt-7 inline-block ${formdata.btnState === 2 && "bg-[#003979] text-white" } hover:bg-[#003979] hover:text-white`}>Add Job</button>
                    <button href='internshipform' onClick={handleBtn1Toggle} className={`border-2 border-[#003979] text-[#003979] font-semibold rounded-full px-12 py-2 mt-7 inline-block ${formdata.btnState === 1 && "bg-[#003979] text-white" } hover:bg-[#003979] hover:text-white`}>Add Internship</button>
                </div>

                {formdata.btnState === 2 && <Jobform formdata={formdata} setFormdata={setFormdata} handleSubmit={handleSubmit} />  }
                {formdata.btnState === 1 && <Internshipform formdata={formdata} setFormdata={setFormdata} handleSubmit={handleSubmit} />}
                </>

                :
                <b>You are not authorised to view this page</b>
            }
        </div>
    )
}
export default Addjob;