import React from "react";
import { imgURL } from "../utils/constants";
import { Link } from "react-router-dom";
import { IoStarSharp } from "react-icons/io5";

const RestaurantView = ({ data }) => {
//   console.log("card", data);
  if (!data) return;
  return (
    <div className=" bg-white">
      <Link to={"/restaurant/" + data?.info?.id} className="flex items-center">
        <div className="min-w-[7rem] h-[7.5rem] p-3 rounded-lg">
          <img
            src={
              data?.info?.cloudinaryImageId
              ? imgURL + data?.info?.cloudinaryImageId
              : "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/Icons-Autosuggest/AS_Dish_3x"}
            alt=""
            className="w-[7rem] h-full object-cover rounded-lg"
          />
        </div>
        <div className="text-sm font-bold text-gray-600 overflow-hidden">
        <p className="w-[100%] text-ellipsis overflow-hidden whitespace-nowrap">{data?.info?.name}</p>
        <div className="flex text-[0.75rem] gap-1 font-semibold flex-col sm:flex-row">
          <div className="flex  items-center">
          <span><IoStarSharp /></span>
          <p className="">{data?.info?.avgRating} Stars •{" "}{data?.info?.sla.deliveryTime} mins  •{" "}</p>
          </div>
          <span>₹ {data?.info?.costForTwo/100} for two </span>
          {/* <p className="w-[80%] overflow-hidden">{data?.info?.avgRating} Stars •{" "}{data?.info?.sla.deliveryTime} mins  •{" "} <span className="line-clamp-1 sm:line-clamp-none">₹ {data?.info?.costForTwo/100} for two </span></p> */}
        </div>
          <p className="w-[40%] sm:w-[80%] md:w-[50%] text-sm font-normal text-ellipsis overflow-hidden whitespace-nowrap">{data?.info?.cuisines.join(', ')}</p>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantView;
