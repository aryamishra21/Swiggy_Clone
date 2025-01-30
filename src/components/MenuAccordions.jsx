import React from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import ItemCard from "./ItemCard";

const MenuAccordions = ({ item, isVisible, setIsVisible, category }) => {
  console.log('item',item)
  if (!item?.card?.card) return null; // Prevents crashes if data is missing

  // Filter item cards based on category
  const filteredItemCards = item.card.card.itemCards?.filter(
    (card) =>
      !category || card?.card?.info?.itemAttribute?.vegClassifier === category
  ) || [];

  // Filter categories and only keep those that have at least one matching item
  const filteredCategories = item.card.card.categories
    ?.map((categoryItem) => ({
      ...categoryItem,
      itemCards: categoryItem.itemCards?.filter(
        (card) =>
          !category ||
          card?.card?.info?.itemAttribute?.vegClassifier === category
      ),
    }))
    .filter((categoryItem) => categoryItem.itemCards.length > 0) || [];

  // If no items or categories remain, do not render the section
  if (filteredItemCards.length === 0 && filteredCategories.length === 0) {
    return null;
  }

  return (
    <div>
      <div>
        {/* Category Header */}
        <div
          className="flex justify-between shadow-md p-4 items-center cursor-pointer"
          onClick={() => {
            setIsVisible((prev) =>
              prev.includes(item.card.card.title)
                ? prev.filter((val) => val !== item.card.card.title)
                : [...prev, item.card.card.title]
            );
          }}
        >
          <p className="font-bold text-lg">
            {item.card.card.title} ({filteredItemCards.length + filteredCategories.length})
          </p>
          {isVisible.includes(item.card.card.title) ? (
            <FaChevronUp />
          ) : (
            <FaChevronDown />
          )}
        </div>

        {/* Inner Categories */}
        {isVisible.includes(item.card.card.title) &&
          filteredCategories.map((val) => (
            <div className="border" key={val?.card?.info?.id}>
              <div
                className="flex justify-between shadow-md p-3 items-center cursor-pointer w-[95%] mx-auto"
                onClick={() => {
                  setIsVisible((prev) =>
                    prev.includes(`inner-${val.title}`)
                      ? prev.filter((visibleItem) => visibleItem !== `inner-${val.title}`)
                      : [...prev, `inner-${val.title}`]
                  );
                }}
              >
                <p className="font-bold text-lg">
                  {val.title} ({val.itemCards.length})
                </p>
                {isVisible.includes(`inner-${val.title}`) ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>
              {/* Items inside the category */}
              {isVisible.includes(`inner-${val.title}`) &&
                val.itemCards.map((innerVal) => (
                  <div className="w-[95%] mx-auto" key={innerVal.card.info.id}>
                    <ItemCard card={innerVal} category={category} />
                    <hr className="p-2" />
                  </div>
                ))}
            </div>
          ))}

        {/* Standalone Items */}
        {isVisible.includes(item.card.card.title) &&
          filteredItemCards.map((card) => (
            <ItemCard key={card.card.info.id} card={card} category={category} />
          ))}
      </div>
    </div>
  );
};

export default MenuAccordions;








// import React from "react";
// import { FaChevronUp } from "react-icons/fa";
// import { FaChevronDown } from "react-icons/fa";
// import ItemCard from "./ItemCard";
// // const AccordionData = [
// //   {
// //     title: "title1",
// //     children: [{ title: "1.1" }, { title: "1.2" }],
// //   },
// //   {
// //     title: "title2",
// //     children: [{ title: "2.1" }, { title: "2.2" }],
// //   },
// // ];
// const MenuAccordions = ({ item, isVisible, setIsVisible, category }) => {
//   return (
//     <div>
//       <div>
//         <div
//           className="flex justify-between shadow-md p-4 items-center cursor-pointer"
//           onClick={() => {
//             if (isVisible.includes(item?.card?.card?.title)) {
//               setIsVisible(
//                 isVisible.filter((val) => val != item?.card?.card?.title)
//               );
//             } else {
//               setIsVisible((prev) => [...prev, item?.card?.card?.title]);
//             }
//           }}
//         >
//           <p className="font-bold text-lg">
//             {item?.card?.card?.title} (
//             {item?.card?.card?.itemCards?.filter((card) => !category || card?.card?.info?.itemAttribute?.vegClassifier === category).length ||
//               item?.card?.card?.categories?.filter(
//                 (val) =>
//                   val.itemCards?.some(
//                     (card) =>
//                       !category || card?.card?.info?.itemAttribute?.vegClassifier === category
//                   )
//               ).length}
//             ){" "}
//           </p>
//           {isVisible.includes(item?.card?.card?.title) ? (
//             <FaChevronUp />
//           ) : (
//             <FaChevronDown />
//           )}
//         </div>
//         <div>

//           {/*item cards without nesting- categories */}
//           {isVisible.includes(item?.card?.card?.title) &&
//             item?.card?.card?.categories &&
//             item?.card?.card?.categories.map((val) => (
//               <div className="border ">
//                 <div
//                   className="flex justify-between shadow-md p-3 items-center cursor-pointer w-[95%] mx-auto"
//                   onClick={() => {
//                     if (isVisible.includes(`inner-${val?.title}`)) {
//                       setIsVisible(
//                         isVisible.filter(
//                           (visibleItem) => visibleItem !== `inner-${val?.title}`
//                         )
//                       );
//                     } else {
//                       setIsVisible((prev) => [...prev, `inner-${val?.title}`]);
//                     }
//                   }}
//                 >
//                   <p className="font-bold text-lg">
//                     {val?.title} ({val?.itemCards?.filter((card) => !category || card?.card?.info?.itemAttribute?.vegClassifier === category).length}){" "}
//                   </p>
//                   {isVisible.includes(`inner-${val?.title}`) ? (
//                     <FaChevronUp />
//                   ) : (
//                     <FaChevronDown />
//                   )}
//                 </div>
//                 {/* categories inner */}
//                 {isVisible.includes(`inner-${val?.title}`) &&
//                   val.itemCards
//                   .filter((card) => !category || card?.card?.info?.itemAttribute?.vegClassifier === category).
//                   map((innerVal) => (
//                     <div className="w-[95%] mx-auto">
//                       <ItemCard card={innerVal} category={category} />
//                       <hr className="p-2" />
//                     </div>
//                   ))}
//               </div>
//             ))}
//           {/* item cards without nesting*/}
//           {isVisible.includes(item?.card?.card?.title) && item?.card?.card?.itemCards &&
//             item?.card?.card?.itemCards?.
//             filter((card) => !category || card?.card?.info?.itemAttribute?.vegClassifier === category).
//             map((card) => (
//               <ItemCard card={card} category={category} />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuAccordions;
