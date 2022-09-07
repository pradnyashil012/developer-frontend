import { useState } from "react";
import axios from "axios";
import {MdOutlineClose} from "react-icons/md"

const EditResume = ({token, user}) =>{

    // necona7303@lodores.com

    const API = process.env.REACT_APP_API_ENDPOINT;

    const [resume, setResume] = useState("");
    const [resumeHint, setResumeHint] = useState("");
    const [github, setGithub] = useState("");
    const [githubHint, setGithubHint] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [linkedinHint, setLinkedinHint] = useState("");
    const [smLoading, setSmLoading] = useState(false);
    const [resumeUpdated, setResumeUpdated] = useState("");
    const [openEditProfile, setOpenEditProfile] = useState(false);

    const validResume = (resume) =>{
        var resumeParts = resume.split('.');
        if (resumeParts[0] === "https://drive" && resumeParts[1] === "google"){
            return true;
        }
        return false
    }
    const validGithub = (githubLink)=>{
        var linkParts = githubLink.split("/");
        if(linkParts[0] === "https:" && linkParts[1] === "" && linkParts[2] === "github.com"){
            return true;
        }
        return false;
    }
    const validLinkedin = (linkedinLink)=>{
        var linkParts = linkedinLink.split("/");
        if(
            linkParts[0] === "https:" &&
            linkParts[1] === "" &&
            linkParts[2] === "www.linkedin.com" &&
            linkParts[3] === "in" ){
                return true;
        }
        return false;
    }
  
    const updateResume = async (e)=>{
        e.preventDefault();

        setResumeHint("");
        setGithubHint("");
        setLinkedinHint("");

        if(validResume(resume) && validGithub(github) && validLinkedin(linkedin)){
            setSmLoading(true);

            const resp = await axios.put(`${API}/api/v1/user/updateResume`,
            {
                education: [],
                jobs: [],
                internships: [],
                courses: [],
                projects: [],
                skills: [],
                links: {
                github: github,
                linkedin: linkedin,
                otherLinks: [resume],
                }
            },
            {
                headers: {
                Authorization: `Bearer ${token}`,
                }
            })

            setSmLoading(false);
            console.log(resp.data);

            if(resp.data.isResumeUpdated){
                setResumeUpdated("Successful! Please refresh the page")
            } else{
                setResumeUpdated("An Error occured while updating resume, please check back in later!")
            }
        } else{
            if(validResume(resume) === false){
                setResumeHint("Enter proper google drive link")
            }
            if(validGithub(github) === false){
                setGithubHint("Enter proper url of your github profile")
            }
            if(validLinkedin(linkedin) === false){
                setLinkedinHint("Enter proper url of your linkedin profile")
            }
        }
    }
 
    const addResume = async (e)=>{
        e.preventDefault();

        setResumeHint("");
        setGithubHint("");
        setLinkedinHint("");

        if(validResume(resume) && validGithub(github) && validLinkedin(linkedin)){
            setSmLoading(true);

            const resp = await axios.post(`${API}/api/v1/user/addResume`,
            {
                education: [],
                jobs: [],
                internships: [],
                courses: [],
                projects: [],
                skills: [],
                links: {
                github: github,
                linkedin: linkedin,
                otherLinks: [resume],
                }
            },
            {
                headers: {
                Authorization: `Bearer ${token}`,
                }
            })

            setSmLoading(false);
            console.log(resp.data);

            if(resp.data.isResumeUpdated){
                setResumeUpdated("Successful! Please refresh the page")
            } else{
                setResumeUpdated("An Error occured while updating resume, please check back in later!")
            }
        } else{
            if(validResume(resume) === false){
                setResumeHint("Enter proper google drive link")
            }
            if(validGithub(github) === false){
                setGithubHint("Enter proper url of your github profile")
            }
            if(validLinkedin(linkedin) === false){
                setLinkedinHint("Enter proper url of your linkedin profile")
            }
        }
    }

    return (
        <>
            <button className="bg-gray-700 rounded p-1 text-xs text-center w-full mt-1" onClick={()=>setOpenEditProfile(true)}>{user?.userResume === null ? <p>Add Resume</p> : <p>Edit Resume</p>}</button>

            <div className={`${openEditProfile ? 'visible ' : 'hidden '} fixed top-0 left-0 right-0 w-screen flex justify-center h-screen bg-black/50 px-2 sm:px-20`}>
                <div className="bg-gray-800 h-min border rounded-md mt-32 p-2 mx-4 flex flex-col w-full sm:w-1/2">
                    <div className="px-1 py-2 border-b text-lg tracking-wider font-semibold text-gray-900 dark:text-white flex items-center justify-between">
                        <div>{user?.userResume === null ? <p>Add Resume</p> : <p>Edit Resume</p>}</div>
                        <div className="cursor-pointer" onClick={()=>setOpenEditProfile(false)}><MdOutlineClose size={25} /></div>
                    </div>

                    <form onSubmit={user?.userResume === null ? addResume : updateResume}
                    className="px-1 mt-2" >
                        <div className="flex flex-col">
                            <label className="pl-1 text-base mb-1 text-white dark:text-gray-400">Resume</label>
                            <input type="text"
                                className="px-2 text-sm text-gray-300 bg-gray-900 w-full h-10 focus:outline-none rounded"
                                value={resume}
                                onChange={(e)=>setResume(e.target.value)} />
                            <div className="text-red-700 text-sm px-1">{resumeHint}</div>
                        </div>
                        <div className="mt-2 flex flex-col">
                            <label className="pl-1 text-base mb-1 text-white dark:text-gray-400">GitHub</label>
                            <input type="text"
                                className="px-2 text-sm text-gray-300 bg-gray-900 w-full h-10 focus:outline-none rounded"
                                value={github}
                                onChange={(e)=>setGithub(e.target.value)} />
                            <div className="text-red-700 text-sm px-1">{githubHint}</div>
                        </div>
                        <div className="mt-2 flex flex-col">
                            <label className="pl-1 text-base mb-1 text-white dark:text-gray-400">LinkedIn</label>
                            <input type="text"
                                className="px-2 text-sm text-gray-300 bg-gray-900 w-full h-10 focus:outline-none rounded"
                                value={linkedin}
                                onChange={(e)=>setLinkedin(e.target.value)} />
                            <div className="text-red-700 text-sm px-1">{linkedinHint}</div>
                        </div>
                        {
                            resumeUpdated === "" ?
                            null :
                            <div className="text-white text-center mt-3 bg-green-700 p-2 rounded-md">{resumeUpdated}</div>
                        }
                        <div className="mt-2 flex items-center justify-around pt-3 pb-2">
                            <button type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-base px-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >
                                {
                                    smLoading ?
                                    <div className="flex flex-row items-center">
                                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg> {" "} <p>Updating</p>
                                    </div> :
                                    "Submit"
                                }
                            </button>
                            <button 
                                className="text-white hover:text-black bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-base px-3 py-2"
                                onClick={()=>setOpenEditProfile(false)}>Close</button>
                        </div>
                    </form>
                </div>
                
            </div>
        </>
       
    )

}

