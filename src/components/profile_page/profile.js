import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import profilePic from "../../Images/profile_pic.png";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaBlog, FaQuestionCircle } from "react-icons/fa";
import { FaBriefcase, FaRegSmile, FaBuilding } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";
import { MdDescription } from "react-icons/md";
import { Link } from "react-router-dom";
import { fetchUser } from "../../redux/ActionCreators";
import "./profile.css";
import Loading from "../loading";

class profile extends Component {
	constructor(props){
        super(props);
        this.state = {
			owner:this.props.auth.userId,
			user:this.props.match.params.userId,
			showAbout:true,
			showQuestions:false,
			showAnswers:false,
			showBlogs:false		    
		}
        
    }
	componentDidMount() {
		if(this.props.auth.userId==this.props.match.params.userId&&!this.props.user.user)
			this.props.fetchUser(this.props.match.params.userId);
		
		// this.props.fetchUser(this.props.auth.userId)
	}
	renderButtons() {

		const { user } = this.props.user;
		return (
			<div className="user__account__buttons">
				<Row>
					{/* <button className="user__btn userbtn--1">Follow</button> */}
					{/*If logged In*/}
					{this.state.owner===this.state.user && <button className="user__btn userbtn--2">Update Profile</button>}
				</Row>
				<Row>
					{/* If logged In */}
					{/* <button className="user__btn userbtn--2">Delete Profile</button> */}
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
										<HiOutlineUserGroup />
										<span className="icon__title"> {user.upvotes} upvotes</span>
									</span>
								</Row>
								<Row>
									<span className="user__icon">
										<RiQuestionAnswerFill />
										<span className="icon__title">{user.answers} answers</span>
									</span>
								</Row>
								<Row>
									<span className="user__icon">
										<FaBlog />{" "}
										<span className="icon__title">{user.blogs} blogs</span>
									</span>
								</Row>
								<Row>
									<span className="user__icon">
										<FaQuestionCircle />
										<span className="icon__title">
											{user.questions} questions
										</span>
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
		// const { interests } = this.props.user.user;
		// const spaces = this.props.spaces;
		// return interests.map((interest) => {
		// 	return (
		// 		<Link to="" className="interests__button" key={interest}>
		// 			{spaces[interest].name}
		// 		</Link>
		// 	);
		// });
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
					<Row className="user__info--each">
						<span className="user__icon">
							<FaRegSmile />
						</span>
						<span className="info__title">Fun Fact: </span>
						<span className="info__description">{about.fun_fact}</span>
					</Row>
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

	renderQuestions(){
		return(
			<>
			<h1>Questions here</h1>
			</>
		)

	}
	renderBlogs(){
		return(
			<>
			<h1>Blogs here</h1>
			</>
		)
	}
	renderAnswers(){
		return(
			<>
			<h1>Answers here</h1>
			</>
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
									<BreadcrumbItem active>My Profile</BreadcrumbItem>
										{/************--ADD CONDITION FOR OTHER USER LEFT--***************************/}
								</Breadcrumb>
								{this.renderMainProfile()}
								<div className="user__navigation">
									<Row>
										<Link to="#About" className="user__navigation--link">
											About
										</Link>
										<Link to="#Questions" className="user__navigation--link">
											Questions
										</Link>
										<Link to="#Answers" className="user__navigation--link">
											Answers
										</Link>
										<Link to="#Blogs" className="user__navigation--link">
											Blogs
										</Link>
									</Row>
								</div>
								{this.renderAbout()}
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
		user: state.user,
		spaces: state.spaces.spaces,
		user:state.user,
		auth:state.auth,
		admin:state.admin
		//remember to check if spaces are avaliable.
	};
};

export default connect(mapStateToProps, { fetchUser })(profile);
