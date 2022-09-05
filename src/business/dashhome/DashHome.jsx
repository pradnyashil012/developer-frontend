import React from 'react'
import Jobcard from './Jobcard'
import Internshipcard from './Internshipcard'

const DashHome = ({buisnessDetails, setOption}) => {
  return (
    <div className=' w-fll flex flex-col items-center'>
      <Jobcard  buisnessDetails={buisnessDetails} setOption={setOption} />
      <Internshipcard  buisnessDetails={buisnessDetails} setOption={setOption}/>
    </div>
  )
}

export default DashHome