import { useState } from "react";
import axios from "axios";
import {MdOutlineClose} from "react-icons/md"

const EditResume = ({token, user}) =>{

    const API = process.env.REACT_APP_API_ENDPOINT;

    const [firstName, setFirstName] = useState(user?.firstName);
    const [firstNameHint, setFirstNameHint] = useState(""); 
    const [lastName, setLastName] = useState(user?.lastName);
    const [lastNameHint, setLastNameHint] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
    const [phoneNumberHint, setPhoneNumberHint] = useState("")
    const [location, setLocation] = useState(user?.location);
    const [locationHint, setLocationHint] = useState("");
    // const [isDisabled, setIsDisabled] = useState(false);

    const [smLoading, setSmLoading] = useState(false);
    const [profileUpdated, setProfileUpdated] = useState("");
    const [openEditProfile, setOpenEditProfile] = useState(false);


    // ** currently working in progress editProfile 
    const editProfile = async (e)=>{
        e.preventDefault();

        setFirstNameHint("");
        setLastNameHint("");
        setPhoneNumberHint("");
        setLocationHint("");

        if(firstName !== "" && lastName !== "" && phoneNumber !== "" && location !== ""){
            setSmLoading(true);

            const resp = await axios.put(`${API}/api/v1/user/updateProfile`,
                {
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    location: location
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

            setSmLoading(false);
            console.log(resp.data);

            if(resp.data.isProfileUpdated){
                setProfileUpdated("Successful! Please refresh the page")
            } else{
                setProfileUpdated("An Error occured while updating details, please check back in later!")
            }
        } else{
            if(firstName === ""){
                setFirstNameHint("Please enter your first name");
            } 
            if(lastName === ""){
                setLastNameHint("Please enter your last name");
            } 
            if(phoneNumber === ""){
                setPhoneNumberHint("Please enter your phone number");
            }
            if(location === ""){
                setLocationHint("Please enter your location");
            }
        }
    }

    return (
        <>
            <button className="bg-gray-700 rounded p-1 text-xs text-center w-full mt-1" onClick={()=>setOpenEditProfile(true)}>Edit Profile</button>

            <div className={`${openEditProfile ? 'visible ' : 'hidden '}} fixed top-0 left-0 right-0 w-screen flex justify-center h-screen bg-black/50 px-2 sm:px-20`}>
                <div className="bg-gray-800 h-min border rounded-md mt-32 p-2 mx-4 flex flex-col w-full sm:w-1/2">
                    <div className="px-1 py-2 border-b text-lg tracking-wider font-semibold text-gray-900 dark:text-white flex items-center justify-between">
                        <div>Edit Profile Details</div>
                        <div className="cursor-pointer" onClick={()=>setOpenEditProfile(false)}><MdOutlineClose size={25} /></div>
                    </div>

                    <form onSubmit={editProfile}
                    className="px-1 mt-2" >
                        <div className="flex flex-col">
                            <label className="pl-1 text-base mb-1 text-white dark:text-gray-400">First Name</label>
                            <input type="text"
                                className="px-2 text-sm text-gray-300 bg-gray-900 w-full h-10 focus:outline-none rounded"
                                value={firstName}
                                onChange={(e)=>setFirstName(e.target.value)}
                                autocomplete='do-not-autofill' />
                            <div className="text-red-700 text-sm px-1">{firstNameHint}</div>
                        </div>
                        <div className="mt-2 flex flex-col">
                            <label className="pl-1 text-base mb-1 text-white dark:text-gray-400">Last Name</label>
                            <input type="text"
                                className="px-2 text-sm text-gray-300 bg-gray-900 w-full h-10 focus:outline-none rounded"
                                value={lastName}
                                onChange={(e)=>setLastName(e.target.value)}
                                autocomplete='do-not-autofill' />
                            <div className="text-red-700 text-sm px-1">{lastNameHint}</div>
                        </div>
                        <div className="mt-2 flex flex-col">
                            <label className="pl-1 text-base mb-1 text-white dark:text-gray-400">Phone Number</label>
                            <input type="text"
                                className="px-2 text-sm text-gray-300 bg-gray-900 w-full h-10 focus:outline-none rounded"
                                value={phoneNumber}
                                onChange={(e)=>setPhoneNumber(e.target.value)}
                                autocomplete='do-not-autofill' />
                            <div className="text-red-700 text-sm px-1">{phoneNumberHint}</div>
                        </div>
                        <div className="mt-2 flex flex-col">
                            <label className="pl-1 text-base mb-1 text-white dark:text-gray-400">Location</label>
                            <input type="text"
                                className="px-2 text-sm text-gray-300 bg-gray-900 w-full h-10 focus:outline-none rounded"
                                value={location}
                                onChange={(e)=>setLocation(e.target.value)}
                                autocomplete='do-not-autofill' />
                            <div className="text-red-700 text-sm px-1">{locationHint}</div>
                        </div>
                        {
                            profileUpdated === "" ?
                            null :
                            <div className="text-white text-center mt-3 bg-green-700 p-2 rounded-md">{profileUpdated}</div>
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
                                    "Update"
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