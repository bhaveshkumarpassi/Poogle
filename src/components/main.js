import React, { Component } from "react";
import { Route, Router, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSpaces, fetchQuestions, fetchUser,
	fetchAnswers, fetchComments, postComment, fetchBlogs,
	deleteComment, postQuestion, deleteQuestion, postReaction, fetchReactions, deleteReaction,
	postAnswer, deleteAnswer, postAReaction, fetchAReactions, deleteAReaction,postBlog,deleteBlog,
	postBComment,fetchBComments,fetchBReactions,postBReaction,deleteBComment,deleteBReaction} from "../redux/ActionCreators";
import Home from "./home_page/home";
import Spaces from "./spaces_page/Spaces";
import Questions from "./all_ques_page/questions";
import Blogs from "./all_blog_page/blogs";
import Profile_page from "./profile_page/profile";
import SingleQuestion from "./single_ques/SingleQues";
import ScrollToTop from './scroll-to-top/scroll-to-top';
import Chat from "./chat/Chat";
import Login from './login_signup/login';
import Signup from './login_signup/signup'; 
import Contact from './ContactUs/contact';
import Notifications from './notifications/notification';
import AddQuestion from './add_forms/addQuestions';
import AddBlog from './add_forms/addBlogs';
import Logout from './login_signup/logout';
import AboutUs from './aboutUs/aboutUs';
import SingleBlog from './single-blog/SingleBlog';


const mapStateToProps = (state) => {
	return {
		spaces: state.spaces,
		questions: state.questions,
		blogs:state.blogs,
		breactions:state.breactions,
		bcomments:state.bcomments,
		qreactions: state.qreactions,
		answers: state.answers,
		areactions: state.areactions,
		user: state.user,
		comments: state.comments,
		auth: state.auth
	};
};

const mapDispatchToProps = (dispatch) => ({
	 fetchSpaces: () => {
	 	dispatch(fetchSpaces());
	 },
	fetchQuestions: () => {
		dispatch(fetchQuestions());
	},
	fetchBlogs: () => {
        dispatch(fetchBlogs());
	},
	fetchBComments: () =>{
         dispatch(fetchBComments());
	},
	fetchBReactions: () =>{
        dispatch(fetchBReactions());
	},
	fetchReactions: () => {
		dispatch(fetchReactions());
	},
	fetchAReactions: () => {
		dispatch(fetchAReactions());
	},
	fetchAnswers: () => {
		dispatch(fetchAnswers())
	},
	fetchComments: () => {
		dispatch(fetchComments())
	},
	fetchUser: (userId) => {
		dispatch(fetchUser(userId))
	},
	postComment: (questionId, author, comment) => dispatch(postComment(questionId, author, comment)),
	deleteComment: (commentId) => dispatch(deleteComment(commentId)),
	postQuestion: (question, userToken) => dispatch(postQuestion(question, userToken)),
	deleteQuestion: (quesId) => dispatch(deleteQuestion(quesId)),
	postAnswer: (answer) => dispatch(postAnswer(answer)),
	postReaction: (reac) => dispatch(postReaction(reac)),
	deleteReaction: (reacId) => dispatch(deleteReaction(reacId)),
	deleteAnswer: (answerId) => dispatch(deleteAnswer(answerId)),
	postAReaction: (reac) => dispatch(postAReaction(reac)),
	deleteAReaction: (reacId) => dispatch(deleteAReaction(reacId)),
	postBlog:(blog,userToken) => dispatch(postBlog(blog,userToken)),
	deleteBlog: (blogId) => dispatch(deleteBlog(blogId)),
	postBComment : (blogId,author,comment) => dispatch(postBComment(blogId,author,comment)),
	deleteBComment : (commentId) => dispatch(deleteBComment(commentId)),
	postBReaction : (reac) => dispatch(postBReaction(reac)),
	deleteBReaction: (reacId) => dispatch(deleteBReaction(reacId))
});

