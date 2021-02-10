// import React, {Component} from 'react';
// import { ListGroup, 
//     ListGroupItemHeading, 
//     ListGroupItemText, 
//     ListGroupItem, 
//     Breadcrumb, BreadcrumbItem,
//     Badge,
//     Nav,
//     NavItem,
//     NavLink,
//     Button, ButtonGroup,
//     Pagination, PaginationItem, PaginationLink } from 'reactstrap';
// import { Fade, Stagger} from 'react-animation-components';
// import { Link, withRouter } from 'react-router-dom';
// import Loading from '../loading';
// import '../all_blog_page/blogs.css'


// const RenderTags = ({blog}) => blog.tagNames.map((tag) => {
//     return(
//         <Badge pill className='tag'>{tag}</Badge>
//     );
// })

// async function viewAdd(views, postReaction, blog, user) {

//     if(views && views.length && views.filter(v => v.user === user)[0]){
//         console.log('another view')
//     }
//     else
//     {
//         var reac = {
//             user: user,
//             blog: blog,
//             category: 'View'
//         };
//         await postReaction(reac);
//     }
// }

// function RenderMenuItem({blog, class_Name, 
//     onClick, auth, deleteBlog, reactions, postReaction,
//     filter}) {
    
//     //var ans = answers.filter(a => a.question === question._id);
//   //  var ansCount = answers.filter(a => a.question === question._id).length;
//     var uclapsCount = reactions.filter(r => r.category === 'UpClap').filter(r => r.blog === blog._id ).length;
//     var dclapsCount = reactions.filter(r => r.category === 'DownClap').filter(r => r.blog === blog._id).length;
//     var views = reactions.filter(r => r.category === 'View').filter(r => r.blog === blog._id);
//     var viewsCount = views.length;

//     return(
//         <Fade in>
//             <ListGroup className='container blog-container'>
//                     <ListGroupItem className={class_Name+' list-item-style'}>

//                             <div className='row'>
//                             <div className='col-12 col-sm-8'>
//                             <ListGroupItemHeading className='blog-heading'>
//                             <Link className='blog-heading' 
//                             to={`/blog-${blog._id}-${blog.heading}`}
//                             onClick={() => viewAdd(views, postReaction, blog._id, auth.userId)}
//                             >
//                                 {blog.heading}
//                             </Link>
//                             {
//                                     auth.userId === blog.author._id
//                                     ?
                                
//                                         <Button color='danger' onClick={() => deleteBlog(blog._id)}><span className='fa fa-lg fa-trash'></span></Button>
                                
//                                     :
//                                     <></>
//                                 }   
//                             </ListGroupItemHeading>
//                                 <RenderTags blog={blog} />
//                                 <ListGroupItemText className='blog-text'>
//                                     Posted by :-  {blog.author.user_name}
//                                 </ListGroupItemText>
//                                 <ListGroupItemText className='blog-text'>
//                                     Posted at :- {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(blog.createdAt)))}
//                                 </ListGroupItemText>

//                             </div>
//                             <div className='col-12 col-sm-4'>
//                                 <div className='prop-div'>
//                                     <Badge className='prop' color='light'>{viewsCount}</Badge>
//                                     <p>views</p>
//                                 </div>
//                                 <div className='prop-div'>
//                                     <Badge className='prop' color='light'>{uclapsCount-dclapsCount}</Badge>
//                                     <p>claps</p>
//                                 </div>
//                             </div>
//                             </div>
                    
//                     </ListGroupItem>
//             </ListGroup>
//         </Fade>
//     );
    
// }

// class Blogs extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             filter: 'Latest',
//             latestActive: true,
//             clapsActive: false,
//             //unansweredActive: false,
//         }
//        // this.spaceId = null;
//     }

//     componentDidMount() {
//        // this.spaceId = this.props.space.stringId;
//     }

//     onLatestSelect() {
//         this.setState({
//             filter: 'Latest',
//             latestActive: true,
//             clapsActive: false,
//             //unansweredActive: false
//         })
//     }

//     onClapsSelect() {
//         this.setState({
//             filter: 'Claps',
//             latestActive: false,
//             clapsActive: true,
//             //unansweredActive: false,
            
//         })
//     }

//     render() {
        
//         var count = -1;
//         const MenuDate = this.props.blogs.sort((a,b) => b.dateNum-a.dateNum).map((blog) => {

//             count += 1;
//             return(
//                 <div className="col-12" key={blog._id}>
                   
