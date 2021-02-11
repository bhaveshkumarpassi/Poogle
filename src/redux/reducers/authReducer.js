const INITIAL_STATE = {
    isSignedIn:localStorage.getItem('isSignedIn')||false,
    interests:localStorage.getItem('interests')||[],
    //interests: JSON.parse(localStorage.getItem('interests'))||[],
    //interests:localStorage.getItem('interests') || [],
    //interests: JSON.parse(localStorage.getItem("interests") || "[]"),
    userId:localStorage.getItem('userId'),
    token: localStorage.getItem('token'),
    err:null
}
export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'SIGN_UP':
            return{...state, isSignedIn:true, interests:action.payload.user.interests, userId:action.payload.user._id, token:action.payload.token, err:null}
        case 'SIGN_IN':
            return{...state, isSignedIn:true,interests:action.payload.user.interests, userId:action.payload.user._id, token:action.payload.token, err:null}
        case 'SIGN_OUT':
            return{...state, isSignedIn:false, interests:[], userId:null, token:null, err:null}
        case 'AUTH_FAILED':
            return {...state, isSignedIn:false, interests:[], userId:null, token:null, err:action.payload.error}
        default:
            return state
    }
}