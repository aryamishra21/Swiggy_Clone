import React from 'react'

const ShimmerCard = () => {
  return (
    <div className='mt-20 '>
    <div className='grid grid-cols-4 gap-10'>
    {Array(15).fill(' ').map((el,id)=><div className='min-w-[14rem] h-[10rem] bg-gray-200 rounded-xl' key={id}/>)}
    </div>
</div>
  )
}

export default ShimmerCard