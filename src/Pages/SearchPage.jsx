import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import {preSearchURL} from './../utils/constants'
import {imgURL} from './../utils/constants'
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { RxCross1 } from "react-icons/rx";

const SearchPage = () => {
  const storedSugg=useSelector((store)=>store.search.data)
  const[searchText,setSearchText]=useState('');
  const[searchSugg,setSearchSugg]=useState([]);
  const [preSearchData,setPreSearchData]=useState(null);
  const [searchData,setSearchData]=useState([])
  useEffect(()=>{
    const timer=setTimeout(() => {
      // if(storedSugg){
      //   searchSugg(storedSugg)
      // }
      getData();
    }, 1500);
    return()=>{
      console.log('cleared')
      clearTimeout(timer)}
  },[searchText])

  const getData=async() => {
    console.log("running")
    const resp=await fetch(`https://www.swiggy.com/dapi/restaurants/search/suggest?lat=28.56184&lng=77.4104894&str=${searchText}&trackingId=undefined&includeIMItem=true`)
    const json=await resp?.json();
    setSearchData(json?.data?.suggestions)
    console.log('data',json)
  }

  useEffect(()=>{
    getCuisines()
  },[])
  const getCuisines=async()=>{
    try{
      const response=await fetch(preSearchURL)
      const json=await response?.json();
      setPreSearchData(json?.data?.cards[1]?.card?.card);
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div className='mx-[22%] border mt-20 '>
      <div className='border flex w-[100%] mx-auto mt-14 border-gray-400 rounded-md items-center justify-between px-3'>
        <input type="text" className='outline-none py-3 rounded-md w-[90%] placeholder:font-semibold placeholder:text-gray-500' value={searchText} onChange={(e)=>setSearchText(e.target.value)} placeholder='Search for restaurants and food'/>
        {searchText?
        <RxCross1 className='size-[1.5rem] font-bold cursor-pointer' onClick={()=>setSearchText('')}/>:
        <CiSearch  className='size-[1.5rem] font-bold cursor-pointer'/>}
      </div>
      <div className='mt-5'>
          {searchData && searchData.map((val)=>{
            return(
              <div className='flex h-[5rem] border p-2 gap-4 cursor-pointer'>
                {
                  val.cloudinaryId?
                  <img src={imgURL+val?.cloudinaryId} className='size-[4rem] object-cover border rounded-md' alt="" />:
                  <img src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/Icons-Autosuggest/AS_Dish_3x' className='size-[4rem] object-cover border rounded-md' alt="" />
                }
                <div className='my-auto'>
                  <p className=''>{val?.text}</p>
                  <p className='text-gray-500 text-[0.75rem]'>{val?.type}</p>
                </div>
              </div>
            )
          })}
        </div>
      <div className="mt-10">
        <p className="font-bold text-xl text-gray-800 ">{preSearchData?.header?.title}</p>
        <div className="flex overflow-x-scroll w-full gap-2 mt-5 scrollbar h-[7rem]">
            {
              preSearchData?.imageGridCards?.info.map((item)=>{
                return(
                  <Link to="" className="min-w-[5rem] h-full" key={item.id}>
                    <img src={imgURL+item?.imageId} alt="" className="object-cover size-full " />
                  </Link>
                )
              })
            }
        </div>
      </div>
    </div>
  )
}

export default SearchPage