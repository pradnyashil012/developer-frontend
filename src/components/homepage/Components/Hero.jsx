import React from "react";
import { Link } from "react-router-dom";
import herobg from "../Assets/herobg.png";
import RegularButton from "./RegularButton";
import heroImg from "../Assets/heroImg.png";
const Hero = () => {
  return (
    <main className="min-h-screen min-w-screen  bg-white relative z-10">
      {" "}
      <div className="w-full absolute top-0 left-0 z-50">
        {" "}
        <div className="container   text-center  grid md:grid-cols-2 md:gap-12 h-screen ">
          <div className="min-w-full md:flex min-h-full  md:flex-col md:justify-center">
            <h1 className="text-[32px] md:text-[110px] font-semibold text-black md:leading-[100px] w-full mb-6 my-12 md:my-0  md:text-left">
              Towards the <br />
              <span className="text-[#0351A3] font-bold ">Revolution</span>
            </h1>
            <h2 className="text-lg   md:text-left  md:text-3xl leading-8 font-normal">
              On the mission to convert 1M+ Web3 enthusiasts to Web3 developers
              by 2025
            </h2>
            <div className="mt-6 w-full md:flex md:justify-start gap-6">
              <RegularButton>Post a job</RegularButton> 
               <div className="md:hidden my-4"></div>

              <Link to='/jobs'><RegularButton>Find a job</RegularButton></Link>

            </div>
          </div>
          <div className="flex items-center justify-end">
            <img src={heroImg} alt="" className="w-[650px]" />
          </div>
        </div>
      </div>
      <img src={herobg} className="absolute md:top-10 top-32 opaicity-30 z-0" alt="" />
    </main>
  );
};

export default Hero;