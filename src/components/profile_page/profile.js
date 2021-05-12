import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Image, Form, Button} from "react-bootstrap";
import { Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import profilePic from "../../Images/profile_pic.png";
import { RiQuestionAnswerFill } from "react-icons/ri";
import Select from 'react-select'
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaBlog, FaQuestionCircle, FaUserAlt } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";
import { MdDescription } from "react-icons/md";
import { Link } from "react-router-dom";
import "./profile.css";
import Loading from "../loading";
import {spaces} from '../variables';
import {Questions, Blogs, Answers, BlogDemands} from './about'
import {deleteQuestion, deleteBlog, deleteBlogDemand, deleteAnswer, fetchUser, userBlogDemands,
	updateUser, userQuestions, userAnswers, userBlogs} from '../../redux/ActionCreators';
import {AiOutlineMail} from 'react-icons/ai';
import {RiLockPasswordFill} from 'react-icons/ri';
import {FiUserPlus} from 'react-icons/fi';
import {fields} from '../variables';
import {baseUrl} from '../../shared/baseUrl'
import { ToastContainer, toast } from 'react-toastify';

class profile extends Component {
	constructor(props){
        super(props);
        this.state = {
			questionsFetched:false,
			answersFetched:false,
			blogsFetched:false,
			blogDemandsFetched:false,
			questions_user:[],
			answers_user:[],
			blogs_user:[],
			blogDemands_user:[],
			skipQues:0,
			limitQues:20,
			skipAns:0,
			limitAns:20,
			skipBlog:0,
			limitBlog:20,
			skipBlogDemand:0,
			limitBlogDemand:20,
			owner:this.props.auth.userId,
			user:this.props.match.params.userId,
			showAbout:true,
			showQuestions:false,
			showAnswers:false,
			showBlogs:false,
			showBlogDemands:false,
			isAuth: false, 
			profileModelOpen: false,
			email:"",
            Uname:"",
            password:"",
            about:{
                graduation_year:"",
                field:"",
                description:""
            },
			image:"",
			errors:{
				email:"",
            	password:"",
				graduation_year:"",
				image:""
			}	    
		}       
    }
	componentDidMount(){
		const authId= this.props.auth.userId
        const user= this.props.user.user;
		const reqId = this.props.match.params.userId;
        if(authId===reqId){
			this.setState({
				isAuth:true
			})
		}else{
			this.setState({
				isAuth:false
			})
		}
		this.getUserQuestions({userId: reqId, token:this.props.auth.token});
		this.getUserAnswers({userId: reqId, token:this.props.auth.token})
		this.getUserBlogs({userId: reqId, token:this.props.auth.token})
		this.getUserBlogDemand({userId: reqId, token:this.props.auth.token})
		let userId;
        if(user){
            userId = user.userId;
        }
		if(reqId){
			if(authId){
				if(!user||userId!==reqId){
					this.getUserProfileDetails(reqId);
				}
			}else{
				this.getUserProfileDetails(reqId);
			}
		}
	}

	getUserProfileDetails = async(reqId)=>{
		await this.props.fetchUser(reqId);
	}
	getUserQuestions = async(details)=>{
		let {skipQues, limitQues, questions_user} = this.state;
		let {userId, token} = details;
		if(this.state.questionsFetched===true) return;
		await this.props.userQuestions({userId, token, Skip: skipQues, Limit: limitQues});
		const {questions} = this.props;

		if(questions){
			if(questions.length==0){
				this.setState({
					questionsFetched: true
				})
				return;
			}
			this.setState({
				questions_user:[...questions_user, questions],
				skipQues: this.state.skipQues+1
			})

		}
	}

	getUserAnswers = async(details)=>{
		let {skipAns, limitAns, answers_user} = this.state;
		let {userId, token} = details;
		if(this.state.answersFetched===true) return;
		await this.props.userAnswers({userId, token, Skip: skipAns, Limit: limitAns});
		const {answers} = this.props;

		if(answers){
			if(answers.length==0){
				this.setState({
					answersFetched: true
				})
				return;
			}
			this.setState({
				answers_user:[...answers_user, answers],
				skipAns: this.state.skipAns+1
			})

		}
	}

	getUserBlogs = async(details)=>{
		let {skipBlog, limitBlog, blogs_user} = this.state;
		let {userId, token} = details;
		if(this.state.blogsFetched===true) return;
		await this.props.userBlogs({userId, token, Skip: skipBlog, Limit: limitBlog});
		const {blogs} = this.props;

		if(blogs){
			if(blogs.length==0){
				this.setState({
					blogsFetched: true
				})
				return;
			}
			this.setState({
				blogs_user:[...blogs_user, blogs],
				skipBlog: this.state.skipBlog+1
			})

		}

	}

