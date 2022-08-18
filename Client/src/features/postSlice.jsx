import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api'

const initialState= {
    posts:[],
    userPosts:[],
    error:"",
    loading:false
}

export const createPost = createAsyncThunk("post/createPost",async({postData,navigate})=>{
    try {
        const response = await api.createPosts(postData)
        navigate("/posts")
        return response.data
    } catch (error) {
        
    }
}) 
export const getPosts = createAsyncThunk("post/getPosts",async(_)=>{
    try {
        const response = await api.fetchPosts()
        return response.data
    } catch (error) {
        
    }
}) 
export const deletePost = createAsyncThunk("post/deletePost",async({id,navigate})=>{
    try {
        const response = await api.deletePosts(id)
        return response.data
    } catch (error) {
        
    }
}) 
export const likePost = createAsyncThunk("post/likePost",async({id})=>{
    try {
        const response = await api.likePosts(id)
        return response.data
    } catch (error) {
        
    }
}) 

export const updatePost = createAsyncThunk("post/updatePost",async({id,postData,navigate})=>{
    try {
        const response = await api.updatePosts(id,postData)
        navigate("/posts")
        return response.data
    } catch (error) {
        
    }
}) 
export const getPost = createAsyncThunk("post/getPost",async({id,navigate})=>{
    try {
        const response = await api.fetchPost(id)
        return response.data
    } catch (error) {
        
    }
}) 

export const getPostByUser = createAsyncThunk("post/getPostByUser",async({GoogleUserId})=>{
    try {
        const response = await api.fetchPostsByUser(GoogleUserId)
        return response.data
    } catch (error) {
        
    }
}) 

export const getPostBySearch = createAsyncThunk("post/getPostBySearch",async({search})=>{
    try {
        const response = await api.fetchPostsBySearch(search)
        return response.data
    } catch (error) {
        
    }
}) 




const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{},
        extraReducers:{
            [createPost.pending]:(state)=>{
                 state.loading = true
            },
            [createPost.fulfilled]:(state,action)=>{
                state.loading = false
                 state.posts.push(action.payload)
            },
            [createPost.rejected]:(state,action)=>{
                state.loading = false
                state.error= action.payload.message
            },
            [getPosts.pending]:(state)=>{
                state.loading = true
           },
            [getPosts.fulfilled]:(state,action)=>{
               state.loading = false
                state.posts = action.payload
           },
           [getPosts.rejected]:(state,action)=>{
               state.loading = false
               state.error= action.payload.message
           },
           [getPost.pending]:(state)=>{
            state.loading = true
       },
       [getPost.fulfilled]:(state,action)=>{
           state.loading = false
            state.posts = action.payload
       },
       [getPost.rejected]:(state,action)=>{
           state.loading = false
           state.error= action.payload.message
       },
       [getPostByUser.pending]:(state)=>{
        state.loading = true
   },
   [getPostByUser.fulfilled]:(state,action)=>{
       state.loading = false
        state.userPosts = action.payload
   },
   [getPostByUser.rejected]:(state,action)=>{
       state.loading = false
       state.error= action.payload.message
   },
       [getPostBySearch.pending]:(state)=>{
        state.loading = true
   },
   [getPostBySearch.fulfilled]:(state,action)=>{
       state.loading = false
        state.posts = action.payload.data
   },
   [getPostBySearch.rejected]:(state,action)=>{
       state.loading = false
       state.error= action.payload.message
   },
           [deletePost.pending]:(state)=>{
            state.loading = true
       },
       [deletePost.fulfilled]:(state,action)=>{
        const {
            arg: { id },
          } = action.meta;
           state.loading = false
           state.posts = state.posts.filter((post) => post["_id"] !== id)
        },
       [deletePost.rejected]:(state,action)=>{
           state.loading = false
           state.error= action.payload.message
       },
       [likePost.pending]:(state)=>{
        state.loading = true
   },
   [likePost.fulfilled]:(state,action)=>{
       state.loading = false
       state.posts = state.posts.map((post)=>post["_id"] ===action.payload._id ? action.payload : post)  
    },
   [likePost.rejected]:(state,action)=>{
       state.loading = false
       state.error= action.payload.message
   },
   [updatePost.pending]:(state)=>{
    state.loading = true
},
[updatePost.fulfilled]:(state,action)=>{
    
   state.loading = false
   state.posts = state.posts.map((post) => post["_id"] === action.payload._id ? action.payload : post)
},
[updatePost.rejected]:(state,action)=>{
   state.loading = false
   state.error= action.payload.message
},
    }
})
export default postSlice.reducer