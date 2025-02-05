import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchCollectionData from "../utils/useFetchCollectionData";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import RestaurantCard from "../components/RestaurantCard";
import ShimmerCard from "../components/ShimmerCard";

const filterOptions = [
  { value: "", label: "Relevance (Default)" },
  { value: "deliveryTimeAsc", label: "Delivery Time" },
  { value: "modelBasedRatingDesc", label: "Rating" },
  { value: "costForTwoAsc", label: "Cost: Low to High" },
  { value: "costForTwoDesc", label: "Cost: High to Low" },
];
const CollectionPage = () => {
  const { id } = useParams();
  const { data, isLoading, hasMore, fetchMore, filteredData, resetFilter } =
    useFetchCollectionData(id, 28.6145, 77.3063);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("");
  const refContainer = useRef();
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (data.length > 0) {
      const initialTitle = data[0]?.card?.card?.title;
      const initialCount = data[0]?.card?.card?.count;
      if (initialTitle) setTitle(initialTitle);
      if (initialCount) setCount(initialCount);
    }
  }, [data]);
  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };
  const handleFilterChange = (option) => {
    resetFilter();
    setFilter(option.value);
    setShowFilter(false);
    fetchMore(option.value);
  };

  const selectedFilterLabel = filterOptions.find(
    (option) => option.value === filter
  )?.label;
  console.log(data);
  if (!data?.length) return <p>loading...</p>;
  const handleScroll = () => {
    if (!refContainer.current) return;
    const { scrollTop, scrollHeight, clientHeight } = refContainer.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (hasMore && !isLoading) {
        fetchMore(filter);
      }
    }
  };
  if (!data.length) return <ShimmerCard />;
  return (
    <div
      className="mt-20 pt-14 border px-[9%] p-2 overflow-y-auto scrollbar "
      ref={refContainer}
      onScroll={handleScroll}
      style={{ height: "calc(100vh - 115px)" }}
    >
      <p className="font-bold text-4xl text-gray-800">{title}</p>
      <p className="text-lg text-gray-600 my-2">
        {data[0]?.card?.card?.description}
      </p>
      <div>
        <div
          className="flex items-center border w-fit p-2 rounded-full shadow-md text-sm my-4 cursor-pointer"
          onClick={() => handleShowFilter()}
        >
          <button className=" font-semibold p-1">
            {selectedFilterLabel &&
            selectedFilterLabel === "Relevance (Default)"
              ? "Sort By"
              : selectedFilterLabel}
          </button>
          {showFilter && (
            <RiArrowDropUpLine className="text-3xl text-gray-500" />
          )}
          {!showFilter && (
            <RiArrowDropDownLine className="text-3xl text-gray-500" />
          )}
        </div>
        {showFilter && (
          <div className="border w-[12rem] p-2 shadow-lg rounded-lg">
            {filterOptions.map((option) => (
              <div
                key={option.value}
                className=""
                onClick={() => handleFilterChange(option)}
              >
                <div className="flex items-center gap-2 my-2 justify-between cursor-pointer ">
                  <label className="cursor-pointer">{option.label}</label>
                  <input
                    type="radio"
                    className="mt-1 accent-orange-500"
                    value={option.value}
                    checked={filter === option.value}
                    readOnly
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="font-bold text-2xl text-gray-800 mt-2 mb-10">
        {count} to explore
      </p>
      <div className="grid grid-cols-4 gap-2">

        {/* remove duplicates */}
        {(filter ? filteredData : data)
          .filter((val) => val?.card?.card?.info)
          .map((val) => (
            <div key={val?.card?.card?.info?.id}>
              <Link to={"/restaurant/" + val?.card?.card?.info?.id}>
                <p>{val?.card?.card?.info?.id}</p>
                <RestaurantCard info={val?.card?.card?.info} />
              </Link>
            </div>
          ))}
      </div>
      {isLoading && (
        <p>
          <ShimmerCard />
        </p>
      )}
    </div>
  );
};

export default CollectionPage;
{
  /* <label> Sort By
<select name="sortBy" id="" className='min-w-2' >
    <option value="" disabled selected className="hidden"></option>
    <option value=" ">Relevance (Default) </option>
    <option value=" ">Delivery Time</option>
    <option value=" ">Rating </option>
    <option value=" ">Cost: Low to High</option>
    <option value=" ">Cost: High to Low</option>
</select>
</label> */
}
