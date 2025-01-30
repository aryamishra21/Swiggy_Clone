import React from 'react'

const ShimmerMain = () => {
  return (
    <div className='mt-40 mx-[13%] flex gap-10 flex-col'>
        <div className='grid grid-cols-6 gap-10'>
        {Array(6).fill(' ').map((el,id)=><div className='min-w-[10rem] h-[10rem] bg-gray-200 rounded-full' key={id}/>)}
        </div>
        <hr/>
        <div className='grid grid-cols-4 gap-10'>
        {Array(20).fill(' ').map((el,id)=><div className='min-w-[14rem] h-[10rem] bg-gray-200 rounded-xl' key={id}/>)}
        </div>
    </div>
  )
}

export default ShimmerMain