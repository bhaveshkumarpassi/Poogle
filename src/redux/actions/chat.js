import { baseUrl } from "../../shared/baseUrl";
const axios = require("axios");

export const getChats = (userDetails) => async (dispatch) => {
	try {
		const bearer_token = "Bearer" + userDetails.token;
		const payload = await axios({
			method: "get",
			url: baseUrl + "messages",
			headers: {
				"Content-Type": "application/json",
				Authorization: bearer_token,
			},
		});
		dispatch({ type: "GET_CHAT", payload });
	} catch (e) {
		dispatch({ type: "CHAT_ERROR", payload: e });
	}
};

export const sendMessage = (userDetails, msg, to) => async (dispatch) => {
	try {
		const bearer_token = "Bearer " + userDetails.token;
		const data = await axios({
			method: "post",
			url: baseUrl + "messages",
			headers: {
				"Content-Type": "application/json",
				Authorization: bearer_token,
			},
			data: { msg, to },
		});
		dispatch({ type: "MSG_SENT", payload: data });
	} catch (e) {
		dispatch({ type: "MSG_ERROR", payload: e });
	}
};
