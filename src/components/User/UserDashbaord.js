import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import BasicUserDetails from './BasicUserDetails';
import UserApplicationsDetails from './Applications';
import UserCommunityDetails from './UserCommunityDetails'
import Loading from './LoadingEffect';
import SideProfile from './SideProfile';
import Security from './Security';


const Profile = () => {
  // will be swtiched to custom hooks later
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const token = cookies.token;

  const API = process.env.REACT_APP_API_ENDPOINT;

  // state variables
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState(1);

  const [viewTab, setViewTab] = useState(0);

  // get user data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUserData = () => {
    setLoading(true);
    if (token) {
      const response = axios.get(`${API}/api/v1/user/loggedInUserDetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      response.then((data) => {
        // console.log(data.data);
        setUser(data.data);
        setLoading(false);
      });
      setUser(response.data);
    } else {
      setLoading(false);
      toast.error('Please Login first !!');
      navigate('/');
    }
  };

  // copy cuopon code
  const copyCode = (ccode) => {
    try {
      navigator.clipboard.writeText(
        `https://www.cryptonaukri.com/auth/userSignUp?code=${ccode}`
      );
      toast.success('Cuopon copied to clipboard');
    } catch (error) {
      toast.error('Something went wrong!!');
    }
  };

  useEffect(() => {
    if (!token) {
      // if not logged in return to home screen
      toast.error('Please Login first !!');
      navigate('/');
    }
    fetchUserData(); // fetch user data if token is present
  }, [token]);

  if (loading) {
      return (
        <Loading/>
      );
  }
  return(<>
  <main className="bg-gray-800">
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="gap-1 text-white max-w-7xl m-auto p-2 block md:flex">
          <div className="mt-6 w-100 md:w-4/12 gap-2">
              <BasicUserDetails user={user} token={token} />
              <UserCommunityDetails />
          </div>
          <div className="mt-6 w-100 md:w-8/12">
              <button onClick={()=>setActiveTab(1)} className={`${activeTab===1 && 'bg-blue-800'} font-bold m-2 text-white text-xs p-2 rounded`}>Applications</button>
              <button onClick={()=>setActiveTab(2)} className={`${activeTab===2 && 'bg-blue-800'} font-bold m-2 text-white text-xs p-2 rounded`}>Projects</button>
              <button onClick={()=>setActiveTab(3)} className={`${activeTab===3 && 'bg-blue-800'} font-bold m-2 text-white text-xs p-2 rounded`}>Security</button>
              
              {activeTab===1 && <UserApplicationsDetails
                  appliedAtJobs={user.appliedAtJobs} 
                  appliedAtInternships={user.appliedAtInternships} 
              />}
              {activeTab===2 && <SideProfile userResume={user.userResume} />}
              {activeTab===3 && <Security user={user} token={token} />}
              
          </div>
        </div>
    </main>
    </>
  );
}

export default Profile;
