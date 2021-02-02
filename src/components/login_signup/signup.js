import React, { Component} from 'react'
import {Container, Row, Col,Image} from 'react-bootstrap';
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import './login_signup.css';
import Select from 'react-select'
import GoogleIcon from '../../Images/google_color.svg';
import FacebookIcon from '../../Images/facebook_color.svg';
import {FaUserAlt, FaRegCalendarAlt} from 'react-icons/fa'
import {AiOutlineMail} from 'react-icons/ai';
import {RiLockPasswordFill} from 'react-icons/ri';
import {FiUserPlus} from 'react-icons/fi';
import { SiGooglescholar } from "react-icons/si";
import { MdDescription } from "react-icons/md";
import {GiSelfLove} from 'react-icons/gi';
import { HiOutlineUserGroup } from "react-icons/hi";
import {signUp} from '../../redux/ActionCreators';
import {connect} from 'react-redux';


const spaces = [{value:'AI',label:'Artificial Intelligence'}, 
    {value:'Frontend', label:'Frontend'}, 
    {value:'Backend', label:'Backend'}];

const fields = [{value:'Computer Science', label:'Computer Science'}, 
        {value:'Electrical Engineering', label:'Electrical Engineering'}, 
        {value:'Electronics and Communiaction',label:'Electronics and Communiaction' }, 
        {value:'Mechanical Engineering', label:'Mechanical Engineering' }, 
        {value:'Aerospace Enngineering', label:'Aerospace Enngineering'}, 
        {value:'Civil Engineering', label:'Civil Engineering'},
        {value:'Production Engineering', label:'Production Engineering'},
        {value:'Metallurgy Engineering', label:'Metallurgy Engineering'}]


