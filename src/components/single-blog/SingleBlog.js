import React, { Component, useState } from "react";
import { Link  } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Collapse,
  ButtonGroup,
  Button,
  CardImg,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Label,
  Jumbotron,
  CardHeader,
} from "reactstrap";
import { baseUrl, frontendBaseUrl } from "../../shared/baseUrl";
import Loading from "../loading";
import { LocalForm, Control, Errors } from "react-redux-form";
import { ToastContainer, toast } from 'react-toastify';
import { zoomOut, slideInDown, slideInUp, bounce, flipInX, zoomIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import 'react-toastify/dist/ReactToastify.css';
import profilePic from "../../Images/profile_pic.png";
import "../single-blog/SingleBlog.css";

const styles = {
  zoomIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(zoomIn, 'zoomIn')
  },
  slideInUp: {
      animation: 'x 1s',
      animationName: Radium.keyframes(slideInUp, 'slideInUp')
    },
    bounce: {
      animation: 'x 1s',
      animationName: Radium.keyframes(bounce, 'bounce')
    },
    flipInX: {
      animation: 'x 1s',
      animationName: Radium.keyframes(flipInX, 'flipInX')
    },
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;

const RenderTags = ({ question }) =>
  question.tagNames.map((tag) => {
    return (
      <Badge pill className="mr-2" color="primary">
        {tag}
      </Badge>
    );
  });

function RenderComments({
  commentsArray,
  isOpen,
  postBComment,
  deleteBComment,
  blogId,
  author,
}) {
  const [formOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!formOpen);

  const notifyS = (message) => toast.success(message);
  const notifyF = (message) => toast.error(message);

  const handleSubmit = async (values) => {
    await postBComment({
      author: author,
      blog: blogId,
      comment: values.comment,
    });

    if(commentsArray.postFail)
      notifyF("Some Error occured while posting try again.");
    else
      notifyS('Comment posted successfully!!')    
  };

  let url = baseUrl + "users/" + author + "/image";
  const setAlternateImage = (e) => {
    console.log(e.target);
    e.target.src = profilePic;
    console.log("Done task");
  };

  return (
    <Collapse isOpen={isOpen}>
      <Card>
        <CardBody>
          <div className="col-12 m-1">
            <div className="row justify-content-between">
              <h5 className="col-6">
                <span
                  className="fa fa-lg fa-comments"
                  style={{ color: "mediumslateblue", fontSize: 50 }}
                />
              </h5>
              <Button
                onClick={() => toggle()}
                className="mb-3 col-6 col-sm-5 col-md-4 offset-0 add-ans-btn"
                color="primary"
              >
                <span className="button-headings fa fa-plus mr-2"></span>
                COMMENT
              </Button>
            </div>
            <hr />
            <Collapse isOpen={formOpen}>
              <Card className="mt-3">
                <CardBody>
                  <LocalForm onSubmit={handleSubmit}>
                    <div className="row form-group">
                      <Label htmlFor="comment" className="col-12">
                        <span className="fa fa-lg  fa-pencil-square-o ml-1 mr-2"></span>
                        Comment
                      </Label>
                      <div className="col-12">
                        <Control.textarea
                          model=".comment"
                          name="comment"
                          className="form-control"
                          id="comment"
                          rows="6"
                          placeholder={"Type your comment here ...."}
                          validators={{ required, maxLength: maxLength(500) }}
                        />
                        <Errors
                          className="text-danger"
                          show="touched"
                          model=".comment"
                          messages={{
                            required: "Required",
                            maxLength: "Must be 500 characters or less",
                          }}
                        />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-12">
                        <Button type="submit" color="success">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </LocalForm>
                </CardBody>
              </Card>
            </Collapse>
            <ul className="list-unstyled">
              {commentsArray.length ? (
                commentsArray
                  .sort((a, b) => b.dateNum - a.dateNum)
                  .map((comm) => {
                    return (
                      <li key={comm._id}>
                        <Media className="row mt-4">
                          <Media left className="mr-0 col-4 col-md-2">
                            <Media
                              object
                              className="ml-0 comments-profile-pic"
                              onError={setAlternateImage}
                              src={url}
                              alt={comm.author.user_name}
                            />
                            <br />
                            <p className="comments-data">
                              <b>{comm.author.user_name}</b> at{" "}
                              {new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                              }).format(new Date(Date.parse(comm.createdAt)))}
                            </p>
                          </Media>
                          <Media className=" comment mr-0 col-8 col-md-10" body>
                            {comm.comment}
                          </Media>
                          <Media>
                            {comm.author._id === author ? (
                              <Button
                                color="danger"
                                className="mr-4"
                                onClick={() => deleteBComment(comm._id)}
                              >
                                <span className="fa fa-trash"></span>
                              </Button>
                            ) : (
                              <></>
                            )}
                          </Media>
                        </Media>
                        <hr />
                      </li>
                    );
                  })
              ) : (
                <p className="mt-5">
                  Currently no comments. be first one to comment!!
                </p>
              )}
            </ul>
          </div>
        </CardBody>
      </Card>
    </Collapse>
  );
}

