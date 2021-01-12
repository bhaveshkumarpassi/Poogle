import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchSpaces = () => (dispatch) => {
	// redux thunk allows to pass an action method instead of just action object and automayically recieves dispatch parameter.

	dispatch(spacesLoading(true)); // could do this or anything at anytime as middleware operation.

	return fetch(baseUrl + "spaces")
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					var error = new Error(
						"Error " + response.status + ": " + response.statusText
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				var errmess = new Error(error.message);
				throw errmess;
			}
		)
		.then((response) => response.json())
		.then((spaces) => dispatch(addSpaces(spaces))) // perform certain operations only when certain condition is met like only without err and json format dispatch to store.
		.catch((error) => dispatch(spacesFailed(error.message))); // else dispatch for err.
};

export const spacesLoading = () => ({
	type: ActionTypes.SPACES_LOADING,
});

export const spacesFailed = (errmess) => ({
	type: ActionTypes.SPACES_FAILED,
	payload: errmess,
});

export const addSpaces = (spaces) => ({
	type: ActionTypes.ADD_SPACES,
	payload: spaces,
});

export const fetchQuestions = () => (dispatch) => {
	dispatch(questionsLoading(true));

	return fetch(baseUrl + "questions")
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					var error = new Error(
						"Error " + response.status + ": " + response.statusText
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				var errmess = new Error(error.message);
				throw errmess;
			}
		)
		.then((response) => response.json())
		.then((questions) => dispatch(addQuestions(questions)))
		.catch((error) => dispatch(questionsFailed(error.message)));
};

export const questionsLoading = () => ({
	type: ActionTypes.QUESTIONS_LOADING,
});

export const questionsFailed = (errmess) => ({
	type: ActionTypes.QUESTIONS_FAILED,
	payload: errmess,
});

export const addQuestions = (questions) => ({
	type: ActionTypes.ADD_QUESTIONS,
	payload: questions,
});
