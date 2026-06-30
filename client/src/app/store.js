import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice.js'
import messagesReducer from '../features/messages/messagesSlice.js'
import themeReducer from '../features/theme/themeSlice.js'

import connectionsReducer from '../features/connections/connectionSlice.js'
export const store=configureStore({
  reducer:{
   user:userReducer,
   connections:connectionsReducer,
   messages:messagesReducer,
   theme:themeReducer
  },
})
