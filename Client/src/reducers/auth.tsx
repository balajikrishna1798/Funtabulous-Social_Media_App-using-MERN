import React from 'react'

const auth = (state={authData:null},action:any) => {
  switch(action.type){
        case "LOGOUT":
            localStorage.clear();
            return {...state,authData:null};
    default:
        return state;
}
}

export default auth