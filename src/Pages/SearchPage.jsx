import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { preSearchURL } from "./../utils/constants";
import { imgURL } from "./../utils/constants";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import DishView from "../components/DishView";
import RestaurantView from "../components/RestaurantView";

const SearchPage = () => {
  const storedSugg = useSelector((store) => store.search.data);
  const [searchText, setSearchText] = useState("");
  const [searchSugg, setSearchSugg] = useState([]);
  const [preSearchData, setPreSearchData] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [showSearchData, setShowSearchData] = useState(false);
  const [restView, setrestView] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  // const[displayFull,setDisplayFull]=useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      // if(storedSugg){
      //   searchSugg(storedSugg)
      // }
      getData();
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  const getData = async () => {
    const resp = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=28.56184&lng=77.4104894&str=${searchText}&trackingId=undefined&includeIMItem=true`
    );
    const json = await resp?.json();
    setSearchData(json?.data?.suggestions);
  };

  useEffect(() => {
    getCuisines();
  }, []);
  const getCuisines = async () => {
    try {
      const response = await fetch(preSearchURL);
      const json = await response?.json();
      setPreSearchData(json?.data?.cards[1]?.card?.card);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSuggestionData = async (text, type) => {
    let baseURL = `https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.56184&lng=77.4104894&str=${text}&trackingId=null&submitAction=SUGGESTION`;
    // console.log(type, text);
    let response;
    type == "RESTAURANT"
      ? (response = await fetch(baseURL))
      : (response = await fetch(baseURL + "&selectedPLTab=DISH"));
    const json = await response?.json();
    // console.log("repe", json.data.cards);
    setSearchResults((prev) => [...prev, { [type]: json?.data?.cards }]);
  };

  // const fetchRestaurantsRelated=async(text, type)=>{
  //   let URL = `https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.56184&lng=77.4104894&str=${text}&trackingId=null&submitAction=SUGGESTION&selectedPLTab=RESTAURANT`;
  //   let response = await fetch(URL)
  //   const json = await response?.json();
  //   console.log("repe1", json.data.cards);
  //   setSearchResults((prev)=>[...prev,{[type]:json?.data?.cards}]);
  // }

  // &selectedPLTab=DISH
  return (
    <div className="mx-[22%] mt-28 ">
      <div className="border flex w-[100%] mx-auto mt-12 border-gray-400 rounded-md items-center justify-between px-3">
        <input
          type="text"
          className="outline-none py-3 rounded-md w-[90%] placeholder:font-semibold placeholder:text-gray-500"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            if (searchText != "") {
              setShowSearchData(true);
            } else {
              setShowSearchData(false);
            }
          }}
          placeholder="Search for restaurants and food"
        />
        {searchText ? (
          <RxCross1
            className="size-[1.5rem] font-bold cursor-pointer"
            onClick={() => setSearchText("")}
          />
        ) : (
          <CiSearch className="size-[1.5rem] font-bold cursor-pointer" />
        )}
      </div>

      {/* search suggestions */}
      <div className="mt-5">
        {showSearchData &&
          searchData &&
          searchData.map((val) => {
            return (
              <div
                key={val?.cta?.text}
                onClick={() => {
                  setSearchText(val?.cta?.text);
                  setSearchData([]);
                  setSearchParams({
                    query: val?.cta?.text,
                  });
                  const encodedVal = encodeURIComponent(val?.cta?.text).replace(
                    /%20/g,
                    "+"
                  );
                  navigate(`/search?query=${encodedVal}`);
                  setShowSearchData(false);

                  setrestView(val?.type == "RESTAURANT");
                  setSearchResults([]);
                  fetchSuggestionData(
                    encodeURIComponent(val?.cta?.text),
                    val?.type
                  );
                }}
                className="flex h-[5rem] border p-2 gap-4 cursor-pointer"
              >
                {val.cloudinaryId ? (
                  <img
                    src={imgURL + val?.cloudinaryId}
                    className="size-[4rem] object-cover border rounded-md"
                    alt=""
                  />
                ) : (
                  <img
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/Icons-Autosuggest/AS_Dish_3x"
                    className="size-[4rem] object-cover border rounded-md"
                    alt=""
                  />
                )}
                <div className="my-auto">
                  <p className="">{val?.text}</p>
                  <p className="text-gray-500 text-[0.75rem]">{val?.type}</p>
                </div>
              </div>
            );
          })}
      </div>

      {!searchText && !showSearchData ? (
        //show presearchitems
        <div className="mt-10">
          <p className="font-bold text-xl text-gray-800 ">
            {preSearchData?.header?.title}
          </p>
          <div className="flex overflow-x-scroll w-full gap-2 mt-5 scrollbar h-[7rem]">
            {preSearchData?.imageGridCards?.info.map((item) => {
              // console.log('presearch',item)
              return (
                <div
                  onClick={() => {
                    setrestView(false);
                    setSearchResults([]);
                    fetchSuggestionData(
                      item?.action?.link.split("query=")[1],
                      "DISH"
                    );
                    setSearchParams({
                      query: decodeURIComponent(item?.action?.link.split("query=")[1]),
                    });
                    navigate(
                      `/search?query=${
                        item?.action?.link.split("query=")[1]
                      }`
                    );
                    setSearchText(
                      (item?.action?.link
                        .split("query=")[1])
                        .replace("%20", " ")
                    );
                  }}
                  className="min-w-[5rem] h-full cursor-pointer"
                  key={item.id}
                >
                  <img
                    src={imgURL + item?.imageId}
                    alt=""
                    className="object-cover size-full "
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        //show restaurant and dish button
        <div>
          <div className="flex gap-5">
            <button
              className={`border border-gray-700 py-2 px-3 text-[0.85rem] font-bold rounded-full ${
                restView
                  ? "text-white bg-gray-600 border-none"
                  : "text-gray-700 border border-gray-700 bg-white"
              }`}
              onClick={() => {
                // console.log("rest", searchResults);
                if (
                  !searchResults.some((result) =>
                    result.hasOwnProperty("RESTAURANT")
                  )
                ) {
                  fetchSuggestionData(
                    encodeURIComponent(searchText),
                    "RESTAURANT"
                  );
                  // fetchRestaurantsRelated(encodeURIComponent(searchText), "RESTAURANT");
                  // console.log("Fetched RESTAURANT data");
                }
                setrestView(true);
              }}
            >
              Restaurants
            </button>
            <button
              className={`border border-gray-700 py-2 px-3 text-[0.85rem] font-bold rounded-full ${
                !restView
                  ? "text-white bg-gray-600 border-none"
                  : "text-gray-700 border border-gray-700 bg-white"
              }`}
              onClick={() => {
                // console.log("resd", searchResults);
                if (
                  !searchResults.some((result) => result.hasOwnProperty("DISH"))
                ) {
                  fetchSuggestionData(encodeURIComponent(searchText), "DISH");
                  // console.log("Fetched DISH data");
                }
                setrestView(false);
              }}
            >
              Dishes
            </button>
          </div>

          {/* restaurants */}
          {restView && searchResults && (
            <div className="">
              <div className="bg-gray-200 mt-5 overflow-y-scroll scrollbar h-[63vh]">
                {searchResults
                  .filter((search) => search?.RESTAURANT)
                  ?.map(
                    (result) =>
                      result?.RESTAURANT[1]?.groupedCard?.cardGroupMap
                        ?.RESTAURANT?.cards[0]?.card?.card
                  )[0] && (
                  <>
                    <div className="grid grid-cols-2 gap-4 p-4">
                      <RestaurantView
                        data={{
                          ...(searchResults
                            .filter((search) => search?.RESTAURANT)
                            ?.map(
                              (result) =>
                                result?.RESTAURANT[1]?.groupedCard?.cardGroupMap
                                  ?.RESTAURANT?.cards[0]?.card?.card
                            ))[0],
                        }}
                      />
                    </div>
                    <p className="font-bold text-sm mt-10 ml-4">
                      More results like this
                    </p>
                  </>
                )}

                <div className="grid grid-cols-2 gap-4 p-4">
                  {/* {searchResults.filter((search)=>search?.RESTAURANT)?.map((result)=>result?.RESTAURANT[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards[1]?.card?.card?.restaurants?.map((data)=>{
                      return(
                        <div>
                          {console.log('it',data)}
                          <RestaurantView data={data}/>
                        
                        </div>
                      )
                    }))} */}
                  {searchResults
                    .filter((search) => search?.RESTAURANT)
                    ?.map((result) =>
                      result?.RESTAURANT[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards.map(
                        (outerCard) => {
                          {
                            // console.log("init");
                          }
                          if (outerCard.card.card.restaurants) {
                            // console.log("1", outerCard);
                            return outerCard?.card?.card?.restaurants.map(
                              (data) => <RestaurantView data={data} key={data?.info?.id}/>
                            );
                          } else if (outerCard.card.card.info) {
                            // console.log('2',outerCard)
                            return (
                              <RestaurantView data={outerCard?.card?.card} key={outerCard?.card?.card?.info?.id} />
                            );
                          }
                          // console.log("outercarrd", outerCard);
                        }
                      )
                    )}
                  {searchResults
                    .filter((search) => search?.RESTAURANT)
                    ?.map((result) =>
                      result?.RESTAURANT[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards[1]?.card?.card?.restaurants?.map(
                        (data) => {
                          return (
                            <div>
                              {/* {console.log("resres", data)} */}
                              {/* {data?.info?.name} */}
                              <RestaurantView data={data} key={data?.info?.id}/>
                            </div>
                          );
                        }
                      )
                    )}

                  {searchResults
                    .filter((search) => search?.RESTAURANT)
                    ?.map(
                      (result) =>
                        result?.RESTAURANT[1]?.groupedCard?.cardGroupMap?.DISH
                          ?.cards
                    ) &&
                    searchResults
                      .filter((search) => search?.RESTAURANT)
                      ?.map((result) =>
                        result?.RESTAURANT[1]?.groupedCard?.cardGroupMap?.DISH?.cards
                          ?.slice(
                            1,
                            searchResults
                              .filter((search) => search?.RESTAURANT)
                              ?.map(
                                (result) =>
                                  result?.RESTAURANT[1]?.groupedCard
                                    ?.cardGroupMap?.DISH?.cards.length
                              )
                          )
                          ?.map((data) => {
                            return (
                              <div>
                                {/* {console.log("dishres", data)} */}
                                {/* {data?.info?.name} */}
                                <RestaurantView
                                  data={data?.card?.card?.restaurant}
                                  key={data?.card?.card?.restaurant?.info?.id}
                                />
                              </div>
                            );
                          })
                      )}
                </div>
              </div>
            </div>
          )}

          {/* dishes */}
          {!restView && searchResults && (
            <div>
              {/* sort configs */}
              {/* <div className="flex gap-4 mt-4 overflow-x-scroll scrollbar">
                {searchResults?.filter((search)=>search.DISH)?.map((result)=>result.DISH[0]?.groupedCard?.cardGroupMap?.DISH?.cards[0]?.card?.card?.facetList?.map(
                  (face) => (
                    <button
                      className="text-[0.75rem] py-1 px-4 border border-gray-400 rounded-md bg-gray-200 min-w-max "
                      key={face?.facetInfo[0]?.id}
                    >
                      {face?.facetInfo[0]?.label}
                    </button>
                  )
                ))}
              </div> */}
              <div className="bg-gray-200 grid grid-cols-2 mt-5 overflow-y-scroll scrollbar h-[63vh]">
                {searchResults
                  ?.filter((search) => search.DISH)
                  ?.map((result) =>
                    result?.DISH[0]?.groupedCard?.cardGroupMap?.DISH?.cards?.map(
                      (da) => {
                        if (da.card.card.info) {
                          return <Link to={"/restaurant/" + da.card.card.restaurant?.info?.id}><DishView info={da.card.card} key={da.card.card?.info?.id} /></Link>;
                        }
                      }
                    )
                  )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
