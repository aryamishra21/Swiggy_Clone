import React, { useState } from "react";
import { imgURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewItem,
  addMoreItem,
  increaseNo,
  reduceNo,
} from "../utils/store/cartSlice";
import nonVeg from '../utils/svgs/nonvegpng.png'
import veg from "../utils/svgs/vegpng.png"

import yellowStar from '../utils/svgs/yellowStar.svg'
import greenStar from '../utils/svgs/greenStar.svg'
const ItemCard = ({ card, location, handleRestart }) => {
  // console.log("rendered itemCard");
  const cartItems = useSelector((store) => store.cart.items);
  const cartLocation = useSelector((store) => store.cart.location);
  
  const dispatch = useDispatch();
  let checkItem = cartItems
    ? cartItems.find((item) => item?.id === card?.card?.info?.id)
    : "";
  //   console.log('checkItem',checkItem)
  // console.log(location, "check diff", cartLocation);
  const handleAddItem = ({ inf }) => {
    // console.log("Adding item:", inf);
  
    // Check if cart is empty
    if (!cartItems.length) {
      // console.log("Cart is empty. Adding new item.");
      
      let infoWithQuantity = { ...inf, quantity: 1 };
      
      dispatch(addNewItem({ order: infoWithQuantity, location: location })); 
      return;
    }
  
    // Check if location matches
    if (cartLocation?.name === location?.name) {
      // console.log("Same location. Checking item existence.");
  
      const existingItem = cartItems.find((item) => item?.id === inf.id);
  
      if (existingItem) {
        // console.log("Item already exists. Increasing quantity.");
        dispatch(increaseNo(existingItem.id));
      } else {
        // console.log("New item in same location. Adding to cart.");
        let infoWithQuantity = { ...inf, quantity: 1 };
        dispatch(addMoreItem(infoWithQuantity));
      }
    } else {
      // console.log("Different location. Restarting cart.".location.name,cartLocation.name);
      handleRestart();
      // if (!cartItems.length){

      //   let infoWithQuantity = { ...inf, quantity: 1 };
        
      //   dispatch(addNewItem({ order: infoWithQuantity, location: location })); 
      // }
    }
  };
  

  // console.log('cart',cartItems,cartLocation)
  return (
    <div className=" flex justify-between w-full sm:h-[13rem] items-center p-3 flex-col sm:flex-row h-[25rem]">
      <div className="w-[90%] sm:w-[75%] h-full">
        <p>
          {card?.card?.info?.itemAttribute?.vegClassifier == "NONVEG" ? 
            <img src={nonVeg} className=" size-5 "/>
           : 
           <img src={veg} className=" size-5 "/>
          }
        </p>
        <p className="font-bold text-lg">{card?.card?.info?.name}</p>
        <div className="flex">
          <p
            className={`ml-2 font-bold text-sm ${
              card?.card?.info?.finalPrice ? "line-through text-gray-500" : ""
            }`}
          >
            {" "}
            ₹{" "}
            {card?.card?.info?.defaultPrice / 100 ||
              card?.card?.info?.price / 100}
          </p>
          {card?.card?.info?.finalPrice && (
            <p className="ml-2 font-bold text-sm">
              ₹ {card?.card?.info?.finalPrice / 100}
            </p>
          )}
        </div>
        {card?.card?.info?.ratings?.aggregatedRating?.rating && (
          <div className="mt-3 flex items-center gap-1">
            {card?.card?.info?.ratings?.aggregatedRating.rating < 4 && 
            (<img src={yellowStar}/>)
            }
            {card?.card?.info?.ratings?.aggregatedRating.rating >= 4 && (
            (<img src={greenStar}/>)
            )}
            <p className="text-sm font-semibold">
              <span
                className={
                  card?.card?.info?.ratings?.aggregatedRating?.rating < 4
                    ? "text-yellow-500"
                    : "text-green-800"
                }
              >
                {card?.card?.info?.ratings?.aggregatedRating?.rating}
              </span>{" "}
              ({card?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})
            </p>
          </div>
        )}
        <p className="text-md w-[95%] mt-2">
          {card?.card?.info?.description?.slice(0, 100)} {card?.card?.info?.description?.length>100 && '...'} 
        </p>
      </div>
      <div className="w-[70%] sm:w-[25%] h-[80%]  flex flex-col relative my-4 sm:my-0 ">
        {card?.card?.info?.imageId && (
          <img
            src={imgURL + card?.card?.info?.imageId}
            alt=""
            className="object-cover w-[80%] mx-auto rounded-xl h-full"
          />
        )}
        {checkItem ? (
          <div className="absolute -bottom-[5%] left-[20%] bg-white border p-1 text-green-600 font-bold text-xl w-[60%] mx-auto shadow-lg rounded-[10px] flex justify-between items-center">
            <button
              className="flex-1 text-center mb-0.5"
              onClick={() => dispatch(reduceNo(checkItem.id))}
            >
              -
            </button>
            <p className="flex-1 text-center text-lg ">{checkItem.quantity}</p>
            <button
              className="flex-1 text-center mb-0.5 font-extrabold"
              onClick={() => dispatch(increaseNo(checkItem.id))}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="absolute -bottom-[5%] left-[20%] bg-white border p-1 text-green-600 font-bold text-lg w-[60%] mx-auto shadow-lg rounded-[10px] "
            name="add"
            role="button"
            onClick={() =>
              handleAddItem({ inf: card?.card?.info})
            }
          >
            ADD
          </button>
        )}
      </div>
      <hr className="h-5 text-gray-600" />
    </div>
  );
};
export default ItemCard;








