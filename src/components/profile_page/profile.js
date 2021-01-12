import React, { Component } from 'react'
import {Container, Row, Col, Image} from 'react-bootstrap';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import profilePic from '../../Images/profile_pic.png';
import {RiQuestionAnswerFill} from 'react-icons/ri';
import {HiOutlineUserGroup} from 'react-icons/hi';
import {FaBlog,FaQuestionCircle} from 'react-icons/fa';

import {Link} from 'react-router-dom';
import './profile.css';
import About from'./about';
class profile extends Component {
    render() {
        return (
            <div>
                <section className="top_section">
                    <Container>
                        <Row>
                            <Col md={3}>
                                LeftSidebar
                            </Col>
                            
                            <Col md={9}>
                                <Col xs={6} sm={5} md={5}>
                                    <Breadcrumb className='mb-5'>
                                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                                        <BreadcrumbItem active>My Profile</BreadcrumbItem>
                                    </Breadcrumb>
                                </Col>
                                
                                <div className="profile__header">
                                    <Row>
                                        <Col xs={8} className="profile__header__column">
                                            <Row>
                                                <Image src={profilePic} className="user__profile__pic" roundedCircle />        
                                            </Row>
                                            <Row>
                                                <div className="user__profile__name">
                                                <Row><h3>Jordan Wills</h3></Row>
                                                <Row>@ Jordanian</Row>
                                                </div>
                                            </Row>
                                        </Col>
                                        <Col xs={4} className="profile__header__column">
                                            <Row>
                                                <div className="user__posts__details">
                                                    <Row>
                                                        <span className="user__icon"><HiOutlineUserGroup/><span className="icon__title"> 315followers</span></span> 
                                                    </Row>
                                                    <Row>
                                                        <span className="user__icon"><RiQuestionAnswerFill/><span className="icon__title">25 answers</span></span>
                                                    </Row>
                                                    <Row>
                                                        <span className="user__icon"><FaBlog/> <span className="icon__title">11 blogs</span></span>
                                                    </Row>
                                                    <Row>
                                                        <span className="user__icon"><FaQuestionCircle/><span className="icon__title">4 questions</span></span>
                                                    </Row>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="user__account__buttons">
                                                    <Row>
                                                        <button className="user__btn userbtn--1">Follow</button>
                                                        {/*If logged In*/}
                                                        {/* <button className="user__btn userbtn--1">Update Profile</button> */}
                                                    </Row>
                                                    <Row>
                                                        <button className="user__btn userbtn--2">Chat Privately</button>
                                                        {/* If logged In */}
                                                        {/* <button className="user__btn userbtn--2">Delete Profile</button> */}
                                                    </Row>
                                                    
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                                
                                <div className="user__navigation">
                                    <Row>
                                        <Link to="#About" className="user__navigation--link">About</Link>
                                        <Link to="#Questions" className="user__navigation--link">Questions</Link>
                                        <Link to="#Answers" className="user__navigation--link">Answers</Link>
                                        <Link to="#Blogs" className="user__navigation--link">Blogs</Link>
                                    </Row>

                                </div>

                                <About/>                    
                            
                            
                            </Col>

                        </Row>
                    </Container>
                    
                    </section>
                </div>
        )
    }
}


export default profile;