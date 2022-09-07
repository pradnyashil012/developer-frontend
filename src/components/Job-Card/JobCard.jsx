import React from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobCard = (props) => {

  const login = localStorage.getItem("login")
  const navigate = useNavigate();

  const handleApply = () => {
      navigate(`/jobapplication?id=${props.srId}&type=${props.type}`)
  }

  return (
    // min-h-min
    <div className="bg-gray-200 min-h-min flex flex-col justify-between shadow-md grow shrink basis-80 py-3 px-2 border border-gray-500 rounded-lg">
        <div>
            <div className="text-lg text-[#003979] sm:text-xl font-semibold">{props.position}</div>
            <div className="mt-1 text-[#003979]">{props.cmp}</div>
            <div className="mt-2 text-gray-600">{(props.description).substr(0, 120)}...</div>
        </div>
        <div className="mt-2 flex justify-between items-center">
            <div className="text-gray-600">
                <div><span className="font-bold text-black">{props.opn}</span>{" "}openings</div>
                <div><span className="font-bold text-black">{props.exp}</span>{" "}experience</div>
            </div>
            <div className='text-gray-600'>
                <button onClick={handleApply} className="px-3 py-2 hover:text-white border rounded-md hover:bg-[#003979]">Details</button>
            </div>
        </div>
    </div>
  )
}

export default JobCard 