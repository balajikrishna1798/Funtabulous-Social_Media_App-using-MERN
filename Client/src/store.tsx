import { configureStore } from '@reduxjs/toolkit'
import auth from './reducers/auth'
import posts from './reducers/posts'
const store = configureStore({
  reducer: {
    posts,
    auth
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store