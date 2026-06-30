import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import api from '../../api/axois'
import { Satellite } from 'lucide-react'
const initialState={
  messages:[]
}

export const fetchMessages=createAsyncThunk('messages/fetchMessages',async({token,userId})=>{
  const {data}=await api.post('/api/message/get',{
    to_user_id:userId,
  },
{
  headers:{
    Authorization:`Bearer ${token}`
  }

})
return data.success? data:null
})
const messagesSlice=createSlice({
  name:'messages',
  initialState,
  reducers:{
 setMessage:(state,action)=>{
  state.messages=action.payload;
 },
 addMessage:(state,action)=>{
state.messages=[...state.messages,action.payload]
 },
  resetMessage:(state)=>{
state.messages=[]
 }
  },
  extraReducers:(builder)=>{
builder.addCase(fetchMessages.fulfilled,(state,action)=>{

  state.messages=action.payload.messages;
})
  }
})
export const {setMessage,addMessage,resetMessage}=messagesSlice.actions;

export default messagesSlice.reducer