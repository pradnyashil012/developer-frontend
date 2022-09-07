import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const Logout = ({ removeCookie }) => {
  const navigate = useNavigate();
  // const [removeCookie] = useCookies(["token"]);
  // const token = cookies.token;
  // const location = useLocation();

  useEffect(() => {
    // if(token){
    removeCookie("token", {
      path: "/",
    });
    document.cookie.replace(/(?<=^|;).+?(?=\=|;|$)/g, (name) =>
      window.location.hostname
        .split(".")
        .reverse()
        .reduce(
          (domain) => (
            (domain = domain.replace(/^\.?[^.]+/, "")),
            (document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`),
            domain
          ),
          window.location.hostname
        )
    );
    localStorage.clear();
    toast.success("Succesfully Logged out !!");
    navigate("/");
    return;
    // }else{
    //     toast.error("Please Login first !!");
    //     navigate('/');
    // }
  }, []);

  return <>Logging out...</>;
};

export default Logout;