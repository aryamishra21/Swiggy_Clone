import React from 'react'
import { Link } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div className='flex flex-col mt-20 items-center gap-4'>
        <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" className='w-[25rem] h-[25rem]' alt="" />
        <p className='font-bold text-2xl text-gray-600'>Your cart is empty</p>
        <p className='font-semibold text-sm text-gray-500'>You can go to home page to view more restaurants</p>
        <Link to="/" className="px-4 py-2 uppercase bg-orange-600 text-white font-semibold text-sm font-lg w-fit mt-5 hover:shadow-lg">See restaurants near you</Link>
    </div>
  )
}

export default EmptyCart