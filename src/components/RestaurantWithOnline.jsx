import React, { useEffect, useRef, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";

const RestaurantWithOnline = ({ data, fetchMore , hasMore, isLoading}) => {
  const [resData, setResData] = useState([]);
  const [skipResults, setSkipResults] = useState(0);
  const restContainer=useRef();
  const handleScroll=()=>{
    if(!restContainer.current) return;
    const {scrollTop,clientHeight,scrollHeight}=restContainer.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      if(hasMore && !isLoading){
        fetchMore();
      }
    }
  }
  useEffect(() => {
    if (data.length == 12) {
      setResData(data[4].card.card.gridElements.infoWithStyle.restaurants);
    } else if (data.length > 12) {
      let newData = data.filter((data, i) => i > 11 + skipResults);
      newData.forEach((data) => {
        // console.log(
        //   "newData",
        //   ...data[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        // );
        setResData((resData) => [
          ...resData,
          ...data[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants,
        ]);
      });
      setSkipResults(skipResults + 1);
    }
  }, [data]);
  // console.log(data[4])
  // console.log("newres", resData);
  return (
    <div>
      <p className="font-bold text-2xl p-2 mx-[13%]">
      {/* {data[4]?.card.data?.data?.card?.header?.title} */}
        Restaurants with online food delivery in Delhi
      </p>
      <div className=" my-5 mx-[13%]">
        <div className="flex gap-2">
          <button className="py-2 px-3 border border-gray-300 shadow-md rounded-full text-sm font-semibold">
            Ratings 4.0+
          </button>
          <button className="py-2 px-3 border border-gray-300 shadow-md rounded-full text-sm font-semibold">
            Rs 300-600
          </button>
        </div>
      </div>
      <div className="px-[13%] grid grid-cols-4 gap-2 overflow-y-auto scrollbar " ref={restContainer} onScroll={handleScroll} style={{ height: "calc(100vh - 115px)" }} >
        {resData.map((res)=><Link to={'/restaurant/'+res?.info?.id}><RestaurantCard info={res?.info} key={res?.info?.id}/></Link>)}
      </div>
    </div>
  );
};

export default RestaurantWithOnline;
