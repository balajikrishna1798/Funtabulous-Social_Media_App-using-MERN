import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    posts:[]
}
const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        createPosts:(state,{payload})=>{
            state.posts = payload
        }
    }
})
export const {createPosts} = postSlice.actions
export const getAllPosts = (state) =>state.posts.posts
export default postSlice.reducer