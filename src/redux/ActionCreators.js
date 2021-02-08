import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

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
			localStorage.setItem("isSignedIn", true);
			localStorage.setItem("userId", response.user._id);
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
			localStorage.setItem("isSignedIn", true);
			localStorage.setItem("userId", response.user._id);
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

//**************************************************************************** */
// ------------------------------------ SPACES -------------------------------/

export const fetchSpaces = (limit, skip) => (dispatch) => {
	// redux thunk allows to pass an action method instead of just action object and automayically recieves dispatch parameter.

	dispatch(spacesLoading(true)); // could do this or anything at anytime as middleware operation.
	//&skip=${skip}
	return fetch(baseUrl + 'spaces')
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
//************************************************************************************/
//--------------------------------------  QUESTIONS  ------------------------------- /

export const addQuestion = (question) => ({
	type: ActionTypes.ADD_QUESTION,
	payload: question,
});

export const postQuestion = (question) => (dispatch) => {
	const newQuestion = question;
	newQuestion.dateNum = Date.now();
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "questions", {
		method: "POST",
		body: JSON.stringify(newQuestion),
		headers: {
			"Content-Type": "application/json",
			Authorization: bearer,
		},
		//credentials: "same-origin"
	})
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
				throw error;
			}
		)
		.then((response) => response.json())
		.then((response) => dispatch(addQuestion(response)))
		.catch((error) => {
			console.log("post questions", error.message);
			alert("Your question could not be posted\nError: " + error.message);
		});
};



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

export const deleteQuestion = (questionId) => (dispatch) => {
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "questions/" + questionId, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: bearer,
		},
        //credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(() => dispatch(removeQuestion(questionId)))
	.then(() => console.log('Question deleted!!'))
    .catch(error => dispatch(questionsFailed(error.message)));
};

export const removeQuestion = (questionId) => ({
	type: ActionTypes.DELETE_QUESTION,
	payload: questionId,
});

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


// --------------------------     QUESTION REACTION   -------------------------/

export const addReaction = (reac) => ({
	type: ActionTypes.ADD_QREACTION,
	payload: reac,
});

export const postReaction = (reac) => (dispatch) => {
	
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "questionReactions", {
		method: "POST",
		body: JSON.stringify(reac),
		headers: {
			"Content-Type": "application/json",
			Authorization: bearer,
		},
		//credentials: "same-origin",
	})
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
				throw error;
			}
		)
		.then((response) => response.json())
		.then((response) => dispatch(addReaction(response)))
		.catch((error) => {
			console.log("post reactions", error.message);
			alert("Your Reaction could not be posted\nError: " + error.message);
		});
};

export const fetchReactions = () => (dispatch) => {
	return fetch(baseUrl + "questionReactions")
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
		.then((reactions) => dispatch(addReactions(reactions)))
		.catch((error) => dispatch(reactionsFailed(error.message)));
};

export const reactionsFailed = (errmess) => ({
	type: ActionTypes.QREACTIONS_FAILED,
	payload: errmess,
});

export const addReactions = (reactions) => ({
	type: ActionTypes.ADD_QREACTIONS,
	payload: reactions,
});

export const deleteReaction = (reacId) => (dispatch) => {
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "questionReactions/" + reacId, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: bearer
		},
		credentials: "same-origin",
	})
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
				throw error;
			}
		)
		.then((response) => response.json())
		.then((reactions) => {
			console.log("Reaction Deleted", reactions);
			dispatch(removeReaction(reacId));
		})
		.catch((error) => {
			console.log("delete Reactions", error.message);
			alert("Your Reaction could not be deleted\nError: " + error.message);
		});
};

export const removeReaction = (reacId) => ({
	type: ActionTypes.DELETE_QREACTION,
	payload: reacId,
});


// --------------------------      ANSWERES ----------------------------------/

export const addAnswer = (answer) => ({
	type: ActionTypes.ADD_ANSWER,
	payload: answer,
});

export const postAnswer = (answer) => (dispatch) => {
	const newAnswer = answer;
	newAnswer.dateNum = Date.now();
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "answers", {
		method: "POST",
		body: JSON.stringify(newAnswer),
		headers: {
			"Content-Type": "application/json",
			Authorization: bearer,
		},
		//credentials: "same-origin",
	})
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
				throw error;
			}
		)
		.then((response) => response.json())
		.then((response) => dispatch(addAnswer(response)))
		.catch((error) => {
			console.log("post answers", error.message);
			alert("Your answer could not be posted\nError: " + error.message);
		});
};

export const fetchAnswers = () => (dispatch) => {
	dispatch(answersLoading(true));

	return fetch(baseUrl + "answers")
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
		.then((answers) => dispatch(addAnswers(answers)))
		.catch((error) => dispatch(answersFailed(error.message)));
};

export const deleteAnswer = (answerId) => (dispatch) => {
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "answers/" + answerId, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: bearer,
		},
		//credentials: "same-origin",
	})
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
				throw error;
			}
		)
		.then((response) => response.json())
		.then((answers) => {
			console.log("Answer Deleted", answers);
			dispatch(removeAnswer(answerId));
		})
		.catch((error) => dispatch(answersFailed(error.message)));
};

export const removeAnswer = (answerId) => ({
	type: ActionTypes.DELETE_ANSWER,
	payload: answerId,
});

