import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice'
import searchSlice from './searchSlice'
import userSlice from './UserSlice'
const store=configureStore({
    reducer:{
        cart:cartSlice,
        search:searchSlice,
        user:userSlice
    }
})
export default store