class SingleBlog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shareModalOpen: false,
      showComments: false,
    };
  }

  onCommentsClicked() {
    this.setState({
      showComments: !this.state.showComments,
    });
  }

  onShareClicked() {
    this.setState({
      shareModalOpen: !this.state.shareModalOpen,
    });
  }

  addLike = async (likes) => {
    if (
      likes.length &&
      likes.filter(
        (uv) =>
          uv.blog === this.props.blog._id && uv.user === this.props.auth.userId
      )[0]
    ) {
      var v = likes.filter(
        (uv) =>
          uv.blog === this.props.blog._id && uv.user === this.props.auth.userId
      )[0];
      await this.props.deleteReaction(v._id);
    } else {
      var reac = {
        user: this.props.auth.userId,
        blog: this.props.blog._id,
        category: "Like",
      };
      await this.props.postReaction(reac);
    }
  };

  render() {
    var likes = this.props.reactions.filter((reac) => reac.category === "Like");
    var ilike = likes.filter((uv) => uv.user === this.props.auth.userId)[0];

    let url = baseUrl + "users/" + this.props.blog.author._id + "/image";
    const setAlternateImage = (e) => {
      console.log(e.target);
      e.target.src = profilePic;
      console.log("Done task");
    };

    if (this.props.isLoading || this.props.reactionIsLoading) {
      return <Loading type="spokes" color="grey" />;
    } else if (this.props.errMess || this.props.reactionsErrMess) {
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>{this.props.errMess}</h4>
          </div>
        </div>
      </div>;
    }
    return (
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="single-blog-heading">
              {this.props.blog.heading}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col
                className="mb-3 single-question-profile"
                xs={4}
                md={3}
                lg={2}
              >
                <CardImg
                  onError={setAlternateImage}
                  className="single-question-profile-pic"
                  src={url}
                />
                <CardSubtitle className="single-question-profile-name">
                  <Link to={`/profile/${this.props.blog.author._id}`}>
                    @{this.props.blog.author.user_name}
                  </Link>
                </CardSubtitle>
                <CardText className="single-question-profile-name text-muted">
                  {" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(this.props.blog.createdAt)))}
                </CardText>
                <CardText className="single-question-profile-name text-muted">
                  {" "}
                  {this.props.blog.duration} min read{" "}
                </CardText>
              </Col>
              <Col xs={12} md={9} lg={10}>
                <Row>
                  <Col className="mb-5">
                    <RenderTags question={this.props.blog} />
                  </Col>
                  <Col xs={12}>
                    <div
                      className="editor__content"
                      dangerouslySetInnerHTML={{
                        __html: this.props.blog.description,
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr></hr>
            <Row>
              <ButtonGroup className="ml-4">
                <Button color="danger" onClick={() => this.addLike(likes)}>
                  <span
                    className={
                      ilike
                        ? "fa fa-lg fa-heart mr-2"
                        : "fa fa-lg fa-heart-o mr-2"
                    }
                  />
                  {likes.length}
                </Button>
                {/* <Button color='danger'>
                                    <span className='fa fa-lg fa-heart-o mr-2' />
                                    {0}
                                </Button> */}
                <Button color="info" onClick={() => this.onCommentsClicked()}>
                  <span className="fa fa-lg fa-comment mr-2" />
                  {this.props.bcomments.length}
                </Button>
                <Button color="success" onClick={() => this.onShareClicked()}>
                  <span className="fa fa-lg fa-share"></span>
                </Button>
              </ButtonGroup>
            </Row>
          </CardBody>
        </Card>
        <RenderComments
          commentsArray={this.props.bcomments}
          postBComment={this.props.postBComment}
          deleteBComment={this.props.deleteBComment}
          blogId={this.props.blog._id}
          author={this.props.auth.userId}
          isOpen={this.state.showComments}
        />
        <ToastContainer/>
        <Modal
          isOpen={this.state.shareModalOpen}
          toggle={() => this.onShareClicked()}
        >
          <ModalHeader toggle={() => this.onShareClicked()}>
            Let's Share this !!
          </ModalHeader>
          <ModalBody>
            <FacebookShareButton
              url={
                frontendBaseUrl+"blog-" +
                this.props.blog._id +
                "-" +
                this.props.blog.heading
              }
              title={"Can you answer this ??"}
              quote={"Can you answer this ??"}
              hashtag={"#Poogle"}
            >
              <FacebookIcon round={true}></FacebookIcon>
            </FacebookShareButton>
            <WhatsappShareButton
              url={
                frontendBaseUrl+"blog-" +
                this.props.blog._id +
                "-" +
                this.props.blog.heading
              }
              title={"Can you answer this ??"}
              separator={"\n"}
            >
              <WhatsappIcon round={true}></WhatsappIcon>
            </WhatsappShareButton>
            <TelegramShareButton
              url={
                frontendBaseUrl+"blog-" +
                this.props.blog._id +
                "-" +
                this.props.blog.heading
              }
              title={"Can you answer this ??"}
            >
              <TelegramIcon round></TelegramIcon>
            </TelegramShareButton>
            <LinkedinShareButton
              url={
                frontendBaseUrl+"blog-" +
                this.props.blog._id +
                "-" +
                this.props.blog.heading
              }
              title={"Can you answer this ??"}
              source={"WWW.poogle.com"}
            >
              <LinkedinIcon round></LinkedinIcon>
            </LinkedinShareButton>
            <TwitterShareButton
              url={
                frontendBaseUrl+"blog-" +
                this.props.blog._id +
                "-" +
                this.props.blog.heading
              }
              title={"Can you answer this ??"}
              hashtags={"#Poogle"}
            >
              <TwitterIcon round></TwitterIcon>
            </TwitterShareButton>
            <RedditShareButton
              url={
                frontendBaseUrl+"blog-" +
                this.props.blog._id +
                "-" +
                this.props.blog.heading
              }
              title={"Can you answer this ??"}
            >
              <RedditIcon round></RedditIcon>
            </RedditShareButton>
            <PinterestShareButton
              url={
                frontendBaseUrl+"blog-" +
                this.props.blog._id +
                "-" +
                this.props.blog.heading
              }
              description={"Can you answer this ??"}
              title={"Can you answer this ??"}
            >
              <PinterestIcon round></PinterestIcon>
            </PinterestShareButton>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.onShareClicked()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    
    );
  }
}

export default SingleBlog;