class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentStep: 1,
            userName:"",
            email:"",
            Uname:"",
            password:"",
            about:{
                graduation_year:"",
                field:"",
                description:""
            },
            interests:"",
            errors:{
                email:"",
                password:"",
                userName:"",
                Uname:"",
                interests:[]
            },
            validated:false
        }
        this._next = this._next.bind(this)
        this._prev = this._prev.bind(this)
    }
    
    handleChange = (event)=> {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
        });
    }
    
    handleAboutChange = (event)=> {
      const target = event.target;
      const name=  target.name;
      this.setState( prevState =>({
        about:{
            ...prevState.about,
            [name]: event.target.value
        }
      })
      )
    }
    
    handleMultiSelectChange = interests => {
    this.setState({ interests });
    }
    
    handleSelectField = field =>{
        this.setState(prevState =>({
            about:{
                ...prevState.about,
                field:field
            }
        }))
    }
    
    
    step1FormValidation = ()=>{
        const{email, password} = this.state;
        let emailError="", passwordError = "", error=false;
        if(!email){
            emailError = "Email is required";
            error = true;            
        }
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)){
            emailError = "Email address is Invalid";
            error= true;
        }
        
        if(!password.trim()){
            passwordError="Password is required"
            error= true;
        }
        else if(password.length<4){
            passwordError="Length of password must be 4 characters or more"
            error= true;
        }

        this.setState(prevState => ({
            errors:{
                email:emailError,
                password: passwordError,
            }
        }))
        
        return !error;

    }

    formValidation = () =>{
        const{userName, Uname,interests} = this.state;
        let UnameError="",interestsError="",userNameError="", error;
        
        if(!Uname.trim()){
            UnameError = "Name is required";
            error = true;
        }

        if(!interests||!interests.length){                   
            interestsError = "You must select one of the interests";
            error = true;
        }

        if(!userName.trim()){
            userNameError = "UserName is required";
            error = true;
        }else if("userName already exists"&&0){//edit it
            userNameError = "This Username is already taken.";
            error=true;
        }
        
        this.setState(prevState => ({
            errors:{
                interests:interestsError,
                Uname:UnameError,
                userName:userNameError
            }
        }))
        
        return !error;
    }
    
    _next(event) {
        event.preventDefault()
        const isValid  = this.step1FormValidation();
        if(isValid){
            let currentStep = this.state.currentStep
            currentStep = currentStep >= 2? 2: currentStep + 1
            this.setState({
            currentStep: currentStep,
            
            })
        }
        
    }
  _prev(event) {
        event.preventDefault()
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1? 1: currentStep - 1
        this.setState({
        currentStep: currentStep
        })
    }

    handleSubmit = (event) => {
    event.preventDefault();
    const isValid  = this.formValidation();
    this.setState({
        validated:isValid
    })
    if(isValid){
        console.log(this.state);
        
        let {email, password, userName, about, Uname, interests} = this.state;
        //modify interests, about into the form they are required          ------LEFT
        interests = interests.map((interest)=>{
            return interest.value
        })
        //intentionally not sending interests and about. Need to add spaces first
        this.props.signUp({name: Uname, user_name:userName, email, password});
        window.alert('Form Submitted ');    
    }
      
    }

      firstPage(){
          let {currentStep} = this.state;
          if(currentStep===1)
          {
              return(
                  <>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label><span className="form__icon"><AiOutlineMail/></span>Email address</Form.Label>
                            <input name="email"  className="form-control" type="email"  placeholder="Enter email" 
                            value = {this.state.email} onChange={this.handleChange}/>
                            <div className="invalid__feedback">{this.state.errors.email}</div>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicPassword">
                            <Form.Label><span className="form__icon"><RiLockPasswordFill/></span>Password</Form.Label>
                            <input name="password" className="form-control" type="password"  placeholder="Enter Password" 
                            value = {this.state.password} onChange={this.handleChange}/>
                            <div className="invalid__feedback">{this.state.errors.password}</div>
                    </Form.Group>
                    <div>
                        
                        <button className="btn contact__form__button"  type="button" onClick={this._next}>Next</button>        
                        
                    </div>

                    <div className="form__other__text">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                                
                    <div className="social-login-label">
                        <span className="label-text">
                            or connect with
                        </span>
                    </div>
                    <div className="social__icons__container">
                        <div className="social__icon__unique">
                            <span className="social__icon">
                                <Link to="#"><Image src={GoogleIcon}/></Link> 
                            </span>
                        </div>
                        <div className="social__icon__unique">
                            <span className="social__icon">
                                <Link to="#"><Image src={FacebookIcon}/></Link> 
                            </span>
                        </div>
                    </div>
                  </>
              )
          }

      }

      secondPage(){
        let {currentStep} = this.state;
        if(currentStep===2)
        {
            return(
                <>
                    <Form.Group controlId="formBasicInput">
                        <Form.Label><span className="form__icon"><FaUserAlt/></span>Name</Form.Label>
                            <input name="Uname"  className="form-control" type="text"  placeholder="Enter name" value = {this.state.Uname} onChange={this.handleChange}/>
                            <div className="invalid__feedback">{this.state.errors.Uname}</div>
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Label><span className="form__icon"><FiUserPlus/></span>UserName</Form.Label>
                            <input name="userName"  className="form-control" type="text"  placeholder="Enter userName" 
                            value = {this.state.userName} onChange={this.handleChange}/>
                            <div className="invalid__feedback">{this.state.errors.userName}</div>
                    </Form.Group>
                    <Form.Group controlId="formBasicInput">
                        <Form.Label><span className="form__icon"><SiGooglescholar/></span>Graduation Year</Form.Label>
                            <input name="graduation_year"  className="form-control" type="text"  placeholder="Enter Year" value = {this.state.about.graduation_year} onChange={this.handleAboutChange}/>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicName">
                        <Form.Label><span className="form__icon"><HiOutlineUserGroup/></span>Field Of Study</Form.Label>
                            <div><Select name="field" options={fields} className="basic-multi-select" value={this.state.about.field} onChange={this.handleSelectField} classNamePrefix="select"/></div>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label><span className="form__icon"><GiSelfLove/></span>Select your Interests</Form.Label>
                        <div><Select isMulti name="interests" options={spaces} className="basic-multi-select" value={this.state.interests} onChange={this.handleMultiSelectChange} classNamePrefix="select"/></div>
                        <div className="invalid__feedback">{this.state.errors.interests}</div>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label><span className="form__icon"><MdDescription/></span>Tell us about  yourself</Form.Label>
                            <textarea name="description" rows={3} className="form-control"  value={this.state.about.description} placeholder="Briefly describe yourself" onChange={this.handleAboutChange} />
                    </Form.Group>
                    
                    <div>
                        <Row>
                        <Col xs={6}>
                            <button className="btn contact__form__button"  type="button" onClick={this.handleSubmit}>Submit</button>
                        </Col>
                        <Col xs={6}>
                            <button className="btn btn-danger"  type="button" onClick={this._prev}>Go Back</button>
                        </Col>
                        </Row>
                    </div>
                    
                    
                </>
            )
        }
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
                        <div>
                            <Jumbotron className="form__content__div form__content__div--login">
                                <br/>
                                <Form>
                                    <span className="form__number"><p>Step {this.state.currentStep} of 2</p></span>
                                    {this.state.currentStep===1 && this.firstPage()}
                                    {this.state.currentStep===2 && this.secondPage() } 
                                </Form>
                            </Jumbotron>
                            
                        </div>
                    </Col>
                </Container>
            </div>
        )
    }
}

export default connect(null,{signUp}) (Signup);
