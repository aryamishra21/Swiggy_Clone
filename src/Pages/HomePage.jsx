import React from 'react'
import useFetchRestaurantData from '../utils/useFetchRestaurantData';
import WhatsOnYourMind from '../components/WhatsOnYourMind';
import TopRestaurants from '../components/TopRestaurants';
import RestaurantWithOnline from '../components/RestaurantWithOnline';
import ShimmerMain from '../components/ShimmerMain';
import ShimmerCard from '../components/ShimmerCard';
const HomePage = () => {
    const {data,fetchMoreData,hasMore, isLoading}=useFetchRestaurantData(28.61450, 77.30630);
    // console.log('cards',data);
    // setRestaurantData(data?.data?.cards)
  if(!data?.length) return(<ShimmerMain/>);
  
  return (
    <div className=' mt-[5rem]'>
        <WhatsOnYourMind data={data[0]?.card}/>
        <TopRestaurants data={data[1]?.card}/>
        <RestaurantWithOnline data={data} fetchMore={fetchMoreData} hasMore={hasMore} isLoading={isLoading}/>
        {/* <div>
            {hasMore && !isLoading &&(
            <button onClick={fetchMoreData}>find more</button>
            ) }
        </div> */}
        {isLoading && <div className='mx-[13%]'><ShimmerCard/></div>}
    </div>
  )
}

export default HomePage