import React from 'react'
//DO copy the code from index.css

const InputField = ({type, value,placeholder,onChange}) => {
  return (
    <div className='relative'>
        <label className='block text-sm font-medium text-gray-700'>
            <input type={type} value={value} placeholder={placeholder} onChange={onChange} className='px-6 h-[45px] w-full border rounded-md border-gray-400 outline-none focus:border-blue-400 transition duration-200'>
            </input>
        </label>
    </div>
  )
}

InputField.defaultProps = {
    type: "text",
    placeholder: "Input",
}

export default InputField