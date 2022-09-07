import { useState } from "react";


const ForgotPassword = () =>{

    const [passwordChangeError, setPasswordChangeError] = useState("");
    const [smLoading, setSmLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [closeModal, setCloseModal] = useState(true);
    const [pemail, setPemail] = useState("");

    const handleEmailPasswordChange = (event) => {

        //event.preventDefault();
        // console.log(pemail);
        if(pemail){
            setSmLoading(true);
            setPasswordChangeError("");
            try{
                fetch("https://quiklrn-api.azurewebsites.net/reset_password",{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: pemail,
                    })
                })
                .then((response)=>response.text())
                .then((data)=>{
                    //console.log(data);
                    setSmLoading(false);
                    setStep(2);
                })
                .catch((error)=>{
                    console.log(error);
                    setPasswordChangeError("the backend broke lol :/");
                    setSmLoading(false);
                })
            }catch(error){
                console.log(error);
                setSmLoading(false);
                setPasswordChangeError("the backend broke lol :/");
            }
        }else{
            setPasswordChangeError("Something went wrong !!");
            setSmLoading(false);
            return;
        }
    }

    return(
    <>
    <button type="button" onClick={()=>{setCloseModal(!closeModal)}} className="mb-4 mt-1 text-xs text-md text-gray-500 text-center underline text-cyan-500 rounded-lg py-1 px-2 m-auto">Forgot your password ?</button>
    <div className={`p-4 fixed inset-0 bg-gray-900 bg-opacity-73 overflow-y-auto h-full w-full ${closeModal?'hidden':'visible'}`} id="my-modal">
        <div className="max-w-xl m-auto mt-36 text-white">
            <div className="text-white m-auto ">
                <h3 className="mt-10 text-2xl text-center">Recover Your Password</h3>
                <br/>
                {step === 1 &&<div className="m-auto text-left max-w-md">
                    <br/>
                    {passwordChangeError?<div className="text-red-500 text-md m-2">{passwordChangeError}</div>:<></>}
                    <input onChange={(e)=>{setPemail(e.target.value)}} type="email" id="pemail" name="pemail" placeholder="E-mail " className="bg-slate-900 ring-2 ring-blue-800 max-w-md m-auto rounded-md p-2 text-blue-300 w-full" />
                    <button type="button" onClick={()=>{handleEmailPasswordChange()}} className="bg-blue-800 text-slate-200 rounded w-full mt-3 p-2 flex justify-center" {...smLoading?'disabled':''}>
                        {smLoading?<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>:''}
                        Send Verification Code</button>
                    <br/>
                    <br/>
                    <br/>
                </div>}
                {step === 2 &&
                <div className="bg-slate-900 ring-2 ring-blue-800 max-w-md m-auto rounded-md p-2 text-blue-300 w-full">You will recieve a link to change your password in your SRMIST email inbox, use that password to log into our app.
                <br/>
                <button onClick={()=>{setStep(1)}} className="bg-blue-800 text-slate-200 rounded w-full mt-3 p-2 flex justify-center text-xs">Back</button>
                <button onClick={()=>{setCloseModal(!closeModal)}} className="bg-red-500 text-slate-200 rounded w-full mt-3 p-2 flex justify-center text-xs">Close</button>
                </div>}
                <br/>
                {/* <ol className="text-xl">
                    <li>1. Use your SRM-Email to change your Quiklrn Password using this <a className="text-blue-700" target="_blank" rel="noopener" href="https://quiklrn.com/user/password_forgot.php">link</a></li><br/>
                    <li>2. You will recieve a link to change your password in your email</li><br/>
                    <li>3. Use that password to login into our app.</li><br/>
                </ol> */}
                            
            </div>
            <button type="button" onClick={()=>{setCloseModal(!closeModal)}} className="m-4 text-md text-white text-center bg-red-600 font-semibold rounded-lg py-1 px-2 ">Close</button>
        </div>
    </div>
    </>
    );
}

export default ForgotPassword;
