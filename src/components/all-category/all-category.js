import React, { Component } from "react";
import questionMan from "../../Images/questionMan3.jpg";
import { Row, Col, Image } from "react-bootstrap";
import {
  ListGroup,
  List,
  ListGroupItemHeading,
  ListGroupItemText,
  ListGroupItem,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Badge,
  Nav,
  NavItem,
  NavLink,
  Button,
  Jumbotron,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import { Link } from "react-router-dom";
import Loading from "../loading";
import { baseUrl } from "../../shared/baseUrl";
import "../followed-spaces/Spaces.css";
import "./all-category.css";
import "../all_ques_page/questions.css";

const RenderTags = ({ question }) =>
  question.tagNames.map((tag) => {
    return (
      <Badge pill className="tag">
        {tag}
      </Badge>
    );
  });

async function viewAdd(views, postReaction, question, user) {
  if (views && views.length && views.filter((v) => v.user === user)[0]) {
    console.log("another view");
  } else {
    var reac = {
      user: user,
      question: question,
      category: "View",
    };
    await postReaction(reac);
  }
}

function RenderMenuItem({
  question,
  spaceId,
  class_Name,
  onClick,
  auth,
  deleteQuestion,
  answers,
  reactions,
  postReaction,
  filter,
}) {
  //var ans = answers.filter(a => a.question === question._id);
  var ansCount = answers.filter((a) => a.question === question._id).length;
  var uvotesCount = reactions
    .filter((r) => r.category === "UpVote")
    .filter((r) => r.question === question._id).length;
  var dvotesCount = reactions
    .filter((r) => r.category === "DownVote")
    .filter((r) => r.question === question._id).length;
  var views = reactions
    .filter((r) => r.category === "View")
    .filter((r) => r.question === question._id);
  var viewsCount = views.length;

  if (filter === "Unanswered") {
    if (ansCount === 0) {
      return (
        <ListGroup className="container question-container">
          <ListGroupItem className={class_Name + " list-item-style"}>
            <div className="row">
              <div className="col-12 col-sm-8">
                <ListGroupItemHeading className="question-heading">
                  <Link
                    className="question-heading"
                    to={`/question-${question._id}-${question.heading}`}
                    onClick={() =>
                      viewAdd(views, postReaction, question._id, auth.userId)
                    }
                  >
                    {question.heading}
                  </Link>
                  {auth.userId === question.author._id ? (
                    <Button
                      color="danger"
                      style={{ marginTop: 6 }}
                      onClick={() => deleteQuestion(question._id)}
                    >
                      <span className="fa fa-trash"></span>
                    </Button>
                  ) : (
                    <></>
                  )}
                </ListGroupItemHeading>
                <RenderTags question={question} />
                <ListGroupItemText className="question-text">
                  Posted by :- {question.author.user_name}
                </ListGroupItemText>
                <ListGroupItemText className="question-text">
                  Posted at :-{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(question.createdAt)))}
                </ListGroupItemText>
              </div>
              <div className="col-12 col-sm-4">
                <div className="prop-div">
                  <Badge className="prop" color="light">
                    {viewsCount}
                  </Badge>
                  <p>views</p>
                </div>
                <div className="prop-div">
                  <Badge className="prop" color="light">
                    {ansCount}
                  </Badge>
                  <p>answers</p>
                </div>
                <div className="prop-div">
                  <Badge className="prop" color="light">
                    {uvotesCount - dvotesCount}
                  </Badge>
                  <p>votes</p>
                </div>
              </div>
            </div>
          </ListGroupItem>
        </ListGroup>
      );
    } else return <></>;
  } else {
    return (
      <ListGroup className="container question-container">
        <ListGroupItem className={class_Name + " list-item-style"}>
          <div className="row">
            <div className="col-12 col-sm-8">
              <ListGroupItemHeading className="question-heading">
                <Link
                  className="question-heading"
                  to={`/question-${question._id}-${question.heading}`}
                  onClick={() =>
                    viewAdd(views, postReaction, question._id, auth.userId)
                  }
                >
                  {question.heading}
                </Link>
                {auth.userId === question.author._id ? (
                  <Button
                    color="danger"
                    onClick={() => deleteQuestion(question._id)}
                  >
                    <span className="fa fa-lg fa-trash"></span>
                  </Button>
                ) : (
                  <></>
                )}
              </ListGroupItemHeading>
              <RenderTags question={question} />
              <ListGroupItemText className="question-text">
                Posted by :- {question.author.user_name}
              </ListGroupItemText>
              <ListGroupItemText className="question-text">
                Posted at :-{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(question.createdAt)))}
              </ListGroupItemText>
            </div>
            <div className="col-12 col-sm-4">
              <div className="prop-div">
                <Badge className="prop" color="light">
                  {viewsCount}
                </Badge>
                <p>views</p>
              </div>
              <div className="prop-div">
                <Badge className="prop" color="light">
                  {ansCount}
                </Badge>
                <p>answers</p>
              </div>
              <div className="prop-div">
                <Badge className="prop" color="light">
                  {uvotesCount - dvotesCount}
                </Badge>
                <p>votes</p>
              </div>
            </div>
          </div>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

class AllCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: this.props.filter,
      latestActive: true,
      votesActive: false,
      unansweredActive: false,
      suggetsedActive: false,
      viewActive: false,
    };
  }

  onLatestSelect() {
    this.setState({
      filter: "Latest",
      latestActive: true,
      votesActive: false,
      unansweredActive: false,
      suggetsedActive: false,
    });
  }

  onVotesSelect() {
    this.setState({
      filter: "Votes",
      latestActive: false,
      votesActive: true,
      unansweredActive: false,
      suggetsedActive: false,
    });
  }

  onUnansweredSelect() {
    this.setState({
      filter: "Unanswered",
      latestActive: false,
      votesActive: false,
      unansweredActive: true,
      suggetsedActive: false,
    });
  }

  onViewsSelect() {
    this.setState({
      filter: "Views",
      latestActive: false,
      votesActive: false,
      unansweredActive: false,
      suggetsedActive: false,
      viewActive: true,
    });
  }

  render() {
    const voteCount = (reactions, question) => {
      var uvotesCount = reactions.filter((r) => r.category === "UpVote");
      uvotesCount = uvotesCount.length
        ? uvotesCount.filter((r) => r.question === question._id).length
        : 0;
      var dvotesCount = reactions.filter((r) => r.category === "DownVote");
      dvotesCount = dvotesCount.length
        ? dvotesCount.filter((r) => r.question === question._id).length
        : 0;

      return uvotesCount - dvotesCount;
    };

    const viewCount = (reactions, question) => {
      var uvotesCount = reactions.filter((r) => r.category === "View");
      uvotesCount = uvotesCount.length
        ? uvotesCount.filter((r) => r.question === question._id).length
        : 0;

      return uvotesCount;
    };

    var count = -1;
    const MenuDate = this.props.questions.length ? this.props.questions
      .sort((a, b) => b.dateNum - a.dateNum)
      .map((question) => {
        count += 1;
        return (
          <div className="col-12" key={question.id}>
            <RenderMenuItem
              question={question}
              class_Name={count % 2 == 0 ? "questionEven" : "questionOdd"}
              onClick={this.props.onClick}
              auth={this.props.auth}
              deleteQuestion={this.props.deleteQuestion}
              answers={this.props.answers}
              reactions={this.props.reactions}
              postReaction={this.props.postReaction}
              filter={this.state.filter}
            />
          </div>
        );
      })
      :
      <p className='info-text'>No Questions Matched your interests and query</p>

    const MenuVotes = this.props.questions.length ? this.props.questions
      .sort(
        (a, b) =>
          voteCount(this.props.reactions, b) -
          voteCount(this.props.reactions, a)
      )
      .map((question) => {
        count += 1;
        return (
          <div className="col-12" key={question.id}>
            <RenderMenuItem
              question={question}
              class_Name={count % 2 == 0 ? "questionEven" : "questionOdd"}
              onClick={this.props.onClick}
              auth={this.props.auth}
              deleteQuestion={this.props.deleteQuestion}
              answers={this.props.answers}
              reactions={this.props.reactions}
              postReaction={this.props.postReaction}
              filter={this.state.filter}
            />
          </div>
        );
      })
      :
      <p className='info-text'>No Questions Matched your interests and query</p>

    const MenuViews = this.props.questions.length ? this.props.questions
      .sort(
        (a, b) =>
          viewCount(this.props.reactions, b) -
          viewCount(this.props.reactions, a)
      )
      .map((question) => {
        count += 1;
        return (
          <div className="col-12" key={question.id}>
            <RenderMenuItem
              question={question}
              class_Name={count % 2 == 0 ? "questionEven" : "questionOdd"}
              onClick={this.props.onClick}
              auth={this.props.auth}
              deleteQuestion={this.props.deleteQuestion}
              answers={this.props.answers}
              reactions={this.props.reactions}
              postReaction={this.props.postReaction}
              filter={this.state.filter}
            />
          </div>
        );
      })
      :
      <p className='info-text'>No Questions Matched your interests and query</p>

    const MenuUnanswered = this.props.questions.length ? this.props.questions.map((question) => {
      count += 1;
      return (
        <div className="col-12" key={question.id}>
          <RenderMenuItem
            question={question}
            class_Name={count % 2 == 0 ? "questionEven" : "questionOdd"}
            onClick={this.props.onClick}
            auth={this.props.auth}
            deleteQuestion={this.props.deleteQuestion}
            answers={this.props.answers}
            reactions={this.props.reactions}
            postReaction={this.props.postReaction}
            filter={this.state.filter}
          />
        </div>
      );
    })
    :
      <p className='info-text'>No Questions Matched your interests and query</p>

    if (
      this.props.isLoading ||
      this.props.answersIsLoading ||
      this.props.reactionsIsLoading
    ) {
      return <Loading type="spokes" color="grey" />;
    } else if (
      this.props.errMess ||
      this.props.answersErrMess ||
      this.props.reactionsErrMess
    ) {
      return (
        <div className="container spaces">
          <div className="row">
            <div className="col-12">
              <h4>{this.props.errMess || this.props.answersErrMess || this.props.reactionsErrMess}</h4>
            </div>
          </div>
        </div>
      );
    } else if (this.props.questions) {
      var renderQuestions;

      if (this.state.filter === "Latest") {
        renderQuestions = MenuDate;
      } else if (this.state.filter === "Votes") {
        renderQuestions = MenuVotes;
      } else if (this.state.filter === "Unanswered")
        renderQuestions = MenuUnanswered;
      else if (this.state.filter === "Views") renderQuestions = MenuViews;

      return (
        <>
          <div>
            <section className="new_section">
              <div className="container col-12 home-questions">
                <div className="row">
                  <div className="container category-div ">
                    <div className="row ml-1 mt-2 mr-1">
                      <Nav className="col-12 " tabs>
                        <NavItem className="mb-4 filters">
                          <NavLink
                            href="#"
                            active={
                              this.state.filter === "Latest" ? true : false
                            }
                            onClick={() => this.onLatestSelect()}
                          >
                            Latest
                          </NavLink>
                        </NavItem>
                        <NavItem className="mb-4 filters">
                          <NavLink
                            href="#"
                            active={
                              this.state.filter === "Votes" ? true : false
                            }
                            onClick={() => this.onVotesSelect()}
                          >
                            Votes
                          </NavLink>
                        </NavItem>
                        <NavItem className="mb-4 filters">
                          <NavLink
                            href="#"
                            active={
                              this.state.filter === "Views" ? true : false
                            }
                            onClick={() => this.onViewsSelect()}
                          >
                            Views
                          </NavLink>
                        </NavItem>
                        <NavItem className="mb-4 filters">
                          <NavLink
                            href="#"
                            active={
                              this.state.filter === "Unanswered" ? true : false
                            }
                            onClick={() => this.onUnansweredSelect()}
                          >
                            Unanswered
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </div>
                </div>
                <div
                  id="all-questions-id"
                  className="row mt-4 justify-content-center"
                >
                  {renderQuestions}
                </div>
              </div>
            </section>
          </div>
        </>
      );
    }
  }
}
export default AllCategory;
