import { createSlice } from "@reduxjs/toolkit";

const searchSlice=createSlice({
    name:'search',
    initialState:{
        data:[]
    },
    reducers:{
        addSuggestion:(state,payload)=>{
            state.data.push(payload)
        }
    }
})
export const {addSuggestion}=searchSlice.actions;
export default searchSlice.reducer;