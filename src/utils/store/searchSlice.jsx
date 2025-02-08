import { createSlice } from "@reduxjs/toolkit";

const searchSlice=createSlice({
    name:'search',
    initialState:{
        data:{}
    },
    reducers:{
        addSuggestion:(state,action)=>{
            const { payload } = action; 
            state.data = { ...state.data, ...payload };
        }
    }
})
export const {addSuggestion}=searchSlice.actions;
export default searchSlice.reducer;