//                         <RenderMenuItem 
//                             blog={blog} 
//                             // spaceId={this.props.space._id} 
//                             class_Name={count%2 == 0 ? 'blogEven' : 'blogOdd'} 
//                             onClick={this.props.onClick}
//                            // spaceId={this.spaceId}
//                             auth={this.props.auth}
//                             deleteBlog={this.props.deleteBlog}
//                            // answers={this.props.answers}
//                             reactions={this.props.reactions}
//                             postReaction={this.props.postReaction}
//                             filter={this.state.filter}
//                             //spaceId={this.props.space.stringId}
//                              />
                
//                 </div>
//             );
//         }) 

//         const MenuClaps = this.props.blogs.sort((a,b) => 
//         ((this.props.reactions.filter(r => (r.category === 'UpClap' && r.blog === b._id)).length)-
//         (this.props.reactions.filter(r => (r.category === 'UpClap' && r.blog === a._id)).length))
//         ).map((blog) => {

//             count += 1;
//             return(
//                 <div className="col-12" key={blog._id}>
                    
//                         <RenderMenuItem 
//                             blog={blog} 
//                             // spaceId={this.props.space._id} 
//                             class_Name={count%2 == 0 ? 'blogEven' : 'blogOdd'} 
//                             onClick={this.props.onClick}
//                             auth={this.props.auth}
//                             deleteBlog={this.props.deleteBlog}
//                            // answers={this.props.answers}
//                             reactions={this.props.reactions}
//                             postReaction={this.props.postReaction}
//                             // spaceId={this.props.space.stringId}
//                            // spaceId={this.spaceId}
//                             filter={this.state.filter}
//                             />
                   
//                 </div>
//             );
//         }) 
 

//         if(this.props.isLoading || this.props.blogsIsLoading ||  this.props.reactionsIsLoading) {
//             return(
//                 <Loading type="spokes" color="grey"/>       
//             );
//         }
//         else if(this.props.errMess || this.props.blogsErrMess ||  this.props.reactionsErrMess) {
//             return(
//                 <div className="container spaces">
//                     <div className="row"> 
//                         <div className="col-12">
//                             <h4>{this.props.errMess}</h4>
//                         </div>
//                     </div>
//                 </div>
//             );
//         }
//         else{

//             var renderBlogs;

//             if(this.state.filter === 'Latest') {
//                 renderBlogs = MenuDate;
//             }
//             else if(this.state.filter === 'Claps') {
//                 renderBlogs = MenuClaps;
//             }
            
//             return(
//                 <div className='container blogs'>
                        
//                     <div className='row'>
//                         <Breadcrumb className='mt-3 ml-3'>
//                             <BreadcrumbItem><Link to="/spaces">Home</Link></BreadcrumbItem>
//                             <BreadcrumbItem active>BLOGS</BreadcrumbItem>
//                         </Breadcrumb>
//                     </div>
//                     <div className='row'>
//                         <div className='container category-div '>
//                             <h4 className='row all-blog-heading justify-content-center'>All Blogs</h4>
//                             <div className='row justify-content-center mt-4'>
                        
//                                     <Link to='/addBlog'>
//                                         <Button className='add-blog-btn col-8 col-md-4 col-lg-3 mb-4' color='danger'>
//                                             <span className='fa fa-lg fa-plus mr-2 ml-2' />BLOG
                                            
//                                         </Button>
//                                     </Link>
//                                     <Button className='col-8 col-md-4 col-lg-3 mb-4 add-ques-btn' color='danger'><span className='fa fa-lg fa-bookmark mr-2 ml-2' />FOLLOW</Button>
//                                     {/* <Button outline className='col-8 col-lg-3 mb-4 follower-btn' color='primary'><span className='fa fa-lg fa-users mr-2 ml-2' />{this.props.space.followers} FOLLOWERS</Button> */}
//                             </div>
//                             <div className='row ml-1 mt-3 mr-1'>
//                                 <Nav className='col-12 ' tabs>
                                        
//                                     <NavItem className='mb-6 filters'>
//                                         <NavLink href='#' active={this.state.latestActive} onClick={() => this.onLatestSelect()}>Latest</NavLink>
//                                     </NavItem>
//                                     <NavItem className='mb-6 filters'>
//                                         <NavLink href='#' active={this.state.clapsActive} onClick={() => this.onClapsSelect()}>Claps</NavLink>
//                                     </NavItem>
//                                 </Nav>
//                             </div>
//                         </div>
//                     </div>
                    
//                     <div id='all-blogs-id' className="row justify-content-center">
                        
//                             {
//                                 renderBlogs
//                             }
                        
//                     </div>
                    
//                 </div>
//             );
            
//         }
       
//     }
// }

// export default Blogs;