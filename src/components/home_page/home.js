import React, { Component } from "react";
import questionMan from "../../Images/question.jpg";
import Blog from '../../Images/blog.png'
import Chat from '../../Images/chat1.png'
import signupBG from '../../Images/addJob.jpg';
import { Row, Col, Image } from "react-bootstrap";
import {
  Jumbotron,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import "../followed-spaces/Spaces.css";
import "./home.css";
import "../all_ques_page/questions.css";

class home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {

			return (
				<div>	
          			<div>
						<div 
							className='row mt-0 justify-content-center' style={{
							backgroundImage : `url(${signupBG})`,
							backgroundSize : "cover",
							padding : "5%",
							marginTop:'3rem',
							marginBottom: '3rem',
							borderRadius:'0.8px'
						}}>
						<Jumbotron style={{opacity:0.9}} mt-2 mr-2>
							<div>
							<Row>
							<h4 className="display-8" style={{marginLeft: '1rem', marginRight: '1rem', fontStyle:'oblique',fontWeight:'bolder',color:'black'}}>POOGLE-Personalized Quora for PEC</h4>
							</Row>
							<Row>
							<p className="lead info-text">
								Poogle aims at providing Quora-like features to Pecobians. It has personalized spaces designed for the essential subjects of each branch at PEC to help students out when they need it. 
								You can interact with other members by posting questions, answers, comments, blogs, upvotes and downvotes and alot more. 
							</p>
							</Row>
							{!this.props.auth.isSignedIn
							?
							<div>
							<hr className="my-2" />
							<p className='info-text'>So to ease out the learning process of your college life join Poogle!!.</p>
							<p className="lead">
								<Button color="primary" to="/login"><span className='fa fa-lg fa-sign-in mr-2 ml-2' /><Link to="/Login"><b style={{color:'white'}}>Login</b></Link></Button>
							</p>
							</div>
							:
							<div></div>
  							}
							</div>
						</Jumbotron>
					</div>
					<div 
							className='row mt-0 justify-content-center' style={{
							backgroundImage : `url(${questionMan})`,
							backgroundSize : "cover",
							padding : "5%",
							marginTop:'4rem',
							marginBottom: '4rem',
							//marginLeft: '3rem',
							//marginRight: '3rem',
							borderRadius:'0.8px'
						}}>
						<Jumbotron style={{opacity:0.9}} mt-2 mr-2>
						<Col sm={12} className="mainsection__row">
									<h2 id="main_text">
										Have a Question?
										<br />
										<br />
									</h2>

									<h4>We've got you covered</h4>
									<br/>
									<h7 className='dev-name' >EPXPLORE EXISTING QUESTIONS OR</h7>
									<br />
									<br/>
									<Link to='/addQUestion'>
									<button className="header__btn__link btn--text btn--scroll-to">
										Ask Here&rarr;{" "}
									</button>
									</Link>
								</Col>
						</Jumbotron>
					</div>
					<div 
							className='row mt-0 justify-content-center' style={{
							backgroundImage : `url(${Blog})`,
							backgroundSize : "cover",
							padding : "5%",
							marginTop:'4rem',
							marginBottom: '4rem',
							//marginLeft: '3rem',
							//marginRight: '3rem',
							borderRadius:'0.8px'
						}}>
						<Jumbotron style={{opacity:0.9}} mt-2 mr-2>
						<Col sm={12} className="mainsection__row">
									<h2 id="main_text">
										Didn't get the concept?
										<br />
										<br />
									</h2>

									<h4>We've got you covered</h4>
									<br/>
									<h7 className='dev-name' >EPXPLORE EXISTING BLOGS ON THE TOPIC OR</h7>
									<br />
									<br/>
									<Link to='/blogDemands'>
									<button className="header__btn__link btn--text btn--scroll-to">
										Add Blog Demand&rarr;{" "}
									</button>
										</Link>
								</Col>
					
						</Jumbotron>
					</div>
					<div 
							className='row mb-6 justify-content-center' style={{
							backgroundImage : `url(${Chat})`,
							backgroundSize : "cover",
							padding : "5%",
							marginTop:'0rem',
							marginBottom: '5rem',
							//marginLeft: '3rem',
							//marginRight: '3rem',
							borderRadius:'0.8px'
						}}>
						<Jumbotron style={{opacity:0.9}} mt-2 mr-2>
						<Col sm={12} className="mainsection__row">
									<h2 id="main_text">
										Do you need assistance?
										<br />
										<br />
									</h2>

									<h4>We've got you covered</h4>
									<br/>
									<h7 className='dev-name' >CHAT WITH PROFICIENT MEMBERS OF THAT TOPIC</h7>
									<br />
									<br/>
									<Link to='/chat'>
									<button className="header__btn__link btn--text btn--scroll-to">
										Chat&rarr;{" "}
									</button>
										</Link>
								</Col>
	
						</Jumbotron>
					</div>
					</div>
						
			</div>
			);
		}
	}

export default home;
