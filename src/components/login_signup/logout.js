import React, { Component } from 'react'
import {Container, Row, Col, Image} from 'react-bootstrap';
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import {AiOutlineMail} from 'react-icons/ai';
import {RiLockPasswordFill} from 'react-icons/ri';
import './login_signup.css';
import GoogleIcon from '../../Images/google_color.svg';
import FacebookIcon from '../../Images/facebook_color.svg';
import {logOut} from '../../redux/ActionCreators';
import {connect} from 'react-redux';


class Logout extends Component {
    constructor(props){
        super(props);
        this.state = {
            message:"",
            isSignedIn:this.props.isSignedIn,
            token:this.props.token
        }
        
    }

    componentDidMount(){
        let message="";
        if(this.state.isSignedIn){
            this.props.logOut({token:this.state.token});
            message = "Logout req sent. Hope it gets accepted soon." 
        }
        else{
            message = "Are you kidding me? You are not logged In"
        }
        this.setState({
            message
        })

    }

    handleSubmit=(event)=> {
        //this.props.logOut({email, password});
    }

    render() {
        return (
            <div className="forms__section">
                {console.log(this.state)}
                <Container>
                    <Col md={9} className="contact__main__content">
                        <Row>
                            <Breadcrumb className="mb-4 page__navigation__breadCrump">
                                <BreadcrumbItem>
                                    <Link to="/home">Home</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>Logout</BreadcrumbItem>
                            </Breadcrumb>            
                        </Row>
                        <div>

                            <h2>{this.state.message}</h2>

                        </div>
                    </Col>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {isSignedIn:state.auth.isSignedIn, 
            token: state.auth.token};
}
export default connect(mapStateToProps,{logOut})(Logout);
