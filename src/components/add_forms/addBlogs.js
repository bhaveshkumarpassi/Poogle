import React, { Component } from 'react'
import {Container, Row, Col,Button} from 'react-bootstrap';
import { Breadcrumb, BreadcrumbItem, Jumbotron } from "reactstrap";
import {Link} from 'react-router-dom'
import './add_forms.css'
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import ReactQuill from 'react-quill';
import {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import {toolbarOptions, formats} from './text_editorVar';
import ImageCompress from 'quill-image-compress';
Quill.register('modules/imageCompress', ImageCompress);


const spaces = [{value:"Web-Development",label:'Web Development'}, 
    {value:"Android-Development", label:'Android Development'},
    {value:"Physical-Metallurgy-(MTN-102)",label:'Physical Metallurgy (MTN 102)'},
    {value:"Mechanical-Metallurgy-(MTN-303)",label:"Mechanical Metallurgy (MTN 303)"},
    {value:"corrosion-engineering(MTN-433)",label:"Corrosion Engineering (MTN 433)"},
    {value:"Extractive-Metallurgy-For-Nonferrous-Metals(MTN-201)",label:"Extractive Metallurgy For Nonferrous Metals (MTN 201)"},
    {value:"Steel-Making-(MTN-301)",label:"Steel Making (MTN 301)"},
    {value:"Ceramics-and-polymers-(MTN-210)",label:"Ceramics and polymers (MTN 210)"},
    {value:"Metal-casting-(MTN-208)",label:"Metal casting (MTN 208)"},
    {value:"Materials-Toining-Technology-(MTN-305)",label:"Materials Joining Technology (MTN 305)"},
    {value:"Heat-Treatment-(MTN-406)",label:"Heat Treatment (MTN 406)"},
    {value:"Solid-Mechanics(CEN-201)",label:"Solid Mechanics (CEN 201)"},
    {value:"Environmental-Engineering-(CEN-204)",label:"Environmental Engineering (CEN 204)"},
    {value:"Structural-Analysis-(CEN-207)",label:"Structural Analysis (CEN 207)"},
    {value:"Reinforced-Concrete-Design-(CEN-208)",label:"Reinforced Concrete Design (CEN 208)"},
    {value:"Geotechnical-Engineering-(CEN-210)",label:"Geotechnical Engineering (CEN 210)"},
    {value:"Transportation-Engineering-(CEN-203)",label:"Transportation Engineering (CEN 203)"},
    {value:"Design-Of-Steel-Structures-(CEN-301)",label:"Design Of Steel Structures (CEN 301)"},
    {value:"Structural-Analysis-(CEN-303)",label:"Structural Analysis (CEN 303)"},
    {value:"Fluid-Mechanics-(CEN-103)",label:"Fluid Mechanics (CEN 103)"},
    {value:"Building-Materials-Construction-And-Estimation-(CEN-102)",label:"Building Materials Construction And Estimation (CEN 102)"},
    {value:"Internal-Combustion-Engine-(MEN-425)",label:"Internal Combustion Engine (MEN 425)"},
    {value:"Production-And-Operation-Management-(MEN-401)",label:"Production And Operation Management (MEN 401)"},
    {value:"Applied-Thermodynamics-(MEN-209)",label:"Applied Thermodynamics (MEN 209)"},
    {value:"Automobile-Engineering-(MEN-417)",label:"Automobile Engineering (MEN 417)"},
    {value:"Computational-Fluid-Dynamics-For-Thermal-Stream-(MEMS-106)",label:"Computational Fluid Dynamics For Thermal Stream (MEMS 106)"},
    {value:"Dynamics-Of-Machine-(MEN-207)",label:"Dynamics Of Machine (MEN 207)"},
    {value:"Heat-Transfer-(MEMS-106)",label:"Heat Transfer (MEMS 106)"},
    {value:"Refrigration-And-Air-Conditioning-(MEN-210)",label:"Refrigration And Air Conditioning (MEN 210)"},
    {value:"Maintenance-Engineering-(MEN-402)",label:"Maintenance Engineering (MEN 402)"},
    {value:"Mechanical-Measurements-And-Metallurgy-(MEN-416)",label:"Mechanical Measurements And Metallurgy (MEN 416)"},
    {value:"CNC-Machines-And-Programming-(PEN-416)",label:"CNC Machines And Programming (PEN 416)"},
    {value:"Computer-Integrated-Manufacturing-(PEN-301)",label:"Computer Integrated Manufacturing (PEN 301)"},
    {value:"Design-Of-Machine-Elements-(PEN-208)",label:"Design Of Machine Elements (PEN 208)"},
    {value:"Engineering-Analysis-And-Design-(PEN-206)",label:"Engineering Analysis And Design (PEN 206)"},
    {value:"Industrial-Engineering-1-(PEN-210)",label:"Industrial Engineering 1 (PEN 210)"},
    {value:"Introduction-To-Industrial-And-Production-Engineering-(PEN-101)",label:"Introduction To Industrial And Production Engineering (PEN 101)"},
    {value:"Introduction-to-manufacturing-(PEN-102)",label:"Introduction To Manufacturing (PEN 102)"},
    {value:"Kinematic-And-Dynamics-(PEN-201)",label:"Kinematic And Dynamics (PEN 201)"},
    {value:"Machining-Technology-(PEN-211)",label:"Machining Technology (PEN 211)"},
    {value:"Tool-Designing-(PEN-209)",label:"Tool Designing (PEN 209)"},
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


class addBlogs extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          description: '',
          title:'',
          category:[],
          files:[],
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
        toolbar:toolbarOptions,
        imageCompress: {
          quality: 0.7,
          maxWidth: 500,
          maxHeight: 500, 
          imageType: 'image/jpeg', 
          debug: true
        }
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
          

            var tagNames = [];
            var tagIds = [];
            var len = this.state.category.length;
             for(var i=0;i<len;i++)
            {
              tagNames.push(this.state.category[i].label);
              tagIds.push(this.state.category[i].value);
            }
            const newBlog = {
              heading: this.state.title,
              tagNames: tagNames,
              tagIds: tagIds,
              description: this.state.description,
              author: this.props.auth.userId,
              duration:this.state.duration
            };

            this.props.postBlog(newBlog);
        }
      
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

export default addBlogs;