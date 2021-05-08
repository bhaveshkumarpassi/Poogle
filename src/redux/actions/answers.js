import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
const axios = require("axios");

export const userAnswers = (details) => async(dispatch, getState)=>{
    const {token, Skip, Limit, userId} = details;
    let bearer_token = "Bearer " + token;
    let queryParams ={Skip, Limit, userId}; 
    try{
        let response= await axios.get(
            baseUrl + "useranswers",
            {
                headers:{
                    "Authorization":bearer_token,
                },
                params:queryParams
            }
        )
        // console.log(response.data);
        dispatch({ type: ActionTypes.GET_USER_ANSWERS, payload: response.data });

    }catch(err){
        console.log(err);
        dispatch({type:ActionTypes.USER_ANSWERS_FAILED, payload:err});
    }
}