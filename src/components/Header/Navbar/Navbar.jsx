import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { HiOutlineTerminal } from "react-icons/hi";
import { MdBusiness } from "react-icons/md";
import "./navbar.scss";
import { useCookies } from "react-cookie";
const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [loginActive, setloginActive] = useState(false);
  const [signupActive, setSignupActive] = useState(false);

  // need to access from cookies when cookies applied over whole site
  //const token = localStorage.getItem("token");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]); 

  const gotohome = () => {
    navigate("/");
  };
  const toggle = () => {
    if (loginActive) setloginActive(false);
    if (signupActive) setSignupActive(false);
    setActive(!active);
  };

  const toggleLogin = () => {
    if (signupActive) setSignupActive(false);
    if (active) setActive(false);
    setloginActive(!loginActive);
  };
  const toggleSignup = () => {
    if (loginActive) setloginActive(false);
    if (active) setActive(false);
    setSignupActive(!signupActive);
  };
  const logout = () => {
    navigate("/auth/logout");
  };

<<<<<<< HEAD
  return (
    <nav className="w-full bg-black/50 shadow backdrop-blur-xl fixed text-white">
      <div className="relative py-3 px-3 sm:px-5 flex flex-row items-center justify-between max-w-7xl m-auto nav_container">
        <div onClick={gotohome} className="cursor-pointer">
          <img
            className="h-8 w-35 sm:h-10 sm:w-40"
            src="https://i.ibb.co/kQmGYgB/crypto-final-logo-png-14-1.png"
            alt="brand-image"
          />
        </div>
        <div>
          <div className={`nav_dropLinks ${active ? "show" : "hide"}`}>
            <div className="absolute top-20 left-0 right-0 w-full px-2 rounded-b-md">
              <ul className="bg-gray-900 flex flex-col items-center text-lg rounded-md transition-all">
                <li className="p-1 cursor-pointer hover:text-purple-400">
                  <a
                    href="https://community.cryptonaukri.com/"
                    target="_blank"
                    className="hover:text-purple-400"
                  >
                    Community
                  </a>
                </li>
                <li className="p-1 cursor-pointer hover:text-purple-400">
                  <a href="/jobspage" className="hover:text-purple-400">
                    Jobs
                  </a>
                </li>
                <li className="p-1 cursor-pointer hover:text-purple-400">
                  <a href="/internships" className="hover:text-purple-400">
                    Internships
                  </a>
                </li>
                <li className="p-1 cursor-pointer hover:text-purple-400">
                  <a href="/aboutus" className="hover:text-purple-400">
                    About us
                  </a>
                </li>
              </ul>
=======
    return (
        <nav className="w-full bg-black/50 shadow backdrop-blur-xl fixed text-white">
            <div className="relative py-3 px-3 sm:px-5 flex flex-row items-center justify-between max-w-7xl m-auto nav_container">
                <div onClick={gotohome} className="cursor-pointer">
                    <img className="h-8 w-35 sm:h-10 sm:w-40"
                       src="https://i.ibb.co/kQmGYgB/crypto-final-logo-png-14-1.png"
                       alt="brand-image" />
                </div>
                <div>
                    <div className={`nav_dropLinks ${active?'show':'hide'}`}>
                        <div className="absolute top-20 left-0 right-0 w-full px-2 rounded-b-md">
                            <ul className="bg-gray-900 flex flex-col items-center text-lg rounded-md transition-all">
                                <li className="p-1 cursor-pointer hover:text-purple-400"><a href="https://community.cryptonaukri.com/" target='_blank' className="hover:text-purple-400">Community</a></li>
                                <li className="p-1 cursor-pointer hover:text-purple-400"><a href="/jobspage" className="hover:text-purple-400">Jobs</a></li>
                                <li className="p-1 cursor-pointer hover:text-purple-400"><a href="/internships" className="hover:text-purple-400">Internships</a></li>
                                <li className="p-1 cursor-pointer hover:text-purple-400"><a href="/aboutus" className="hover:text-purple-400">About us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="nav_horizontalLinks" >
                        <ul className="flex gap-4">
                            <li className="cursor-pointer hover:text-purple-400 hover:underline hover:underline-offset-4"><a href="https://community.cryptonaukri.com/" target='_blank' className="hover:text-purple-400">Community</a></li>
                            <li className="cursor-pointer hover:text-purple-400 hover:underline hover:underline-offset-4"><a href="/jobspage" className="hover:text-purple-400">Jobs</a></li>
                            <li className="cursor-pointer hover:text-purple-400 hover:underline hover:underline-offset-4"><a href="/internships" className="hover:text-purple-400">Internships</a></li>
                            <li className="cursor-pointer hover:text-purple-400 hover:underline hover:underline-offset-4"><a href="/aboutus" className="hover:text-purple-400">About us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {
                        // need to access from cookies when cookies applied over whole site
                        token ?
                        <div className="flex items-center gap-2">
                            <div onClick={()=>{navigate('/profile')}} className='cursor-pointer'><CgProfile size={30}/></div>       {/*Routing Error*/}
                            <div onClick={()=>logout()} className="cursor-pointer">Sign out</div>
                        </div> :
                        <div className="flex items-center gap-3">
                            <button onClick={toggleLogin} className="hover:text-purple-400">Login</button>
                            <div className={`absolute top-20 right-2 w-56 bg-gray-900 p-3 rounded-md ${loginActive?'show':'hide'}`}>
                                <ul className="text-base">
                                    <a href="/auth/devlogin"><li className="flex gap-2 items-center hover:text-purple-400 cursor-pointer"><HiOutlineTerminal /><span>Developer Login</span></li></a>
                                    <a href="/companyLogin"><li className="mt-2 flex gap-2 items-center hover:text-purple-400 cursor-pointer"><MdBusiness /><span>Business Login</span></li></a>
                                </ul>
                            </div>
                            <button onClick={toggleSignup} className="signup_btn px-2 py-1.5">Sign up</button>
                            <div className={`absolute top-20 right-2 w-56 bg-gray-900 p-3 rounded-md ${signupActive?'show':'hide'}`}>
                                <ul className="text-base">
                                    <a href="/auth/devsignup"><li className="flex gap-2 items-center hover:text-purple-400 cursor-pointer"><HiOutlineTerminal /><span>Developer Sign up</span></li></a>
                                    <a href="/companySignUp"><li className="mt-2 flex gap-2 items-center hover:text-purple-400 cursor-pointer"><MdBusiness /><span>Business Sign up</span></li></a>
                                </ul>
                            </div>
                        </div>
                    }
                    <div onClick={toggle} className="hamburger w-7 ml-2 cursor-pointer">
                        <div className="w-1/2 h-0.5 bg-white line rounded-md"></div>
                        <div className="w-full h-0.5 bg-white my-1.5 rounded-md"></div>
                        <div className="w-3/4 h-0.5 bg-white rounded-md"></div>
                    </div>
                </div>
>>>>>>> dev
            </div>
          </div>
          <div className="nav_horizontalLinks">
            <ul className="flex gap-4">
              <li className="cursor-pointer hover:text-purple-400 hover:underline hover:underline-offset-4">
                <a
                  href="https://community.cryptonaukri.com/"
                  target="_blank"
                  className="hover:text-purple-400"
                >
                  Community
                </a>
              </li>
              <li className="cursor-pointer hover:text-purple-400 hover:underline hover:underline-offset-4">
                <a href="/jobspage" className="hover:text-purple-400">
                  Jobs
                </a>
              </li>
              <li className="cursor-pointer hover:text-purple-400 hover:underline hover:underline-offset-4">
                <a href="/internships" className="hover:text-purple-400">
                  Internships
                </a>
              </li>
              <li className="cursor-pointer hover:text-purple-400 hover:underline hover:underline-offset-4">
                <a href="/aboutus" className="hover:text-purple-400">
                  About us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {
            // need to access from cookies when cookies applied over whole site
            cookies ? (
              <div className="flex items-center gap-2">
                <div
                  onClick={() => {
                    navigate("/profile");
                  }}
                  className="cursor-pointer"
                >
                  <CgProfile size={30} />
                </div>
                <div onClick={() => logout()} className="cursor-pointer">
                  Sign out
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button onClick={toggleLogin} className="hover:text-purple-400">
                  Login
                </button>
                <div
                  className={`absolute top-20 right-2 w-56 bg-gray-900 p-3 rounded-md ${
                    loginActive ? "show" : "hide"
                  }`}
                >
                  <ul className="text-base">
                    <a href="/auth/devlogin">
                      <li className="flex gap-2 items-center hover:text-purple-400 cursor-pointer">
                        <HiOutlineTerminal />
                        <span>Developer Login</span>
                      </li>
                    </a>
                    <a href="/companyLogin">
                      <li className="mt-2 flex gap-2 items-center hover:text-purple-400 cursor-pointer">
                        <MdBusiness />
                        <span>Business Login</span>
                      </li>
                    </a>
                  </ul>
                </div>
                <button
                  onClick={toggleSignup}
                  className="signup_btn px-2 py-1.5"
                >
                  Sign up
                </button>
                <div
                  className={`absolute top-20 right-2 w-56 bg-gray-900 p-3 rounded-md ${
                    signupActive ? "show" : "hide"
                  }`}
                >
                  <ul className="text-base">
                    <a href="/auth/devsignup">
                      <li className="flex gap-2 items-center hover:text-purple-400 cursor-pointer">
                        <HiOutlineTerminal />
                        <span>Developer Sign up</span>
                      </li>
                    </a>
                    <a href="/companySignUp">
                      <li className="mt-2 flex gap-2 items-center hover:text-purple-400 cursor-pointer">
                        <MdBusiness />
                        <span>Business Sign up</span>
                      </li>
                    </a>
                  </ul>
                </div>
              </div>
            )
          }
          <div onClick={toggle} className="hamburger w-7 ml-2 cursor-pointer">
            <div className="w-1/2 h-0.5 bg-white line rounded-md"></div>
            <div className="w-full h-0.5 bg-white my-1.5 rounded-md"></div>
            <div className="w-3/4 h-0.5 bg-white rounded-md"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
