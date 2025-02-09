import React from "react";
import { imgURL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { reduceNo, increaseNo } from "../utils/store/cartSlice";
import nonVeg from "../utils/svgs/nonvegpng.png"
import veg from "../utils/svgs/vegpng.png"
import yellowStar from "../utils/svgs/yellowStar.svg"
import greenStar from "../utils/svgs/greenStar.svg"

const CartCard = ({ item }) => {
  // console.log("cardcc", item);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between w-[100%] sm:h-[12rem] h-[25rem] items-center p-3 my-3 shadow-md rounded-xl flex-col sm:flex-row ">
      <div className="sm:w-[65%] w-[100%] h-full">
        <p>
          {item?.itemAttribute?.vegClassifier == "NONVEG" ? (
            <img src={nonVeg} className=" size-5 "/>

          ) : (
            <img src={veg} className=" size-5 "/>
          )}
        </p>
        <p className="font-bold text-lg">{item?.name}</p>
        <div className="flex">
          <p
            className={`ml-2 font-bold text-sm ${
              item?.finalPrice ? "line-through text-gray-500" : ""
            }`}
          >
            ₹ {item?.defaultPrice / 100 || item?.price / 100}
          </p>
          {item?.finalPrice && (
            <p className="ml-2 font-bold text-sm">₹ {item?.finalPrice / 100}</p>
          )}
        </div>
        {item?.ratings?.aggregatedRating?.rating && (
          <div className="mt-3 flex items-center gap-1">
            {item?.ratings?.aggregatedRating.rating < 4 && (
              {yellowStar}
            )}
            {item?.ratings?.aggregatedRating.rating >= 4 && (
              {greenStar}
            )}
            <p className="text-sm font-semibold">
              <span
                className={
                  item?.ratings?.aggregatedRating?.rating < 4
                    ? "text-yellow-500"
                    : "text-green-800"
                }
              >
                {item?.ratings?.aggregatedRating?.rating}
              </span>{" "}
              ({item?.ratings?.aggregatedRating?.ratingCountV2})
            </p>
          </div>
        )}
        <p className="text-sm w-[95%] mt-2">
          {item?.description?.slice(0, 135)} {item?.description?.length>135 && '...'} 
        </p>
      </div>
      <div className="sm:w-[25%] w-[65%] h-[80%]  flex flex-col relative ">
        {item?.imageId && (
          <img
            src={imgURL + item?.imageId}
            alt=""
            className="object-cover w-[80%] mx-auto rounded-xl h-full"
          />
        )}
        <div className="absolute -bottom-[5%] left-[20%] bg-white border p-1 text-green-600 font-bold text-xl w-[60%] mx-auto shadow-lg rounded-[10px] flex justify-between items-center">
          <button
            className="flex-1 text-center mb-0.5"
            onClick={(e) => {
              e.preventDefault()
              dispatch(reduceNo(item?.id))}}
          >
            -
          </button>
          <p className="flex-1 text-center text-lg ">{item?.quantity}</p>
          <button
            className="flex-1 text-center mb-0.5 font-extrabold"
            onClick={(e) => {
              e.preventDefault()
              dispatch(increaseNo(item?.id))}}
          >
            +
          </button>
        </div>
      </div>
      <hr className="h-5 text-gray-600" />
    </div>
  );
};

export default CartCard;
