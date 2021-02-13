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
import { fetchUser } from "../../redux/ActionCreators";
import "./profile.css";
import Loading from "../loading";
import {spaces} from '../variables';
import {Questions, Blogs} from './about'
import {deleteQuestion, deleteBlog} from '../../redux/ActionCreators';
import {AiOutlineMail} from 'react-icons/ai';
import {RiLockPasswordFill} from 'react-icons/ri';
import {FiUserPlus} from 'react-icons/fi';
import {fields} from '../variables';

class profile extends Component {
	constructor(props){
        super(props);
        this.state = {
			owner:this.props.auth.userId,
			user:this.props.match.params.userId,
			showAbout:true,
			showQuestions:false,
			showAnswers:false,
			showBlogs:false,
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
				about:{
					graduation_year:""
				},
				image:""
			}	    
		}       
    }
	componentDidMount() {
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
		let userId;
        if(user){
            userId = user.userId;
        }
		if(reqId){
			if(authId){
				if(!user||userId!=reqId){
					this.props.fetchUser(reqId);
				}
			}else{
				this.props.fetchUser(reqId);
			}
		}
	}
	activateAbout = (e)=>{
		e.preventDefault();
		this.setState({
			showAbout:true,
			showQuestions:false,
			showAnswers:false,
			showBlogs:false	
		})
	}
	activateQuestions = (e)=>{
		e.preventDefault();
		this.setState({
			showAbout:false,
			showQuestions:true,
			showAnswers:false,
			showBlogs:false	
		})
	}
	activateAnswers = (e)=>{
		e.preventDefault();
		this.setState({
			showAbout:false,
			showQuestions:false,
			showAnswers:true,
			showBlogs:false	
		})
	}
	activateBlogs = (e)=>{
		e.preventDefault();
		this.setState({
			showAbout:false,
			showQuestions:false,
			showAnswers:false,
			showBlogs:true	
		})
	}
	handleChange = (event)=> {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
        });
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
        const{password, email,about} = this.state;
		const {graduation_year} = about;
        let emailError="",passwordError="",graduationError="",error;
		if(email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)){
            emailError = "Email address is Invalid";
            error= true;
        }
        if(password.length>0&&password.length<4){
            passwordError="Length of password must be 4 characters or more"
            error= true;
        }
		if(graduation_year<1940 || graduation_year>2055){
			graduationError = "Please enter a valid graduation year";
            error= true;
		}
        this.setState(prevState => ({
            errors:{
                email:emailError,
                password:passwordError,
				about:{
					graduation_year:graduationError
				}
            }
        }))
        
        return !error;
    }
	handleSubmit=(e)=>{
		e.preventDefault();
		const isValid = this.formValidation();
		if(isValid){
			const{email, Uname, password, about}=this.state;
			const{graduation_year, field, description} = about;
			const token = this.props.auth.token;
			let data = {}


		}
		
	}
	handleImageUpload = (e)=>{
		e.preventDefault();
		this.setState({
			image:e.target.files[0]
		})
		console.log(e.target.files[0]);
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
                <Form>
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
							<div className="invalid__feedback">{this.state.errors.about.graduation_year}</div>
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
                    </Form.Group>

                </Form>
            </ModalBody>
            <ModalFooter style={{backgroundColor: 'lightgray'}}>
                <Button onClick={this.handleSubmit} color='info'><span className='fa fa-paper-plane mr-3' />Submit</Button>
                <Button color="danger" onClick={() => this.changeModalState()}>Cancel</Button>
            </ModalFooter>
        </Modal>
		)
	}

	renderButtons=()=>{
		const { user } = this.props.user;
		return (
			<div className="user__account__buttons">
				<Row>
					{/* {this.state.owner===this.state.user && <span className="user__btn userbtn--1"><input type="file"/>Change Pic</span>} */}
					{this.state.owner===this.state.user && <button className="user__btn userbtn--2" onClick={this.updateProfile}>Update Details</button>}
				</Row>
			</div>
		);
	}
	renderMainProfile() {
		const { user } = this.props.user;
		return (
			<div className="profile__header">
				<Row>
					<Col xs={8} className="profile__header__column">
						<Row>
							<Image
								src={profilePic}
								className="user__profile__pic"
								roundedCircle
							/>
						</Row>
						<Row>
							<div className="user__profile__name">
								<Row>
									<h3>{user.name}</h3>
								</Row>
								<Row>@{user.user_name}</Row>
							</div>
						</Row>
					</Col>
					<Col xs={4} className="profile__header__column">
						<Row>
							<div className="user__posts__details">
								<Row>
									<span className="user__icon">
										<RiQuestionAnswerFill />
										<span className="icon__title">  {user.answers.length} answers</span>
									</span>
								</Row>
								<Row>
									<span className="user__icon">
										<FaBlog />
										<span className="icon__title"> {user.blogs.length} blogs</span>
									</span>
								</Row>
								<Row>
									<span className="user__icon">
										<FaQuestionCircle />
										<span className="icon__title"> {user.questions.length} questions</span>
									</span>
								</Row>
							</div>
						</Row>
						<Row>{this.renderButtons()}</Row>
					</Col>
				</Row>
			</div>
		);
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
				<Link to={"/spaces/"+interestObj.interestId} className="interests__button" key={key}>
					<span className="">{interestObj.interest}</span>
					<span className="interest__count">{interestObj.voteCount}</span>
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
		if(questions.length>0){
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
	renderAnswers(){
		const {answers} = this.props.user.user
		if(answers.length){
			return(
				<div className="profile__section">
					<h2>Answers</h2>
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
		return (
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
								{this.renderMainProfile()}
								{this.state.isAuth && this.renderNavigation()}
								{this.state.showAbout && this.renderAbout()}
								{this.state.isAuth&&this.renderUpdateModal()}
								{this.state.isAuth&&this.state.showQuestions && this.renderQuestions()}
								{this.state.isAuth&&this.state.showAnswers && this.renderAnswers()}
								{this.state.isAuth&&this.state.showBlogs && this.renderBlogs()}
							</Col>
							<Col md={1}></Col>
						</Row>
					</Container>
				</section>
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		spaces: state.spaces.spaces,
		user:state.user,
		auth:state.auth,
		questions:state.questions.questions, 
		answers: state.answers.answers,
		blogs:state.blogs.blogs,
		qreactions: state.qreactions.qreactions
	};
};

export default connect(mapStateToProps, { fetchUser, deleteQuestion, deleteBlog })(profile);
