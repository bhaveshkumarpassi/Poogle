import React, { Component } from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import {AiOutlineMail} from 'react-icons/ai';
import {BsPencilSquare} from 'react-icons/bs';
import './contact.css';
class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            feedback:""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }
    
    
    render() {
        return (
            <div className="contact__section">
                <Container>
                    <Col md={9} className="contact__main__content">
                    <Row>
						<Breadcrumb className="mb-4 page__navigation__breadCrump">
							<BreadcrumbItem>
								<Link to="/home">Home</Link>
							</BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
						</Breadcrumb>
						
                    </Row>
                    {/* <Row className="page__heading">
                        <h2>Contact Us</h2>
                    </Row> */}
                    <div>
                        <p className="contact__text">
                        We strongly believe in improving our products and services. Any queries, feedback or suggestion are more than welcome.
                        Please feel free to fill the given form and write to us. It will really help us to improve.
                        </p>
                    </div>
                    <br/>
                    <div>
                    <Jumbotron className="form__content__div">
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label><span className="form__icon"><AiOutlineMail/></span>Email address</Form.Label>
                                    <input name="email" className="form-control" type="email" value={this.state.name} placeholder="Enter email" onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicTextbox">
                                    <Form.Label><span className="form__icon"><BsPencilSquare/></span> Queries/ Suggestions</Form.Label>
                                    <textarea name="feedback" className="form-control"  value={this.state.name} placeholder="Enter your queries/ suggeestions here" onChange={this.handleInputChange} />
                                </Form.Group>
                                <div className="form__btn">
                                    <button className="btn contact__form__button" type="submit" onClick={this.handleSubmit}>
                                        Submit
                                    </button>
                                </div>
                            </Form>
                    
                        </Jumbotron>
                    </div>
                    </Col>
                </Container>
                
                
            </div>
        )
    }
}
export default Contact;
