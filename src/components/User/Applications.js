import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const UserApplicationsDetails = ({appliedAtJobs, appliedAtInternships}) =>{
    // console.log(appliedAtInternships);

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(1);

    // console.log(appliedAtJobs)

    return(<>
    <div className="bg-gray-900 p-2 rounded ">
        <span>Your Applications</span>

        <div className="flex gap-4 mt-2">
            <button 
                className={`rounded p-1 text-xs text-center w-full ${activeTab===1 && 'bg-gray-700'} hover:bg-gray-700`}
                onClick={()=>setActiveTab(1)}
            >Jobs</button>
            <button 
                className={`rounded p-1 text-xs text-center w-full ${activeTab===2 && 'bg-gray-700'} hover:bg-gray-700`}
                onClick={()=>setActiveTab(2)}
            >Internships</button>
        </div>

        {activeTab===1 && <div className="mt-3 flex flex-col gap-3 overflow-y-auto h-screen">
            {
                (appliedAtJobs?.length === 0 || appliedAtJobs===undefined) ?
                    <span className="w-full text-center text-cyan-500 mt-2">You have'nt applied to any jobs yet :{`(`} </span> :
                    null
                }
            {
                appliedAtJobs?.map((job, index)=>{
                    return(
                    <div key={index} className="w-full p-2 bg-gray-800 rounded">
                        <span onClick={()=>navigate(`/jobapplication?id=${job.jobAssociated}&type=job`)} className="text-md text-cyan-500 cursor-pointer">{index+1}. {job?.jobDetails?.jobTitle}</span><br/>
                        {/* <span className="text-yellow-500 text-md mr-1"> ~Amazon</span><br/> */}
                        <span className="text-xs">Applied on: {(job?.appliedOn).split('T')[0]}</span><br/>
                        {/* <div className="flex gap-2">
                            <span className="bg-green-600 text-white text-xs rounded-full px-1">Active</span>
                            <span className="bg-red-600 text-white text-xs rounded-full px-1">Rejected</span>
                            <span className="bg-gray-600 text-white text-xs rounded-full px-1">In-Processing</span>
                            <span className="bg-blue-600 text-white text-xs rounded-full px-1">Needs Action</span>
                        </div> */}
                    </div>);
                })
            }
        </div>}

        {activeTab===2 && <div className="mt-3 flex flex-col gap-3 overflow-y-auto h-screen">
            {
                (appliedAtInternships?.length === 0 || appliedAtInternships===undefined) ?
                    <span className="w-full text-center text-cyan-500 mt-2">You have'nt applied to any internships yet :{`(`} </span> :
                    null
                }
            {
                appliedAtInternships?.map((job, index)=>{
                    return(
                    <div key={index} className="w-full p-2 bg-gray-800 rounded">
                        <span onClick={()=>navigate(`/jobapplication?id=${job.internshipAssociated}&type=internship`)} className="text-md text-cyan-500 cursor-pointer">{index+1}. {job?.internshipDetails?.internshipTitle}</span><br/>
                        {/* <span className="text-yellow-500 text-md mr-1"> ~Amazon</span><br/> */}
                        <span className="text-xs">Applied on: {(job?.appliedOn).split('T')[0]}</span><br/>
                        {/* <div className="flex gap-2">
                            <span className="bg-green-600 text-white text-xs rounded-full px-1">Active</span>
                            <span className="bg-red-600 text-white text-xs rounded-full px-1">Rejected</span>
                            <span className="bg-gray-600 text-white text-xs rounded-full px-1">In-Processing</span>
                            <span className="bg-blue-600 text-white text-xs rounded-full px-1">Needs Action</span>
                        </div> */}
                    </div>);
                })
            }
        </div>}


        

    </div>
    </>);
}

export default UserApplicationsDetails;