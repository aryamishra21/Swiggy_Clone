import React from "react";

const AccordionData=[
    {
        title:'title1',
        children:[
            {title:'1.1'},
            {title:'1.2'}
        ]
    },
    {
        title:'title2',
        children:[
            {title:'2.1'},
            {title:'2.2'}
        ]
    }
]
const TestAccordions = ({ item, isVisible, setIsVisible }) => {
  // console.log('isvisible',isVisible)
  return (
    <div>
      <div>
        <div className="flex justify-between border border-green-400 p-2"
        onClick={() => {
            if (isVisible && isVisible[0]?.first == item?.card?.card?.title) {
              setIsVisible("");
            }
            else{
                setIsVisible([{'first':item?.card?.card?.title}]);
            }
          }}>
          <p>{item?.card?.card?.title}</p>
          <p>aero</p>
        </div>

        <div>

          {isVisible && isVisible[0].first == item?.card?.card?.title &&
           item?.card?.card?.categories &&
            item?.card?.card?.categories.map((val) => (
              <div className="border ">
                <div
                  className="border border-blue-600 flex justify-between"
                  onClick={() => {
                    if (isVisible && isVisible[0].children.first == val?.title) {
                      setIsVisible("");
                    }
                    else{
                        setIsVisible((prev)=>[prev,{'children':{'first':val?.title}}])
                        // setIsVisible(val?.title);
                    }
                  }}
                >
                  <p>{val?.title} </p>
                  <p>aero</p>
                </div>
                {
                isVisible && isVisible[0].children.first == val?.title &&
                  val.itemCards.map((innerVal) => (
                    <p>{innerVal?.card?.info?.name}</p>
                  ))}
              </div>
            ))}
          
          {isVisible && isVisible[0].first == item?.card?.card?.title && 
          item?.card?.card?.itemCards?.map((card) => (
            <div className="">
              <p>{card?.card?.info?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestAccordions;










// import React from "react";

// const AccordionData=[
//     {
//         title:'title1',
//         children:[
//             {title:'1.1'},
//             {title:'1.2'}
//         ]
//     },
//     {
//         title:'title2',
//         children:[
//             {title:'2.1'},
//             {title:'2.2'}
//         ]
//     }
// ]
// const MenuAccordions = ({ item, isVisible, setIsVisible }) => {
//   return (
//     <div>
//       <div>
//         <div className="flex justify-between border border-green-400 p-2"
//         onClick={() => {
//             if (isVisible == item?.card?.card?.title) {
//               setIsVisible("");
//             }
//             else{
//                 setIsVisible([{'first':item?.card?.card?.title}]);
//             }
//           }}>
//           <p>{item?.card?.card?.title}</p>
//           <p>aero</p>
//         </div>
//         <div>
//           {
//           // isVisible.first == item?.card?.card?.title && 
//           item?.card?.card?.categories &&
//             item?.card?.card?.categories.map((val) => (
//               <div className="border ">
//                 <div
//                   className="border border-blue-600 flex justify-between"
//                   onClick={() => {
//                     if (isVisible == val?.title) {
//                       setIsVisible("");
//                     }
//                     else{
//                         setIsVisible(val?.title);
//                     }
//                   }}
//                 >
//                   <p>{val?.title} </p>
//                   <p>aero</p>
//                 </div>
//                 {
//                 // isVisible == val?.title &&
//                   val.itemCards.map((innerVal) => (
//                     <p>{innerVal?.card?.info?.name}</p>
//                   ))}
//               </div>
//             ))}
//           {item?.card?.card?.itemCards?.map((card) => (
//             <div className="">
//               <p>{card?.card?.info?.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuAccordions;
