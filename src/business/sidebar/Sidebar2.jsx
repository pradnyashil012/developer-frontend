import React from 'react'

import {
  PlusCircleIcon,
  CogIcon,
  LogoutIcon,
  BriefcaseIcon,
  TemplateIcon,
} from "@heroicons/react/outline";

import { useNavigate } from "react-router-dom";

const Sidebar = ({option, setOption}) => {

  const navigate = useNavigate();

  const logout = () => {
    // localStorage.clear();
    // setAnchorEl(null);
    navigate("/auth/logout");
  };

  return (
    <div className="col-span-2 border-r border-gray-200 min-h-[90vh] w-[90px] xl:w-[250px] pt-8 px-1 flex flex-col items-start justify-between">
      <div className="space-y-8 w-full">
      <div
          onClick={() => {setOption("User Dashboard")}}
          className={`w-full flex items-center justify-start space-x-8 px-5 cursor-pointer group hover:border-gray-900 border-l-4 border-transparent ${
          option === "User Dashboard" && "border-gray-900"
          }`}
        >
          <span>
            {/* <TemplateIcon className="nav-icon" /> */} Lols
          </span>
          <h1
            className={`text-gray-600  group-hover:text-black xl:flex hidden ${
              option === "User Dashboard" && "text-black"
            }`}
          >
            Dashboard
          </h1>
      </div>
      </div>
      Sidebar
    </div>
  )
}

export default Sidebar