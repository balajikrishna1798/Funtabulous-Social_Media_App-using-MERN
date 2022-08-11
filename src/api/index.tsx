import axios from 'axios'
const API = axios.create({baseURL:"http://localhost:5000"})
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})
export const fetchPosts = () => API.get("/posts")
export const fetchPost = (id:any) => API.get(`/posts/${id}`)
export const fetchPostsBySearch = (searchQuery:any) => API.get(`/posts/search?title=${searchQuery.search || 'none'}&tags=${searchQuery.tags} `)
export const createPosts = (newPosts:any) => API.post("/posts",newPosts)
export const updatePosts = (id:any,updatedPost:any) => API.patch(`/posts/${id}`,updatedPost)
export const deletePosts = (id:any) => API.delete(`/posts/${id}`)
export const likePosts = (id:any) => API.patch(`/posts/${id}/likePost`)

export const signIn = (formData:any) => API.post("/users/signin",formData)
export const signUp = (formData:any) => API.post("/users/signup",formData)
