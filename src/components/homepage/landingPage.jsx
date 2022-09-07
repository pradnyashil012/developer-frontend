import React from "react";  
import "./LandingPage.module.css";
import Hero from "./Components/Hero";
import StartupIssue from "./Components/StartupIssue";
import StartupSolution from "./Components/StartupSolution";
import Discord from "./Components/Discord";
import Goal from "./Components/Goal";
import Problem from "./Components/Problem";
import developerProblem from "./Assets/developerProblem.png";
import developerSolution from "./Assets/programmer-solution.png";
import businessProblem from "./Assets/business-problmem.png";
import businessSolution from "./Assets/business-solution.png"
const landingPage = () => {
  const developerProblems = [
    "Affordable training for Web3 development.",
    "Organized community of Web3 developers.",
    "Web3 development experience.",
    "Global web3 development jobs.",
    "Fair pay in IT service-based companies of Tier 3 countries.",
  ];
  const developerSolutions = [
    "Web3 development from the best educators affordably.",
    "Global Web3 developer community.",
    "Platform to gain Web3 development experience.",
    "Easy access to global web3 development jobs.",
  ];
  const businessProblems = [
    "Receive 100s of applications for a job post.    ",
    "Applicants don't have the required skills.  ",
    "A lot of money and time on hiring and training candidates for the post."

  ];
  const businessSolutions = [
    "Get applications from only Blockchain developers.",
    "Verify candidates' potential using our integrated platform.",
    "Spend negligible Time and Money on Hiring and Training. ",
    "Hire directly from our Bootcamp."

  ]
  return (
    <div>
      {/* <Header /> */}
    <div className="testing-homepage"> 
      <Hero />
     {/* Below div:  Temporarily for bootcamp */}
      <div className="py-20">
      <div className="flex flex-col items-center text-center justify-center text-2xl md:text-5xl text-[#003979] font-extrabold">
        <p className="hidden md:block"> WEB3 Development Bootcamp</p>
        <div className="md:hidden">
        <p>WEB3</p>
        <div className="md:hidden">
        </div>
        <p>Development Bootcamp</p>
        </div>
      </div>
        <div className="flex flex-col mt-8 text-center items-center justify-center">
          <p className="hidden md:block mb-4 font-semibold text-lg">Cryptonaukri presents WEB3 development bootcamp</p>
          <div className="md:hidden">
            <b className="mb-4 font-semibold text-md md:text-lg">CryptoNaukri presents
            <div className="md:hidden">
            </div>
             Web3 development Bootcamp</b>
          </div>
          <p className=" text-sm mt-3 px-3 md:text-lg">Full Stack Web3 Development, Ethereum, Hyperledger, Hyperledger Fabric, Hyperledger Indy, etc. will be covered in just 3 months!</p>
          <p className=" text-sm px-3 md:text-lg"> with <b>8+ web3 projects</b> and <b>guaranteed web3 developer job </b></p>
          <a href="https://web3bootcamp.cryptonaukri.com/" target="_blank" className='border-2 rounded-lg text-white mr-4 border-[#003979] bg-[#003979] font-semibold px-12 py-2 mt-7 inline-block hover:bg-transparent hover:text-[#003979]'><p className=" hover:text-[#003979]">Learn more !</p></a>
        </div>
     </div>
      {/* <Web3Hack />  */}
      <StartupIssue />
      <StartupSolution />
      <Problem
        image={developerProblem}
        title="Problems faced by the Developers"
        side={true}
        list={developerProblems}
        backgroundColor="#E9EEF6"
        paragraph="Web3 Enthusiasts dont have:"
      />
      <Problem
        title="Solutions by Cryptonaukri for developers"
        image={developerSolution}
        backgroundColor="#ffffff"
        list={developerSolutions}
        side={false}
        paragraph="Cryptonaukri provides "
      />
      <Problem
        backgroundColor="#E9EEF6"
        side={true}
        image={businessProblem}
        title="Problems faced by businesses"
        paragraph="Web3 Businesses in general"
        list={businessProblems}
      /> 
      <Problem 
        image={businessSolution}
        side={false}
        title="Solution by CryptoNaukri for Businesses"
        backgroundColor="#ffffff"
        paragraph="CryptoNaukri provides"
        list={businessSolutions}
      /> 
      <Goal />
      <Discord />
      </div>
    </div>
  );
};

export default landingPage;