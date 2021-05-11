import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import {logOut, signIn, signUp, ChangeSpaces} from './actions/auth'
import {contactUs} from './actions/contact'
import {fetchUser, updateUser} from './actions/user';
import {userQuestions} from './actions/questions';
import {userAnswers} from './actions/answers';
import {userBlogs, userBlogDemands} from './actions/blogs';

//--------------------------AUTHENTICATION-----------------------------------/
export {logOut};
export {signIn};
export {signUp};

/*************************************************************** */
/*------------CONTACT US FORM----------------------------*/
export {contactUs};

/******************************************************************* */
/*------------FETCH USER----------------------------*/
export {fetchUser}
export {updateUser};




//**************************************************************************** */
// ------------------------------------ SPACES -------------------------------/
export {ChangeSpaces};
export const fetchFollowSpaces = (interests) => (dispatch) => {
	// redux thunk allows to pass an action method instead of just action object and automayically recieves dispatch parameter.

	dispatch(spacesLoading(true)); // could do this or anything at anytime as middleware operation.
	return fetch(baseUrl + `followedSpaces?interests=${interests}`)
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

export const fetchSpaces = () => (dispatch) => {
	// redux thunk allows to pass an action method instead of just action object and automayically recieves dispatch parameter.

	dispatch(spacesLoading(true)); // could do this or anything at anytime as middleware operation.
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
export {userQuestions};

export const addQuestion = (question) => ({
	type: ActionTypes.ADD_QUESTION,
	payload: question,
});

export const postFail = (errormess) => ({
	type: ActionTypes.POST_FAIL,
	payload: errormess,
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
			dispatch(postFail(error.message))
			console.log("post questions", error.message);
			//alert("Your question could not be posted\nError: " + error.message);
		});
};

export const fetchHomeFeed = (interests) => (dispatch) => {
	dispatch(questionsLoading(true));

	return fetch(baseUrl + `homeFeed?interests=${interests}`)
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
}

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
export {userAnswers};
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
			dispatch(postFail(error.message))
			console.log("post answers", error.message);
			//alert("Your answer could not be posted\nError: " + error.message);
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
			dispatch(postFail(error.message))
			console.log("post comments", error.message);
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







//----------------BLOGS---------------------------------//
export{userBlogs};

export const addBlog = (blog) => ({
	type: ActionTypes.ADD_BLOG,
	payload: blog,
});

export const postBlog = (blog) => (dispatch) => {
	const newBlog = blog;
	newBlog.dateNum = Date.now();
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "blogs", {
		method: "POST",
		body: JSON.stringify(newBlog),
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
		.then((response) => dispatch(addBlog(response)))
		.catch((error) => {
			dispatch(postFail(error.message))
			console.log("post blogs", error.message);
		});
};

export const fetchBlogs = (interests) => (dispatch) => {
	dispatch(blogsLoading(true));

	return fetch(baseUrl + `blogs?interests=${interests}`)
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


export const deleteBlog = (blogId) => (dispatch) => {
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "blogs/" + blogId, {
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
    .then(() => dispatch(removeBlog(blogId)))
	.then(() => console.log('Blog deleted!!'))
    .catch(error => dispatch(blogsFailed(error.message)));
};

export const removeBlog = (blogId) => ({
	type: ActionTypes.DELETE_BLOG,
	payload: blogId,
});

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


//------------------------------------------BLOGS REACTIONS--------------------------------------------------------------------//


export const addBReaction = (reac) => ({
	type: ActionTypes.ADD_BREACTION,
	payload: reac,
});

export const postBReaction = (reac) => (dispatch) => {
	
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "blogReactions", {
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
		.then((response) => dispatch(addBReaction(response)))
		.catch((error) => {
			console.log("post reactions", error.message);
			alert("Your Reaction could not be posted\nError: " + error.message);
		});
};

export const fetchBReactions = () => (dispatch) => {
	return fetch(baseUrl + "blogReactions")
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
		.then((reactions) => dispatch(addBReactions(reactions)))
		.catch((error) => dispatch(reactionsBFailed(error.message)));
};

export const reactionsBFailed = (errmess) => ({
	type: ActionTypes.REACTIONS_BFAILED,
	payload: errmess,
});

export const addBReactions = (reactions) => ({
	type: ActionTypes.ADD_BREACTIONS,
	payload: reactions,
});

export const deleteBReaction = (reacId) => (dispatch) => {
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "blogReactions/" + reacId, {
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
			dispatch(removeBReaction(reacId));
		})
		.catch((error) => {
			console.log("delete Reactions", error.message);
			alert("Your Reaction could not be deleted\nError: " + error.message);
		});
};

export const removeBReaction = (reacId) => ({
	type: ActionTypes.DELETE_BREACTION,
	payload: reacId,
});

//---------------------------------------------BLOG COMMENTS---------------------------------------------------//


export const addBComment = (comment) => ({
	type: ActionTypes.ADD_BCOMMENT,
	payload: comment,
});

export const postBComment = (comment) => (dispatch) => {
	const newBComment = comment;
	newBComment.dateNum = Date.now();
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "blogComments", {
		method: "POST",
		body: JSON.stringify(newBComment),
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
		.then((response) => dispatch(addBComment(response)))
		.catch((error) => {
			dispatch(postFail(error.message))
			console.log("post comments", error.message);
		});
};

export const fetchBComments = () => (dispatch) => {
	return fetch(baseUrl + "blogComments")
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
		.then((comments) => dispatch(addBComments(comments)))
		.catch((error) => dispatch(commentsBFailed(error.message)));
};

export const commentsBFailed = (errmess) => ({
	type: ActionTypes.COMMENTS_BFAILED,
	payload: errmess,
});

export const addBComments = (comments) => ({
	type: ActionTypes.ADD_BCOMMENTS,
	payload: comments,
});

export const deleteBComment = (commentId) => (dispatch) => {
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "blogComments/" + commentId, {
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
			dispatch(removeBComment(commentId));
		})
		.catch((error) => {
			console.log("delete comments", error.message);
			alert("Your comment could not be deleted\nError: " + error.message);
		});
};

export const removeBComment = (commentId) => ({
	type: ActionTypes.DELETE_BCOMMENT,
	payload: commentId,
});


//---------------------------------------BLOG DEMANDS------------------------------------------------//
export {userBlogDemands};

export const addBlogDemand = (blogDemand) => ({
	type: ActionTypes.ADD_BLOGDEMAND,
	payload: blogDemand,
});

export const postBlogDemand = (blogDemand) => (dispatch) => {
	const newBlogDemand = blogDemand;
	newBlogDemand.dateNum = Date.now();
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "blogDemands", {
		method: "POST",
		body: JSON.stringify(newBlogDemand),
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
		.then((response) => dispatch(addBlogDemand(response)))
		.catch((error) => {
			console.log("post blogDemands", error.message);
			alert("Your blogDemand could not be posted\nError: " + error.message);
		});
};

export const fetchBlogDemands = (interests) => (dispatch) => {
	dispatch(blogDemandsLoading(true));

	return fetch(baseUrl + "blogDemands?interests="+interests)
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
		.then((blogDemands) => dispatch(addBlogDemands(blogDemands)))
		.catch((error) => dispatch(blogDemandsFailed(error.message)));
};


export const deleteBlogDemand = (blogDemandId) => (dispatch) => {
	const bearer = "Bearer " + localStorage.getItem("token");

	return fetch(baseUrl + "blogDemands/" + blogDemandId, {
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
    .then(() => dispatch(removeBlogDemand(blogDemandId)))
	.then(() => console.log('BlogDemand deleted!!'))
    .catch(error => dispatch(blogDemandsFailed(error.message)));
};

export const removeBlogDemand = (blogDemandId) => ({
	type: ActionTypes.DELETE_BLOGDEMAND,
	payload: blogDemandId,
});

export const blogDemandsLoading = () => ({
	type: ActionTypes.BLOGDEMANDS_LOADING,
});

export const blogDemandsFailed = (errmess) => ({
	type: ActionTypes.BLOGDEMANDS_FAILED,
	payload: errmess,
});

export const addBlogDemands = (blogdemands) => ({
	type: ActionTypes.ADD_BLOGDEMANDS,
	payload: blogdemands,
});












