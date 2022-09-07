import React from "react";
import { useNavigate } from "react-router-dom";

import {AiOutlineEye} from 'react-icons/ai';
import {BsPencil, BsTrash} from 'react-icons/bs';

const Jobcard = ({buisnessDetails}) => {

  const navigate = useNavigate();

  return (
    <div className="md:px-4 md:py-12 bg-gray-100 ">
      <div className="p-5 my-6 shadow-xl bg-gray-100">
        <h1 className="text-xl mb-2">Your Jobs</h1>

        

        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Sr no.
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Job title
                </th>
                <th className="p-3 w-24 text-sm font-semibold tracking-wide text-left">
                  CTC
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Posted on
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Status
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Action
                </th>
              </tr>
            </thead>

            

            {buisnessDetails.jobsAdded.reverse().map((job,i) => (
              <tbody className="divide-y divide-gray-100 ">
                <tr className="bg-white">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {job.jobTitle}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {job.ctc}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {job.postedOn.split("T")[0]}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <span
                      className={`p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 ${
                        job.status === "Completed" &&
                        "text-green-800 bg-green-200"
                      } rounded-lg bg-opacity-50`}
                    >
                      {/* {job.status} */}
                    </span>
                    
                  </td>
                  <td className="p-3 text-sm flex justify-between text-gray-700 whitespace-nowrap">
                    <div onClick={() => {navigate(`/details?id=${job._id}`)}} className="hover:cursor-pointer">
                      <AiOutlineEye className="h-4 mt-1 text-blue-600"/>
                    </div>
                    <BsPencil className="h-4 mt-1 text-blue-400" />
                    <BsTrash className="h-4 mt-1 text-red-600"/>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          {buisnessDetails.jobsAdded.length===0?<div className="text-center my-4">You have not yet posted any Job</div>:<></>}
        </div>

        <div className="flex flex-col w-full md:hidden">
          {buisnessDetails.jobsAdded.reverse().map((job,i)=> (
            <div className="bg-white space-y-3 p-4 my-2 rounded-lg shadow">
              <div className="text-sm text-gray-700">{i+1}. {job.jobTitle}</div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="text-sm font-medium text-black mr-8">
                  Posted on: {job.postedOn.split("T")[0]}
                </div>
                <div className="text-gray-500 ">
                  {/* Experience: {job.experience} */}
                </div>
              </div>
              <div className="flex h-7 justify-between">
                <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 ${
                    job.status === "Completed" && "text-green-800 bg-green-200"
                  } rounded-lg bg-opacity-50`}
                >
                  {/* {job.status} */}
                </span>
                <div className="p-3 text-sm flex justify-between text-gray-700 whitespace-nowrap">
                    <div onClick={() => {navigate(`/details?id=${job._id}`)}} className="hover:cursor-pointer">
                      <AiOutlineEye className="h-4 mt-1 text-blue-600"/>
                    </div>
                    <BsPencil className="h-4 mt-1 mx-2 text-blue-400" />
                    <BsTrash className="h-4 mt-1 text-red-600"/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobcard;