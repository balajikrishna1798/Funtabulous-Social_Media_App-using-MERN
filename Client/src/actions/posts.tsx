import * as api from '../api'

export const getPosts = () => async ( dispatch:any )=>{
    try {
        const {data} = await api.fetchPosts();
        const action = {type:'FETCH_ALL',payload:data}
        dispatch(action)
    } catch (error) {
        console.log(error)
    }
}
export const createPosts = (post:any) => async ( dispatch:any )=>{
    try {
        const {data} = await api.createPosts(post);
        const action = {type:'CREATE',payload:data}
        dispatch(action)
    } catch (error) {
        console.log(error)
    }
}
export const updatePosts = (id:any,post:any) => async ( dispatch:any )=>{
    try {
        const {data} = await api.updatePosts(id,post);
        const action = {type:'UPDATE',payload:data}
        dispatch(action)
    } catch (error) {
        console.log(error)
    }
}
export const deletePosts = (id:any) => async ( dispatch:any )=>{
    try {
        await api.deletePosts(id);
        const action = {type:'DELETE',payload:id}
        dispatch(action)
    } catch (error) {
        console.log(error)
    }
}
export const likePosts = (id:any) => async ( dispatch:any )=>{
    try {
        const {data} = await api.likePosts(id);
        const action = {type:'UPDATE',payload:data}
        dispatch(action)
    } catch (error) {
        console.log(error)
    }
}

