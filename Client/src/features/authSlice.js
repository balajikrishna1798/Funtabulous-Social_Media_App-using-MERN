import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api'
const initialState= {
    user:null,
    error:"",
    loading:false
}
    export const login = createAsyncThunk("auth/login",async({formData,navigate})=>{
    try {
        const response = await api.signIn(formData)
      
        navigate("/")
        return response.data
    } catch (error) {
        
    }
}) 
export const register = createAsyncThunk("auth/register",async({formData,navigate})=>{
    try {
        const response = await api.signUp(formData)
     
        navigate("/")
        return response.data
    } catch (error) {
        
    }
})

export const updateUser = createAsyncThunk("auth/updateUser",async({formData})=>{
    try {
        const response = await api.updateProfile(formData)
     
        console.log(response.data);
        return response.data
    } catch (error) {
        
    }
})

export const usersProfile = createAsyncThunk("auth/usersProfile",async({id})=>{
    try {
        const response = await api.usersProfile(id)
        return response.data
    } catch (error) {
        
    }
})
export const getMyProfile = createAsyncThunk("auth/getMyProfile",async(_)=>{
    try {
        const response = await api.getMyProfile()
        return response.data
    } catch (error) {
        
    }
})
export const googleusersProfile = createAsyncThunk("auth/usersProfile",async({googleid})=>{
    try {
        const response = await api.googleusersProfile(googleid)
        return response.data
    } catch (error) {
        
    }
})
export const googleSignIn = createAsyncThunk("auth/googleSignIn",async({result,navigate})=>{
    try {
        const response = await api.googleSignIn(result)

        navigate("/")
        return response.data
    } catch (error) {
        
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        Logout: (state, action) => {
            localStorage.clear();
            state.user = null;
          },
 
    },
    extraReducers:{
        [login.pending]:(state)=>{
             state.loading = true
        },
        [login.fulfilled]:(state,action)=>{
            state.loading = false
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
             state.user = action.payload
        },
        [login.rejected]:(state,action)=>{
            state.loading = false
            state.error= action.payload.message
        },
        [usersProfile.pending]:(state)=>{
            state.loading = true
       },
       [usersProfile.fulfilled]:(state,action)=>{
           state.loading = false
            state.user = action.payload
       },
       [usersProfile.rejected]:(state,action)=>{
           state.loading = false
           state.error= action.payload.message
       },
       [getMyProfile.pending]:(state)=>{
        state.loading = true
   },
   [getMyProfile.fulfilled]:(state,action)=>{
       state.loading = false
       localStorage.setItem("profile",JSON.stringify({...action.payload}))
        state.user = action.payload
   },
   [getMyProfile.rejected]:(state,action)=>{
       state.loading = false
       state.error= action.payload.message
   },
       [googleusersProfile.pending]:(state)=>{
        state.loading = true
   },
   [googleusersProfile.fulfilled]:(state,action)=>{
       state.loading = false
        state.user = action.payload
   },
   [googleusersProfile.rejected]:(state,action)=>{
       state.loading = false
       state.error= action.payload.message
   },
    [register.pending]:(state)=>{
        state.loading = true
    },
    [register.fulfilled]:(state,action)=>{
            state.loading = false
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
            state.user = action.payload
    },
    [register.rejected]:(state,action)=>{
        state.loading = false
        state.error= action.payload.message
    },
    [updateUser.pending]:(state)=>{
        state.loading = true
    },
    [updateUser.fulfilled]:(state,action)=>{
            state.loading = false
            state.user = action.payload
    },
    [updateUser.rejected]:(state,action)=>{
        state.loading = false
        state.error= action.payload.message
    },
    [googleSignIn.pending]:(state)=>{
        state.loading = true
    },
    [googleSignIn.fulfilled]:(state,action)=>{
        state.loading = false
        localStorage.setItem("profile",JSON.stringify({...action.payload}));
        state.user = action.payload
    },
    [googleSignIn.rejected]:(state,action)=>{
        state.loading = false
        state.error= action.payload.message
    },
}}
)
export const { Logout,saveProfile } = authSlice.actions;

export default authSlice.reducer