export const answersLoading = () => ({
	type: ActionTypes.ANSWERS_LOADING,
});

export const answersFailed = (errmess) => ({
	type: ActionTypes.ANSWERS_FAILED,
	payload: errmess,
});

export const addAnswers = (answers) => ({
	type: ActionTypes.ADD_ANSWERS,
	payload: answers,
});

// --------------------------   Answer Reaction   -------------------------


export const addAReaction = (reac) => ({
	type: ActionTypes.ADD_AREACTION,
	payload: reac,
});

export const postAReaction = (reac) => (dispatch) => {
	
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "answerReactions", {
		method: "POST",
		body: JSON.stringify(reac),
		headers: {
			"Content-Type": "application/json",
			Authorization: bearer,
		},
		//credentials: "same-origin",
	})
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
				throw error;
			}
		)
		.then((response) => response.json())
		.then((response) => dispatch(addAReaction(response)))
		.catch((error) => {
			console.log("post reactions", error.message);
			alert("Your Reaction could not be posted\nError: " + error.message);
		});
};

export const fetchAReactions = () => (dispatch) => {
	return fetch(baseUrl + "answerReactions")
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
		.then((reactions) => dispatch(addAReactions(reactions)))
		.catch((error) => dispatch(areactionsFailed(error.message)));
};

export const areactionsFailed = (errmess) => ({
	type: ActionTypes.AREACTIONS_FAILED,
	payload: errmess,
});

export const addAReactions = (reactions) => ({
	type: ActionTypes.ADD_AREACTIONS,
	payload: reactions,
});

export const deleteAReaction = (reacId) => (dispatch) => {
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "answerReactions/" + reacId, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: bearer
		},
		//credentials: "same-origin",
	})
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
				throw error;
			}
		)
		.then((response) => response.json())
		.then((reactions) => {
			console.log("Reaction Deleted", reactions);
			dispatch(removeAReaction(reacId));
		})
		.catch((error) => {
			console.log("delete Reactions", error.message);
			alert("Your Reaction could not be deleted\nError: " + error.message);
		});
};

export const removeAReaction = (reacId) => ({
	type: ActionTypes.DELETE_AREACTION,
	payload: reacId,
});

// --------------------------   questionComments ------------------------

export const addComment = (comment) => ({
	type: ActionTypes.ADD_COMMENT,
	payload: comment,
});

export const postComment = (comment) => (dispatch) => {
	const newComment = comment;
	newComment.dateNum = Date.now();
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "questionComments", {
		method: "POST",
		body: JSON.stringify(newComment),
		headers: {
			"Content-Type": "application/json",
			Authorization: bearer,
		},
		//credentials: "same-origin",
	})
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
				throw error;
			}
		)
		.then((response) => response.json())
		.then((response) => dispatch(addComment(response)))
		.catch((error) => {
			console.log("post comments", error.message);
			alert("Your comment could not be posted\nError: " + error.message);
		});
};

export const fetchComments = () => (dispatch) => {
	return fetch(baseUrl + "questionComments")
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
		.then((comments) => dispatch(addComments(comments)))
		.catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
	type: ActionTypes.COMMENTS_FAILED,
	payload: errmess,
});

export const addComments = (comments) => ({
	type: ActionTypes.ADD_COMMENTS,
	payload: comments,
});

export const deleteComment = (commentId) => (dispatch) => {
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "questionComments/" + commentId, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: bearer
		},
		credentials: "same-origin",
	})
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
				throw error;
			}
		)
		.then((response) => response.json())
		.then((comments) => {
			console.log("Comment Deleted", comments);
			dispatch(removeComment(commentId));
		})
		.catch((error) => {
			console.log("delete comments", error.message);
			alert("Your comment could not be deleted\nError: " + error.message);
		});
};

export const removeComment = (commentId) => ({
	type: ActionTypes.DELETE_COMMENT,
	payload: commentId,
});

export const fetchUser = (userId) => async (dispatch, getState) => {
	console.log("Got fet user request for userId"+ userId);
	dispatch({type: ActionTypes.USER_LOADING});
	try {
		console.log(userId);
		let response = await fetch(baseUrl + "users/"+userId, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});
		console.log(response);

		if (response.ok) {
			response = await response.json();
			dispatch({ type: ActionTypes.GET_USER, payload: response });
		} else {
			response = await response.text();
			console.log("Errrrrrror", response);
			throw new Error(response);
		}
	} catch (err) {
		console.log("err", err);
		dispatch({ type: ActionTypes.USER_FAILED, payload: { errmess: err } });
	}
};


/*************************************************************** */
/*------------CONTACT US FORM----------------------------*/
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

//----------------BLOGS---------------------------------//
export const fetchBlogs = () => (dispatch) => {
	dispatch(blogsLoading(true));

	return fetch(baseUrl + "blogs")
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
		.then((blogs) => dispatch(addBlogs(blogs)))
		.catch((error) => dispatch(blogsFailed(error.message)));
};

export const blogsLoading = () => ({
	type: ActionTypes.BLOGS_LOADING,
});

export const blogsFailed = (errmess) => ({
	type: ActionTypes.BLOGS_FAILED,
	payload: errmess,
});

export const addBlogs = (blogs) => ({
	type: ActionTypes.ADD_BLOGS,
	payload: blogs,
});
