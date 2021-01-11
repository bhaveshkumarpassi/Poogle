import React, { Component } from 'react'
import {Container, Row, Col, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './profile.css';
import {HiOutlineUserGroup} from 'react-icons/hi';
import {FaBriefcase,FaRegSmile, FaBuilding} from 'react-icons/fa';
import {SiGooglescholar} from 'react-icons/si';
import {MdDescription} from 'react-icons/md';
class about extends Component {
    render() {
        return (
            <>
                <div className="user__info">
                                   <Row><h4>About</h4></Row>
                                   <Row className="user__info--each">
                                        <span className="user__icon"><MdDescription/></span>
                                        <span className="info__title">Description: </span>
                                        <span className="info__description"> 
                                             I want to become a Koala and sleep all the day
                                        </span>
                                    </Row>
                                    <Row className="user__info--each">
                                        <span className="user__icon"><FaBriefcase/></span>
                                        <span className="info__title">Job:</span>
                                        <span className="info__description"> 
                                            Software Engineer at Facebook
                                        </span>
                                    </Row>
                                    <Row className="user__info--each">
                                        <span className="user__icon"><FaBuilding/></span>
                                        <span className="info__title">Education: </span>
                                        <span className="info__description"> 
                                            Masters in Data Science, Standford University
                                        </span>
                                    </Row>
                                    <Row className="user__info--each">
                                        <span className="user__icon"><HiOutlineUserGroup/></span>
                                        <span className="info__title">Field: </span>
                                        <span className="info__description"> 
                                             Computer Science and Engineering
                                        </span>
                                    </Row>
                                    <Row className="user__info--each">
                                        <span className="user__icon"><SiGooglescholar/></span>
                                        <span className="info__title">PEC Graduation Year: </span>
                                        <span className="info__description"> 
                                             2012
                                        </span>
                                    </Row>
                                    <Row className="user__info--each">
                                        <span className="user__icon"><FaRegSmile/></span>
                                        <span className="info__title">Fun Fact: </span>
                                        <span className="info__description"> 
                                            I am graduated from IIT Chandigarh
                                        </span>
                                    </Row> 
                                </div>
                            
                            
                                <div className ="user__info">
                                    <Row><h4>Interests</h4></Row>
                                    <Row>
                                        <Link to="" className="interests__button">
                                            Artificial Intelligence
                                        </Link>
                                        <Link to="" className="interests__button">
                                            Data Science
                                        </Link>
                                        <Link to="" className="interests__button">
                                            Parallel Computing
                                        </Link>
                                        <Link to="" className="interests__button">
                                            Cloud computing
                                        </Link>
                                        <Link to="" className="interests__button">
                                            Computer Science
                                        </Link>
                                        <Link to="" className="interests__button">
                                            Research
                                        </Link>
                                        <Link to="" className="interests__button">
                                            Cricket
                                        </Link>
                                        <Link to="" className="interests__button">
                                            Music
                                        </Link>
                                        <Link to="" className="interests__button">
                                            Dancing
                                        </Link>
                                    </Row>
                                </div>
            </>
        )
    }
}

export default about;