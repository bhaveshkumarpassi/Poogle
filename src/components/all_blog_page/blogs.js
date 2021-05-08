import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItemHeading,
  ListGroupItemText,
  ListGroupItem,
  Breadcrumb,
  BreadcrumbItem,
  Badge,
  Nav,
  NavItem,
  NavLink,
  Button,
  ButtonGroup
} from "reactstrap";
import { FaBlog, FaQuestionCircle, FaUserAlt } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Loading from "../loading";
import "../all_blog_page/blogs.css";
import Select from "react-select";
import { spaces } from "../variables";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RenderTags = ({ blog }) =>
  blog.tagNames.map((tag) => {
    return (
      <Badge pill className="tag">
        {tag}
      </Badge>
    );
  });

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
  constructor(props) {
    super(props);
    this.state = {
      filter: "Latest",
      latestActive: true,
      clapsActive: false,
    };
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
    const likeCount = (reactions, blog) => {
      var lCount = reactions.filter((r) => r.category === "Like");
      lCount = lCount.length
        ? lCount.filter((r) => r.blog === blog._id).length
        : 0;

      return lCount;
    };

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

    const MenuLikes = this.props.blogs
      .sort(
        (a, b) =>
          likeCount(this.props.reactions, b) -
          likeCount(this.props.reactions, a)
      )
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
              postBReaction={this.props.postBReaction}
              filter={this.state.filter}
            />
          </div>
        );
      });

    if (this.props.isLoading || this.props.reactionsIsLoading) {
      return <Loading type="spokes" color="grey" />;
    } else if (this.props.errMess || this.props.reactionsErrMess) {
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
        <div className="container questions">
          <div className="row">
            <Breadcrumb className="mt-3 ml-3">
              <BreadcrumbItem>
                <Link to="/spaces">Spaces</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{this.props.space.name}</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="row">
            <div className="container category-div ">
              <h4 className="row all-blog-heading justify-content-center">
                All Blogs
              </h4>
              <div className="row justify-content-center mt-4">
                  <ButtonGroup className="mb-4 button-grp col-8 col-md-4 col-lg-3">
                      <Button disabled outline color="info">
                        <FaBlog className='mr-2' />
                        {this.props.blogs.length} Blogs
                      </Button>
                      <Button disabled outline color="info">
                        <span className="fa fa-lg fa-scribd mr-2"></span>
                        {this.props.space.followers}
                      </Button>
                  </ButtonGroup>
                  <Button
                    className="col-8 col-md-4 col-lg-3 mb-4 add-ques-btn"
                    color="danger"
                  >
                    <Link style={{ color: "white" }} to="/addBlog">
                    <span className="fa fa-lg fa-plus mr-2 ml-2" />
                    BLOG
                    </Link>
                  </Button>
              </div>
              <div className="row ml-1 mt-3 mr-1">
                <Nav className="col-12 " tabs>
                  <NavItem className="mb-6 filters">
                    <NavLink
                      href="#"
                      active={this.state.latestActive}
                      onClick={() => this.onLatestSelect()}
                    >
                      Latest
                    </NavLink>
                  </NavItem>
                  <NavItem className="mb-6 filters">
                    <NavLink
                      href="#"
                      active={this.state.clapsActive}
                      onClick={() => this.onClapsSelect()}
                    >
                      Likes
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </div>
          </div>
          <div id="all-blogs-id" className="row justify-content-center">
            {this.props.blogs.length ? (
              renderBlogs
            ) : (
              <p className="mt-5">
                Currently no blogs for this space. be the first one to post a
                blog for this space.
              </p>
            )}
          </div>
        </div>
      );
    }
  }
}

export default Blogs;
