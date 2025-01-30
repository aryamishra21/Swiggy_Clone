import React, { useRef, useState } from "react";
import { imgURL } from "../utils/constants";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const scrollWidth = 550; 

const WhatsOnYourMind = ({ data }) => {
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
      <div className="flex justify-between items-center">
        <p className="font-bold text-2xl p-2">What's on your mind?</p>
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
        className="flex overflow-x-scroll scrollbar gap-2 h-[13rem] "
        ref={refContainer}
      >
        {data?.card?.imageGridCards?.info?.map((type) => (
          <div className="min-w-[10rem] cursor-pointer mx-2 p-4 " key={type.id}>
            <img
              src={imgURL + type?.imageId}
              alt=""
              className="object-cover size-full"
            />
          </div>
        ))}
      </div>
    <hr />
    </div>
  );
};

export default WhatsOnYourMind;
