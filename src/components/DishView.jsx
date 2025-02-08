import React, { useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";
import { imgURL } from "./../utils/constants";

const DishView = ({ info }) => {
    console.log('info',info)
    const[displayFull,setDisplayFull]=useState(false)
  return (
    <div className="m-4 rounded-2xl h-[15rem] bg-white p-3 text-sm text-gray-600 ">
      <p className="font-bold">{info?.restaurant?.info?.name}</p>
      <div className="flex items-center">
        {" "}
        <IoStarSharp />
        {info?.restaurant?.info?.avgRating} Stars •{" "}
        {info?.restaurant?.info?.sla.deliveryTime} mins
      </div>
      <hr className="my-2 pt-2" />
      <div>
        <span>
          {!info?.info?.isVeg ? (
            <svg
              aria-hidden="true"
              height="16"
              width="16"
              class="sc-bXCLTC jnXAjM"
            >
              <use xlinkHref="/food/sprite-CiiAtHUR.svg#nonvegNonVeg16"></use>
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              height="16"
              width="16"
              class="sc-bXCLTC jnXAjM"
            >
              <use xlinkHref="/food/sprite-CiiAtHUR.svg#vegVeg16"></use>
            </svg>
          )}
        </span>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2 mt-1 pr-4">
            <p className="font-bold">{info?.info?.name}</p>
            <div className="flex">
              <p
                className={` font-bold text-sm ${
                  info?.info?.finalPrice ? "line-through text-gray-500" : ""
                }`}
              >
                ₹ {info?.info?.defaultPrice / 100 || info?.info?.price / 100}
              </p>
              {info?.info?.finalPrice && (
                <p className="ml-2 font-bold text-sm">
                  ₹ {info?.info?.finalPrice / 100}
                </p>
              )}
            </div>
            {/* <button className="text-gray-700 py-1 px-2 rounded-xl border border-gray-300 text-[0.75rem] flex w-[6.5rem] items-center gap-1 font-semibold"
            onClick={()=>setDisplayFull(true)}>
              More Details <FaAngleRight />
            </button> */}
          </div>
          <div className="w-[10rem] h-[7.5rem] relative">
            <img
              src={
                info?.info?.imageId
                  ? imgURL + info?.info?.imageId
                  : "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/Icons-Autosuggest/AS_Dish_3x"
              }
              className="size-full object-cover rounded-lg"
              alt=""
            />
            {/* <button
              className="absolute -bottom-[4%] right-[16%] bg-white border p-1 text-green-600 font-bold text-lg w-[6rem] mx-auto shadow-lg rounded-[10px] "
              name="add"
              role="button"
              onClick={() =>
                console.log('clicked')
                // handleAddItem({ inf: info?.info})
              }
            >
              ADD
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishView;
