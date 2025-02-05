import React, { useEffect, useState } from "react";

const useFetchCollectionData = (id, lat, lng) => {
  // console.log(id)
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState(null);
  const [offsetData, setoffsetData] = useState(null);
  useEffect(() => {
    fetchData();
  }, [lat, lng]);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${id}&tags=&sortBy=&filters=&type=rcv2&offset=0&page_type=null`
      );
      const json = await response?.json();
      if (json?.data) {
        // console.log("collection", json);
        setData(json?.data?.cards);
        setCsrfToken(json.csrfToken);
        setoffsetData(json?.data.pageOffset);
        setHasMore(!!json.data.pageOffset?.nextOffset);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchMore = async (sort) => {
    if (!offsetData?.nextOffset || isLoading || !csrfToken) return;
    // console.log(lat,lng)
    setIsLoading(true);
    console.log('sort type',sort)
    try {
      const payload = {
        collection: id,
        filters: "",
        lat: lat.toString(),
        lng: lng.toString(),
        nextOffset: offsetData.nextOffset,
        page_type: null,
        sortAttribute:sort?sort:'',
        sortBy: '',
        tags: "",
        type: "rcv2",
        widgetOffset: offsetData.widgetOffset,
        _csrf: csrfToken,
      };
      const response = await fetch("/dapi/restaurants/list/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const newData = await response.json();
      if (sort) {
        setfilteredData((prev) => [...prev, ...(newData?.data?.cards || [])]);
      } else {
        setData((prev) => [...prev, ...(newData?.data?.cards || [])]);
      }
    //   console.log("newData", data);
    setoffsetData(newData?.data.pageOffset);
      setHasMore(!!newData?.data.pageOffset?.nextOffset);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
};
const resetFilter = () => {
    setfilteredData([]);
    setoffsetData(null);
  };
console.log(data,'both data',filteredData)
  return { data, isLoading, hasMore, fetchMore, filteredData,setfilteredData, resetFilter };
};

export default useFetchCollectionData;
