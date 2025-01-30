import React, {useEffect, useState} from 'react'
import { menuURL } from './constants';

const useFetchMenu = (resId) => {
    const [restaurant,setRestaurant]=useState(null);
    useEffect(() => {
        fetchMenu();
      // console.log('menu',restaurant)
      }, []);
      const fetchMenu = async () => {
        const data = await fetch(menuURL + resId);
        const json = await data?.json();
        setRestaurant(json?.data);
        // console.log('json',json)
      };
    return restaurant
}

export default useFetchMenu