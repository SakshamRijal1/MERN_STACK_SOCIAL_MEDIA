import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axois";
import toast from "react-hot-toast";







const initialState={
  connections:[],
  pendingConnections:[],
  followers:[],
  following:[],
  sentRequest:[],
}
export const fetchConnection=createAsyncThunk('user/Connection',async(token)=>{

  try{
const {data}=await api.get('/api/user/connection',{
  headers:{
    Authorization:`Bearer ${token}`
  }
})
console.log(data)
return data.success?data:null;

  }
  catch(err)
  {
toast.error(err.message)
  }
})

const connectionSlice=createSlice({
  name:"connections",
 initialState,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder.addCase(fetchConnection.fulfilled,(state,action)=>{
      if(action.payload)
      {
        state.connections=action.payload.connections
        state.pendingConnections=action.payload.pendingConnections
        state.followers=action.payload.followers
        state.following=action.payload.following
        state.sentRequest=action.payload.sentRequest
      }
    })
  }
})

export default connectionSlice.reducer;