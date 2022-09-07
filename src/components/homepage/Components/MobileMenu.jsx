import React from 'react'
import { Link } from 'react-router-dom'
import RegularButton from './RegularButton'
const MobileMenu = ({state}) => {
  return (
      <nav className={`${state ? `hidden` : `block`} bg-[#00142A] text-[#6C94F7] m-0 pt-2 font-normal text-center gap-4`}>
          <Link to='#' className='text-md py-2 px-4 block'>Home</Link>
          <Link to='#' className='text-md py-2 px-4 block'>About</Link>
          <Link to='#' className='text-md py-2 px-4 block'>Community</Link>
          <Link to='#' className='text-md py-2 px-4 block'>Internships</Link>
          <Link to='#' className='text-md py-2 px-4 block'>Contact</Link>
          <Link to="#" className='px-4 py-4'><RegularButton>Join Us</RegularButton></Link>
    </nav>
  )
}

export default MobileMenu