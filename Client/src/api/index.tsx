import axios from 'axios'
const url = "http://localhost:5000/posts"

export const fetchPosts = () => axios.get(url)
export const createPosts = (newPosts:any) => axios.post(url,newPosts)
export const updatePosts = (id:any,updatedPost:any) => axios.patch(`${url}/${id}`,updatedPost)
export const deletePosts = (id:any) => axios.delete(`${url}/${id}`)
export const likePosts = (id:any) => axios.patch(`${url}/${id}/likePost`)