	getUserBlogDemand = async(details)=>{
		let {skipBlogDemand, limitBlogDemand, blogDemands_user} = this.state;
		let {userId, token} = details;
		if(this.state.blogDemandsFetched===true) return;
		await this.props.userBlogDemands({userId, token, Skip: skipBlogDemand, Limit: limitBlogDemand});
		const {blogDemands} = this.props;

		if(blogDemands){
			if(blogDemands.length==0){
				this.setState({
					blogDemandsFetched: true
				})
				return;
			}
			this.setState({
				blogDemands_user:[...blogDemands_user, blogDemands],
				skipBlogDemand: this.state.skipBlogDemand+1
			})

		}

	}





	activateAbout = (e)=>{
		e.preventDefault();
		this.setState({
			showAbout:true,
			showQuestions:false,
			showAnswers:false,
			showBlogs:false,
			showBlogDemands:false
		})
	}
	activateQuestions = (e)=>{
		e.preventDefault();
		this.setState({
			showAbout:false,
			showQuestions:true,
			showAnswers:false,
			showBlogs:false,
			showBlogDemands:false	
		})
	}
	activateAnswers = (e)=>{
		e.preventDefault();
		this.setState({
			showAbout:false,
			showQuestions:false,
			showAnswers:true,
			showBlogs:false,
			showBlogDemands:false
		})
	}
	activateBlogs = (e)=>{
		e.preventDefault();
		this.setState({
			showAbout:false,
			showQuestions:false,
			showAnswers:false,
			showBlogs:true,
			showBlogDemands:false
		})
	}

	activateBlogDemand = (e)=>{
		e.preventDefault();
		this.setState({
			showAbout:false,
			showQuestions:false,
			showAnswers:false,
			showBlogs:false,
			showBlogDemands:true	
		})
	}

