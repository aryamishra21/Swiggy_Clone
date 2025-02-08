import React, {useMemo} from 'react'
import { useSelector } from 'react-redux'
import store from '../utils/store/store'
import CartCard from '../components/CartCard'
import EmptyCart from '../components/EmptyCart'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const cartItems=useSelector((store)=>store.cart.items)
  const cartLocation=useSelector((store)=>store.cart.location)
  // console.log('cart',cartItems,cartLocation)
  const sum = useMemo(() => {
    return cartItems.reduce((acc, item) => 
      acc + ((item?.finalPrice ?? item?.defaultPrice ?? item?.price ?? 0) * item?.quantity), 0
    );
  }, [cartItems]);
  if(!(cartItems.length)) return (<EmptyCart/>)
  return (
    <div className='w-full mt-20 md:h-[88vh] h-auto bg-gray-300 '>
      <div to={'/restaurant/'+cartLocation.id} className='w-[90%] md:w-[80%] mx-auto  mt-20 bg-white p-6'>
      <Link to={'/restaurant/'+cartLocation?.id}>
      <p className='font-semibold text-xl'>{cartLocation?.name}</p>
      <p className='uppercase text-sm text-gray-500'>{cartLocation?.areaName}</p>
      <hr  className='w-[10%] my-2 border-black border-2'/>
      </Link>
      <div className='flex justify-between flex-col md:flex-row'>
      <Link to={'/restaurant/'+cartLocation?.id} className='w-[100%] md:w-[60%]  max-h-[50dvh] sm:max-h-[70dvh] overflow-y-scroll'>
        {cartItems.map((item)=> <CartCard item={item}/>)}
      </Link>
      <div className='w-[100%] md:w-[35%] border p-3 text-sm text-gray-600 h-[15rem] shadow-lg rounded-md mt-10'>
        <p className='font-semibold py-2 text-black'> Bill Details</p>
        <div className='flex justify-between py-2'>
          <p>Item Total</p>
          <p>₹ {sum/100}</p>
        </div>
        <div className='flex justify-between py-2'>
          <p>Delivery Fee</p>
          <p>₹ 63</p>
        </div>
        <div className='flex justify-between py-2'>
          <p className='w-[70%]'>GST and Restaurant Charges</p>
          <p>₹ 24</p>
        </div>
        <hr className='border-black my-4'/>
        <div className='flex justify-between  text-black font-semibold text-[1rem]'>
          <p>TO PAY</p>
          <p>₹ {sum/100+63+24}</p>
        </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default CartPage