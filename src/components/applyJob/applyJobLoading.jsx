import React from 'react'

const ApplyJobLoading = () => {
  return (
    <div className='w-full bg-gray-800 text-white'>
        <div className="animate-pulse px-3 pt-28 mx-auto w-full max-w-4xl md:px-0 pb-5">
          <div className='w-1/3 h-4 rounded-sm bg-gray-300'></div>
          <div className='mt-1 w-1/4 h-3 rounded-sm bg-gray-300'></div>
          <div className='mt-3 w-1/4 h-3 rounded-sm bg-gray-300 '></div>
          <div className='mt-2 flex items-center justify-between'>
            <div className='w-1/4 h-14 bg-gray-300 rounded-sm'></div>
            <div className='w-1/4 h-14 bg-gray-300 rounded-sm'></div>
            <div className='w-1/4 h-14 bg-gray-300 rounded-sm'></div>
          </div>
          <div className='mt-2 w-1/3 h-3 rounded-sm bg-gray-300'></div>
          <div className='w-full my-2 text-gray-300 border-t'></div>
          <div className='mt-3'>
            <div className='text-base'>About Company</div>
            <div className='w-full h-24 rounded-sm bg-gray-300'></div>
          </div>
          <div className='mt-3'>
            <div className='text-base'>Perks</div>
            <div className='flex flex-wrap gap-2 mt-1'>
              <div className='grow-0 shrink w-16 h-7 rounded-2xl bg-gray-300'></div>
              <div className='grow-0 shrink w-16 h-7 rounded-2xl bg-gray-300'></div>
              <div className='grow-0 shrink w-16 h-7 rounded-2xl bg-gray-300'></div>
            </div>
          </div>
          <div className='mt-3'>
            <div className='text-base'>Job Description / Responsibilites</div>
            <div className='w-full h-24 rounded-sm bg-gray-300'></div>
          </div>
          <div className='mt-3'>
            <div className='text-base'>Required Skills</div>
            <div className='flex flex-wrap gap-2 mt-1'>
              <div className='grow-0 shrink w-16 h-7 rounded-2xl bg-gray-300'></div>
              <div className='grow-0 shrink w-16 h-7 rounded-2xl bg-gray-300'></div>
              <div className='grow-0 shrink w-16 h-7 rounded-2xl bg-gray-300'></div>
              <div className='grow-0 shrink w-16 h-7 rounded-2xl bg-gray-300'></div>
            </div>
          </div>
          <div className='mt-3'>
            <div className='text-base'>Number of openings</div>
            <div className='w-4 h-3 bg-gray-300 rounded-sm'></div>
          </div>
        </div>
    </div>
  )
}

export default ApplyJobLoading