import React, { Component } from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import './login_signup.css';
class signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            
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
            <div className="forms__section">
                <Container>
                    <Col md={9} className="contact__main__content">
                        <Row>
                            <Breadcrumb className="mb-4 page__navigation__breadCrump">
                                <BreadcrumbItem>
                                    <Link to="/home">Home</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>SignUp</BreadcrumbItem>
                            </Breadcrumb>
                        </Row>
                    </Col>
                    <div>
                        
                    </div>
                </Container>
            </div>
        )
    }
}
export default signup
