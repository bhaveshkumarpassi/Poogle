import React, {Component} from 'react';
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
import { Link } from 'react-router-dom';
import Loading from '../loading';
import '../all_blog_page/blogs.css';
import Select from 'react-select';
import {spaces} from '../variables';
const RenderTags = ({blog}) => blog.tagNames.map((tag) => {
    
    return(
        <Badge pill className='tag'>{tag}</Badge>
    );
})

async function viewAdd(views, postBReaction, blog, user) {
	if (views && views.length && views.filter((v) => v.user === user)[0]) {
		console.log("another view");
	} else {
		var reac = {
			user: user,
			blog: blog,
			category: "View",
		};
		await postBReaction(reac);
	}
}
function RenderMenuItem({
	blog,
	class_Name,
	onClick,
	auth,
	deleteBlog,
	breactions,
	postBReaction,
	filter,
}) {
	var likesCount = breactions
		.filter((r) => r.category === "Like")
		.filter((r) => r.blog === blog._id).length;
	var views = breactions
		.filter((r) => r.category === "View")
		.filter((r) => r.blog === blog._id);
	var viewsCount = views.length;

	if (filter === "Latest" || filter === "Likes") {
		return (
			<ListGroup className="container blog-container">
				<ListGroupItem className={class_Name + " list-item-style"}>
					<div className="row">
						<div className="col-12 col-sm-8">
							<ListGroupItemHeading className="blog-heading">
								<Link
									className="blog-heading"
									to={`/blog-${blog._id}-${blog.heading}`}
									onClick={() =>
										viewAdd(views, postBReaction, blog._id, auth.userId)
									}
								>
									{blog.heading}
								</Link>
								{auth.userId === blog.author._id ? (
									<Button color="danger" onClick={() => deleteBlog(blog._id)}>
										<span className="fa fa-lg fa-trash"></span>
									</Button>
								) : (
									<></>
								)}
							</ListGroupItemHeading>
							<RenderTags blog={blog} />
							<ListGroupItemText className="blog-text">
								Posted by :- {blog.author.user_name}
							</ListGroupItemText>
							<ListGroupItemText className="blog-text">
								Posted at :-{" "}
								{new Intl.DateTimeFormat("en-US", {
									year: "numeric",
									month: "short",
									day: "2-digit",
								}).format(new Date(Date.parse(blog.createdAt)))}
							</ListGroupItemText>
						</div>
						<div className="col-12 col-sm-4">
							<div className="prop-div">
								<Badge className="prop" color="light">
									{viewsCount}
								</Badge>
								<p>Views</p>
							</div>
							<div className="prop-div">
								<Badge className="prop" color="light">
									{likesCount}
								</Badge>
								<p>Likes</p>
							</div>
							<div className="prop-div">
								<Badge className="prop" color="light">
									{blog.duration}
								</Badge>
								<p>minutes</p>
							</div>
						</div>
					</div>
				</ListGroupItem>
			</ListGroup>
		);
	}
}

 class Blogs extends Component {
    
    constructor(props){
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this)
        this.handleSubmit= this.handleSubmit.bind(this)
       // this.handleSearch = this.handleSearch.bind(this);   
        this.state={
            filter: 'Latest',
            latestActive: true,
            clapsActive:false,
            isModalOpen: false,
             title:'',
             category:[],
             errors:{
              category:'',
              title:'',
            }  
          //  data:[]
        
        }     
        
        // this.closeModal = this.closeModal.bind(this);
        // // this.arrayHolder = [];
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
            const newBlogDemand = {
              title: this.state.title,
              tagNames: tagNames,
              tagIds: tagIds,
              author: this.props.auth.userId,
            };
  
            this.props.postBlogDemand(newBlogDemand);
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
			filter: "Latest",
			latestActive: true,
			clapsActive: false,
		});
	}

	onClapsSelect() {
		this.setState({
			filter: "Likes",
			latestActive: false,
			clapsActive: true,
		});
	}
	render() {
		var count = -1;
		const MenuDate = this.props.blogs
			.sort((a, b) => b.dateNum - a.dateNum)
			.map((blog) => {
				count += 1;
				return (
					<div className="col-12" key={blog._id}>
						<RenderMenuItem
							blog={blog}
							class_Name={count % 2 == 0 ? "blogEven" : "blogOdd"}
							onClick={this.props.onClick}
							auth={this.props.auth}
							deleteBlog={this.props.deleteBlog}
							breactions={this.props.reactions}
							postBReaction={this.props.postReaction}
							filter={this.state.filter}
						/>
					</div>
				);
			});

		const MenuLikes = this.props.blogs.map((blog) => {
			count += 1;
			return (
				<div className="col-12" key={blog._id}>
					<RenderMenuItem
						blog={blog}
						class_Name={count % 2 == 0 ? "blogEven" : "blogOdd"}
						onClick={this.props.onClick}
						auth={this.props.auth}
						deleteBlog={this.props.deleteBlog}
						breactions={this.props.breactions}
						postBReaction={this.props.postBReaction}
						filter={this.state.filter}
					/>
				</div>
			);
		});


      // let addModalClose=()=>this.setState({addModalShow:false})
        // const menu = this.state.data.map((blog) => {  
        //     return (
        //         <div className="col-12 col-lg-3 col-md-6 col-sm-6 mt-1 mb-4"  key={blog.id}>
        //             <RenderMenuItem 
        //             blog={blog} 
        //             class_Name={count%2==0 ? 'blogEven' : 'blogOdd'}
        //             onClick={this.props.onClick}
        //              />
        //         </div>
        //     );
        // });
		if (this.props.isLoading || this.props.reactionsIsLoading) {
			return <Loading type="spokes" color="grey" />;
		} else if (this.props.errMess || this.props.reactionsIsLoading) {
			return (
				<div className="container spaces">
					<div className="row">
						<div className="col-12">
							<h4>{this.props.errMess}</h4>
						</div>
					</div>
				</div>
			);
		} else {
			var renderBlogs;

			if (this.state.filter === "Latest") {
				renderBlogs = MenuDate;
			} else if (this.state.filter === "Likes") {
				renderBlogs = MenuLikes;
            }    
        return (
            
            <div className='container questions'>
                        
            <div className='row'>
                <Breadcrumb className='mt-3 ml-3'>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>BLOGS</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className='row'>
                <div className='container category-div '>
                    <h4 className='row all-blog-heading justify-content-center'>All Blogs</h4>
                    <div className='row justify-content-center mt-4'>
                
                                
                                <Button className='col-8 col-md-4 col-lg-3 mb-4 m-2 add-blog-btn' color='danger'>
                                <Link style={{color: 'white'}} to='/addBlog'><span className='fa fa-lg fa-plus mr-2 ml-2' />BLOG</Link>
                                </Button>
          
    
                               <Button className='col-8 col-md-4 col-lg-3 mb-4 m-2 add-blog-btn' 
                               color='info'
                               onClick={this.toggleModal}>
                               <span className='fa fa-lg fa-plus mr-2 ml-2'/> Add Blog Demand
                                </Button>
                            
                            <Button className='col-8 col-md-4 col-lg-3 mb-4 ml-4 add-blog-btn' color='danger'>
                            <span className='fa fa-lg fa-bookmark mr-2 ml-2'/>FOLLOW</Button>
                            {/* <Button outline className='col-8 col-lg-3 mb-4 follower-btn' color='primary'><span className='fa fa-lg fa-users mr-2 ml-2' />{this.props.space.followers} FOLLOWERS</Button> */}
                    </div>
                    <div className='row ml-1 mt-3 mr-1'>
                        <Nav className='col-12 ' tabs>
                                
                            <NavItem className='mb-6 filters'>
                                <NavLink href='#' active={this.state.latestActive} onClick={() => this.onLatestSelect()}>Latest</NavLink>
                            </NavItem>
                            <NavItem className='mb-6 filters'>
                                <NavLink href='#' active={this.state.clapsActive} onClick={() => this.onClapsSelect()}>Claps</NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </div>
            </div>
            
            <div id='all-blogs-id' className="row justify-content-center">
                
                    {
                        renderBlogs
                    }
                
            </div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>ADD BLOG DEMAND</ModalHeader>
            <ModalBody>
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
        </div> 
        
    
        );
    }
}
}

export default Blogs;