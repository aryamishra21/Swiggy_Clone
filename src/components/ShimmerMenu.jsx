import React from 'react'

const ShimmerMenu = () => {
  return (
    <div className='lg:mx-[20%] mt-24 mb-10'>
              <div
        className="rounded-3xl -100 p-2 my-5 "
        style={{
          background:
            "linear-gradient(rgb(255, 255, 255) -6.71%, rgb(235, 235, 242) 56.19%, rgb(223, 223, 231) 106.56%)",
        }}
      >
        <p className="font-bold text-2xl mb-5 p-2 w-[5rem] h-[3rem] bg-gray-300 rounded-2xl "></p>
        <div className="rounded-3xl border-2 bg-white m-2 ">
          <div className="m-2 p-2">
            <div className="flex items-center  gap-1 font-bold">
              <p className='p-2 w-[10rem] h-[3rem] bg-gray-300 rounded-2xl mb-2'>
                
              </p>
            </div>
            <p className='p-2 w-[10rem] h-[3rem] bg-gray-300 rounded-2xl mb-2'></p>
            <div className="flex gap-1 items-center">
              <p className="text-gray-500 font-medium text-sm p-2 w-[10rem] h-[3rem] bg-gray-300 rounded-2xl"></p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex  w-full h-[5rem] justify-between my-4'>
         {Array(3).fill(' ').map((arr)=><div className='min-w-[10rem] min-h-[2rem] bg-gray-300  rounded-2xl '></div>)}
      </div>
      <div className='flex flex-col gap-3 w-full h-[20rem] '>
         {Array(10).fill(' ').map((arr)=><div className='min-w-[8rem] min-h-[5rem] bg-gray-300 rounded-lg'></div>)}
      </div>
    </div>
  )
}

export default ShimmerMenu