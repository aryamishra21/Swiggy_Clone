import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        items:[],
        location:null
    },
    reducers:{
        // addNewItem: (state, action) => {
        //     state.items = [action.payload.order];
        //     state.location = action.payload.location; // Set the location when first adding
        // },
        // addMoreItem: (state, action) => {
        //     state.items.push(action.payload);
        // },
        // reduceNo: (state, action) => {
        //     const item = state.items.find((item) => item.id === action.payload);
        //     if (item) {
        //         item.quantity = Math.max(0, item.quantity - 1);
        //     }
        //     state.items = state.items.filter((item) => item.quantity > 0);
        // },
        // clearCart: (state) => {
        //     state.items = [];
        //     state.location = null; // Clear location when cart is empty
        // },
        // increaseNo: (state, action) => {
        //     const existingItem = state.items.find((item) => item.id === action.payload);
        //     if (existingItem) {
        //         existingItem.quantity += 1;
        //     }
        // },



        ////

        addNewItem:(state,action)=>{
            state.items.push(action.payload.order)
            state.location=action.payload.location
            state.items=state.items.filter((ord)=>ord.quantity>0);
        },
        addMoreItem:(state,action)=>{
            state.items.push(action.payload)
            state.items=state.items.filter((ord)=>ord.quantity>0);
        },
        reduceNo:(state,action)=>{
            state.items.map((item)=>{
                if(item.id===action.payload){
                    if(item.quantity>=1){
                        item.quantity=item.quantity-1
                    }
                }
            })
            state.items=state.items.filter((ord)=>ord.quantity>0);
        },
        clearCart:(state)=>{
            state.items=[]
        },
        increaseNo:(state,action)=>{
            const exisitingItem=state.items.find((item)=>item.id===action.payload)
            if(exisitingItem){
                exisitingItem.quantity+=1;
            }
            state.items=state.items.filter((ord)=>ord.quantity>0);
        }

        /// old

        // addNewItem:(state,action)=>{
        //     state.items.push(action.payload)
        //     state.items[0].order=state.items[0].order.filter((ord)=>ord.quantity>0);
        // },
        // addMoreItem:(state,action)=>{
        //     state.items[0].order.push(action.payload)
        //     state.items[0].order=state.items[0].order.filter((ord)=>ord.quantity>0);
        // },
        // reduceNo:(state,action)=>{
        //     state.items[0].order.map((item)=>{
        //         if(item.id===action.payload){
        //             if(item.quantity>=1){
        //                 item.quantity=item.quantity-1
        //             }
        //         }
        //     })
        //     state.items[0].order=state.items[0].order.filter((ord)=>ord.quantity>0);
        // },
        // clearCart:(state)=>{
        //     state.items=[]
        // },
        // increaseNo:(state,action)=>{
        //     const exisitingItem=state.items[0].order.find((item)=>item.id===action.payload)
        //     if(exisitingItem){
        //         exisitingItem.quantity+=1;
        //     }
        //     state.items[0].order=state.items[0].order.filter((ord)=>ord.quantity>0);
        // }

    }
})
export const {addNewItem,addMoreItem,clearCart,increaseNo, reduceNo}=cartSlice.actions
export default cartSlice.reducer;
