import { Link, useParams } from "react-router-dom";
import useFetchMenu from "../utils/useFetchMenu";
import { imgURL } from "../utils/constants";
import ShimmerCard from "../components/ShimmerCard";
import React, { useRef, useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import MenuAccordions from "../components/MenuAccordions";
import PageNotFound from "../components/PageNotFound";

const scrollWidth = 250;

const MenuPage = () => {
  const { id } = useParams();
  const menu = useFetchMenu(id);
  const refContainer = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState("");
  const [category, setCategory] = useState("");
  if (menu == null) return <ShimmerCard />;
  if (!menu.cards) return <PageNotFound />;
  const {
    name,
    totalRatingsString,
    avgRating,
    costForTwoMessage,
    areaName,
    cuisines,
  } = menu?.cards[2]?.card?.card?.info;
  const { offers, couponCode } =
    menu?.cards[3]?.card?.card?.gridElements?.infoWithStyle;

  const handleScroll = (scrollBy) => {
    const currentScroll = refContainer.current.scrollLeft;
    const maxScroll =
      refContainer.current.scrollWidth - refContainer.current.clientWidth;

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
  const handleCategory = (props) => {
    if (category == props) {
      setCategory("");
    } else {
      setCategory(props);
    }
  };

  return (
    <div className="mt-28 mx-[24%]">
      <p className="text-[0.7rem] ">
        <Link to="/">
          <span className="text-gray-500 hover:text-black">Home</span>
        </Link>
        {" / "}
        {name}
      </p>
      <div
        className="rounded-3xl -100 p-2 mt-5 "
        style={{
          background:
            "linear-gradient(rgb(255, 255, 255) -6.71%, rgb(235, 235, 242) 56.19%, rgb(223, 223, 231) 106.56%)",
        }}
      >
        <p className="font-bold text-2xl mb-5">{name}</p>
        <div className="rounded-3xl border-2 bg-white m-2 ">
          <div className="m-2 p-2">
            <div className="flex items-center  gap-1 font-bold">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                role="img"
                aria-hidden="true"
                strokecolor="rgba(2, 6, 12, 0.92)"
                fillcolor="rgba(2, 6, 12, 0.92)"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="9"
                  fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"
                ></circle>
                <path
                  d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
                  fill="white"
                ></path>
                <defs>
                  <linearGradient
                    id="StoreRating20_svg__paint0_linear_32982_71567"
                    x1="10"
                    y1="1"
                    x2="10"
                    y2="19"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#21973B"></stop>
                    <stop offset="1" stopColor="#128540"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <p>
                {avgRating} ({totalRatingsString}) • {costForTwoMessage}
              </p>
            </div>
            <p>{cuisines.join(", ")}</p>
            <div className="flex gap-1 items-center">
              <p>Outlet | </p>
              <p className="text-gray-500 font-medium text-sm">{areaName}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between my-4 px-2">
          <p>Deals For You</p>
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
                refContainer.current?.scrollWidth -
                  refContainer.current?.clientWidth
              }
              onClick={() => handleScroll(scrollWidth)}
            >
              <GoArrowRight className="text-xl rounded-full" />
            </button>
          </div>
        </div>
        <div
          className="grid grid-flow-col gap-5 overflow-x-scroll scrollbar "
          ref={refContainer}
        >
          {offers &&
            offers.map((item) => {
              return (
                <div
                  className=" border border-gray-400 py-1 px-2 rounded-2xl w-[15rem] flex flex-col items-center justify-center cursor-pointer "
                  key={item?.info?.offerIds[0]}
                >
                  {/* <img
                    src={
                      imgURL +
                      item?.imageId
                    }
                    alt={item?.accessibility?.alText}
                  /> */}
                  <p className="font-extrabold p-1 ">{item?.info?.header}</p>
                  <p className="text-sm p-2">{item?.info?.couponCode}</p>
                </div>
              );
            })}
        </div>
      </div>
      <div className="mx-auto text-center my-5">
        <span className="text-sm font-semibold text-gray-600 mt-10">
          {/* <svg aria-hidden="true" height="24" width="24" class="sc-gEvEer buqVUw"><use xlinkHref="/core/sprite-DI4fHXai.svg#artDecoRight24"></use></svg> */}
          M E N U
          {/* <svg aria-hidden="true" height="24" width="24" class="sc-gEvEer buqVUw"><use xlinkHref="/core/sprite-DI4fHXai.svg#artDecoRight24"></use></svg> */}
        </span>
        <div className="w-full flex border-2 items-center bg-gray-200 rounded-xl my-4 text-gray-600">
          <input
            type="text"
            className="w-[95%] p-3 placeholder:text-center bg-gray-200 rounded-xl focus:outline-none placeholder:text-gray-600 placeholder:font-semibold"
            placeholder="Search for dishes"
          />
          <IoIosSearch className="size-[1.5rem]" />
        </div>
        <div className="flex items-start gap-3">
          <button
            className="border border-gray-400 rounded-full shadow-sm flex items-center justify-center w-[4.5rem] h-[2.2rem] relative"
            onClick={() => handleCategory("VEG")}
          >
            <div
              className={`bg-gray-300 rounded-full w-[2.2rem] h-[0.6rem] relative ${
                category == "VEG" ? "bg-green-700" : "bg-gray-300"
              } `}
            >
              <div
                className={`absolute z-10 -top-[50%] transition-all duration-600 ${
                  category === "VEG" ? "translate-x-[80%]" : "translate-x-[0%]"
                }`}
              >
                <svg
                  style={{ backgroundColor: "white" }}
                  aria-hidden="true"
                  height="20"
                  width="20"
                  class="sc-bXCLTC jnXAjM"
                >
                  <use xlinkHref="/food/sprite-CiiAtHUR.svg#vegVeg16"></use>
                </svg>
              </div>
            </div>
          </button>
          <button
            className="border border-gray-400 rounded-full shadow-sm flex items-center justify-center w-[4.5rem] h-[2.2rem] relative"
            onClick={() => handleCategory("NONVEG")}
          >
            <div
              className={`bg-gray-300 rounded-full w-[2.2rem] h-[0.6rem] relative ${
                category == "NONVEG" ? "bg-red-600" : "bg-gray-300"
              } `}
            >
              <div
                className={`absolute z-10 -top-[50%] transition-all duration-600 ${
                  category === "NONVEG"
                    ? "translate-x-[80%]"
                    : "translate-x-[0%]"
                }`}
              >
                <svg
                  style={{ backgroundColor: "white" }}
                  aria-hidden="true"
                  height="20"
                  width="20"
                  class="sc-bXCLTC jnXAjM"
                >
                  <use xlinkHref="/food/sprite-CiiAtHUR.svg#nonvegNonVeg16"></use>
                </svg>
              </div>
            </div>
          </button>
        </div>
        <hr className="my-6" />
      </div>
      <div>
        {menu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
          ?.slice(
            2,
            menu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.length -
              2
          )
          .map((item, i) => (
            <MenuAccordions
              item={item}
              isVisible={isVisible}
              category={category}
              setIsVisible={setIsVisible}
              key={i}
            />
          ))}
      </div>
    </div>
  );
};

export default MenuPage;
