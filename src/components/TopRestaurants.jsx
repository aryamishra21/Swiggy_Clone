import React, { useRef, useState } from "react";
import { imgURL } from "../utils/constants";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
const scrollWidth = 650; 

const TopRestaurants = (data) => {
    // console.log(data?.data?.card)
    // const{gridElements,header}=data?.data?.card
    // console.log(gridElements,header.title)
  const [scrollPosition, setScrollPosition] = useState(0);
  const refContainer = useRef(); 

  const handleScroll = (scrollBy) => {
    const currentScroll = refContainer.current.scrollLeft; 
    const maxScroll = refContainer.current.scrollWidth - refContainer.current.clientWidth;

    const newScrollPosition = Math.min(
      Math.max(0, currentScroll + scrollBy), // Ensure the scroll doesn't go negative
      maxScroll // Ensure the scroll doesn't exceed the maximum width
    );

    setScrollPosition(newScrollPosition); // Update state for scroll position
    refContainer.current.scrollTo({
      left: newScrollPosition, // Scroll to the calculated position
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  return (
    <div className="mx-[13%]">
      <div className="flex justify-between items-center my-5">
        <p className="font-bold text-2xl p-2">{data?.data?.card?.header?.title}</p>
        <div className="mr-5 gap-2.5 flex pt-2">
          <button
            className="p-2 bg-gray-200 rounded-full disabled:bg-gray-100 disabled:text-gray-500"
            disabled={scrollPosition <= 0} // Disable if already at the start
            onClick={() => handleScroll(-scrollWidth)}
          >
            <GoArrowLeft className="text-xl rounded-full" />
          </button>
          <button
            className="p-2 bg-gray-200 rounded-full disabled:bg-gray-100 disabled:text-gray-500"
            disabled={
              scrollPosition >=
              refContainer.current?.scrollWidth - refContainer.current?.clientWidth
            } 
            onClick={() => handleScroll(scrollWidth)}
          >
            <GoArrowRight className="text-xl rounded-full" />
          </button>
        </div>
      </div>

      <div
        className="flex overflow-x-scroll scrollbar gap-2 h-[18rem] scrollbar-none"
        ref={refContainer}
      >
        {data?.data?.card?.gridElements?.infoWithStyle?.restaurants.map((res) => {
           return <Link to={'/restaurant/'+res?.info?.id}><RestaurantCard info={res?.info} key={res?.info?.id}/></Link>
})}
      </div>
      <hr className="mt-14 mb-6" />
    </div>
  );
};


export default TopRestaurants