import React, { Component } from 'react'
import {Container, Row, Col,Button} from 'react-bootstrap';
import { Breadcrumb, BreadcrumbItem, Jumbotron } from "reactstrap";
import {Link} from 'react-router-dom'
import './add_forms.css'
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import {toolbarOptions, formats} from './text_editorVar';

const spaces = [{value:'AI',label:'Artificial Intelligence'}, 
    {value:'Frontend', label:'Frontend'}, 
    {value:'Backend', label:'Backend'}];

class addBlogs extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          description: '',
          title:'',
          category:'',
          duration:null,
          errors:{
            description:'',
            category:'',
            title:'',
            duration:null
          }


       } 
        this.handleEditorChange = this.handleEditorChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this)
        this.handleSubmit= this.handleSubmit.bind(this)
    
      }
      modules = {
        toolbar:toolbarOptions
      }
      
      handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: event.target.value
        });
      }
      handleMultiSelectChange = category => {
      this.setState({ category:category });
      }
      
      handleEditorChange(value) {
        this.setState({ description: value })
      }
      handleSubmit(event){
        event.preventDefault();
        const isValid = this.formValidation();
        console.log(this.state);
        
        if(isValid){
            window.alert("Form Submitted");
            window.alert(this.state);
        }
        console.log(this.state);
      }
      
      formValidation = () =>{
        const{title, category,description, duration} = this.state;
        let titleError="", categoryError = "", descriptionError="", durationError="", error;
        if(!title.trim()){
            titleError = "Title is required";
            error = true;            
        }

        if(!category.length){
          categoryError = "You must select at least one category";
          error = true;            
        }
        
        if(!description.trim()||description==="<p><br></p>"){
          descriptionError = "Description is required";
          error = true;            
        }
        
        if(!duration || isNaN(duration) || duration<=0 ){
          durationError = "Duration should be a positive numeric value";
          error = true;
        }
        
        this.setState(prevState => ({
            errors:{
                title:titleError,
                description: descriptionError,
                category:categoryError,
                duration: durationError
            }
        }))
        
        return !error;
    }
      
      
      
      render() {
        return (
            <div className="forms__section">
                <Container>
                <Col md={12} className="contact__main__content">
                        <Row>
                            <Breadcrumb className="mb-4 page__navigation__breadCrump">
                                <BreadcrumbItem>
                                    <Link to="/home">Home</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>Add Blog</BreadcrumbItem>
                            </Breadcrumb>
                        </Row>
                        <div>
                            <Jumbotron className='form-jumbotron'>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                    <Form.Label><span className="form__icon"></span>Title</Form.Label>
                                        <input name="title" className="form-control" type="text" value={this.state.title} placeholder="Give a descriptive title." onChange={this.handleInputChange} />
                                        <div className="invalid__feedback">{this.state.errors.title}</div>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicDropdown">
                                    <Form.Label><span className="form__icon"></span>Choose Category</Form.Label>
                                    <div><Select isMulti name="category" options={spaces} className="basic-multi-select" value={this.state.category} onChange={this.handleMultiSelectChange} classNamePrefix="select"/></div>
                                        <div className="invalid__feedback">{this.state.errors.category}</div>
                                    </Form.Group>

                                    <Form.Group>
                                    <Form.Label><span className="form__icon"></span>Describe content Here</Form.Label>
                                    <ReactQuill 
                                        style={{backgroundColor: 'white'}} theme="snow"  value={this.state.description} onChange={this.handleEditorChange} 
                                        modules={this.modules} formats= {formats}/>
                                        <div className="invalid__feedback">{this.state.errors.description}</div>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                    <Form.Label><span className="form__icon"></span>Read Duration</Form.Label>
                                        <input name="duration" className="form-control" type="text" value={this.state.duration} placeholder="Expected read duration of Blog in minutes." onChange={this.handleInputChange} />
                                        <div className="invalid__feedback">{this.state.errors.duration}</div>
                                    </Form.Group>
                                    <Button className='mt-4' onClick={this.handleSubmit} variant="info"><span className='fa fa-paper-plane mr-3' />Publish Blog</Button>
                            </Form>
                          </Jumbotron>
                        </div>
                
                </Col>
                </Container>
            
          </div>
        )
      }
}
export default addBlogs