///////

// const ItemCard = ({ card, location, handleRestart }) => {
//   console.log("rendered itemCard");
//   const cartItems = useSelector((store) => store.cart.items);
//   const dispatch = useDispatch();
//   let checkItem = cartItems
//     ? cartItems[0]?.order?.find((item) => item?.id === card?.card?.info?.id)
//     : "";
//   // console.log(checkItem,'checkitem', cartItems)
//   console.log(location, "check diff", cartItems[0]?.location);
//   const handleAddItem = ({ info, location }) => {
//     // let ord={'order':[info],'location':location}
//     //check if cart is empty
//     if (!cartItems.length) {
//       console.log("cart empty", location);
//       //if empty add fresh obj(item) with info and location
//       let infoWithQuantity = { ...info, quantity: 1 };
//       dispatch(addNewItem({ order: [infoWithQuantity], location: location }));
//     }
//     // if cart is not empty
//     else {
//       console.log("cart not empty", location);
//       //check if location is same (location present in cart is same as location as prop)
//       const checkRestaurant = cartItems[0]?.location?.name === location?.name;
//       console.log("check location in cart?", checkRestaurant);
//       if (checkRestaurant) {
//         // if location is same
//         //check if item(info.id) already exists in cart
//         const existingItem = cartItems[0].order.find(
//           (item) => item?.id === info.id
//         );
//         if (existingItem) {
//           //if item already exists increase its count by 1
//           dispatch(increaseNo(existingItem.id));
//         } else {
//           //if item doesn't exists add item
//           let infoWithQuantity = { ...info, quantity: 1 };
//           dispatch(addMoreItem(infoWithQuantity));
//         }
//       } else {
//         //if location is not same
//         handleRestart();
//       }
//     }
//   };
//   return (
//     <div className=" flex justify-between w-full h-[13rem] items-center p-3 ">
//       <div className="w-[75%] h-full">
//         <p>
//           {card?.card?.info?.itemAttribute?.vegClassifier == "NONVEG" ? (
//             <svg
//               aria-hidden="true"
//               height="16"
//               width="16"
//               class="sc-bXCLTC jnXAjM"
//             >
//               <use xlinkHref="/food/sprite-CiiAtHUR.svg#nonvegNonVeg16"></use>
//             </svg>
//           ) : (
//             <svg
//               aria-hidden="true"
//               height="16"
//               width="16"
//               class="sc-bXCLTC jnXAjM"
//             >
//               <use xlinkHref="/food/sprite-CiiAtHUR.svg#vegVeg16"></use>
//             </svg>
//           )}
//         </p>
//         <p className="font-bold text-lg">{card?.card?.info?.name}</p>
//         <div className="flex">
//           <p
//             className={`ml-2 font-bold text-sm ${
//               card?.card?.info?.finalPrice ? "line-through text-gray-500" : ""
//             }`}
//           >
//             {" "}
//             ₹{" "}
//             {card?.card?.info?.defaultPrice / 100 ||
//               card?.card?.info?.price / 100}
//           </p>
//           {card?.card?.info?.finalPrice && (
//             <p className="ml-2 font-bold text-sm">
//               ₹ {card?.card?.info?.finalPrice / 100}
//             </p>
//           )}
//         </div>
//         {card?.card?.info?.ratings?.aggregatedRating?.rating && (
//           <div className="mt-3 flex items-center gap-1">
//             {card?.card?.info?.ratings?.aggregatedRating.rating < 4 && (
//               <svg
//                 className="text-yellow-500"
//                 width="14"
//                 height="14"
//                 viewBox="0 0 14 14"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 role="img"
//               >
//                 <rect width="14" height="14" fill="white"></rect>
//                 <path
//                   d="M5.67163 3.99166C6.22068 2.34179 6.49521 1.51686 7 1.51686C7.50479 1.51686 7.77932 2.34179 8.32837 3.99166L8.65248 4.96556H9.60668C11.4122 4.96556 12.315 4.96556 12.4703 5.45302C12.6256 5.94049 11.8893 6.4628 10.4167 7.50744L9.67376 8.03444L9.97544 8.94095C10.5325 10.615 10.8111 11.452 10.4033 11.754C9.99553 12.056 9.27604 11.5457 7.83705 10.5249L7 9.93112L6.16295 10.5249C4.72396 11.5457 4.00447 12.056 3.5967 11.754C3.18893 11.452 3.46747 10.615 4.02456 8.94095L4.04557 8.87783C4.18081 8.47145 4.24843 8.26825 4.18684 8.08006C4.12525 7.89187 3.94958 7.76725 3.59824 7.51802C2.11566 6.46633 1.37437 5.94049 1.52971 5.45302C1.68504 4.96556 2.5878 4.96556 4.39332 4.96556H5.34752L5.67163 3.99166Z"
//                   fill="currentColor"
//                 ></path>
//               </svg>
//             )}
//             {card?.card?.info?.ratings?.aggregatedRating.rating >= 4 && (
//               <svg
//                 width="14"
//                 height="14"
//                 viewBox="0 0 14 14"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 role="img"
//                 fillColor="#116649"
//               >
//                 <rect width="14" height="14" fill="white"></rect>
//                 <path
//                   d="M5.67163 3.99166C6.22068 2.34179 6.49521 1.51686 7 1.51686C7.50479 1.51686 7.77932 2.34179 8.32837 3.99166L8.65248 4.96556H9.60668C11.4122 4.96556 12.315 4.96556 12.4703 5.45302C12.6256 5.94049 11.8893 6.4628 10.4167 7.50744L9.67376 8.03444L9.97544 8.94095C10.5325 10.615 10.8111 11.452 10.4033 11.754C9.99553 12.056 9.27604 11.5457 7.83705 10.5249L7 9.93112L6.16295 10.5249C4.72396 11.5457 4.00447 12.056 3.5967 11.754C3.18893 11.452 3.46747 10.615 4.02456 8.94095L4.04557 8.87783C4.18081 8.47145 4.24843 8.26825 4.18684 8.08006C4.12525 7.89187 3.94958 7.76725 3.59824 7.51802C2.11566 6.46633 1.37437 5.94049 1.52971 5.45302C1.68504 4.96556 2.5878 4.96556 4.39332 4.96556H5.34752L5.67163 3.99166Z"
//                   fill="#116649"
//                 ></path>
//               </svg>
//             )}
//             <p className="text-sm font-semibold">
//               <span
//                 className={
//                   card?.card?.info?.ratings?.aggregatedRating?.rating < 4
//                     ? "text-yellow-500"
//                     : "text-green-800"
//                 }
//               >
//                 {card?.card?.info?.ratings?.aggregatedRating?.rating}
//               </span>{" "}
//               ({card?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})
//             </p>
//           </div>
//         )}
//         <p className="text-md w-[95%] mt-2">
//           {card?.card?.info?.description?.slice(0, 135)} ...
//         </p>
//       </div>
//       <div className="w-[25%] h-[80%]  flex flex-col relative ">
//         {card?.card?.info?.imageId && (
//           <img
//             src={imgURL + card?.card?.info?.imageId}
//             alt=""
//             className="object-cover w-[80%] mx-auto rounded-xl h-full"
//           />
//         )}
//         {checkItem ? (
//           <div className="absolute -bottom-[5%] left-[20%] bg-white border p-1 text-green-600 font-bold text-xl w-[60%] mx-auto shadow-lg rounded-[10px] flex justify-between items-center">
//             <button
//               className="flex-1 text-center mb-0.5"
//               onClick={() => dispatch(reduceNo(checkItem.id))}
//             >
//               -
//             </button>
//             <p className="flex-1 text-center text-lg ">{checkItem.quantity}</p>
//             <button
//               className="flex-1 text-center mb-0.5 font-extrabold"
//               onClick={() => dispatch(increaseNo(checkItem.id))}
//             >
//               +
//             </button>
//           </div>
//         ) : (
//           <button
//             className="absolute -bottom-[5%] left-[20%] bg-white border p-1 text-green-600 font-bold text-lg w-[60%] mx-auto shadow-lg rounded-[10px] "
//             name="add"
//             role="button"
//             onClick={() =>
//               handleAddItem({ info: card?.card?.info, location: location })
//             }
//           >
//             ADD
//           </button>
//         )}
//       </div>
//       <hr className="h-5 text-gray-600" />
//     </div>
//   );
// };

///////