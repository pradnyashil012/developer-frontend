import React from 'react' 
const RegularButton = ({ children, to, className , state, setState }) => {
    return (
       <button className={`${className} bg-[#003979] px-4 py-2 rounded-md font-medium border-2  border-[#003979] text-white   hover:text-[#003979] hover:bg-opacity-0 hover:border-2 hover:border-[#003979]`}onClick={e=> {setState(!state)}}> <a href={to || "#"}>{ children}</a></button>
  )
}

export default RegularButton