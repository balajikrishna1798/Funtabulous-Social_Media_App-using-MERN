import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
// import auth from './reducers/auth'
import posts from './reducers/posts'
const store = configureStore({
  reducer: {
    posts,
    auth:authReducer
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store