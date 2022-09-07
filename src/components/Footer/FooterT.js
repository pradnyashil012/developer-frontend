import React from 'react';

import {
  FaLinkedin,
  FaTwitterSquare,
  FaInstagramSquare,
  FaDiscord,
} from 'react-icons/fa';
const Footer = () => {
  return (
    <div className='bg-gray-900'>
      <br />
      <br />
      <footer className='max-w-7xl  m-auto mt-25 flex justify-between flex-wrap sm:flex-nowrap p-5 sm:p-4 text-center bg-gray-900'>
        <div className='text-left'>
          <p className='text-white text-xl'>About</p>
          <ul className='text-gray-500 text-md'>
            <li>
              <a href='/aboutus'>How it works</a>
            </li>
            <li>
              <a
                href='https://www.linkedin.com/company/cryptonaukri/jobs/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div className='text-left'>
          <p className='text-white text-xl'>Partner with Us</p>
          <ul className='text-gray-500 text-md'>
            <li>
              <a href=''>Partnership Program</a>
            </li>
            <li>
              <a href=''>Affilate Program</a>
            </li>
            <li>
              <a href=''>Integrations Community</a>
            </li>
            <li>
              <a href=''>Promotions and Events</a>
            </li>
          </ul>
        </div>
        <div className='text-left'>
          <p className='text-white text-xl'>Support</p>
          <ul className='text-gray-500 text-md'>
            <li>
              <a href='/contactus'>Contact Us</a>
            </li>
            <li>
              <a href='/privacy'>Privcay Policy</a>
            </li>
            <li>
              <a href='/dcma'>DCMA</a>
            </li>
            <li>
              <a href='/terms'>Terms and Conditions</a>
            </li>
          </ul>
        </div>
        <div className='text-left mt-4'>
          <p className='text-white text-xl'>Follow us at</p>
          <br />
          <div className='flex gap-2'>
            <a
              href='https://discord.com/invite/r9bpXkqSzH'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaDiscord className='text-xl text-white transform transition hover:scale-110' />
            </a>
            <a
              href='https://www.linkedin.com/company/cryptonaukri/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaLinkedin className='text-xl text-white transform transition hover:scale-110' />
            </a>
            <a
              href='https://twitter.com/CryptoNaukri'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaTwitterSquare className='text-xl text-white transform transition hover:scale-110' />
            </a>
            <a
              href='https://www.instagram.com/cryptonaukri/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaInstagramSquare className='text-xl text-white transform transition hover:scale-110' />
            </a>
          </div>
          <div className='mt-4'>
            <a
              href='https://wa.me/+918788305490'
              target='_blank'
              rel='noreferrer'
              className='flex items-center gap-2 text-gray-500'
            >
              Ask Queries
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png'
                alt='whatsapp'
                className='w-8 h-8'
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
