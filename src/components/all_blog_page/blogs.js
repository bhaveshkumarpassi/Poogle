import React, {Component} from 'react';
import { ListGroup, 
    ListGroupItemHeading, 
    ListGroupItemText, 
    ListGroupItem, 
    Breadcrumb, BreadcrumbItem,
    Badge,
    Nav,
    NavItem,
    NavLink,
    Button,Form,FormGroup,Label,Input, ButtonGroup,
    Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { FadeTransform, Stagger} from 'react-animation-components';
import { Link } from 'react-router-dom';
import Loading from '../loading';
import './blogs.css';

const RenderTags = ({blog}) => blog.tagNames.map((tag) => {
    
    return(
        <Badge pill className='tag'>{tag}</Badge>
    );
})

function RenderMenuItem({blog, class_Name, onClick}) {
    
    return(
    <FadeTransform 
     in
     transformProps={{
         exitTransform: 'scale(0.5) translateY(-50%)'
     }}>
        <ListGroup className='container blog-container'>
                <ListGroupItem className={class_Name+' list-item-style'}>
                    <Link to={`/blog-${blog.Id}`}>
                        <div className='row'>
                        <div className='col-12 col-sm-8'>
                            <ListGroupItemHeading className='blog-heading'>{blog.blog}</ListGroupItemHeading>
                            <RenderTags blog={blog} />
                            <ListGroupItemText className='blog-text'>
                                Posted by :-  {blog.author}
                            </ListGroupItemText>
                            <ListGroupItemText className='blog-text'>
                                Posted at :- {blog.date}
                            </ListGroupItemText>
                        </div>
                        <div className='col-12 col-sm-4'>
                            <div className='prop-div'>
                                <Badge className='prop' color='light'>{blog.views}</Badge>
                                <p>views</p>
                            </div>
                            <div className='prop-div'>
                                <Badge className='prop' color='light'>{blog.claps}</Badge>
                                <p>claps</p>
                            </div>
                        </div>
                        </div>
                    </Link>
                </ListGroupItem>
        </ListGroup>
    </FadeTransform>
    );
}
 class Blogs extends Component {
    
    constructor(props){
        super(props);
        this.handleSearch = this.handleSearch.bind(this);   
        this.state={
            filter: 'Latest',
            latestActive: true,
            clapsActive:false,
            data:[]
        }
        this.arrayHolder = [];
    }
    handleSearch(event) {

        this.searchFilterFunction(this.searchBlog.value)
        event.preventDefault();
    }
    componentDidMount() {
        this.setState({
            data: this.props.blogs.blogs
        });

        this.arrayHolder = this.props.blogs.blogs
    }

    searchFilterFunction = text => {
        
        const newData = this.arrayHolder.filter(item => {
          const itemData = [`${item.blog.toUpperCase()}`];
          const textData = text.toUpperCase();
    
          return [itemData.indexOf(textData) > -1];
        })

        this.setState({
          data: newData,
        });
    };

    onLatestSelect() {
        this.setState({
            filter:'Latest',
            latestActive:true,
            clapesActive: false,
        })
    }

    onClapsSelect(){
        this.setState({
            filter:'Votes',
            latestActive:false,
            clapesActive:true,
        })
    }
    render() {

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

       
        var count = -1;
        const MenuDate = this.props.blogs.sort((a,b)=> a.dateNum - b.dateNum).map((blog)=>{

            count+=1;
            return(
                <div className='col-12' key={blog.id}>
                    <RenderMenuItem 
                    blog={blog}
                    class_Name={count%2 == 0 ? 'blogEven': 'blogOdd'}
                    onClick={this.props.onClick} />
                </div>
            )
        })


        const MenuClaps = this.props.blogs.sort((a,b)=> b.claps-a.claps).map((blog)=>{
            count +=1;
            return(
                <div className="col-12" key={blog.id}>
                    
                    <RenderMenuItem 
                       blog={blog}
                       class_Name={count%2==0 ? 'blogEven' : 'blogOdd'}
                       onClick={this.props.onClick}
                       />
                
                
                </div>
            )
        })

        
        if(this.props.isLoading || this.props.blogsIsLoading) {
            return(
                <Loading type="spokes" color="grey"/>       
            );
        }
        else if(this.props.errMess || this.props.blogsErrMess) {
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

            var renderBlogs;

            if(this.state.filter === 'Latest') {
                renderBlogs = MenuDate;
            }
            else if(this.state.filter === 'Claps') {
                renderBlogs = MenuClaps;
            }
            
        return (
            <div className='container-blogs'>
                <div className='row'>
                 <Breadcrumb className='mt-3 ml-3'>
                   <BreadcrumbItem><Link to="/home">HOME</Link></BreadcrumbItem>
                   <BreadcrumbItem active>BLOGS</BreadcrumbItem>
                   </Breadcrumb>
                </div>
                <div className="col-12">
                <div className='row'>
                  <div className='conatiner category-div'>
                    <h4 className='row all-blog-heading justify-content-center'>All Blogs</h4>
                    <Form className='col-12 col-md-8' inline onSubmit={this.handleSearch}>
                                <FormGroup className='row m-1'>
                                    <Label htmlFor="searchBlog" hidden>Search</Label>
                                    <Button className='col-2 searchbtn' type="submit" value="submit"><span className='fa fa-search'></span></Button>
                                    <Input className='col-8' type="text" name="searchBlog" id="searchBlog"  placeholder="Search Blogs ... " 
                                        innerRef={(input) => this.searchBlog = input}
                                    />
                                   
                                    <Button className='col-2 cancelbtn' type='reset' value='reset' color='danger' onClick={() => this.setState({ data : this.props.blogs.blogs })}><span className='fa fa-times'></span></Button>
                                </FormGroup>
                    </Form>
                    <div className='row justify-content-center mt-4'>
                     <Button className='col-8 col-md-4 col-lg-3 mb-4 add-blog-btn' color='danger'><span className='fa fa-lg fa-plus mr-2 ml-2'>BLOG</span></Button>
                     <Button className='col-8 col-md-4 col-lg-3 mb-4 add-blog-btn' color='danger'><span className='fa fa-lg fa-bookmark mr-2 ml-2' />FOLLOW</Button>
                     </div>                           
                    <div className='row ml-3 mt-3 mr-6'>
                      <Nav className='col-12' tabs>
                        <NavItem className='mb-6 filters'>
                            <NavLink href='#' active={this.state.latestActive} onClick={() => this.onLatestSelect()} >Latest</NavLink>
                        </NavItem>    
                        <NavItem className='mb-6 filters'>
                          <NavLink href='#' active={this.state.clapsActive} onClick={()=>this.onClapsSelect()}>Trending</NavLink>
                        </NavItem>                    
                      </Nav>
                    </div> 
                 </div>
                  
                </div>
                <div id='all-blogs-id' className='row-justify-content-center'>
                             
                        {renderBlogs}  

                </div>
            </div>
            </div>
        );
    }
}
}

export default Blogs;
