import React from "react";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import RegularButton from "./RegularButton";
import { useState } from "react";
import { IoClose, IoCloudyNight, IoMenuOutline } from "react-icons/io5";
import MobileMenu from "./MobileMenu";
import "../Styles/Header.css";
import { useCookies } from "react-cookie";
const Header = () => {
  // this state will control the display of menu icons and menubar in mobile devices
  const login = localStorage.getItem("login")
  const [menuDisplay, setMenuDisplay] = useState(true);
  const [registerDropdownDisplay, setRegisterDropdownDisplay] = useState(false);
  const [loginDropdownDisplay, setLoginDropdownDisplay] = useState(false);
  return (
    <header className="w-full header-gradient py-3   sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          {" "}
          <img src={logo} className="w-[150px] md:w-[210px]" alt="" />
        </Link>

        <nav className=" justify-end items-center text-black gap-4 hidden md:flex uppercase">
          <a href="https://community.cryptonaukri.com/">Community</a>
          <Link to="/internships">Internships</Link>
          <Link to="/jobs">Jobs</Link>

          {login ? (
            <RegularButton to="/auth/logout"> Sign Out</RegularButton>
          ) : (
            <>
              <RegularButton
                className="relative"
                state={loginDropdownDisplay}
                setState={setLoginDropdownDisplay}
              >
                Login
                {loginDropdownDisplay && (
                  <div className="absolute w-[200px] top-12 left-0 py-2 px-4 text-left rounded-md bg-white text-[#0351A3] shadow-md z-30">
                    <Link to="/auth/devlogin" className="block hover:text-black">
                      Developer Login
                    </Link>
                    <Link
                      to="/company-login"
                      className="block hover:text-black"
                    >
                      Business Login
                    </Link>
                  </div>
                )}
              </RegularButton>

              <RegularButton
                state={registerDropdownDisplay}
                setState={setRegisterDropdownDisplay}
                className="relative"
              >
                {" "}
                Register
                {registerDropdownDisplay && (
                  <div className="absolute w-[200px] top-12 left-0 py-2 px-4 text-left rounded-md bg-white text-[#0351A3] shadow-md  z-20">
                    <Link to="/dev-signup" className="block hover:text-black">
                      Developer Register
                    </Link>
                    <Link
                      to="/company-signup"
                      className="block hover:text-black"
                    >
                      Business Register
                    </Link>
                  </div>
                )}
              </RegularButton>
            </>
          )}
        </nav>

        <h1
          className="text-[#6C94F7] md:hidden text-2xl"
          onClick={() => setMenuDisplay(!menuDisplay)}
        >
          {menuDisplay ? <IoMenuOutline /> : <IoClose />}
        </h1>
      </div>
      <MobileMenu state={menuDisplay} />
    </header>
  );
};

export default Header;
