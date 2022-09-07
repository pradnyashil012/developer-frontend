import axios from "axios";
import React, { useState, useEffect } from "react";
import {FiGithub} from 'react-icons/fi';
import {BiGitRepoForked} from "react-icons/bi"
import {AiOutlineStar} from "react-icons/ai"
import {RiLinksFill} from "react-icons/ri"

const ProjectLoadingCard =()=>{
  return(
    <div className="px-2 mt-3 mb-2 animate-pulse">
      <div className="w-1/4 h-5 bg-gray-300 rounded-sm"></div>
      <div className="w-1/5 h-4 mt-1 bg-gray-300 rounded-sm"></div>
      <div className="h-9 mt-1 bg-gray-300 rounded-sm pb-2"></div>
      <div className="my-1 border"></div>
    </div>
  )
}

const SideProfile = (props) => {
  const { userResume } = props;

  var github_username = undefined;
  if(userResume === null){
    github_username = `""`
  } else{
    var github_url_parts = userResume.links.github.split('/');
    github_username = github_url_parts[3];
  }
  
  const [projects, setProjects] = useState({loading: false, projectslist:[]})

  function fetchGithubPinRepos(github_username) {
    setProjects({
      loading: true,
      projectslist:[]
    });

    // https://gh-pinned-repos.egoist.sh/?username=<github_username>
    axios.get(`https://gh-pinned-repos.egoist.sh/?username=${github_username}`)
    .then((response)=>{
      // console.log(response.data);
      setProjects({
        loading: false,
        projectslist: response.data
      })
    })
    .catch((error)=>{
      console.log(error);
    })
    
  }

  
  useEffect(()=>{
    fetchGithubPinRepos(github_username);
  }, [github_username])

  return (
    <div className="bg-gray-900 p-2 rounded h-screen">
      <div className="flex justify-center items-center">
        {/* <FiGithub />  */}
        <span className="ml-2">Your <span className="underline underline-offset-4 text-cyan-600">GitHub</span> Projects</span>
      </div>

      {
        projects.loading ? 
        <>
          <ProjectLoadingCard />
          <ProjectLoadingCard />
          <ProjectLoadingCard />
          <ProjectLoadingCard />
        </> :
        (userResume === null || userResume.links.github === "")  ?
        <div className="text-center mt-2">Update your profile</div> :
        <div className="mt-2">
          {
            projects.projectslist.map((project, key)=>{
              return (
              <div className="p-2 border-b mb-2">
                <div>{project.repo}</div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <BiGitRepoForked /> <span className="text-gray-400 text-sm mr-2">{project.forks}</span>
                    <AiOutlineStar /> <span className="text-gray-400 text-sm">{project.stars}</span>
                  </div>
                  <div className="flex items-center">
                    {
                      project.website === undefined ? null :
                      <a href={project.website}><RiLinksFill /></a>
                    }
                    <a href={project.link} className="ml-2"><FiGithub /></a>
                  </div>
                </div>
                <div className="text-gray-400 text-base">{project.description}</div>
              </div>
              )
            })
          }
            
        </div>
      }
    </div>
  );
};

export default SideProfile;
