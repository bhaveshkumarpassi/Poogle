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
    Button,
    Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from '../loading';
import '../all_ques_page/questions.css'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

const RenderTags = ({question}) => question.tagNames.map((tag) => {
    return(
        <Badge pill className='tag'>{tag}</Badge>
    );
})

function RenderMenuItem({question, class_Name, onClick}) {
    

    return(
        <ListGroup className='container'>
                <ListGroupItem className={class_Name}>
                    <div className='row'>
                    <div className='col-7 col-md-8'>
                        <ListGroupItemHeading className='question-heading'>{question.question}</ListGroupItemHeading>
                        <RenderTags question={question} />
                        <ListGroupItemText className='question-text'>
                            Posted by :-  {question.author}
                        </ListGroupItemText>
                        <ListGroupItemText className='question-text'>
                            Posted at :- {question.date}
                        </ListGroupItemText>
                    </div>
                    <div className='col-3 col-md-4'>
                        <div className='prop-div'>
                            <Badge className='prop' color='light'>{question.views}</Badge>
                            <p>views</p>
                        </div>
                        <div className='prop-div'>
                            <Badge className='prop' color='light'>{question.answers}</Badge>
                            <p>answers</p>
                        </div>
                        <div className='prop-div'>
                            <Badge className='prop' color='light'>{question.votes}</Badge>
                            <p>votes</p>
                        </div>
                    </div>
                    </div>
                </ListGroupItem>
        </ListGroup>
    );
}

