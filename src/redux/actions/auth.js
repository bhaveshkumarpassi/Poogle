import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";


//--------------------------AUTHENTICATION-----------------------------------/

export const signIn = (userDetails) => async (dispatch, getState) => {
	try {
		let response = await fetch(baseUrl + "users/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userDetails),
		});

		if (response.ok) {
			response = await response.json();

			var interests = "";
			for(var i=0;i<response.user.interests.length;i++){
				interests += response.user.interests[i].interest;
				interests += "*";
			}

			localStorage.setItem("isSignedIn", true);
			localStorage.setItem("userId", response.user._id);
			localStorage.setItem("interests", interests);
			localStorage.setItem("token", response.token);
			dispatch({ type: ActionTypes.SIGN_IN, payload: response });
		} else {
			response = await response.text();
			throw new Error(response);
		}
	} catch (err) {
		dispatch({ type: ActionTypes.AUTH_FAILED, payload: { error: err } });
	}
};

export const signUp = (userDetails) => async (dispatch, getState) => {
	try {
		console.log(userDetails);
		let response = await fetch(baseUrl + "users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userDetails),
		});
		console.log(response);

		if (response.ok) {
			response = await response.json();
			var interests = "";
			for(var i=0;i<response.user.interests.length;i++){
				interests += response.user.interests[i].interest;
				interests += "*";
			}

			localStorage.setItem("isSignedIn", true);
			localStorage.setItem("userId", response.user._id);
			localStorage.setItem("interests", interests);
			//localStorage.setItem("interests", JSON.stringify(response.user.interests));
			//localStorage.setItem("interests", response.user.interests);
			localStorage.setItem("token", response.token);
			dispatch({ type: ActionTypes.SIGN_UP, payload: response });
		} else {
			response = await response.text();
			console.log("Eror", response);
			throw new Error(response);
		}
	} catch (err) {
		dispatch({ type: ActionTypes.AUTH_FAILED, payload: { error: err } });
	}
};

// Add authorization header in request and modify the logout
export const logOut = (userToken) => async (dispatch, getState) => {
	try {
		let bearer_token = "Bearer " + userToken.token;
		let response = await fetch(baseUrl + "users/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: bearer_token,
			},
		});

		if (response.ok) {
			response = await response.text();
			localStorage.removeItem("isSignedIn");
			localStorage.removeItem("userId");
			localStorage.removeItem("interests");
			localStorage.removeItem("token");
			dispatch({ type: ActionTypes.SIGN_OUT, payload: response });
		} else {
			response = await response.text();
			throw new Error(response);
		}
	} catch (err) {
		dispatch({ type: ActionTypes.SIGN_OUT, payload: { error: err } });
	}
};

export const ChangeSpaces = (data, interests) => async (dispatch, getState)=>{
	const {token, spaceId} = data;
    try {
		let bearer_token = "Bearer " + token;
		let response = await fetch(baseUrl + "follow/space", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: bearer_token,
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			response = await response.text();

			interests = interests + spaceId + '*';
			localStorage.setItem("interests", interests);

			// dispatch({ type: ActionTypes.SPACE_FOLLOW, payload: response });
		} else {
			response = await response.text();
			throw new Error(response);
		}
	} catch (err) {
		// dispatch({ type: ActionTypes.SIGN_OUT, payload: { error: err } });
	}

}