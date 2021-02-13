import * as ActionTypes from "../ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const contactUs = (formDetails) => async (dispatch, getState) => {
	try {
		console.log(formDetails);
		let response = await fetch(baseUrl + "contactUs", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formDetails),
		});
		console.log(response);

		if (response.ok) {
			response = await response.json();
			dispatch({ type: ActionTypes.CONTACT_US, payload: response });
		} else {
			response = await response.json();
			console.log("Error", response);
			throw new Error(response);
		}
	} catch (err) {
		dispatch({ type: ActionTypes.FORM_FAILED, payload: { error: err } });
	}
};