class Main extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		this.props.fetchSpaces();
		this.props.fetchQuestions();
		this.props.fetchBlogs();
		this.props.fetchReactions();
		this.props.fetchUser(this.props.auth.userId);
		this.props.fetchAReactions();
		this.props.fetchAnswers();
		this.props.fetchComments();
		this.props.fetchBComments();
		this.props.fetchBReactions();
	}

	render() {
		const SpaceWithId = ({ match }) => {
			return (
				<Questions
					space={
						this.props.spaces.spaces.filter(
							(space) => space._id === match.params.spaceId
						)[0]
					}
					questions={this.props.questions.questions.filter(
						(question) =>
							question.tagIds.indexOf(match.params.stringId) > -1
					)}
					questionsErrMess={this.props.questions.errMess}
					questionsIsLoading={this.props.questions.isLoading}
					errMess={this.props.spaces.errMess}
					isLoading={this.props.spaces.isLoading}
					auth={this.props.auth}
					deleteQuestion={this.props.deleteQuestion}
					answers={this.props.answers.answers}
					answersIsLoading = {this.props.answers.isLoading}
					answersErrMess = {this.props.answers.errMess}
					reactions={this.props.qreactions.qreactions}
					reactionsIsLoading={this.props.qreactions.isLoading}
					reactionsErrMess = {this.props.qreactions.errMess}
					postReaction={this.props.postReaction}
					
				/>
			);
		};

		const HomeQuestions = () => {
			return(
				<Home 
			
					questions={this.props.questions.questions}
					isLoading={this.props.questions.isLoading}
					errMess={this.props.questions.errMess}
					spaces={this.props.spaces}
					blogs={this.props.blogs.blogs}
					blogsLoading={this.props.blogs.isLoading}
                    blogsErrMess={this.props.blogs.errMess}
		
				/>
			);
		}

		const QuestionWithId = ({ match }) => {
			return(
				<SingleQuestion
					question={
						this.props.questions.questions.filter((ques) => ques._id === match.params.quesId)[0]
					}
					isLoading={this.props.questions.isLoading}
					errMess={this.props.spaces.errMess}
					answers = {
						this.props.answers.answers.filter((ans) => ans.question === match.params.quesId)
					}
					answersIsLoading = {this.props.answers.isLoading}
					answersErrMess = {this.props.answers.errMess}
					//spaceId={match.params.spaceId}
					comments = {this.props.comments.comments.filter((comm) => comm.question === match.params.quesId)}
					commentsErrMess={this.props.comments.errMess}
					postComment={this.props.postComment}
					deleteComment={this.props.deleteComment}
					auth={this.props.auth}
					postAnswer={this.props.postAnswer}
					deleteAnswer={this.props.deleteAnswer}
					postReaction={this.props.postReaction}
					deleteReaction={this.props.deleteReaction}
					reactions={this.props.qreactions.qreactions.filter((reac) => reac.question === match.params.quesId)}
					reactionsIsLoading={this.props.qreactions.isLoading}
					reactionsErrMess = {this.props.qreactions.errMess}
					areactions= {this.props.areactions.areactions}
					areactionsIsLoading={this.props.areactions.isLoading}
					aeactionsErrMess = {this.props.areactions.errMess}
					postAReaction={this.props.postAReaction}
					deleteAReaction={this.props.deleteAReaction}
				/>
			);
		}

		const BlogWithId = ({ match }) => {
			return(
				<SingleBlog
					blog={
						this.props.blogs.blogs.filter((blog) => blog._id === match.params.blogId)[0]
					}
					isLoading={this.props.blogs.isLoading}
					errMess={this.props.blogs.errMess}
					//bcomments={this.props.bcomments.bcomments}
					bcomments = {this.props.bcomments.bcomments.filter((comm) => comm.blog === match.params.blogId)}
					bcommentsErrMess={this.props.bcomments.errMess}
					postBComment={this.props.postBComment}
					deleteBComment={this.props.deleteBComment}
					auth={this.props.auth}
					postReaction={this.props.postBReaction}
					deleteReaction={this.props.deleteBReaction}
					reactions={this.props.breactions.breactions.filter((reac) => reac.blog === match.params.blogId)}
					reactionsIsLoading={this.props.breactions.isLoading}
					reactionsErrMess = {this.props.breactions.errMess}
				/>
			);
		}


		const PrivateRoute = ({ component: Component, ...rest }) => (
			<Route {...rest} render={(props) => (
			  this.props.auth.isSignedIn
				? <Component {...props} />
				: <Redirect to={{
					pathname: '/login',
					state: { from: props.location }
				  }} />
			)} />
		  );

		return (
			<div>
				<ScrollToTop/>
				<Switch>
					<PrivateRoute path="/home" component={HomeQuestions} />
					<PrivateRoute
						exact
						path="/spaces"
						//component={Spaces}
						component={() => <Spaces spaces={this.props.spaces} fetchSpaces={this.props.fetchSpaces} />}
					/>
					<PrivateRoute exact path="/spaces/:spaceId/:stringId" component={SpaceWithId} />
					<PrivateRoute
						exact
						path="/question-:quesId-:question"
						//path="/space-:spaceId/question-:quesId-:question"
						component={QuestionWithId}
					/>
					<PrivateRoute 
						exact
						path="/blogs"
						component={()=><Blogs 
						 blogs={this.props.blogs.blogs}
						 //fetchBlogs= {this.props.fetchBlogs} 
						 isLoading={this.props.blogs.isLoading}
						 errMess={this.props.errMess}
						 auth={this.props.auth}
						 deleteBlog={this.props.deleteBlog}
						 reactions={this.props.breactions.breactions}
						 reactionsIsLoading={this.props.breactions.isLoading}
						 reactionsErrMess = {this.props.breactions.errMess}
						 postReaction={this.props.postBReaction}
						 />}/>

					<PrivateRoute 
						exact
						path='/blog-:blogId-:blog'
						component={BlogWithId}
						/>
				
					<PrivateRoute exact path="/profile/:userId" component={Profile_page}/>
					{/* <PrivateRoute exact path="/profile" component={() => <Profile_page user={this.props.user} 
						isLoading={this.props.user.isLoading}
						errMess={this.props.user.errMess} />}/> */}
					<PrivateRoute path="/chat" component={Chat} />
					<Route path="/aboutUs" component={() => <AboutUs/>} />
					<Route path="/contact" component={Contact} />
					<PrivateRoute path="/notifications" component={Notifications}/>
					<Route path="/login" component={Login} />
					<PrivateRoute exact path="/addQuestion" component={() => <AddQuestion postQuestion={this.props.postQuestion} auth={this.props.auth}/>}/>
					<PrivateRoute path="/addBlog" component={() => <AddBlog postBlog={this.props.postBlog} auth={this.props.auth}/>} />
					<Route path="/signup" component={Signup} />
					<Route path="/logout" component={Logout}/>
					<Redirect to="/home" />
				</Switch>
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
