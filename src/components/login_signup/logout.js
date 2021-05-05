import React, { Component } from 'react'
import {Container, Row, Col, Image} from 'react-bootstrap';
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

import {Link} from 'react-router-dom';

import './login_signup.css';

import Logout1 from '../../Images/logout1.jpg'
import Logout2 from '../../Images/logout2.jpg'
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
            this.props.history.push('home');

            message = "Logging You out ..... " 
        }
        else{
            message = "Quite Clever hann !!"
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
                        {this.state.message === 'Quite Clever hann !!'
                        ?
                        <Image src={Logout1} width='100%' height='auto' />
                        :
                        <Image src={Logout2} width='100%' height='auto' />
                        }
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
