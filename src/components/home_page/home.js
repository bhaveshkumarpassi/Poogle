import React, { Component } from 'react'
import questionMan from '../../Images/questionMan3.jpg';
import {Row, Col, Image} from 'react-bootstrap';

import './home.css';
class home extends Component {
    render() {
        return (
            <>
               <div className = "header__title">
                    <Row>
                        <Col sm ={8} className="mainsection__row">
                            <h1 id="main_text">
                                Have a Question?
                                <br/>
                                <br/>
                            </h1>

                            <h4>We've got you covered</h4>
                            <br/>
                            <button className="header__btn__link btn--text btn--scroll-to">Ask Here-> </button>
                        
                        </Col>
                        <Col sm={4}>
                            <div className="header__side__image">
                                <Image src={questionMan} className="header__side__manimage" fluid/>
                            </div>
                        </Col>
                    </Row>

                </div> 
                
                <div>
                    <section className="new_section">


                    </section>
                </div>
            </>
        )
    }
}
export default home;