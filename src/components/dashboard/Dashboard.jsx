import React, {useState} from "react";
import Sidebar from "./sidebar/Sidebar";
import DashHome from "./dashhome/DashHome"

import Yourinternships from "./yourinternships/YourInternships"
import Yourjobs from "./yourjobs/YourJobs"
import Addjob from "./addJob/Addjob"

import JobsPage from "../JobsPage";

const Dashboard = ({buisnessDetails}) => {

  const [option, setOption] = useState("dashboard")

  return (
    <div>
      <div className="w-full min-h-[90vh] flex flex-row">
        <Sidebar option={option} setOption={setOption} />
        
        <div className="w-[100%]">
          {/* <DashHome /> */}
          {/* {option === "User Dashboard" && <DashHome buisnessDetails={buisnessDetails} setOption={setOption}/>} */}
          {option === "Jobs" && <JobsPage buisnessDetails={buisnessDetails} setOption={setOption}/>}
          {/* {option === "Posted Internships" && <Yourinternships buisnessDetails={buisnessDetails} setOption={setOption}/>} */}
          {/* {option === "Add job" && <Addjob/>} */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
