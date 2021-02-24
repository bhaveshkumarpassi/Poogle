import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
const axios = require("axios");

export const fetchUser = (userId) => async (dispatch, getState) => {
	console.log("Got fet user request for userId"+ userId);
	try {
		let response = await fetch(baseUrl + "users/"+userId, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			response = await response.json();
			dispatch({ type: ActionTypes.GET_USER, payload: response });
		} else {
			response = await response.text();
			console.log("Error", response);
			throw new Error(response);
		}
	} catch (err) {
		console.log("err", err);
		dispatch({ type: ActionTypes.USER_FAILED, payload: err });
	}
};

export const updateUser = (data) => async(dispatch, getState)=>{
    let formData = new FormData();
    const {token, image, graduation_year, field, description, email, Uname, password} = data;
    let bearer_token = "Bearer " + token;
    formData.append('image', image);
    formData.append('name', Uname);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('password', password);
    formData.append('graduation_year', graduation_year);
    formData.append('field', field);
    try{
        let response= await axios.patch(
            baseUrl + "users/me/update",
            formData, {
                headers:{
                    "Authorization":bearer_token,
                    "Content-type":"multipart/form-data"
                }
            }
        )
        console.log(response.data);
        dispatch({ type: ActionTypes.UPDATE_USER, payload: response.data });

    }catch (err){
        dispatch({ type: ActionTypes.UPDATE_FAILED, payload: err });
    }  
}

