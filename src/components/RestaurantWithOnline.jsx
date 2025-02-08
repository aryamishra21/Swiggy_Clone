import React, { useEffect, useRef, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const filters=[{'avgRating':'Ratings 4.0+'},{'deliveryTime':'Fast Delivery'},{'veg':'Pure Veg'},{'costForTwo':'Rs 300 - Rs 600'}]
const RestaurantWithOnline = ({ data, fetchMore, hasMore, isLoading }) => {
  const [resData, setResData] = useState([]); // All fetched restaurant data
  const [filteredData, setFilteredData] = useState([]); // Filtered restaurant data
  const [filteredCriteria, setFilteredCriteria] = useState(null); // Current filter criteria
  const [skipResults, setSkipResults] = useState(0);
  const restContainer = useRef();

  // Handle scroll event to fetch more data
  const handleScroll = () => {
    if (!restContainer.current) return;
    const { scrollTop, clientHeight, scrollHeight } = restContainer.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (hasMore && !isLoading) {
        fetchMore();
      }
    }
  };

  // Apply filters to the data
  const applyFilter = (data, criteria) => {
    if (!criteria) {
      return data; // No filter applied
    }
    if (criteria === "avgRating") {
      return data.filter((res) => res?.info?.avgRating > 4);
    }
    if (criteria === "deliveryTime") {
      return data.toSorted((res,res1) => res1?.info?.sla?.deliveryTime - res?.info?.sla?.deliveryTime ).reverse();
    }
    if (criteria === "veg") {
      return data.filter((res) => !!res?.info?.veg )
    }
    if (criteria === "costForTwo") {
      return data.filter((res) => res?.info?.costForTwo?.split(' ')[0]?.split('₹')[1] > 300 && res?.info?.costForTwo?.split(' ')[0]?.split('₹')[1] < 600 )
    }
    // Add more filter conditions here if needed
    return data;
  };

  // Update filteredData whenever resData or filteredCriteria changes
  useEffect(() => {
    const filtered = applyFilter(resData, filteredCriteria);
    setFilteredData(filtered);
  }, [resData, filteredCriteria]);

  // Fetch and update data when new data is received
  useEffect(() => {
    if (data.length === 12) {
      // Initial data load
      const initialData =
        data[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      setResData(initialData);
    } else if (data.length > 12) {
      // Append new data
      let newData = data.filter((_, i) => i > 11 + skipResults);
      newData.forEach((item) => {
        const restaurants =
          item[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setResData((prevData) => [...prevData, ...restaurants]);
      });
      setSkipResults((prevSkip) => prevSkip + 1);
    }
  }, [data]);

  return (
    <div>
      {/* Title */}
      <p className="font-bold text-2xl p-2 mx-[13%]">
        Restaurants with online food delivery in Delhi
      </p>

      {/* Filter Buttons */}
      <div className="my-5 mx-[13%]">
        <div className="flex gap-2">
          {filters.map((filter)=>{
            return(
              <button
              className={"py-2 px-3 border border-gray-300 shadow-md rounded-full text-sm font-semibold flex items-center gap-1 "+(filteredCriteria===Object.keys(filter)[0]?'bg-gray-300':'bg-white')}
              onClick={() =>{
                if(filteredCriteria!==Object.keys(filter)[0])
                {
                  setFilteredCriteria(Object.keys(filter)[0])
                }
                 else{
                  setFilteredCriteria(null); 
                 }
                }}
            >
              {Object.values(filter)[0]} {filteredCriteria===Object.keys(filter)[0] && <RxCross1 className="size-[0.8rem]"/>}
            </button>
            )
          })}
        </div>
      </div>

      {/* Restaurant List */}
      <div
        className="sm:mx-auto px-[13%] grid sm:lg:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2 overflow-y-auto scrollbar"
        ref={restContainer}
        onScroll={handleScroll}
        style={{ height: "calc(100vh - 115px)" }}
        >
        {filteredData?.map((res) => (
          <Link to={`/restaurant/${res?.info?.id}`} key={res?.info?.id}>
            <RestaurantCard info={res?.info} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RestaurantWithOnline;

        {/* <button
          className={"py-2 px-3 border border-gray-300 shadow-md rounded-full text-sm font-semibold flex items-center gap-1 "+(filteredCriteria==='avgRating'?'bg-gray-300':'bg-white')}
          onClick={() =>{
            if(filteredCriteria!=='avgRating')
            {
              setFilteredCriteria("avgRating")
            }
             else{
              setFilteredCriteria(null); 
             }
            }}
        >
          Ratings 4.0+ {filteredCriteria==='avgRating' && <RxCross1 className="size-[0.8rem]"/>}
        </button> */}