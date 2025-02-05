import React, {useMemo} from 'react'
import { useSelector } from 'react-redux'
import store from '../utils/store/store'
import ItemCard from '../components/ItemCard'
import CartCard from '../components/CartCard'

const CartPage = () => {
  const cartItems=useSelector((store)=>store.cart.items)
  const cartLocation=useSelector((store)=>store.cart.location)
  // console.log('cart',cartItems,cartLocation)
  const sum = useMemo(() => {
    return cartItems.reduce((acc, item) => 
      acc + ((item?.finalPrice ?? item?.defaultPrice ?? item?.price ?? 0) * item?.quantity), 0
    );
  }, [cartItems]);
  if(!(cartItems.length)) return (<div className='mt-28'>no items in cart</div>)
  return (
    <div className='w-full mt-20 bg-gray-300 '>
      <div className='w-[80%] mx-auto  mt-20 bg-white p-6'>
      <p className='font-semibold text-xl'>{cartLocation?.name}</p>
      <p className='uppercase text-sm text-gray-500'>{cartLocation?.area}</p>
      <hr  className='w-[10%] my-2 border-black border-2'/>
      <div className='flex justify-between'>
      <div className='w-[60%] '>
        {cartItems.map((item)=> <CartCard item={item}/>)}
      </div>
      <div className='w-[30%] border p-3 text-sm text-gray-600 h-[15rem] shadow-lg rounded-md'>
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
          <p>GST and Restaurant Charges</p>
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