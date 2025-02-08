import React, { useEffect, useState } from "react";

const useFetchRestaurantData = (lat, lng) => {
  const [data, setData] = useState([]);
  const [csrfToken, setCsrfToken] = useState(null);
  const [offsetData, setoffsetData] = useState(null); // set offsetData for next api call to fetch more data 
  const [isLoading, setisLoading] = useState(false); // api function running?
  const [hasMore, setHasMore] = useState(true); // has more pages ?
  // first fetch
  const initialFetch = async () => {
    setisLoading(true);
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );
      const json = await response.json();
      if (json?.data) {
        setData(json.data.cards);
        setCsrfToken(json.csrfToken);
        setoffsetData(json?.data.pageOffset);
        setHasMore(!!json.data.pageOffset?.nextOffset);
        // The use of double negation (!!) in JavaScript is a common trick to explicitly convert a value into a boolean.
        // eg:  const nextOffset = "CJhlELQ4...";
        // setHasMore(nextOffset); // This would pass "CJhlELQ4..." (a string), not a boolean
        // setHasMore(!!nextOffset); // This will pass true (a boolean)
        // can also handle this with if else
      }
    } catch (error) {
      console.log("Error fetching initial data:", error);
    } finally {
      setisLoading(false);
    }
  };
  const fetchMoreData = async () => {
    if (!offsetData?.nextOffset || isLoading || !csrfToken) return;
    setisLoading(true);
    try {
      const payload = {
        lat: lat.toString(),
        lng: lng.toString(),
        nextOffset: offsetData.nextOffset,
        widgetOffset: offsetData.widgetOffset,
        filters: {},
        seoParams: {
          seoUrl: "https://www.swiggy.com/restaurants",
          pageType: "FOOD_HOMEPAGE",
          apiName: "FoodHomePage",
        },
        page_type: "DESKTOP_WEB_LISTING",
        _csrf: csrfToken,
      };
      const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      // console.log("newData", data);
      if (data?.data) {
        setData((prev) => [...prev, data.data?.cards || []]);
        setoffsetData(data.data.pageOffset);
        setHasMore(!!data.data.pageOffset?.nextOffset);
      }
    } catch (error) {
      console.log("Error fetching initial data:", error);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    initialFetch();
  }, [lat, lng]);
  return { data, fetchMoreData, hasMore, isLoading };
};

export default useFetchRestaurantData;
