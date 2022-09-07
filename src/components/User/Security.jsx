import React, { useState } from 'react'
import axios from "axios";

const Security = ({token, user}) => {

    const API = process.env.REACT_APP_API_ENDPOINT;

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [warning, setWarning] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit =async(e)=>{
        e.preventDefault();

        setLoading(true);

        try{
            const resp = await axios.post(`${API}/api/v1/user/changePassword`,{
                previousPassword: currentPassword,
                newPassword: newPassword
            },
            {
                headers: {
                Authorization: `Bearer ${token}`,
                }
            })

            console.log(resp.data);
            if(resp.data.changedPassword){
                setLoading(false);
                setWarning("Successful!! Your password is changed");
            } else{
                setLoading(false);
                setWarning("An Error occured while updating password, please check back in later!")
            }
        } catch(error){
            setLoading(false);
            setWarning("Type your current password right!!")
            console.log(error);
        }        
    }

  return (
    <div className="bg-gray-900 p-2 rounded h-screen">
        <div className="text-lg flex items-center"><div className='w-2 h-2 mr-2 bg-white rounded-full'></div>Change your password</div>
        <div className='mt-3 ml-2'>
            <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <label className="text-sm mb-1 text-white dark:text-gray-400">Current Password</label>
                <input type="password"
                    className="px-2 text-sm text-white bg-gray-700 w-1/2 h-10 focus:outline-none rounded"
                    value={currentPassword}
                    onChange={(e)=>setCurrentPassword(e.target.value)} />
            </div>
            <div className="flex flex-col mt-2">
                <label className="pl-1 text-sm mb-1 text-white dark:text-gray-400">New Password</label>
                <input type="password"
                    className="px-2 text-sm text-white bg-gray-700 w-1/2 h-10 focus:outline-none rounded"
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)} />
            </div>
            {
                warning === "" ? null :
                warning === "Successful!! Your password is changed" ?
                <div className={`text-white text-center mt-3 bg-green-700 p-2 rounded-md`}>{warning}</div> :
                <div className={`text-white text-center mt-3 bg-red-500 p-2 rounded-md`}>{warning}</div>
            }
            <div className="mt-3 flex items-center pb-2">
                <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-base px-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                {   loading ?
                        <div className="flex flex-row items-center">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg> {" "} <p>Updating</p>
                        </div> :
                        "Update"
                }
                </button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Security