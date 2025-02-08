import React from "react";
import { useSelector } from "react-redux";
import { imgURL } from "../utils/constants";
import { Link } from "react-router-dom";
const HeaderCartView = () => {
  const cartData = useSelector((store) => store.cart.items);
  const cartLocation = useSelector((store) => store.cart.location);
  if (!cartData.length) {
    return (
      <>
        <p className="font-bold text-3xl mt-5 text-gray-500 p-4">Cart Empty</p>
        <p className="px-4 py-2 text-gray-500">
          Good food is always cooking! Go ahead, order some yummy items from the
          menu.
        </p>
      </>
    );
  }
  return (
    <div>
      <div className="flex p-4 gap-5">
        <div className="w-[4rem] h-[4rem]">
          <img src={imgURL + cartLocation?.cloudinaryImageId} alt="" />
        </div>
        <div className="text-xs ">
          <p className="text-base font-semibold mb-1">{cartLocation.name}</p>
          <p className="text-gray-500 mb-4">{cartLocation.areaName}</p>
          <Link
            to={"/restaurant/" + cartLocation?.id}
            className="font-semibold text-blue-800 hover:font-bold"
          >
            View Full Menu
          </Link>
        </div>
      </div>
      <hr className="my-2 border-[1px] border-b-gray-500" />
      <div className="flex gap-2 flex-col mt-4">
        {cartData.map((item) => {
          return (
            <div className="flex items-center gap-1 text-sm">
              <p>
                {item.isVeg ? (
                  <svg
                    aria-hidden="true"
                    height="14"
                    width="14"
                    class="sc-bXCLTC jnXAjM"
                  >
                    <use xlinkHref="/food/sprite-CiiAtHUR.svg#vegVeg16"></use>
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    height="14"
                    width="14"
                    class="sc-bXCLTC jnXAjM"
                  >
                    <use xlinkHref="/food/sprite-CiiAtHUR.svg#nonvegNonVeg16"></use>
                  </svg>
                )}
              </p>
              <p className="max-w-[70%] overflow-ellipsis text-nowrap overflow-hidden">{item.name}</p>
              <p>x {item.quantity}</p>
              <p className="ml-auto text-gray-600">₹ {item?.finalPrice/100*item.quantity || item?.defaultPrice/100*item.quantity || item?.price/100*item.quantity}</p>
            </div>
          );
        })}
        <hr  className="my-4 border-[1px] border-b-gray-600"/>
      </div>
      <div className="text-sm font-bold">
        <div className="flex justify-between">
        <p>Sub total</p>
        <p>₹ {cartData.reduce((a,item)=>
            a+=item?.finalPrice/100*item.quantity || item?.defaultPrice/100*item.quantity || item?.price/100*item.quantity,0)}</p>
        </div>
        <p className="font-normal text-gray-500 text-xs">Extra Charges may apply</p>
        <button className="bg-[#FF5B0D] text-white w-full py-3 mt-5">
            <Link to='/cart'>CHECKOUT</Link></button>
      </div>
    </div>
  );
};

export default HeaderCartView;