class Questions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: 'Latest',
            latestActive: true,
            votesActive: false,
            unansweredActive: false,
        }
    }

    onLatestSelect() {
        this.setState({
            filter: 'Latest',
            latestActive: true,
            votesActive: false,
            unansweredActive: false
        })
    }

    onVotesSelect() {
        this.setState({
            filter: 'Votes',
            latestActive: false,
            votesActive: true,
            unansweredActive: false,
            
        })
    }

    onUnansweredSelect() {
        this.setState({
            filter: 'Unanswered',
            latestActive: false,
            votesActive: false,
            unansweredActive: true
        })
    }

    render() {
        
        var count = -1;
        const MenuDate = this.props.questions.sort((a,b) => a.dateNum-b.dateNum).map((question) => {

            count += 1;
            return(
                <div className="col-12" key={question.id}>
                    <RenderMenuItem question={question} class_Name={count%2 == 0 ? 'questionEven' : 'questionOdd'} onClick={this.props.onClick} />
                </div>
            );
        }) 

        const MenuVotes = this.props.questions.sort((a,b) => b.votes-a.votes).map((question) => {

            count += 1;
            return(
                <div className="col-12" key={question.id}>
                    <RenderMenuItem question={question} class_Name={count%2 == 0 ? 'questionEven' : 'questionOdd'} onClick={this.props.onClick} />
                </div>
            );
        }) 

        const MenuUnanswered = this.props.questions.filter((question) => question.answers == 0).map((question) => {

            count += 1;
            return(
                <div className="col-12" key={question.id}>
                    <RenderMenuItem question={question} class_Name={count%2 == 0 ? 'questionEven' : 'questionOdd'} onClick={this.props.onClick} />
                </div>
            );
        }) 


        if(this.props.isLoading || this.props.questionsIsLoading) {
            return(
                <Loading type="spokes" color="grey"/>       
            );
        }
        else if(this.props.errMess || this.props.questionsErrMess) {
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

            if(this.state.filter === 'Latest') {
                return(
                    <div className='container questions'>
                        
                        <div className='row col-12'>
                            <Breadcrumb className='mt-3 ml-3'>
                                <BreadcrumbItem><Link to="/spaces">Spaces</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{this.props.space.name}</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <div className='row category-div '>
                            
                            <Nav className='col-12' pills fill>
                                <div className='row col-12'>
                                    <h4 className='col-12 col-md-12 col-lg-3 mb-4 all-ques-heading'>All Questions</h4>
                                    <Badge pill className='prop-main1 mt-0' color='light'><h6><span className='fa fa-question-circle fa-lg question-icon mr-2 mt-2'></span>{this.props.questions.length} questions</h6></Badge>
                                    <Badge pill className='prop-main2 mt-0' color='light'><h6><span className='fa fa-users fa-lg follower-icon mr-2 mt-2'></span>{this.props.space.followers} followers</h6></Badge>
                                    <Button className='col-12 col-md-12 col-lg-3 mb-4 add-ques-btn' color='primary'><span className='fa fa-lg fa-plus mr-3 ml-3' />ASK A QUESTION  </Button>
                                </div>
                                <div className='row col-12'>
                                    <NavItem className='mb-4'>
                                        <NavLink href='#' active={this.state.latestActive} onClick={() => this.onLatestSelect()}>Latest</NavLink>
                                    </NavItem>
                                    <NavItem className='mb-4'>
                                        <NavLink href='#' active={this.state.votesActive} onClick={() => this.onVotesSelect()}>Votes</NavLink>
                                    </NavItem>
                                    <NavItem className='mb-4'>
                                        <NavLink href='#' active={this.state.unansweredActive} onClick={() => this.onUnansweredSelect()}>Unanswered</NavLink>
                                    </NavItem>
                                </div>
                            </Nav>
                        </div>
                        <div className="row justify-content-center">
                                {MenuDate}
                        </div>
                        
                    </div>
               );
            }
            else if(this.state.filter === 'Votes') {
                return(
                    <div className='container questions'>
                        <div className='row'>
                            <Breadcrumb className='mt-3 ml-3'>
                                <BreadcrumbItem><Link to="/spaces">Spaces</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{this.props.space.name}</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <div className='row category-div '>
                            <Nav className='col-12' pills fill>
                                <div className='row col-12 '>
                                    <h4 className='col-12 col-md-12 col-lg-3 mb-4 all-ques-heading'>All Questions</h4>
                                    <Badge pill className='prop-main1 mt-0' color='light'><h6><span className='fa fa-question-circle fa-lg question-icon mr-2 mt-2'></span>{this.props.questions.length} questions</h6></Badge>
                                    <Badge pill className='prop-main2 mt-0' color='light'><h6><span className='fa fa-users fa-lg follower-icon mr-2 mt-2'></span>{this.props.space.followers} followers</h6></Badge>
                                    <Button className='col-12 col-md-12 col-lg-3 mb-4 add-ques-btn' color='primary'><span className='fa fa-lg fa-plus mr-3 ml-3' />ASK A QUESTION  </Button>
                                </div>
                                <div className='row col-12'>
                                    <NavItem className='mb-4'>
                                        <NavLink href='#' active={this.state.latestActive} onClick={() => this.onLatestSelect()}>Latest</NavLink>
                                    </NavItem>
                                    <NavItem className='mb-4'>
                                        <NavLink href='#' active={this.state.votesActive} onClick={() => this.onVotesSelect()}>Votes</NavLink>
                                    </NavItem>
                                    <NavItem className='mb-4'>
                                        <NavLink href='#' active={this.state.unansweredActive} onClick={() => this.onUnansweredSelect()}>Unanswered</NavLink>
                                    </NavItem>
                                </div>
                            </Nav>
                        </div>
                        <div className="row justify-content-center">
                            {MenuVotes}
                        </div>
                    </div>
               );
            }
            else if(this.state.filter === 'Unanswered') {
                return(
                    <div className='container questions'>
                        <div className='row'>
                            <Breadcrumb className='mt-3 ml-3'>
                                <BreadcrumbItem><Link to="/spaces">Spaces</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{this.props.space.name}</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <div className='row category-div '>

                            <Nav className='col-12' pills fill>
                                <div className='row col-12'>
                                    <h4 className='col-12 col-md-12 col-lg-3 mb-4 all-ques-heading'>All Questions</h4>
                                    <Badge pill className='prop-main1 mt-0' color='light'><h6><span className='fa fa-question-circle fa-lg question-icon mr-2 mt-2'></span>{this.props.questions.length} questions</h6></Badge>
                                    <Badge pill className='prop-main2 mt-0' color='light'><h6><span className='fa fa-users fa-lg follower-icon mr-2 mt-2'></span>{this.props.space.followers} followers</h6></Badge>
                                    <Button className='col-12 col-md-12 col-lg-3 mb-4 add-ques-btn' color='primary'><span className='fa fa-lg fa-plus mr-3 ml-3' />ASK A QUESTION  </Button>
                                </div>
                                <div className='row col-12'>
                                    <NavItem className='mb-4'>
                                        <NavLink href='#' active={this.state.latestActive} onClick={() => this.onLatestSelect()}>Latest</NavLink>
                                    </NavItem>
                                    <NavItem className='mb-4'>
                                        <NavLink href='#' active={this.state.votesActive} onClick={() => this.onVotesSelect()}>Votes</NavLink>
                                    </NavItem>
                                    <NavItem className='mb-4'>
                                        <NavLink href='#' active={this.state.unansweredActive} onClick={() => this.onUnansweredSelect()}>Unanswered</NavLink>
                                    </NavItem>
                                </div>
                            </Nav>
                        </div>
                        <div className="row justify-content-center">
                            {MenuUnanswered}
                        </div>
                    </div>
               );
            }
        }
       
    }
}

export default Questions;