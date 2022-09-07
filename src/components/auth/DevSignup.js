import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const INITIAL_COUNT = 600;

const Signup = ({ setCookie }) => {
  const navigate = useNavigate();

  var url_string = window.location.href;
  var url = new URL(url_string);
  var redirectType = url.searchParams.get('redirecttype');
  var redirectid = url.searchParams.get('redirectid');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [cuoponCode, setCuoponCode] = useState('');

  const [step, setStep] = useState(1);

  const [otp, setOtp] = useState('');
  // otp timer setup
  const [status, setStatus] = useState('stop')
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus('stop');
      }
    },
    status === 'start' ? 1000 : null
    // passing null stops the interval
  );

  const [signUpError, setSignUpError] = useState('');
  const [loading, setLoading] = useState(false);

  var API = process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var code = url.searchParams.get('code');
    var redirectType = url.searchParams.get('redirecttype');
    var redirectid = url.searchParams.get('redirectid');

    if (code) {
      setCuoponCode(code);
    }
  }, []);

  //console.log(process.env.REACT_APP_PRODUCTION_API_ENDPOINT);

  const handleSendOtp = (event) => {
    event.preventDefault();
    setLoading(true);
    setSignUpError('');
    setOtp('');
    if (email && password && firstName && lastName && phoneNumber && location) {
      try {
        const response = fetch(`${API}/api/v1/user/otp?email=${email}`);
        response
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            if (data.code === 'OTP_SENT') {
              setStep(2);
              setStatus('start');
              setLoading(false);
              return;
            }
            if (data.userAdded === false) {
              if (data.code === 'DUPLICATE') {
                setSignUpError('You are already registered with us.');
                setLoading(false);
                return;
              }
            }
            if (data.code === 'OTP_FAILED') {
              setSignUpError('Something went wrong !!!');
              setLoading(false);
            }
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setSignUpError('Fill up all values.');
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(email.split('@')[1]);
    //console.log(process.env.REACT_APP_TEST_API_ENDPOINT);

    if (
      email &&
      password &&
      firstName &&
      lastName &&
      phoneNumber &&
      location &&
      otp
    ) {
      setLoading(true);
      setSignUpError();
      try {
        const response = await fetch(`${API}/api/v1/user/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            location: location,
            phoneNumber: phoneNumber,
            otp: Number(otp),
          }),
        });
        const data = await response.json();
        if (data.userAdded === false) {
          if (data.code === 'DUPLICATE') {
            setSignUpError('You are already registered with us.');
          }
          if (data.code === 'WRONG_OTP') {
            setOtp('');
            setSignUpError('Wrong OTP');
          }
          setLoading(false);
          return;
        }
        if (data.userAdded === true) {
          try {
            const response = await Axios.post(`${API}/api/v1/user/login`, {
              email,
              password,
            });
            const data = response.data;

            if (data.userLoggedIn) {
              // console.log(data);
              // console.log(response.headers.authorization)
              // setLoginError(data.message);
              setLoading(false);
              const timestamp = new Date().getTime();
              const expire = timestamp + 60 * 60 * 24 * 1000 * 2;
              const expireDate = new Date(expire);
              setCookie('token', response.headers.authorization, {
                expires: expireDate,
                path: '/',
                domain: '.cryptonaukri.com',
              });
              // below codes to be removed once cookies is applied accross the site
              localStorage.setItem('token', response.headers.authorization);
              localStorage.setItem('cUser', 'DEVELOPER');
              localStorage.setItem('login', true);

              if (redirectType === 'internship' || redirectType === 'job') {
                navigate(
                  `/jobapplication?id=${redirectid}&type=${redirectType}`
                );
                return;
              }
              if (redirectType === 'community') {
                window.location.href = `https://community.cryptonaukri.com${redirectid}`;
                return;
              }

              navigate('/profile');
            }
          } catch (error) {
            setSignUpError('Something went wrong. Try logging in');
            setLoading(false);
          }
          setLoading(false);
          return;
        }

        setLoading(false);
        //console.log(data);
      } catch (error) {
        setSignUpError('Something went wrong!');
        setLoading(false);
        //console.log(error)
      }
    } else {
      setSignUpError('Something went wrong!');
      console.log('Email and password is required.');
    }
  };

  return (
    <main className='bg-gray-300 login-tailwind-font'>
      <div className='max-w-xl mx-auto rounded bg-gray-300'>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div className='bg-white shadow-2xl rounded pt-2 pb-16 ml-3 mr-3'>
          <br />
          <div className='text-center text-gray-700 mb-6 text-2xl font-semibold'>
            👷 Developer Sign-Up
          </div>
          {step === 1 && (
            <form className='w-4/5 mx-auto' autocomplete='off'>
              {signUpError ? (
                <div className='mb-4 bg-red-400 text-white px-2 py-2 rounded text-xs'>
                  {signUpError}
                </div>
              ) : (
                <></>
              )}

              <p className='text-blue-400 '>Your Name</p>
              <div className='flex items-center rounded shadow-sm mb-4 gap-x-2'>
                <input
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  className='p-2 text-gray-900 w-full h-12 focus:ring-2 focus:ring-blue-600 focus:outline-none rounded'
                  type='text'
                  placeholder='First Name '
                  autocomplete='do-not-autofill'
                />
                <input
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  className='p-2 text-gray-900  w-full h-12 focus:ring-2 focus:ring-blue-600 focus:outline-none rounded'
                  type='text'
                  placeholder='Last Name '
                  autocomplete='do-not-autofill'
                />
              </div>

              <p className='text-blue-400 '>Email and Mobile Number</p>
              <div className='flex items-center  rounded shadow-sm mb-4 gap-x-2'>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className='p-2 text-gray-900 w-full h-12 focus:ring-2 focus:ring-blue-600 focus:outline-none rounded'
                  type='text'
                  placeholder='Email '
                  autocomplete='do-not-autofill'
                />
                <input
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  className='p-2 text-gray-900 w-full h-12 focus:ring-2 focus:ring-blue-600 focus:outline-none rounded'
                  type='text'
                  placeholder='Mobile Number'
                  autocomplete='do-not-autofill'
                />
              </div>

              <p className='text-blue-400 '>Your City</p>
              <div className='flex items-center rounded shadow-sm mb-4'>
                <input
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  className='p-2 text-gray-900 w-full h-12 focus:ring-2 focus:ring-blue-600 focus:outline-none rounded'
                  type='text'
                  placeholder='City '
                  autocomplete='do-not-autofill'
                />
              </div>

              <p className='text-blue-400 '>Password</p>
              <div className=' flex items-center rounded shadow-sm'>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className='p-2 text-gray-900  w-full h-12 focus:ring-2 focus:ring-blue-600 focus:outline-none rounded'
                  type='password'
                  placeholder='Password'
                  autocomplete='do-not-autofill'
                />
              </div>
              <br />

              {loading ? (
                <button
                  type='button'
                  className='bg-blue-600 block mx-auto text-white text-sm rounded shadow-md px-6 py-2'
                  disabled
                >
                  Loading...
                </button>
              ) : (
                <button
                  onClick={handleSendOtp}
                  className='bg-blue-600 block mx-auto text-white text-sm rounded shadow-md px-6 py-2 w-full'
                >
                  Sign Up
                </button>
              )}
              <br />
            </form>
          )}
          {step === 2 && (
            <>
              <div className='p-3'>
                {signUpError ? (
                  <div className='mb-4 bg-red-400 text-white px-2 py-2 rounded text-xs'>
                    {signUpError}
                  </div>
                ) : (
                  <></>
                )}
                <div className='ring-2 ring-blue-800 bg-gray-800 rounded p-2 text-blue-600 font-semibold'>
                  An OTP is sent to <span className='text-white'>{email}</span>,
                  to verify your email address
                </div>
                <br />
                <p className='text-blue-400 '>Verify OTP</p>
                <div className='bg-gray-700 flex items-center rounded shadow-sm mb-4'>
                  <input
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                    className='p-2 text-gray-300 bg-gray-700 w-full h-12 focus:ring-2 focus:ring-blue-600 focus:outline-none rounded'
                    type='text'
                    placeholder='OTP'
                    autocomplete='do-not-autofill'
                  />
                </div>
                {loading ? (
                  <>
                    <button
                      type='button'
                      className='bg-blue-600 block mx-auto text-white text-sm rounded shadow-md px-6 py-2'
                      disabled
                    >
                      Loading...
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSubmit}
                      className='bg-blue-600 block mx-auto text-white text-sm rounded shadow-md px-6 py-2 w-full'
                    >
                      Verify Email
                    </button>
                    <br />
                    <div className='flex items-center justify-center gap-2'>
                      <div className={`${status==='stop' ? 'text-red-700' : 'text-green-600'} text-xl`}>{twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}</div>
                      {
                        status === 'stop' ?
                        <button
                          onClick={handleSendOtp}
                          className='text-blue-600 block text-sm rounded shadow-md px-2.5 py-2'
                        >
                          Re-Send OTP
                        </button> : null
                      }
                    </div>
                  </>
                )}

                <br />
              </div>
            </>
          )}
          <div className='text-center'>
            <a
              className='text-blue-400 text-md font-semibold'
              href='/auth/devlogin'
            >
              Exsisting User ? Sign-In{' '}
            </a>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </main>
  );
};

export default Signup;

// helping functions
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const twoDigits = (num) => String(num).padStart(2, "0");