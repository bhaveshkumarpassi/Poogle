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
import QuillEditor from './editor';

const spaces = [{value:"Web-Development",label:'Web Development'}, 
    {value:"Android-Development", label:'Android Development'},
    {value:"Digital-Design-(ECN 103)", label:'Digital Design-(ECN 103)'},
    {value:"Analog-Electronic-Circuits-I-(ECN-102)", label: 'Analog Electronic Circuits-I-(ECN-102)'},
    {value:"Analog-Electronic-Circuits-II-(ECN-102)", label: 'Analog Electronic Circuits-II-(ECN-102)'},
    {value:"Communication-Engineering-(ECN-201)", label:"Communication Engineering (ECN 201)"},
    {value:"Signal-and-Systems", label:"Signal and Systems"},
    {value:"VLSI-Design-(ECN-208)", label:"VLSI Design (ECN 208)"},
    {value:"Embedded-Systems-(ECN-305)", label:"Embedded Systems (ECN 305)"},
    {value:"Control-Systems-(ECN-401)", label:"Control Systems (ECN 401)"},
    {value:"HDL-based-system-Design-(ECN-411)", label:"HDL based system Design (ECN 411)"},
    {value:"Foundations-of-VLSI-CAD-(ECN-416)", label:"Foundations of VLSI CAD (ECN 416)"},
    {value:"Arduino", label:"Arduino"},
    {value:"IOT", label:"IOT"},
    {value:"Rasberry-Pi", label:"Rasberry Pi"},
    {value:"Robotics", label:"Robotics"}];

class addQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          description: '',
          title:'',
          category:[],
         files:[],
          errors:{
            description:'',
            category:'',
            title:''
          }


       } 
        this.handleEditorChange = this.handleEditorChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this);
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
      this.setState({ category:category })
      }
      
      handleEditorChange(value) {
        console.log(this.state.description)
        this.setState({ description: value })
      }

      handleFileChange(files) {
        this.setState({ files: files});
      }

      handleSubmit(event){
        event.preventDefault();
        const isValid = this.formValidation();
        console.log(this.state);
        
        if(isValid){
            window.alert("Form Submitted");
            
            var tagNames = [];
            var tagIds = [];
            var len = this.state.category.length;
             for(var i=0;i<len;i++)
            {
              tagNames.push(this.state.category[i].label);
              tagIds.push(this.state.category[i].value);
            }
            const newQuestion = {
              heading: this.state.title,
              tagNames: tagNames,
              tagIds: tagIds,
              description: this.state.description,
              author: this.props.auth.userId
            };

            this.props.postQuestion(newQuestion, this.state.token);
        }
        //console.log(this.state);
      }
      
      formValidation = () =>{
        const{title, category,description} = this.state;
        let titleError="", categoryError = "", descriptionError="", error;
        if(!title.trim()){
            titleError = "Title is required";
            error = true;            
        }

        if(!category.length){
          categoryError = "You must select at least one category";
          error = true;            
        }

        /*if(!category.trim()){
          categoryError = "You must select at least one category";
          error = true; 
        }*/
        
        if(!description.trim()|| !description.trim().length || description==="<p><br></p>"){
          descriptionError = "Description is required";
          error = true;            
        }
        
        this.setState(prevState => ({
            errors:{
                title:titleError,
                description: descriptionError,
                category:categoryError
            }
        }))
        
        return !error;
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
                                <BreadcrumbItem active>Add Question</BreadcrumbItem>
                            </Breadcrumb>
                        </Row>
                        <div>
                          <Jumbotron className='form-jumbotron'>
                            <Form>
                              <Form.Group controlId="formBasicEmail">
                                <Form.Label><span className="form__icon"></span>Title</Form.Label>
                                  <input name="title" className="form-control" type="text" value={this.state.title} placeholder="Enter Title" onChange={this.handleInputChange} />
                                    <div className="invalid__feedback">{this.state.errors.title}</div>
                              </Form.Group>

                              <Form.Group controlId="formBasicDropdown">
                                {/* <Form.Label><span className="form__icon"></span>Title</Form.Label>
                                  <input name="category" className="form-control" type="text" value={this.state.category} placeholder="Enter Category" onChange={this.handleInputChange} />
                                    <div className="invalid__feedback">{this.state.errors.category}</div> */}
                                <Form.Label><span className="form__icon"></span>Choose Category</Form.Label>
                                <div><Select isMulti name="category" options={spaces} className="basic-multi-select" value={this.state.category} onChange={this.handleMultiSelectChange} classNamePrefix="select"/></div>
                                <div className="invalid__feedback">{this.state.errors.category}</div>
                              </Form.Group>

                              <Form.Group>
                                <Form.Label><span className="form__icon"></span>Describe Here</Form.Label>
                                <ReactQuill theme="snow"  value={this.state.description} onChange={this.handleEditorChange} 
                                  style={{backgroundColor: 'white'}} modules={this.modules} formats= {formats}/>
                                  {/* <QuillEditor
                                    placeholder={"Start Posting Something"}
                                    onEditorChange={this.handleEditorChange}
                                    onFilesChange={this.handleFileChange}
                                  /> */}
                                  <div className="invalid__feedback">{this.state.errors.description}</div>
                              </Form.Group>
                              <Button onClick={this.handleSubmit} variant="info"><span className='fa fa-paper-plane mr-3' />Submit</Button>
                            </Form>
                          </Jumbotron>
                        </div>
                </Col>
                </Container>
            
          </div>
        )
      }
}
export default addQuestions