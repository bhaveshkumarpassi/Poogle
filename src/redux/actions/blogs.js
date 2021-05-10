import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
const axios = require("axios");

export const userBlogs = (details) => async(dispatch, getState)=>{
    const {token, Skip, Limit, userId} = details;
    let bearer_token = "Bearer " + token;
    let queryParams ={Skip, Limit, userId}; 
    try{
        let response= await axios.get(
            baseUrl + "userblogs",
            {
                headers:{
                    "Authorization":bearer_token,
                },
                params:queryParams
            }
        )
        // console.log(response.data);
        dispatch({ type: ActionTypes.GET_USER_BLOGS, payload: response.data });

    }catch(err){
        console.log(err);
        dispatch({type:ActionTypes.USER_BLOGS_FAILED, payload:err});
    }
}

export const userBlogDemands = (details) => async(dispatch, getState)=>{
    const {token, Skip, Limit, userId} = details;
    let bearer_token = "Bearer " + token;
    let queryParams ={Skip, Limit, userId}; 
    try{
        let response= await axios.get(
            baseUrl + "userblogDemands",
            {
                headers:{
                    "Authorization":bearer_token,
                },
                params:queryParams
            }
        )
        // console.log(response.data);
        dispatch({ type: ActionTypes.GET_USER_BLOG_DEMANDS, payload: response.data });

    }catch(err){
        console.log(err);
        dispatch({type:ActionTypes.USER_BLOG_DEMANDS_FAILED, payload:err});
    }
}