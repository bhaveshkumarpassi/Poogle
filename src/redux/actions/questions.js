import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
const axios = require("axios");

export const userQuestions = (details) => async(dispatch, getState)=>{
    const {token, Skip, Limit, userId} = details;
    let bearer_token = "Bearer " + token;
    let queryParams ={Skip, Limit, userId}; 
    try{
        let response= await axios.get(
            baseUrl + "userquestions",
            {
                headers:{
                    "Authorization":bearer_token,
                },
                params:queryParams
            }
        )
        dispatch({ type: ActionTypes.GET_USER_QUESTIONS, payload: response.data });

    }catch(err){
        console.log(err);
        dispatch({type:ActionTypes.USER_QUESTIONS_FAILED, payload:err});
    }
}