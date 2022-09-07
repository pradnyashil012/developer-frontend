import React from 'react'
import { Internships } from '../data/Internships'

const Internshipscard = ({buisnessDetails, setOption}) => {

  return (
    <div>
      <div className="p-5 shadow-xl bg-gray-100">
    <h1 className="text-xl mb-2">Your Internships</h1>
 
    <div className="overflow-auto w-[560px] rounded-lg shadow hidden md:block">
      <table className="w-full">
        
        <thead className="bg-gray-50 border-b-2 border-gray-200">
        <tr>
          <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Internships title</th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">Experience</th>
          <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Stipend</th>
          <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Status</th>
        </tr>
        </thead>

        {buisnessDetails.internshipsAdded.reverse().slice(0,3).map((job) => (

        <tbody className="divide-y divide-gray-100 ">
        <tr className="bg-white">
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
            {job.internshipTitle}
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{job.experience}</td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{job.stipend}</td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          <span
            className={`p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 ${job.status === "Completed" && "text-green-800 bg-green-200"} rounded-lg bg-opacity-50`}>{job.status}</span>
          </td>
        </tr>
        </tbody>

        ))}
      </table>
      {buisnessDetails.internshipsAdded.length===0?<div className='text-center my-4'>You have not yet posted any Internship</div>:<></>}
    </div>
 
    <div className="flex flex-col w-full md:hidden">

    {buisnessDetails.internshipsAdded.reverse().slice(0,3).map((job,i) => (
      <div className="bg-white space-y-3 p-4 my-2 rounded-lg shadow">
        <div className="text-sm text-gray-700">
          {i + 1} {job.internshipTitle}
        </div>
        <div className="flex items-center space-x-2 text-sm">
        <div className="text-sm font-medium text-black mr-8">
          Stipend: {job.stipend}
        </div>
          <div className="text-gray-500 ">Experience: {job.experience}</div>
        </div>
          <div>
            <span
              className={`p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 ${job.status === "Completed" && "text-green-800 bg-green-200"} rounded-lg bg-opacity-50`}>{job.status}</span>
          </div>
      </div>
    ))}
    {buisnessDetails.internshipsAdded.length===0?<div className='text-center my-4'>You have not yet posted any jobs</div>:<></>}
      
    </div>
    <div className='w-full my-2 flex items-end relative'>
      {buisnessDetails.internshipsAdded.length===0?<></>:<div onClick={() => {setOption("Posted Internships")}} className='text-red-400 right-5 top-1 absolute hover:cursor-pointer'>see all..</div>}
    </div>
  </div>
    </div>
  )
}

export default Internshipscard