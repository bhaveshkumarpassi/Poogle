import React, { Component } from "react";
import { Route, Router, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSpaces, fetchQuestions, fetchUser, fetchAnswers, fetchComments } from "../redux/ActionCreators";
import Home from "./home_page/home";
import Spaces from "./spaces_page/Spaces";
import Questions from "./all_ques_page/questions";
import Profile_page from "./profile_page/profile";
import SingleQuestion from "./single_ques/SingleQues";
import ScrollToTop from './scroll-to-top/scroll-to-top';
import Chat from "./chat/Chat";
import Login from './login_signup/login';
import Signup from './login_signup/signup'; 
import Contact from './ContactUs/contact';

const mapStateToProps = (state) => {
	return {
		spaces: state.spaces,
		questions: state.questions,
		answers: state.answers,
		user: state.user,
		comments: state.comments
	};
};

const mapDispatchToProps = (dispatch) => ({
	fetchSpaces: () => {
		dispatch(fetchSpaces());
	},
	fetchQuestions: () => {
		dispatch(fetchQuestions());
	},
	fetchUser: () => {
		dispatch(fetchUser());
	},
	fetchAnswers: () => {
		dispatch(fetchAnswers())
	},
	fetchComments: () => {
		dispatch(fetchComments())
	}
});

class Main extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchSpaces();
		this.props.fetchQuestions();
		this.props.fetchUser();
		this.props.fetchAnswers();
		this.props.fetchComments();
	}

	render() {
		const SpaceWithId = ({ match }) => {
			return (
				<Questions
					space={
						this.props.spaces.spaces.filter(
							(space) => space.id === parseInt(match.params.spaceId, 10)
						)[0]
					}
					questions={this.props.questions.questions.filter(
						(question) =>
							question.tagIds.indexOf(parseInt(match.params.spaceId, 10)) > -1
					)}
					questionsErrMess={this.props.questions.errMess}
					questionsIsLoading={this.props.questions.isLoading}
					errMess={this.props.spaces.errMess}
					isLoading={this.props.spaces.isLoading}
				/>
			);
		};

		const HomeQuestions = () => {
			return(
				<Home 
					// questions={this.props.questions.questions.map((ques) => {
					// 	ques.tagIds.filter((tag) => {
					// 		this.props.user.interests.indexOf(tag, 10) >-1
					// 	})
					// })}
					// questions={this.props.questions.questions.filter(
					// 	(ques) => {
					// 		ques.tagIds.filter((tag) => {
					// 			this.props.user.user.interests.indexOf(tag, 10) >-1
					// 		})
					// 	}
					// )}
					questions={this.props.questions.questions}
					isLoading={this.props.questions.isLoading}
					errMess={this.props.questions.errMess}
					spaces={this.props.spaces}
				/>
			);
		}

		const QuestionWithId = ({ match }) => {
			return(
				<SingleQuestion
					question={
						this.props.questions.questions.filter((ques) => ques.id === parseInt(match.params.quesId, 10))[0]
					}
					isLoading={this.props.questions.isLoading}
					errMess={this.props.spaces.errMess}
					answers = {
						this.props.answers.answers.filter((ans) => ans.questionId === parseInt(match.params.quesId, 10))
					}
					answersIsLoading = {this.props.answers.isLoading}
					answersErrMess = {this.props.answers.errMess}
					spaceId={match.params.spaceId}
					comments = {this.props.comments.comments.filter((comm) => comm.questionId === parseInt(match.params.quesId, 10))}
					commentsErrMess={this.props.comments.errMess}
				/>
			);
		}

		return (
			<div>
				<ScrollToTop/>
				<Switch>
					<Route path="/home" component={HomeQuestions} />
					<Route
						exact
						path="/spaces"
						component={() => <Spaces spaces={this.props.spaces} />}
					/>
					<Route path="/spaces/:spaceId" component={SpaceWithId} />
					<Route
						exact
						path="/space-:spaceId/question-:quesId"
						component={QuestionWithId}
					/>
					<Route exact path="/profile/:userId" component={Profile_page}/>
					<Route path="/chat" component={Chat} />
					<Route path="/contact" component={Contact} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Redirect to="/home" />
				</Switch>
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
