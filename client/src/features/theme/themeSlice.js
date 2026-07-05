// import { createSlice } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

// const initialState = {
//   value: localStorage.getItem("theme") || "light",
// };

// const themeSlice = createSlice({
//   name: "theme",
//   initialState,
//   reducers: {
//     setTheme: (state, action) => {
//       localStorage.setItem("theme",action.payload)
//       state.value = action.payload;
//     },
//   },
// });

// export const { setTheme } = themeSlice.actions;
// export default themeSlice.reducer;



const initialState={
  value:localStorage.getItem("theme")||'dark'
}

const themeSlice=createSlice({
  name:"theme",
  initialState,
  reducers:{
   setTheme:(state,action)=>{
      localStorage.setItem('theme',action.payload);
      state.value=action.payload;
    }
  }
})

export const {setTheme}=themeSlice.actions;
export default themeSlice.reducer