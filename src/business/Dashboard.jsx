import React from "react";
import Sidebar from "./sidebar/Sidebar";
import DashHome from "./dashhome/DashHome"

import Yourinternships from "./yourinternships/YourInternships"
import Yourjobs from "./yourjobs/YourJobs"
import Addjob from "./addJob/Addjob"

const Dashboard = ({option, setOption, buisnessDetails}) => {

  return (
    <div>
      <div className="w-full min-h-[90vh] flex flex-row">
        <Sidebar option={option} setOption={setOption} />
        
        <div className="w-[100%]">
          {/* <DashHome /> */}
          {option === "User Dashboard" && <DashHome buisnessDetails={buisnessDetails} setOption={setOption}/>}
          {option === "Posted Internships" && <Yourinternships buisnessDetails={buisnessDetails} setOption={setOption}/>}
          {option === "Posted Jobs" && <Yourjobs buisnessDetails={buisnessDetails} setOption={setOption}/>}
          {option === "Add job" && <Addjob/>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
