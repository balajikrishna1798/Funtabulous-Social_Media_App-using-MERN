import * as api from '../api'

export const signup = (formData:any,navigate:any) => async ( dispatch:any )=>{
    try {
        const {data} = await api.signUp(formData)
        dispatch({type:"AUTH",data})
        navigate("/")
    } catch (error) {
        console.log(error)
    }
}
