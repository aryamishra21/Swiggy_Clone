import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='mt-20 flex items-center justify-center h-[90vh] flex-col text-center gap-10 border border-red-800'>
        <img className="w-[20rem] h-[17rem]" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/empty_404_3x_rgdw87" alt="" />
        <div>
            <p className='text-2xl font-bold mb-5'>Page not found</p>
            <p className='text-gray-500 w-[70%] mx-auto'>Uh-oh! Looks like the page you are trying to access, doesn't exist. Please start afresh.</p>
            <Link to="/"><button className='py-2 px-6 text-white font-bold bg-orange-600 mt-5'>GO HOME</button></Link>
        </div>
    </div>
  )
}

export default PageNotFound