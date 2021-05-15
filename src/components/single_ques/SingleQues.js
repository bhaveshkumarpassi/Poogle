import React, { Component, useState } from "react";
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
} from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import Loading from "../loading";
import { baseUrl, frontendBaseUrl } from "../../shared/baseUrl";
import profilePic from "../../Images/profile_pic.png";
import "../single_ques/SingleQues.css";
import Form from "react-bootstrap/Form";
import "../add_forms/add_forms.css";
import ReactQuill from "react-quill";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions, formats } from "../variables";
import { ToastContainer, toast } from 'react-toastify';
import { zoomOut, slideInDown, slideInUp, bounce, flipInX, zoomIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import 'react-toastify/dist/ReactToastify.css';
import ImageCompress from "quill-image-compress";
Quill.register("modules/imageCompress", ImageCompress);

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

const voteCount = (reactions, answer) => {
  var uvotesCount = reactions.filter((r) => r.category === "UpVote");
  uvotesCount = uvotesCount.length
    ? uvotesCount.filter((r) => r.answer === answer._id).length
    : 0;
  var dvotesCount = reactions.filter((r) => r.category === "DownVote");
  dvotesCount = dvotesCount.length
    ? dvotesCount.filter((r) => r.answer === answer._id).length
    : 0;

  return uvotesCount - dvotesCount;
};

const RenderAnswers = ({
  answers,
  deleteAnswer,
  auth,
  areactions,
  postAReaction,
  deleteAReaction,
}) =>
  answers
    .sort((a, b) => voteCount(areactions, b) - voteCount(areactions, a))
    .map((ans) => {
      var uvotes = areactions.filter(
        (reac) => reac.answer === ans._id && reac.category === "UpVote"
      );
      var dvotes = areactions.filter(
        (reac) => reac.answer === ans._id && reac.category === "DownVote"
      );
      var ivote = uvotes.filter((uv) => uv.user === auth.userId)[0];
      var idvote = dvotes.filter((dv) => dv.user === auth.userId)[0];

      const upAVote = async (upvotes) => {
        if (
          upvotes.length &&
          upvotes.filter(
            (uv) => uv.answer === ans._id && uv.user === auth.userId
          )[0]
        ) {
          var v = upvotes.filter(
            (uv) => uv.answer === ans._id && uv.user === auth.userId
          )[0];
          await deleteAReaction(v._id);
        } else {
          var reac = {
            user: auth.userId,
            answer: ans._id,
            category: "UpVote",
          };
          await postAReaction(reac);
        }
      };

      const downAVote = async (upvotes) => {
        if (
          upvotes.length &&
          upvotes.filter(
            (uv) => uv.answer === ans._id && uv.user === auth.userId
          )[0]
        ) {
          var v = upvotes.filter(
            (uv) => uv.answer === ans._id && uv.user === auth.userId
          )[0];
          await deleteAReaction(v._id);
        } else {
          var reac = {
            user: auth.userId,
            answer: ans._id,
            category: "DownVote",
          };
          await postAReaction(reac);
        }
      };

      let url = baseUrl + "users/" + ans.author._id + "/image";
      const setAlternateImage = (e) => {
        console.log(e.target);
        e.target.src = profilePic;
        console.log("Done task");
      };

      return (
        <Card id={ans.id}>
          <CardBody>
            <Row>
              <Col
                className="mb-3 single-question-profile"
                xs={4}
                md={3}
                lg={2}
              >
                {
                  <CardImg
                    onError={setAlternateImage}
                    className="single-question-profile-pic"
                    src={url}
                  />
                }
                <CardSubtitle className="single-question-profile-name">
                  <Link to={`/profile/${ans.author._id}`}>
                    @{ans.author.user_name}
                  </Link>
                </CardSubtitle>
                <CardText className="single-question-profile-name text-muted">
                  {" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(ans.createdAt)))}
                </CardText>
                {/* <CardText className='single-question-profile-name'>@{ans.author.user_name} got an answer !!!</CardText> */}
              </Col>
              <Col xs={12} md={9} lg={10}>
                <Row>
                  <Col xs={12}>
                    <div
                      className="editor__content"
                      dangerouslySetInnerHTML={{ __html: ans.description }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr></hr>
            <Row>
              <ButtonGroup>
                <Button
                  color={ivote ? "primary" : "info"}
                  onClick={
                    !idvote
                      ? () => upAVote(uvotes)
                      : console.log("Not allowed!!")
                  }
                >
                  <span
                    className={
                      ivote
                        ? "fa fa-lg fa-arrow-circle-up"
                        : "fa fa-lg fa-arrow-up"
                    }
                  />
                </Button>
                <Button color="info" disabled>
                  {uvotes.length - dvotes.length}
                </Button>
                <Button
                  color={idvote ? "primary" : "info"}
                  onClick={
                    !ivote
                      ? () => downAVote(dvotes)
                      : console.log("Not allowed!!")
                  }
                >
                  <span
                    className={
                      idvote
                        ? "fa fa-lg fa-arrow-circle-down"
                        : "fa fa-lg fa-arrow-down"
                    }
                  ></span>
                </Button>
                {ans.author._id === auth.userId ? (
                  <Button color="danger" onClick={() => deleteAnswer(ans._id)}>
                    <span className="fa fa-lg fa-trash"></span>
                  </Button>
                ) : (
                  <></>
                )}
              </ButtonGroup>
            </Row>
          </CardBody>
        </Card>
      );
    });

function RenderComments({
  commentsArray,
  isOpen,
  postComment,
  deleteComment,
  questionId,
  author,
}) {
  const [formOpen, setIsOpen] = useState(false);

  const notifyS = (message) => toast.success(message);
  const notifyF = (message) => toast.error(message);

  const toggle = () => setIsOpen(!formOpen);

  const handleSubmit = async (values) => {
    await postComment({
      author: author,
      question: questionId,
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
                              src={url}
                              onError={setAlternateImage}
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
                                onClick={() => deleteComment(comm._id)}
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

class RenderQuestionAnswers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shareModalOpen: false,
      showComments: false,
      answerModalOpen: false,
      description: "",
      errors: {
        description: "",
      },
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  modules = {
    toolbar: toolbarOptions,
    imageCompress: {
      quality: 0.7,
      maxWidth: 500,
      maxHeight: 500,
      imageType: "image/jpeg",
      debug: true,
    },
  };

  onShareClicked() {
    this.setState({
      shareModalOpen: !this.state.shareModalOpen,
    });
  }

  onCommentsClicked() {
    this.setState({
      showComments: !this.state.showComments,
    });
  }

  onAddAnswerClicked() {
    this.setState({
      answerModalOpen: !this.state.answerModalOpen,
    });
  }

  handleEditorChange(value) {
    this.setState({ description: value });
  }

  notifyS = (message) => toast.success(message);
  notifyF = (message) => toast.error(message);

  handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = this.formValidation();
    console.log(this.state);

    if (isValid) {
      var answer = {
        question: this.props.question._id,
        description: this.state.description,
        author: this.props.auth.userId,
      };
      await this.props.postAnswer(answer);

      if(this.props.answers.postFail)
        this.notifyF("Some Error occured while posting try again.");
      else
        this.notifyS('Answer posted successfully!!')
    }
  };

  formValidation = () => {
    let descriptionError = "",
      error;

    if (
      !this.state.description.trim() ||
      this.state.description === "<p><br></p>"
    ) {
      descriptionError = "Description is required";
      error = true;
    }

    this.setState((prevState) => ({
      errors: {
        description: descriptionError,
      },
    }));

    return !error;
  };

  upVote = async (upvotes) => {
    if (
      upvotes.length &&
      upvotes.filter(
        (uv) =>
          uv.question === this.props.question._id &&
          uv.user === this.props.auth.userId
      )[0]
    ) {
      var v = upvotes.filter(
        (uv) =>
          uv.question === this.props.question._id &&
          uv.user === this.props.auth.userId
      )[0];
      await this.props.deleteReaction(v._id);
    } else {
      var reac = {
        user: this.props.auth.userId,
        question: this.props.question._id,
        category: "UpVote",
      };
      await this.props.postReaction(reac);
    }
  };

  downVote = async (upvotes) => {
    if (
      upvotes.length &&
      upvotes.filter(
        (uv) =>
          uv.question === this.props.question._id &&
          uv.user === this.props.auth.userId
      )[0]
    ) {
      var v = upvotes.filter(
        (uv) =>
          uv.question === this.props.question._id &&
          uv.user === this.props.auth.userId
      )[0];
      await this.props.deleteReaction(v._id);
    } else {
      var reac = {
        user: this.props.auth.userId,
        question: this.props.question._id,
        category: "DownVote",
      };
      await this.props.postReaction(reac);
    }
  };

  render() {
    var uvotes = this.props.reactions.filter(
      (reac) => reac.category === "UpVote"
    );
    var dvotes = this.props.reactions.filter(
      (reac) => reac.category === "DownVote"
    );
    var ivote = uvotes.filter((uv) => uv.user === this.props.auth.userId)[0];
    var idvote = dvotes.filter((dv) => dv.user === this.props.auth.userId)[0];

    let url = baseUrl + "users/" + this.props.question.author._id + "/image";
    const setAlternateImage = (e) => {
      console.log(e.target);
      e.target.src = profilePic;
      console.log("Done task");
    };

    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle className="single-question-heading">
              {this.props.question.heading}
            </CardTitle>
            <hr></hr>
            <Row>
              <Col
                className="mb-3 single-question-profile"
                xs={5}
                sm={4}
                md={3}
                lg={2}
              >
                <CardImg
                  onError={setAlternateImage}
                  className="single-question-profile-pic"
                  src={url}
                />
                <CardSubtitle className="single-question-profile-name">
                  <Link to={`/profile/${this.props.question.author._id}`}>
                    @{this.props.question.author.user_name}
                  </Link>
                </CardSubtitle>
                <CardText className="single-question-profile-name text-muted">
                  {" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(
                    new Date(Date.parse(this.props.question.createdAt))
                  )}
                </CardText>
                {/* <CardText className='single-question-profile-name'>@{this.props.question.author.user_name} has a question ????</CardText> */}
              </Col>
              <Col xs={12} md={9} lg={10}>
                <Row>
                  <Col className="mb-4">
                    <RenderTags question={this.props.question} />
                  </Col>
                  <Col xs={12}>
                    <div
                      className="editor__content"
                      dangerouslySetInnerHTML={{
                        __html: this.props.question.description,
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr></hr>
            <Row>
              <ButtonGroup>
                <Button
                  color={ivote ? "primary" : "info"}
                  onClick={
                    !idvote
                      ? () => this.upVote(uvotes)
                      : console.log("Not allowed!!")
                  }
                >
                  <span
                    className={
                      ivote
                        ? "fa fa-lg fa-arrow-circle-up"
                        : "fa fa-lg fa-arrow-up"
                    }
                  />
                </Button>
                <Button color="info" disabled>
                  {uvotes.length - dvotes.length}
                </Button>
                <Button
                  color={idvote ? "primary" : "info"}
                  onClick={
                    !ivote
                      ? () => this.downVote(dvotes)
                      : console.log("Not allowed!!")
                  }
                >
                  <span
                    className={
                      idvote
                        ? "fa fa-lg fa-arrow-circle-down"
                        : "fa fa-lg fa-arrow-down"
                    }
                  ></span>
                </Button>
                <Button color="danger" onClick={() => this.onCommentsClicked()}>
                  <span className="fa fa-lg fa-comment mr-2" />
                  {this.props.comments.length}
                </Button>
                <Button color="success" onClick={() => this.onShareClicked()}>
                  <span className="fa fa-lg fa-share"></span>
                </Button>
              </ButtonGroup>
            </Row>
          </CardBody>
        </Card>
        <RenderComments
          commentsArray={this.props.comments}
          postComment={this.props.postComment}
          deleteComment={this.props.deleteComment}
          questionId={this.props.question._id}
          author={this.props.auth.userId}
          isOpen={this.state.showComments}
        ></RenderComments>
        <Card>
          <CardBody>
            <div className="row justify-content-between">
              <CardSubtitle className="col-6">
                {this.props.answers.length} Answers(s)
              </CardSubtitle>
              <Button
                className="col-6 col-sm-5 col-md-4 add-ans-btn"
                color="danger"
                onClick={() => this.onAddAnswerClicked()}
              >
                <span className="fa fa-lg fa-plus mr-2"></span>
                ANSWER
              </Button>
            </div>
            <hr></hr>
            {this.props.answers.length ? (
              <RenderAnswers
                answers={this.props.answers}
                deleteAnswer={this.props.deleteAnswer}
                areactions={this.props.areactions}
                postAReaction={this.props.postAReaction}
                deleteAReaction={this.props.deleteAReaction}
                auth={this.props.auth}
              />
            ) : (
              <p className="mt-5">
                Be first one to contribute an answer to this question.
              </p>
            )}
          </CardBody>
        </Card>
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
                frontendBaseUrl+"question-" +
                this.props.question._id +
                "-" +
                this.props.question.heading
              }
              title={"Can you answer this ??"}
              quote={"Can you answer this ??"}
              hashtag={"#Poogle"}
            >
              <FacebookIcon round={true}></FacebookIcon>
            </FacebookShareButton>
            <WhatsappShareButton
              url={
                frontendBaseUrl+"question-" +
                this.props.question._id +
                "-" +
                this.props.question.heading
              }
              title={"Can you answer this ??"}
              separator={"\n"}
            >
              <WhatsappIcon round={true}></WhatsappIcon>
            </WhatsappShareButton>
            <TelegramShareButton
              url={
                frontendBaseUrl+"question-" +
                this.props.question._id +
                "-" +
                this.props.question.heading
              }
              title={"Can you answer this ??"}
            >
              <TelegramIcon round></TelegramIcon>
            </TelegramShareButton>
            <LinkedinShareButton
              url={
                frontendBaseUrl+"question-" +
                this.props.question._id +
                "-" +
                this.props.question.heading
              }
              title={"Can you answer this ??"}
              source={"WWW.poogle.com"}
            >
              <LinkedinIcon round></LinkedinIcon>
            </LinkedinShareButton>
            <TwitterShareButton
              url={
                frontendBaseUrl+"question-" +
                this.props.question._id +
                "-" +
                this.props.question.heading
              }
              title={"Can you answer this ??"}
              hashtags={"#Poogle"}
            >
              <TwitterIcon round></TwitterIcon>
            </TwitterShareButton>
            <RedditShareButton
              url={
                frontendBaseUrl+"question-" +
                this.props.question._id +
                "-" +
                this.props.question.heading
              }
              title={"Can you answer this ??"}
            >
              <RedditIcon round></RedditIcon>
            </RedditShareButton>
            <PinterestShareButton
              url={
                frontendBaseUrl+"question-" +
                this.props.question._id +
                "-" +
                this.props.question.heading
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
        <Modal
          isOpen={this.state.answerModalOpen}
          toggle={() => this.onAddAnswerClicked()}
          className="modal-dialog modal-dialog-centered modal-lg"
          backdrop="static"
        >
          <ModalHeader
            style={{ backgroundColor: "darkgray" }}
            toggle={() => this.onAddAnswerClicked()}
          >
            Your Answer
          </ModalHeader>
          <ModalBody>
            <Form>
              <Form.Group>
                <Form.Label>
                  <span className="form__icon fa fa-pencil"></span>Describe Here
                </Form.Label>
                <ReactQuill
                  placeholder="Thanks for contributing an answer to Poogle ..... "
                  style={{ backgroundColor: "white" }}
                  theme="snow"
                  value={this.state.description}
                  onChange={this.handleEditorChange}
                  modules={this.modules}
                  formats={formats}
                />
                <div className="invalid__feedback">
                  {this.state.errors.description}
                </div>
              </Form.Group>
            </Form>
          </ModalBody>
          <ModalFooter style={{ backgroundColor: "lightgray" }}>
            <Button onClick={this.handleSubmit} color="info">
              <span className="fa fa-paper-plane mr-3" />
              Submit
            </Button>
            <Button color="danger" onClick={() => this.onAddAnswerClicked()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

class SingleQuestion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (
      this.props.isLoading ||
      this.props.answersIsLoading ||
      this.props.reactionsIsLoading ||
      this.props.areactionsIsLoading
    ) {
      return <Loading type="spokes" color="grey" />;
    } else if (
      this.props.errMess ||
      this.props.answersErrMess ||
      this.props.commentsErrMess ||
      this.props.reactionsErrMess ||
      this.props.reactionsErrMess
    ) {
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
      return (
  
        <Container className="single-question">
          <Row className="justify-content-center mt-5">
            <Col lg={10}>
              <RenderQuestionAnswers
                question={this.props.question}
                answers={this.props.answers}
                comments={this.props.comments}
                postComment={this.props.postComment}
                deleteComment={this.props.deleteComment}
                onClick={this.props.onClick}
                auth={this.props.auth}
                postAnswer={this.props.postAnswer}
                deleteAnswer={this.props.deleteAnswer}
                postReaction={this.props.postReaction}
                deleteReaction={this.props.deleteReaction}
                reactions={this.props.reactions}
                areactions={this.props.areactions}
                postAReaction={this.props.postAReaction}
                deleteAReaction={this.props.deleteAReaction}
              />
            </Col>
          </Row>
          <ToastContainer
            />
        </Container>
        
      );
    }
  }
}

export default SingleQuestion;
