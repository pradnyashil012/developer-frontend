import React, { useState, useEffect } from "react";
// import ForgotPassword from "./ForgotPassword";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {AiOutlineUser} from 'react-icons/ai'
import {MdLockOutline} from 'react-icons/md'
import { Oval } from "react-loader-spinner";

const Login = ({ setCookie }) => {
  const navigate = useNavigate();

  var url_string = window.location.href;
  var url = new URL(url_string);
  var redirectType = url.searchParams.get("redirecttype");
  var redirectid = url.searchParams.get("redirectid");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  // const [nPassWrongs, setNPassWrongs] = useState(0);

  const API = process.env.REACT_APP_API_ENDPOINT;

  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(email.split('@')[1]);
    // console.log(process.env.REACT_APP_PRODUCTION_API_ENDPOINT);
    if (email && password) {
      setLoginError();
      setLoading(true);

      try {
        const response = await Axios.post(`${API}/api/v1/user/login`, {
          email,
          password,
        });
        const data = response.data;

        if (data.userLoggedIn) {
          // console.log(data);
          // console.log(response.headers.authorization);
          // setLoginError(data.message);
          setLoading(false);
          const timestamp = new Date().getTime();
          const expire = timestamp + 60 * 60 * 24 * 1000 * 2;
          const expireDate = new Date(expire);
          // console.log(expireDate);
          //document.cookie = `token=${response.headers.authorization}; expires=${expireDate}; path=/; domain=.cryptonaukri.com`;
          try {
            setCookie("token", response.headers.authorization, {
              expires: expireDate,
              path: "/",
              domain: ".cryptonaukri.com",
            });
          } catch (error) {
            alert(";p");
            console.log(error);
          }

          // below codes to be removed once cookies is applied accross the site
          localStorage.setItem("token", response.headers.authorization);
          localStorage.setItem("cUser", "DEVELOPER");
          localStorage.setItem("login", true);

          if (redirectType === "internship" || redirectType === "job") {
            navigate(`/jobapplication?id=${redirectid}&type=${redirectType}`);
            return;
          }
          if (redirectType === "community") {
            window.location.href = `https://community.cryptonaukri.com${redirectid}`;
            return;
          }

          // navigate("/jobs");
          navigate("/dashboard");
        }

        //console.log(data);
      } catch (error) {
        const errResp = error.response;
        if (errResp.data.code === "NOT_FOUND") {
          setLoginError(
            "You are not yet registered with us. Please Register your account"
          );
          setLoading(false);
        }
        if (errResp.data.code === "INVALID") {
          setLoginError("Account has been disabled(free trial period expired)");
          setLoading(false);
        }
        if (errResp.data.code === "WRONG_PASSWORD") {
          setLoginError("Wrong Email or Password");
          setLoading(false);
        }
        // setLoginError("Something went wrong!");
        setLoading(false);
      }
    } else {
      setLoginError("Something went wrong!");
      console.log("Email and password is required.");
    }
  };

  return (
    <>
    <div className="mt-16  bg-white">
     
      <div className='w-full flex flex-col md:flex-row items-center justify-center flex-1 text-center '>
        <div className='w-full md:w-3/5 p-5'>  {/* Login Section */}
        {/* <img src={logo} alt='logo' className='h-10' /> */}
        <div className='py-10'>
            <h2 className='text-3xl font-bold text-[#003979] mb-8'>Sign in to account</h2>
            <div className='border-4 w-10 border-[#003979] inline-block mb-2' />

            {/* Input Divs below */}
            <div className='flex flex-col items-center '>
                <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                    <AiOutlineUser className='text-gray-400 m-2' />
                    <input type='email' name='email' value={email} onChange={(e) => { setEmail(e.target.value);}}  placeholder="Username" className='bg-gray-100 outline-none text-sm flex-1' />
                    {/* using flex-1 above to expand full width */}
                </div>
                <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                    <MdLockOutline className='text-gray-400 m-2' />
                    <input type='password' name='password' value={password} onChange={handlePassChange} placeholder="Password" className='bg-gray-100 outline-none text-sm flex-1' />
                    {/* using flex-1 above to expand full width */}
                </div>
                <div className='flex justify-between w-64 mb-5'>
                    {/* <label className='flex items-center text-sm'><input type='checkbox' name='remember' className='mr-1'/>Remember me</label> */}
                    <div onClick={() => { navigate("/resetPassWord");}} className='text-xs hover:cursor-pointer'>Forgot Password?</div>
                </div>
                {loading? <Oval color="#003979" height={50} width={50} />
                :
                <button  onClick={handleSubmit} className='border-2 border-[#003979] text-[#003979] font-semibold rounded-full px-12 py-2 inline-block hover:bg-[#003979] hover:text-white hover:cursor-pointer'>LogIn</button>
                }
            </div>


        </div>
        </div>
        <div className='w-full md:w-2/5 md:h-[492px] bg-[#003979] text-white px-12 py-36'>  {/* signup Section */}
            <h2 className='text-3xl text-white font-bold mb-2'>Hello, company!</h2>
            <div className='border-4 w-10 border-white inline-block mb-2' />
            <div className='90%'>
              <p className='text-xl mb-3'>Post jobs and internships for your company</p>
              <p className='text-xl mb-6'>Hire our trained and skilled WEB3 developers</p>
              <p className='mb-10'>Fill up company info and start journey with us!</p>
            </div>
            <a href='/dev-signup' className='border-2 border-white font-semibold rounded-full px-12 py-2 inline-block hover:bg-white hover:text-[#003979]'>SignUp</a>
        </div>
    </div>
    </div>
    </>
  );
};

export default Login;