import React, { Component } from 'react'
import { ListGroup, 
        ListGroupItemHeading, 
        ListGroupItemText, 
        ListGroupItem, 
        Breadcrumb, BreadcrumbItem,
        Badge,
        Nav,
        NavItem,
        NavLink,FormGroup,Label,Input,Button,
        Pagination, PaginationItem, PaginationLink, ButtonToolbar, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Form from 'react-bootstrap/Form';   
import { Fade, Stagger} from 'react-animation-components';
import { Link, withRouter } from 'react-router-dom';
import Loading from '../loading';
import { ToastContainer, toast } from 'react-toastify';

import Select from 'react-select';
import {spaces} from '../variables';
import './all_blogDemand.css';


const RenderTags = ({blogDemand}) => blogDemand.tagNames.map((tag) => {
    return(
        <Badge pill className='blogdemand-tag'>{tag}</Badge>
    );
})

function RenderMenuItem({blogDemand, class_Name,auth,deleteBlogDemand, onClick}) {
    
    return(
    
        <ListGroup className='container blogDemand-container'>
                <ListGroupItem className={class_Name+' list-item-style'}>
                        <div className='row'>
                        <div className='col-12 col-sm-8'>
                            <ListGroupItemHeading className='blogDemand-heading'>
                             <Link className='blogDemand-heading'>{blogDemand.title}</Link>
                             {
                                auth.userId === blogDemand.author._id
                                ?
                            
                                    <Button color='danger' className="delete-blog-demand" onClick={() => deleteBlogDemand(blogDemand._id)}>
                                    <span className='fa fa-lg fa-trash'></span></Button>
                            
                                :
                                <></>
                            }  
                            <br></br> 
                            <RenderTags  blogDemand={blogDemand} /> 
                            </ListGroupItemHeading>
                            
                            
                            <ListGroupItemText className='blogDemand-text'>
                                Posted by :-  {blogDemand.author.user_name}
                            </ListGroupItemText>
                            <ListGroupItemText className="blogDemand-text">
                                Posted at :-{" "}
                                {new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                                }).format(new Date(Date.parse(blogDemand.createdAt)))}
                            </ListGroupItemText>
                        </div>

                        </div>
                </ListGroupItem>
        </ListGroup>
    
    );
}

class BlogDemands extends Component{
       constructor(props){
           super(props);
           this.toggleModal = this.toggleModal.bind(this);
           this.handleInputChange = this.handleInputChange.bind(this)
           this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this)
           this.handleSubmit= this.handleSubmit.bind(this)
           this.state={
               filter:'Latest',
               latestActive:true,
               isModalOpen: false,
               title:'',
               category:[],
               errors:{
                category:'',
                title:'',
           }
       }
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
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

      notify = (message) => toast.warning(message);
      
      handleSubmit(event){
        event.preventDefault();
        const isValid = this.formValidation();
        console.log(this.state);
        
        if(isValid){
          
  
            var tagNames = [];
            var tagIds = [];
            var len = this.state.category.length;
            var flag = false;
             for(var i=0;i<len;i++)
            {
              tagNames.push(this.state.category[i].label);
              tagIds.push(this.state.category[i].value);

              var interests_ = localStorage.getItem('interests');

              if(interests_.indexOf(this.state.category[i].value)>-1)
                flag = true;
            }

            console.log(this.props.auth.interests);

            if(flag) {
                const newBlogDemand = {
                    title: this.state.title,
                    tagNames: tagNames,
                    tagIds: tagIds,
                    author: this.props.auth.userId,
                  };
        
                  this.props.postBlogDemand(newBlogDemand);
            }
            else {
                this.notify("Atleast one category should be in your followed spaces list . you can follow required space to add this demand!!");
            }
        
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
                //description: descriptionError,
                category:categoryError,
                //duration: durationError
            }
        }))
        
        return !error;
    }
   
       onLatestSelect() {
        this.setState({
            filter: 'Latest',
            latestActive: true,
        })
    }

    render() {
        var count = -1;
        const MenuDate = this.props.blogDemands.length ? this.props.blogDemands.sort((a,b) => b.dateNum-a.dateNum).map((blogDemand) => {

            count += 1;
            return(
                <div className="col-12" key={blogDemand._id}>
                   
                        <RenderMenuItem 
                            blogDemand={blogDemand} 
                            //spaceId={this.props.space._id} 
                            class_Name={count%2 == 0 ? 'blogDemandEven' : 'blogDemandOdd'} 
                            auth={this.props.auth}
                            deleteBlogDemand={this.props.deleteBlogDemand}
                            onClick={this.props.onClick}

                 />
                
                </div>
            );
        })
        :
        <p className='info-text'>No Blog Demands Matched your interests and query</p> 

        if(this.props.isLoading || this.props.blogDemandsIsLoading) {
            return(
                <Loading type="spokes" color="grey"/>       
            );
        }
        else if(this.props.errMess || this.props.blogDemandsErrMess) {
            return(
                <div className="container spaces">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{this.props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else{

            var renderBlogDemands;

            if(this.state.filter === 'Latest') {
                renderBlogDemands = MenuDate;
            }

    }

    return(
        <div className='container blogDemands'>
                
            <div className='row'>
                <Breadcrumb className='mt-3 ml-3'>
                    <BreadcrumbItem><Link to="/Home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Blog Demands</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className='row'>
                <div className='container category-div '>
                    <h4 className='row all-blogDemand-heading justify-content-center'>Blog Demands</h4>
                    <div className='row justify-content-center mt-4'>
    
                    <Button className='col-8 col-md-4 col-lg-3 mb-4 m-2 add-blog-btn' color='danger'>
                    <Link style={{color: 'white'}} to='/addBlog'><span className='fa fa-lg fa-plus mr-2 ml-2' />BLOG</Link>
                    </Button>
                            <Button className='col-8 col-md-4 col-lg-3 mb-4 m-2 add-blog-btn' 
                               color='info'
                               onClick={this.toggleModal}>
                               <span className='fa fa-lg fa-plus mr-2 ml-2'/> Add Blog Demand
                               </Button>
                            
                            {/* <Button outline className='col-8 col-lg-3 mb-4 follower-btn' color='primary'><span className='fa fa-lg fa-users mr-2 ml-2' />{this.props.space.followers} FOLLOWERS</Button> */}
                    </div>
                    <div className='row ml-1 mt-3 mr-1'>
                        <Nav className='col-12 ' tabs>
                                
                            <NavItem className='mb-4 filters'>
                                <NavLink href='#' active={this.state.latestActive} onClick={() => this.onLatestSelect()}>Latest</NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </div>
            </div>
            
            <div id='all-blogDemands-id' className="row justify-content-center">
                
                    {renderBlogDemands}
                
            </div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>ADD BLOG DEMAND</ModalHeader>
            <ModalBody>
            <p className='info-text' style={{color: 'red', fontSize: '0.8rem'}}>*Do delete the Blog Demand once you have received your blog.</p>
            <div className="container">
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
                </div>
          
            </ModalBody>
            <ModalFooter>
            <Button onClick={this.handleSubmit} color="info"><span className=' mr-3' />Submit</Button>

           </ModalFooter>
        </Modal>
        <ToastContainer 
            autoClose={false}
        />
            
        </div>
    );
    
}

}


export default BlogDemands;