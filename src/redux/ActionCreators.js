import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";


// ------------------------------------ SPACES -------------------------------/

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

//--------------------------------------  QUESTIONS  ------------------------------- /

export const addQuestion = (question) => ({
    type: ActionTypes.ADD_QUESTION,
    payload: question
});

export const postQuestion = (question) => (dispatch) => {

	const newQuestion = question;
	newQuestion.dateNum = Date.now();
	//const bearer = 'Bearer ' + localStorage.getItem('token');
	
    return fetch(baseUrl + 'questions', {
        method: "POST",
        body: JSON.stringify(newQuestion),
        headers: {
		  "Content-Type": "application/json",
		  //"Authorization": bearer
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
	.then(response => dispatch(addQuestion(response)))
    .catch(error =>  { console.log('post questions', error.message); alert('Your question could not be posted\nError: '+error.message); });
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

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'questions/' + questionId, {
        method: "DELETE",
        headers: {
			"Content-Type": "application/json",
			"Authorization": bearer
		},
        credentials: "same-origin"
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
    .then(questions => { console.log('Question Deleted', questions); dispatch(removeQuestion(questionId))})
    .catch(error => dispatch(questionsFailed(error.message)));
};

export const removeQuestion = (questionId) => ({
    type: ActionTypes.DELETE_QUESTION,
    payload: questionId
})

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

// --------------------------      ANSWERES ----------------------------------/

export const addAnswer = (answer) => ({
    type: ActionTypes.ADD_ANSWER,
    payload: answer
});

export const postAnswer = (answer) => (dispatch) => {

	const newAnswer = answer;
	newAnswer.dateNum = Date.now();
	const bearer = 'Bearer ' + localStorage.getItem('token');
	
    return fetch(baseUrl + 'answers', {
        method: "POST",
        body: JSON.stringify(newAnswer),
        headers: {
		  "Content-Type": "application/json",
		  "Authorization": bearer
        },
        credentials: "same-origin"
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
	.then(response => dispatch(addAnswer(response)))
    .catch(error =>  { console.log('post answers', error.message); alert('Your answer could not be posted\nError: '+error.message); });
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

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'questions/' + answerId, {
        method: "DELETE",
        headers: {
			"Content-Type": "application/json",
			"Authorization": bearer
		},
        credentials: "same-origin"
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
    .then(answers => { console.log('Answer Deleted', answers); dispatch(removeAnswer(answerId))})
    .catch(error => dispatch(answersFailed(error.message)));
};

export const removeAnswer = (answerId) => ({
    type: ActionTypes.DELETE_ANSWER,
    payload: answerId
})

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

// --------------------------   questionComments ------------------------

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (comment) => (dispatch) => {

	const newComment = comment;
	newComment.dateNum = Date.now();
	const bearer = 'Bearer ' + localStorage.getItem('token');
	
    return fetch(baseUrl + 'questionComments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
		  "Content-Type": "application/json",
		  "Authorization": bearer
        },
        credentials: "same-origin"
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
	.then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'questionComments')
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
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
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

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'questionComments/' + commentId, {
        method: "DELETE",
        headers: {
			"Content-Type": "application/json"
        },
        credentials: "same-origin"
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
    .then(comments => { console.log('Comment Deleted', comments); dispatch(removeComment(commentId))})
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const removeComment = (commentId) => ({
    type: ActionTypes.DELETE_COMMENT,
    payload: commentId
})

export const fetchUser = (userId) => (dispatch) => {
	dispatch(userLoading(true));
	return (
		fetch(baseUrl + "users/" + userId)
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
					throw new Error(error.message);
				}
			)
			.then((response) => response.json())
			// .then(user=> console.log(user))
			.then((user) => dispatch(getUser(user)))
			.catch((error) => dispatch(userLoadingFailed(error.message)))
	);
};

export const userLoading = () => ({
	type: ActionTypes.USER_LOADING,
});

export const userLoadingFailed = (errmess) => ({
	type: ActionTypes.USER_FAILED,
	payload: errmess,
});

export const getUser = (user) => ({
	type: ActionTypes.GET_USER,
	payload: user,
});