	handleChange = (event)=> {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
        });
    }
	handleSelectField = field =>{
        this.setState(prevState =>({
            about:{
                ...prevState.about,
                field:field
            }
        }))
    }
    
    handleAboutChange = (event)=> {
      const target = event.target;
      const name=  target.name;
      this.setState( prevState =>({
        about:{
            ...prevState.about,
            [name]: event.target.value
        }
      })
      )
    }
	changeModalState=(e)=>{
		this.setState({
			profileModelOpen:!this.state.profileModelOpen
		})
	}
	updateProfile=(e)=>{
		e.preventDefault();
		this.setState({
			profileModelOpen:!this.state.profileModelOpen
		})
	}
	formValidation = () =>{
        const{password, email,about,image} = this.state;
		const {graduation_year} = about;
        let emailError="",passwordError="",graduationError="", imageError, error;
		if(email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)){
            emailError = "Email address is Invalid";
            error= true;
        }
        if(password.length>0&&password.length<4){
            passwordError="Length of password must be 4 characters or more"
            error= true;
        }
		if(graduation_year&&(graduation_year<1940 || graduation_year>2055)){
			graduationError = "Please enter a valid graduation year";
            error= true;
		}
		if(image){
			if(image.type!="image/jpeg"&&image.type!="image/png"){
				imageError="You must upoad a valid jpeg/png image file";
				error = true;
			}else if(image.size>=1000000){
				imageError="Maximum permissible size of an image is 1Mb";
				error = true;
			}
		}
        this.setState(prevState => ({
            errors:{
                email:emailError,
                password:passwordError,
				graduation_year:graduationError,
				image:imageError
            }
        }))
        
        return !error;
    }

	notifyS = (message) => toast.success(message);
    notifyF = (message) => toast.error(message);

	handleSubmit=async(e)=>{
		e.preventDefault();
		const isValid = this.formValidation();
		if(isValid){
			const{email, Uname, password, about, image}=this.state;
			let{graduation_year, field, description} = about;
			if(field){
				field = field.value;
			}
			const token = this.props.auth.token;
			let data = {token,image, email, password, Uname, graduation_year, field, description};
			
			await this.props.updateUser(data);
			if(this.props.updatedUser.user&&this.props.updatedUser.user.message){
				this.notifyS("Details updated successfully");

				setTimeout( async () => {
					await this.props.fetchUser(this.props.auth.userId);
				}, 3000);

			}else if(this.props.updatedUser.errMess){
				this.notifyF("Either this email is already in use or there is some problem with the server.");
			}
			
		}
		
	}
	handleImageUpload = (e)=>{
		e.preventDefault();
		this.setState({
			image:e.target.files[0],
			errors:{
				image:""
			}
		})
	}
	setAlternateImage = (e)=>{
		e.target.src=profilePic;
	}
	renderUpdateModal = ()=>{
		return(
			<Modal isOpen={this.state.profileModelOpen} 
               toggle={() => this.changeModalState()}
               className='modal-dialog modal-dialog-centered modal-lg'
               backdrop='static'
               >
            <ModalHeader style={{backgroundColor: 'darkgray'}} toggle={() => this.changeModalState()}>Update Profile</ModalHeader>
            <ModalBody>
				<div className="invalid__feedback user__notice">**Please fill only those fields that you want to update</div>
                <Form enctype="multipart/formdata">
					<Form.Group controlId="formBasicInput">
                        <Form.Label><span className="form__icon"><FaUserAlt/></span>Name</Form.Label>
                            <input name="Uname"  className="form-control" type="text"  placeholder="Enter name" value = {this.state.Uname} onChange={this.handleChange}/>
                            <div className="invalid__feedback">{this.state.errors.Uname}</div>
                    </Form.Group>
                	<Form.Group controlId="formBasicEmail">
                        <Form.Label><span className="form__icon"><AiOutlineMail/></span>Email address</Form.Label>
                            <input name="email"  className="form-control" type="email"  placeholder="Enter email" 
                            value = {this.state.email} onChange={this.handleChange}/>
                            <div className="invalid__feedback">{this.state.errors.email}</div>
                    </Form.Group>
					<Form.Group controlId="formBasicPassword">
                            <Form.Label><span className="form__icon"><RiLockPasswordFill/></span>Password</Form.Label>
                            <input name="password" className="form-control" type="password"  placeholder="Enter Password" 
                            value = {this.state.password} onChange={this.handleChange}/>
                            <div className="invalid__feedback">{this.state.errors.password}</div>
                    </Form.Group>
					<Form.Group controlId="formBasicInput">
                        <Form.Label><span className="form__icon"><SiGooglescholar/></span>Graduation Year</Form.Label>
                            <input name="graduation_year"  className="form-control" type="number" min={1940} max={2050}  placeholder="Enter Year" value = {this.state.about.graduation_year} onChange={this.handleAboutChange}/>
							<div className="invalid__feedback">{this.state.errors.graduation_year}</div>
					</Form.Group>
                    
                    <Form.Group controlId="formBasicName">
                        <Form.Label><span className="form__icon"><HiOutlineUserGroup/></span>Field Of Study</Form.Label>
                            <div><Select name="field" options={fields} className="basic-multi-select" value={this.state.about.field} onChange={this.handleSelectField} classNamePrefix="select"/></div>
                    </Form.Group>
					<Form.Group controlId="formBasicEmail">
                        <Form.Label><span className="form__icon"><MdDescription/></span>Tell us about  yourself</Form.Label>
                            <textarea name="description" rows={3} className="form-control"  value={this.state.about.description} placeholder="Briefly describe yourself" onChange={this.handleAboutChange} />
                    </Form.Group>
					<Form.Group controlId="formBasicEmail">
                        <Form.Label><span className="form__icon"><MdDescription/></span>Change Profile Picture</Form.Label>
                            <div><input type="file" name="image"  onChange={this.handleImageUpload} /></div>
							<div className="invalid__feedback">{this.state.errors.image}</div>
                    </Form.Group>

                </Form>
            </ModalBody>
            <ModalFooter style={{backgroundColor: 'lightgray'}}>
                <Button onClick={this.handleSubmit} color='info'><span className='fa fa-paper-plane mr-3' />Submit</Button>
                <Button color='danger' onClick={() => this.changeModalState()}>Cancel</Button>
            </ModalFooter>
        </Modal>
		)
	}


	renderInterestList() {
		let { interests } = this.props.user.user;
		interests = interests.map(({interest, voteCount})=> {
			let interestId = interest
			interest = interest.replaceAll('-',' ');
			return {interestId , interest, voteCount};
		})
		
		return interests.map((interestObj,key) => {
			return (
				<Link to={"/spaces/"} className="interests__button" key={key}>
					<span className="">{interestObj.interest}</span>
					{/* <span className="interest__count">{interestObj.voteCount}</span> */}
				</Link>
			);
		});
	}
	
	
	renderAbout() {
		const { user } = this.props.user;
		const { about } = user;
		return (
			<>
				<div className="user__info">
					<Row>
						<h4>About</h4>
					</Row>
					<Row className="user__info--each">
						<span className="user__icon">
							<MdDescription />
						</span>
						<span className="info__title">Description: </span>
						<span className="info__description">{about.description}</span>
					</Row>
					
					<Row className="user__info--each">
						<span className="user__icon">
							<HiOutlineUserGroup />
						</span>
						<span className="info__title">Field: </span>
						<span className="info__description">{about.field}</span>
					</Row>
					<Row className="user__info--each">
						<span className="user__icon">
							<SiGooglescholar />
						</span>
						<span className="info__title">PEC Graduation Year: </span>
						<span className="info__description"> {about.graduation_year}</span>
					</Row>
					{/* <Row className="user__info--each">
						<span className="user__icon">
							<FaRegSmile />
						</span>
						<span className="info__title">Fun Fact: </span>
						<span className="info__description">{about.fun_fact}</span>
					</Row> */}
				</div>

				<div className="user__info">
					<Row>
						<h4>Interests</h4>
					</Row>
					<Row>{this.renderInterestList()}</Row>
				</div>
			</>
		);
	
	
	
	}
	

	renderQuestionArray = (questions)=>{
		return questions.map((question, key)=>{
			if(question.author._id===this.props.auth.userId){
				return <Questions question={question} 
					answers={this.props.answers} 
					reactions={this.props.reactions} 
					deleteQuestion = {this.props.deleteQuestion}
					key={key}
					valu ={key}/>
			}
			return; 
		})

	}
	renderQuestions(){
		const questions = this.props.questions
		if(questions&&questions.length>0){
			return(
				<div className="profile__section">
				<h2>Questions</h2>
					{this.renderQuestionArray(questions)||<p>  You have not asked any question till now</p>}
				</div>
			)
		}else{
			return(
				<div className="profile__section">
				<h2>Questions</h2>
				<p>  You have not asked any question till now</p>
				</div>
			)
		}
		

	}
	renderBlogArray = (blogs)=>{
		return blogs.map((blog, key)=>{
			if(blog.author._id===this.props.auth.userId){
				return <Blogs blog={blog} 
					breactions={this.props.breactions}
					deleteBlog = {this.props.deleteBlog}
					key={key}
					valu ={key}/>
			}
			return; 
		})
	}
	renderBlogs(){
		const { blogs } = this.props;
		if(blogs.length>0){
			return(
				<div className="profile__section">
					<h2>Blogs</h2>
					{this.renderBlogArray(blogs)||<p>You have not posted any blog</p>}

				</div>
			)
		}else{
			return(
				<div className="profile__section">
					<h2>Blogs</h2>
					<p>You have not posted any blog</p>
				</div>
			)
		}
	}
	renderAnswerArray = (answers)=>{
		return answers.map((answer, key)=>{
			if(answer.author._id===this.props.auth.userId){
				let quesId = answer.question._id; 
				let heading=answer.question.heading
				let ques = {quesId, heading}
				return <Answers answer = {answer}
								question = {ques}
								valu = {key}
								key={key}
								deleteAnswer = {this.props.deleteAnswer}
							/>	

			}
		})
	}
	renderAnswers=()=>{
		const {answers} = this.props;
		if(answers.length){
			return(
				<div className="profile__section">
					<h2>Answers</h2>
					{this.renderAnswerArray(answers)||<p>You have not answered any question</p>}
				</div>
			)
		}else{
			return(
				<div className="profile__section">
					<h2>Answers</h2>
					<p>You have not answered any question</p>
				</div>
			)
		}
	}

	renderBlogDemandsArray = (blogDemands)=>{
		console.log(blogDemands);
		return blogDemands.map((blogDemand, key)=>{
			if(blogDemand.author._id === this.props.auth.userId){
				return <BlogDemands blogDemand = {blogDemand}
								auth= {this.props.auth}
								deleteBlogDemand = {this.props.deleteBlogDemand}
							/>	

			}
		})
		
	}

	renderBlogDemands=()=>{
		const {blogDemands} = this.props;
		if(blogDemands&&blogDemands.length){
			return(
				<div className="profile__section">
					<h2>Blog Demands</h2>
					{this.renderBlogDemandsArray(blogDemands)||<p>You have no pending blog demand</p>}
				</div>
			)
		}else{
			return(
				<div className="profile__section">
					<h2>Blog Demands</h2>
					<p>You have no pending blog demand</p>
				</div>
			)
		}
	}
	renderNavigation(){
		return(
			<div className="user__navigation">
				<Row>
					<Link to="#" active={this.state.showAbout} onClick={this.activateAbout}className="user__navigation--link">
						About
					</Link>
					<Link to="#" onClick={this.activateQuestions} className="user__navigation--link">
						Questions
					</Link>
					<Link to="#" onClick={this.activateAnswers} className="user__navigation--link">
						Answers
					</Link>
					<Link to="#" onClick={this.activateBlogs} className="user__navigation--link">
						Blogs
					</Link>
					<Link to="#" onClick={this.activateBlogDemand} className="user__navigation--link">
						Blogs Demands
					</Link>
				</Row>
			</div>
		)
	}
	
	render() {
		if (this.props.user.isLoading) {
			return <Loading type="spokes" color="grey" />;
		} else if (this.props.user.errMess) {
			return (
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h4>{this.props.user.errMess}</h4>
						</div>
					</div>
				</div>
			);
		}
		const { user } = this.props.user;
		let url=baseUrl+"users/"+this.state.user+"/image";	

		return (
			<>
			<div>
				<section className="top_section">
					<Container>
						<Row>
							<Col md={1}></Col>

							<Col md={10}>
								<Breadcrumb className="mb-5 page__navigation__breadCrump">
									<BreadcrumbItem>
										<Link to="/home">Home</Link>
									</BreadcrumbItem>
									<BreadcrumbItem active>Profile</BreadcrumbItem>
										{/************--ADD CONDITION FOR OTHER USER LEFT--***************************/}
								</Breadcrumb>
								
								<div className="profile__header">
									<Row>
										<Col xs={8} className="profile__header__column">
											<Row>
												<Image
													src={url} onError={this.setAlternateImage}
													className="user__profile__pic"
													roundedCircle
												/>
											</Row>
											<Row>
												<div className="user__profile__name">
													<Row><h3>{user.name}</h3></Row>
													<Row>@{user.user_name}</Row>
												</div>
											</Row>
										</Col>
										<Col xs={4} className="profile__header__column">
										{this.state.owner===this.state.user && <Row>
											<div className="user__posts__details">
												<Row>
													<span className="user__icon">
														<FaQuestionCircle />
														<span className="icon__title"> {this.props.questionsCount} questions</span>
													</span>
												</Row>

												<Row>
													<span className="user__icon"><RiQuestionAnswerFill />
														<span className="icon__title">  {this.props.answersCount} answers</span>
													</span>
												</Row>
												
												<Row>
													<span className="user__icon"><FaBlog />
														<span className="icon__title"> {this.props.blogsCount} blogs</span>
													</span>
												</Row>
										
												
												<Row>
													<span className="user__icon"><FaBlog />
														<span className="icon__title"> {this.props.blogDemandCount} blogs demands</span>
													</span>
												</Row>
											</div>
										</Row>}

									<Row>{this.state.owner===this.state.user && <div className="user__account__buttons">
												<Row>
													<button className="user__btn userbtn--2" onClick={this.updateProfile}>Update Details</button>
												</Row>
											</div>
										}
									</Row>
							</Col>
						</Row>
					</div>
								{this.state.isAuth && this.renderNavigation()}
								{this.state.showAbout && this.renderAbout()}
								{this.state.isAuth&&this.renderUpdateModal()}
								{this.state.isAuth&&this.state.showQuestions && this.renderQuestions()}
								{this.state.isAuth&&this.state.showAnswers && this.renderAnswers()}
								{this.state.isAuth&&this.state.showBlogs && this.renderBlogs()}
								{this.state.isAuth&&this.state.showBlogDemands && this.renderBlogDemands()}
							</Col>
							<Col md={1}></Col>
						</Row>
					</Container>
					<ToastContainer
					/>
				</section>
			</div>
			</>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		spaces: state.spaces.spaces,
		user:state.user,
		auth:state.auth,
		questions:state.userQuestions.questions.questions,
		questionsCount: state.userQuestions.questions.count,
		answers: state.userAnswers.answers.answers,
		answersCount:state.userAnswers.answers.count,
		blogs:state.userBlogs.blogs.blogs,
		blogsCount:state.userBlogs.blogs.count,
		blogDemands: state.userBlogDemands.blogDemands.blogDemands,
		blogDemandCount:state.userBlogDemands.blogDemands.count,
		qreactions: state.qreactions.qreactions,
		updatedUser: state.updateUser
	};
};

export default connect(mapStateToProps, { fetchUser, deleteQuestion, deleteBlogDemand, deleteBlog, updateUser, userBlogDemands, 
	deleteAnswer, userQuestions, userAnswers, userBlogs })(profile);
