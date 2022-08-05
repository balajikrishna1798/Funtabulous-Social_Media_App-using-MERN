import React from 'react'

const auth = (state={authData:null},action:any) => {
  switch(action.type){
    case "Auth":
        localStorage.setItem("profile",JSON.stringify({...action?.data}));
        return {...state,authData:action?.data};
        case "LOGOUT":
            localStorage.clear();
            return {...state,authData:null};
    default:
        return state;
}
}

export default auth