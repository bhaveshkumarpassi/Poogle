import React, {Component} from 'react';
import { Card, Button, FormGroup, Label, Input,
    CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardSubtitle, CardImg} from 'reactstrap';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import ReactImageAppear from 'react-image-appear';
import Loading from '../loading';
import {spaces} from '../variables'; 
import { baseUrl } from '../../shared/baseUrl'
import './Spaces.css'
import {ChangeSpaces} from '../../redux/ActionCreators'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


    class Spaces extends Component {

        constructor(props) {

            super(props);

            this.handleSearch = this.handleSearch.bind(this);
            this.state = {

                category:"",
                errors:{
                    category:'',
                  },
                data: [],
            }

            this.arrayHolder = [];
            this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this)
        }

        handleMultiSelectChange = category => {
            this.setState({ category:category })
            }

        handleSearch(event) {
            this.searchFilterFunction(this.searchSpace.value)
            event.preventDefault();
        }

        componentDidMount() {

            this.setState({
                data: this.props.spaces.spaces
            });

            this.arrayHolder = this.props.spaces.spaces
        }


        searchFilterFunction = text => {
        
            const newData = this.arrayHolder.filter(item => {
              const itemData = `${item.name.toUpperCase()}`;
              const textData = text.toUpperCase();
        
              return itemData.indexOf(textData) > -1;
            });
    
            this.setState({
              data: newData,
            });
        };

        notifyS = (message) => toast.success(message);
        notifyF = (message) => toast.error(message);
        notifyI = (message) => toast.info(message);

        handleSubmit = async (event) => {
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
    
                await this.props.postQuestion(newQuestion);

   
            }
          }

        formValidation = () =>{
            const{category} = this.state;
            let categoryError = "", error;
        
            if(!category.length){
              categoryError = "You must select at least one space";
              error = true;            
            }
            this.setState(prevState => ({
                errors:{
                    category:categoryError
                }
            }))
            
            return !error;
        }
        
        handleAddSpace = async(e)=>{
            e.preventDefault();
            const type="follow";
            const token = this.props.auth.token;
            const interests = this.props.auth.interests;
            const userId = this.props.auth.userId;
            let {category} = this.state;
            if(category&&token){
                try{
                    category = category.value;
                    console.log(category);
                    if(category){
                        const data = {token, type, spaceId:category, interests, userId};
                        console.log(data);
                        await this.props.ChangeSpaces(data);

                        if(this.props.auth.postFail)
                            this.notifyF("Some Error occured while updating interests try again.");
                    }
                }catch(e){
                    console.log(e);
                }
            }
        }
        unfollowSpace = async(e)=>{
            if(e)
                e.preventDefault();
            console.log("in");
            const type = "unfollow";
            const spaceId=e.target.value;
            const token = this.props.auth.token;
            const interests = this.props.auth.interests;
            const userId = this.props.auth.userId;
            try{
                if(spaceId&&token){
                    
                    const data = {token, spaceId, type, interests, userId}
                    console.log(data);
                    await this.props.ChangeSpaces(data);

                    if(this.props.auth.postFail)
                        this.notifyF("Some Error occured while updating interests try again.");
                }
            }catch(e){
                console.log(e);
            }
        }

        RenderMenuItem = (space, auth, questions, blogs)=>{
            var blogs=blogs, questions=questions;
            if(questions){
                questions=questions.filter(
                    (question) =>
                        question.tagIds.indexOf(space.stringId) > -1
                );
            }
            if(blogs){
                blogs=blogs.filter(
                    (blog) =>
                        blog.tagIds.indexOf(space.stringId) > -1
                );
            }
    
            return ( 
        
                <Card className='space'>
                <CardBody>
                    <CardTitle tag="h6">{space.name}</CardTitle>
                </CardBody>
                    <CardImg className='space-img' src={baseUrl+'spaces/'+space._id+'/image'}/>
                <CardBody>
                    <CardSubtitle tag="h6" className="mb-2 mt-2 text-muted">
                        <span className='fa fa-question-circle fa-lg question-icon'/>    
                        {questions.length} Questions<Link className='ml-3' style={{textAlign: 'center'}} to={`/spaces/${space._id}/${space.stringId}/questions`}>view</Link>
                    </CardSubtitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                        <span className='fa fa-star mt-3 fa-lg follower-icon'/>    
                        {blogs.length} Blogs<Link className='ml-3' style={{textAlign: 'center'}} to={`/spaces/${space._id}/${space.stringId}/blogs`}>view</Link>
                    </CardSubtitle>
                    <div className='row mt-4'>
                        <Button className='col-12 mt-3' onClick={this.unfollowSpace} value = {space.stringId} color='danger'><span className='fa fa-lg fa-bookmark mr-2 ml-2' />Unfollow</Button>
                    </div>
                </CardBody>
              </Card>
            );
        }
        renderCardList = ()=>{
            return this.state.data.map((space) => {  
                return (
                    <div className="col-12 col-lg-3 col-md-6 col-sm-6 mt-1 mb-4"  key={space._id}>
                        {this.RenderMenuItem(space, this.props.auth, this.props.questions, this.props.blogs)}
                    </div>
                );
            });
        }

        render() {
            

            if (this.props.spaces.isLoading) {
                return(
                    <Loading type='spokes' color='grey' />
                );
            }
            else if (this.props.spaces.errMess) {
                return(
                    <div className="container spaces">
                        <div className="row"> 
                            <div className="col-12">
                                <h4>{this.props.spaces.errMess}</h4>
                            </div>
                        </div>
                    </div>
                );
            }
            else 
            {
                var interests_ = localStorage.getItem('interests');
                var spaces_ = spaces.filter((s) => interests_.indexOf(s.value)<0);
                return (
                
                <div className="container spaces">
                    <div className="row">
                        <Breadcrumb className='mt-3 ml-3'>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Spaces</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <div className='row'>
                                <h3 className='col-12 col-md-4 mb-2 mt-2 space-heading'>Spaces</h3>
                                
                                    <Form className='col-12 col-md-8'>
                                        <Form.Group controlId="formBasicDropdown">
                                            <Form.Label><span className="form__icon"></span>Follow more spaces</Form.Label>
                                            <div><Select name="category" options={spaces_} className="basic-multi-select" value={this.state.category} onChange={this.handleMultiSelectChange} classNamePrefix="select"/></div>
                                            <div className="invalid__feedback">{this.state.errors.category}</div>
                                        </Form.Group>
                                        <Button onClick={this.handleAddSpace} variant="info"><span className='fa fa-paper-plane mr-3' />Submit</Button>
                                    </Form>
                            </div>
                            <hr style={{marginBottom: 25, marginTop: 25}} />
                        </div>  
                                      
                    </div>
                    <div className="row justify-content-center" >
                        {this.renderCardList()}
                    </div>
                    
                    <ToastContainer 
                        autoClose={false}
                    />
                </div>
               
            );}            
        }
    }

    const mapStateToProps = (state, ownProps) => {
        return {
            ...ownProps,
            auth:state.auth,
        };
    };
export default connect(mapStateToProps,{ChangeSpaces})(Spaces);