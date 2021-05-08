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
  ButtonGroup,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import Loading from "../loading";
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

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "Latest",
      latestActive: true,
      votesActive: false,
      unansweredActive: false,
      data: [],
    };
  }

  onLatestSelect() {
    this.setState({
      filter: "Latest",
      latestActive: true,
      votesActive: false,
      unansweredActive: false,
    });
  }

  onVotesSelect() {
    this.setState({
      filter: "Votes",
      latestActive: false,
      votesActive: true,
      unansweredActive: false,
    });
  }

  onUnansweredSelect() {
    this.setState({
      filter: "Unanswered",
      latestActive: false,
      votesActive: false,
      unansweredActive: true,
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

    var count = -1;
    const MenuDate = this.props.questions ? (
      this.props.questions
        .sort((a, b) => b.dateNum - a.dateNum)
        .map((question) => {
          count += 1;
          return (
            <div className="col-12" key={question._id}>
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
    ) : (
      <p>Be first one to add a question to this space!!</p>
    );

    const MenuVotes = this.props.questions ? (
      this.props.questions
        .sort(
          (a, b) =>
            voteCount(this.props.reactions, b) -
            voteCount(this.props.reactions, a)
        )
        .map((question) => {
          count += 1;
          return (
            <div className="col-12" key={question._id}>
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
    ) : (
      <p>Be first one to add a question to this space!!</p>
    );

    const MenuUnanswered = this.props.questions ? (
      this.props.questions.map((question) => {
        count += 1;
        return (
          <div className="col-12" key={question._id}>
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
    ) : (
      <p>Be first one to add a question to this space!!</p>
    );

    if (
      this.props.isLoading ||
      this.props.questionsIsLoading ||
      this.props.answersIsLoading ||
      this.props.reactionsIsLoading
    ) {
      return <Loading type="spokes" color="grey" />;
    } else if (
      this.props.errMess ||
      this.props.questionsErrMess ||
      this.props.answersErrMess ||
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
      var renderQuestions;

      if (this.state.filter === "Latest") {
        renderQuestions = MenuDate;
      } else if (this.state.filter === "Votes") {
        renderQuestions = MenuVotes;
      } else renderQuestions = MenuUnanswered;

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
              <h4 className="row all-ques-heading justify-content-center">
                All Questions
              </h4>
              <div className="row justify-content-center mt-4">
                <ButtonGroup className="mb-4 button-grp col-8 col-md-4 col-lg-3">
                    <Button disabled outline color="info">
                      <span className="fa fa-lg fa-question-circle mr-2" />
                      {this.props.questions.length} Questions
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
                  <Link style={{ color: "white" }} to="/addQuestion">
                  <span className="fa fa-lg fa-plus mr-2 ml-2" />
                  QUESTION
                  </Link>
                </Button>
              </div>
              <div className="row ml-1 mt-3 mr-1">
                <Nav className="col-12 " tabs>
                  <NavItem className="mb-4 filters">
                    <NavLink
                      href="#"
                      active={this.state.latestActive}
                      onClick={() => this.onLatestSelect()}
                    >
                      Latest
                    </NavLink>
                  </NavItem>
                  <NavItem className="mb-4 filters">
                    <NavLink
                      href="#"
                      active={this.state.votesActive}
                      onClick={() => this.onVotesSelect()}
                    >
                      Votes
                    </NavLink>
                  </NavItem>
                  <NavItem className="mb-4 filters">
                    <NavLink
                      href="#"
                      active={this.state.unansweredActive}
                      onClick={() => this.onUnansweredSelect()}
                    >
                      Unanswered
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </div>
          </div>

          <div id="all-questions-id" className="row justify-content-center">
            {this.props.questions.length ? (
              renderQuestions
            ) : (
              <p className="mt-5">
                Currently no questions for this space. be first one to
                contribute a question to this space
              </p>
            )}
          </div>
        </div>
      );
    }
  }
}

export default Questions;
