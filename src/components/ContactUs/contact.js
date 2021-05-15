import React, { Component } from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import {AiOutlineMail} from 'react-icons/ai';
import {BsPencilSquare} from 'react-icons/bs';
import './contact.css';
import { connect } from 'react-redux';
import {contactUs} from '../../redux/ActionCreators';
import { ToastContainer, toast } from 'react-toastify';
class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            message:"", 
            errors:{
                email:"",
                message:"", 
                submissionError:null
            },
            validated:false
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
    notifyS = (message) => toast.success(message);
    notifyF = (message) => toast.error(message);
    
    formValidation = () =>{
        const{email, message} = this.state;
        let emailError="", messageError = "", error;
        if(!email){
            emailError = "Email is required";
            error = true;            
        }
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
        {
            emailError = "Email address is Invalid";
            error= true;
        }
        if(!message.trim())
        {
            messageError="Message is required"
            error= true;
        }
        
        this.setState(prevState => ({
            errors:{
                email:emailError,
                message: messageError
            }
        }))
        return !error;
    }
    handleSubmit(event) {
        event.preventDefault();
        const isValid = this.formValidation();
        this.setState({
            validated:isValid
        })
        if(isValid){
            try{
                const {email, message} = this.state;
                this.props.contactUs({email, message})
                this.notifyS("Your response has been recorded successfully.")
            }catch(e){
                this.notifyF("Some error occured.");
            }
            
        }
        console.log(this.state);
        
    }
    componentDidMount(){
        if(this.props.auth){
            this.setState({
                email:this.props.auth.email
            })    
        }
        

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
                    
                    <div>
                        <p className="contact__text info-text">
                        We strongly believe in improving our products and services. Any queries, feedback or suggestion are more than welcome.
                        Please feel free to fill the given form and write to us. It will really help us to improve.
                        </p>
                    </div>
                    <br/>
                    <div>
                        <Jumbotron className="form__content__div">
                            <Form validated={this.state.validated}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label><span className="form__icon"><AiOutlineMail/></span>Email address</Form.Label>
                                    <input name="email" className="form-control" type="email" value={this.state.name} placeholder="Enter email" onChange={this.handleInputChange} />
                                    <div className="invalid__feedback">{this.state.errors.email}</div>
                                </Form.Group>

                                <Form.Group controlId="formBasicTextbox">
                                    <Form.Label><span className="form__icon"><BsPencilSquare/></span> Message</Form.Label>
                                    <textarea name="message" rows={5} className="form-control"  value={this.state.name} placeholder="Enter your queries/ suggestions here" onChange={this.handleInputChange} />
                                    <div className="invalid__feedback">{this.state.errors.message}</div>
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
                <ToastContainer/>
                
            </div>
        )
    }
}
const mapStateToProps = (state)=> {
    return {auth: state.auth.user};
}
// export default connect(mapStateToProps, {})(Contact);
export default connect(mapStateToProps,{contactUs}) (Contact);
