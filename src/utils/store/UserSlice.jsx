import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const UserSlice = createSlice({
    name:'user',
    initialState:{
        userCred:[],
        logState:false,
        currUserMail:''
    },
    reducers:{
        signUp:(state,action)=>{
            state.userCred.push(action.payload)
        },
        closeLogin:(state)=>{
            
        },
        login:(state,action)=>{
            state.logState=true
            state.currUserMail=action.payload
        },
        logout:(state)=>{
            state.currUserMail=
            state.logState=false

        }
    }
})
export const {signUp,closeLogin,login,logout}=UserSlice.actions

export default UserSlice.reducer