export default EditResume;


//   const validResume = (resume) =>{
//         var resumeParts = resume.split('.');
//         if (resumeParts[0] === "https://drive" && resumeParts[1] === "google"){
//             return true;
//         }
//         return false
//     }

    // const addResume = () => {
    //     setSmLoading(true);
    //     //console.log(resume);
    //     if(validResume(resume)){
            // const response = axios.post(
            // `${API}/api/v1/user/addResume`,
            // {
    //             education: [],
    //             jobs: [],
    //             internships: [],
    //             courses: [],
    //             projects: [],
    //             skills: [],
    //             links: {
    //             github: "",
    //             linkedin: "",
    //             otherLinks: [resume],
    //             },
    //         },
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         }
    //         );
    //         response.then((resp) => {
    //             setSmLoading(false);
    //             if (resp.data.resumeAdded) {
    //                 console.log('success');
    //                 setResumeUpdated(1);
    //                 // toast.success("Resume Added Successfully");
    //             } else {
    //                 setResumeUpdated(-1);
    //                 console.log('error adding resume');
    //                 // toast.error("Error Occured while updating resume, please try again !!");
    //             }
    //             console.log(resp);
    //         });
    //     }else{
    //         setResumeUpdated(-2);
    //     }
        
        
    // }

    // const updateResume = async (e) => {
    //     e.preventDefault();
    //     setSmLoading(true);

    //     if(validResume(resume)){
    //         const response = await axios.put(
    //         `${API}/api/v1/user/updateResume`,
            // {
            //     education: [],
            //     jobs: [],
            //     internships: [],
            //     courses: [],
            //     projects: [],
            //     skills: [],
            //     links: {
            //     github: github,
            //     linkedin: linkedin,
            //     otherLinks: [resume],
            //     }
            // },
            // {
            //     headers: {
            //     Authorization: `Bearer ${token}`,
            //     }
            // }
    //         );
    //         response.then((resp) => {
    //         setSmLoading(false);
    //         if (resp.data.isResumeUpdated) {
    //             setResumeUpdated(1);
    //         } else {
    //             setResumeUpdated(-1);
    //         }
    //         console.log(resp);
    //         });
    //     }else{
    //         setResumeUpdated(-2);
    //     }
        

    //     setSmLoading(false);
    // };

    // const SuccssMessage = ({message}) =>{
    //     return <>
    //     <div className="bg-green-600 text-white rounded-sm text-base p-2">
    //         ✔️ {message}
    //     </div>
    //     </>
    // }

    // const ErrorMessage = ({message}) =>{
    //     return <>
    //     <div className="bg-red-500 text-white rounded-sm text-base p-2">
    //         ❌ {message}
    //     </div>
    //     </>
    // }


    // return(<>
    //     <button className="bg-gray-700 rounded p-1 text-xs text-center w-full mt-1" onClick={()=>setOpenEditProfile(true)}>Edit Resume</button>
    //     <div
    //         id="defaultModal"
    //         tabIndex={-1}
    //         aria-hidden={openEditProfile}
            // className={`${openEditProfile?'visible ':'hidden '} p-4 fixed inset-0 bg-black/50 shadow backdrop-blur-base overflow-y-auto h-full w-full`}
    //     >
    // <div className="p-4 max-w-2xl m-auto mt-12">
    //     <br/>
    //     <br/>
    //     <br/>
    //     <br/>
    //     <div className="relative rounded-lg shadow bg-gray-800">

    //         {resumeUpdated === 1 && <SuccssMessage message={'Resume Updated Successfully !'} />}
    //         {resumeUpdated === -1 && <ErrorMessage message={'An Error occured while updating resume, please check back in later !'} />}
    //         {resumeUpdated === -2 && <ErrorMessage message={'Please enter a valid google drive link'} />}

    //         <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
    //             <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
    //             Edit Profile
    //             </h3>
    //             <button
    //                 type="button"
    //                 className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
    //                 data-modal-toggle="defaultModal"
    //                 onClick={()=>setOpenEditProfile(false)}
    //             >
                // <svg
                //     className="w-5 h-5"
                //     fill="currentColor"
                //     viewBox="0 0 20 20"
                //     xmlns="http://www.w3.org/2000/svg"
                // >
                //     <path
                //     fillRule="evenodd"
                //     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                //     clipRule="evenodd"
                //     />
                // </svg>
    //             </button>
    //         </div>

    //         <form onSubmit={updateResume}>
    //         <div className="p-6 space-y-6">
    //             <p className="text-base leading-relaxed text-white dark:text-gray-400">
    //                 Update Resume
    //             </p>
    //             <div className=" rounded shadow-sm mb-4">
    //                 <input
    //                     autoFocus
    //                     value={resume}
    //                     onChange={(e) => {
    //                         setResume(e.target.value);
    //                     }}
    //                     className='text-gray-300 bg-gray-900 p-2 w-full h-12 focus:outline-none rounded'
    //                     type='text'
    //                     placeholder={user?.userResume?.links?.otherLinks[0]?user?.userResume?.links?.otherLinks[0]:'Enter Google Drive link'}
    //                     autocomplete='do-not-autofill'
    //                 />
    //             </div>
    //         </div>

    //         <div className="p-6 space-y-6">
    //             <p className="text-base leading-relaxed text-white dark:text-gray-400">
    //                 Update GitHub
    //             </p>
    //             <div className=" rounded shadow-sm mb-4">
    //                 <input
    //                     autoFocus
    //                     value={github}
    //                     onChange={(e) => {
    //                         setGithub(e.target.value);
    //                     }}
    //                     className='text-gray-300 bg-gray-900 p-2 w-full h-12 focus:outline-none rounded'
    //                     type='text'
    //                     placeholder="Update GitHub"
    //                     autocomplete='do-not-autofill'
    //                 />
    //             </div>
    //         </div>

    //         <div className="p-6 space-y-6">
    //             <p className="text-base leading-relaxed text-white dark:text-gray-400">
    //                 LinkedIn
    //             </p>
    //             <div className=" rounded shadow-sm mb-4">
    //                 <input
    //                     autoFocus
    //                     value={linkedin}
    //                     onChange={(e) => {
    //                         setLinkedin(e.target.value);
    //                     }}
    //                     className='text-gray-300 bg-gray-900 p-2 w-full h-12 focus:outline-none rounded'
    //                     type='text'
    //                     placeholder="Update LinkedIn"
    //                     autocomplete='do-not-autofill'
    //                 />
    //             </div>
    //         </div>

    //         <div className="flex items-center p-6 gap-2 flex-wrap rounded-b border-t border-gray-200 dark:border-gray-600">
    //             <button
    //                 data-modal-toggle="defaultModal"
    //                 type="submit"
    //                 className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //                 // onClick={()=>{
    //                 //     if(user?.userResume !== null){
    //                 //         updateResume();
    //                 //     }else{
    //                 //         addResume();
    //                 //     }
                        
    //                 // }}
                
    //             >
    //                 {smLoading? 'Loading...':'Update'}
    //             </button>
    //             <button
    //                 data-modal-toggle="defaultModal"
    //                 type="button"
    //                 className="w-full text-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
    //                 onClick={()=>setOpenEditProfile(false)}
    //                 >
    //                 close
    //             </button>
    //         </div>
    //         </form>

    //     </div>
    // </div>
    // </div>


    // </>)