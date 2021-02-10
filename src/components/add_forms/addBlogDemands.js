import React, { Component } from 'react'
import {Container, Row, Col,Button} from 'react-bootstrap';
import { Breadcrumb, BreadcrumbItem, Jumbotron } from "reactstrap";
import {Link} from 'react-router-dom'
import './add_forms.css'
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
//import ReactQuill from 'react-quill';
//import {Quill} from 'react-quill';
//import 'react-quill/dist/quill.snow.css'; 
//import ImageCompress from 'quill-image-compress';
import {spaces} from '../variables'
//Quill.register('modules/imageCompress', ImageCompress);



class addBlogDemands extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          title:'',
          category:[],
          errors:{
            category:'',
            title:'',
          }


       } 
        //this.handleEditorChange = this.handleEditorChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this)
        this.handleSubmit= this.handleSubmit.bind(this)
    
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
      
    //   handleEditorChange(value) {
    //     this.setState({ description: value })
    //   }
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
            const newBlog = {
              title: this.state.title,
              tagNames: tagNames,
              tagIds: tagIds,
              //description: this.state.description,
              author: this.props.auth.userId,
              //duration:this.state.duration
            };

            this.props.postBlogDemand(newBlog);
        }
      
      }
      
      formValidation = () =>{
        const{title, category} = this.state;
        let titleError="", categoryError = "", error;
        if(!title.trim()){
            titleError = "Title is required";
            error = true;            
        }

        if(!category.length){
          categoryError = "You must select at least one category";
          error = true;            
        }
        
        this.setState(prevState => ({
            errors:{
                title:titleError,
                category:categoryError,
            }
        }))
        
        return !error;
    }
      
      
      
      render() {
        return (
            <div className="forms__section">
                <Container>
                <Col md={12} className="contact__main__content">
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

export default addBlogDemands;