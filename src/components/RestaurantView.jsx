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
        <div className="w-[7rem] h-[7.5rem] p-3 rounded-lg">
          <img
            src={imgURL + data?.info?.cloudinaryImageId}
            alt=""
            className="size-full object-cover rounded-lg"
          />
        </div>
        <div className="text-sm font-bold text-gray-600">
        <p>{data?.info?.name}</p>
        <div className="flex text-[0.75rem] items-center gap-1 font-semibold">
          <span><IoStarSharp /></span>
          <p>{data?.info?.avgRating} Stars •{" "}{data?.info?.sla.deliveryTime} mins  •{" "} ₹ {data?.info?.costForTwo/100} for two</p>
        </div>
          <p className="text-sm font-normal overflow-hidden">{data?.info?.cuisines.join(', ')}</p>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantView;
