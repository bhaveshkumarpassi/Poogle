import React, {Component, useState} from 'react';
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
import { Row, Col, Container, 
        Card, CardBody, CardTitle, CardSubtitle, CardText, Collapse,
        ButtonGroup, Button, CardImg, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Media, Label, Jumbotron} from "reactstrap";
import {LocalForm, Control, Errors} from 'react-redux-form';
import Loading from "../loading";
import { baseUrl } from "../../shared/baseUrl";
import profilePic from '../../Images/profile_pic.png';
import "../single_ques/SingleQues.css";
import { Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);

const RenderTags = ({question}) => question.tagNames.map((tag) => {
    return(
        <Badge pill className='mr-2' color='primary'>{tag}</Badge>
    );
})

const RenderAnswers = ({answers}) => answers.sort((a,b) => b.votes-a.votes).map((ans) => {
    return(
        <Card id={ans.id}>
            <CardBody>
                <Row>
                    <Col className='mb-3 single-question-profile' xs={4} md={3} lg={2}>
                        <CardImg className='single-question-profile-pic' src={profilePic}/>
                        <CardText className='single-question-profile-name'>@{ans.author} got an answer !!!</CardText>
                    </Col>
                    <Col xs={12} md={9} lg={10}>
                        <Row>
                            <Col xs={12}>
                                <CardText className='single-question-description'>{ans.answer}</CardText>
                            </Col>
                            {
                                ans.imageUrl
                                ?
                                <Col xs={12} className='mt-5'>
                                    <CardImg src={ baseUrl + ans.imageUrl} alt='Answer Image'/>
                                </Col>
                                :
                                <Col></Col>
                            }
                        </Row>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <ButtonGroup>
                        <Button color='info'>
                            <span className='fa fa-lg fa-arrow-circle-up' />
                        </Button>
                        <Button color='info' disabled>
                            {ans.votes}
                        </Button>
                        <Button color='info'>
                            <span className='fa fa-lg fa-arrow-circle-down'></span>
                        </Button>
                        <Button color='danger'>
                            <span className='fa fa-lg fa-trash'></span>
                        </Button>
                    </ButtonGroup>   
                </Row>
            </CardBody>
        </Card>
    );
});

function RenderComments({commentsArray, isOpen, postComment, deleteComment, questionId}){

        const [formOpen, setIsOpen] = useState(false);

        const toggle = () => setIsOpen(!formOpen);

        const handleSubmit = (values) =>  { postComment(questionId, 'Elon Mask', values.comment)};
        const onDelete = (commentId) => {
            deleteComment(commentId);
        }

        return(
        <Collapse isOpen={isOpen}>
            <Card>
                <CardBody>
                <div className="col-12 m-1">
                    <div className='row justify-content-between'>
                    <h5 className='col-6'><span className='fa fa-lg fa-comments' style={{color: 'mediumslateblue', fontSize: 50}} /></h5>
                    <Button onClick={() => toggle()} className='mb-3 col-6 col-sm-5 col-md-4 offset-0 add-ans-btn' color='primary'>
                        <span className='button-headings fa fa-plus mr-2'></span>
                        COMMENT
                    </Button>
                    </div>
                    <hr/>
                    <Collapse isOpen={formOpen}>
                        <Card className='mt-3'>
                            <CardBody>
                                <LocalForm onSubmit={handleSubmit}>
                                <div className="row form-group">
                                    <Label htmlFor="comment" className="col-12"><span className='fa fa-lg  fa-pencil-square-o ml-1 mr-2'></span>Comment</Label>
                                    <div className="col-12">
                                        <Control.textarea model=".comment" name="comment" className="form-control"
                                        id="comment" rows="6"
                                        placeholder={'Type your comment here ....'}
                                        validators={{required,maxLength: maxLength(500)}} />
                                        <Errors className="text-danger"
                                            show="touched"
                                            model=".comment"
                                            messages={{
                                                required: "Required",
                                                maxLength: 'Must be 500 characters or less'
                                            }} />
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-12">
                                        <Button type="submit" color="success">Submit</Button>
                                    </div>
                                </div>
                                
                            </LocalForm>
                            </CardBody>
                        </Card>
                    </Collapse>
                    <ul className="list-unstyled" >
                        <Stagger in>
                        {
                        commentsArray.sort((a,b) => b.dateNum-a.dateNum).map((comm) => {
                            return (
                                <Fade in>
                                    <li key={comm.id}>
                                        <Media className='row mt-4'>
                                            <Media left className='mr-0 col-4 col-md-2' >
                                                <Media object className='ml-0 comments-profile-pic' src = {profilePic} alt={comm.author} />
                                                <br/>
                                                <p className='comments-data'><b>{comm.author}</b> at {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comm.date)))}</p>
                                            </Media>
                                            <Media className=' comment mr-0 col-8 col-md-10' body>
                                                {comm.comment}
                                                
                                            </Media>
                                            <Media>
                                                <Button 
                                                    onClick={() => onDelete(comm.id)}
                                                    className='fa fa-trash'
                                                />
                                            </Media>
                                        </Media>
                                        <hr/>
                                    </li>
                                </Fade>
                                );
                            })
                        }
                        </Stagger>    
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

        this.state={
            shareModalOpen: false,
            showComments: false
        }
    }

    onShareClicked() {
        this.setState({
            shareModalOpen: !this.state.shareModalOpen
        })
    }

    onCommentsClicked() {
        this.setState({
            showComments: !this.state.showComments
        })
    }

    render() {
    return(
    <div>
        <Card>
            <CardBody>
                    <CardTitle className='single-question-heading'>{this.props.question.question}</CardTitle>
                <hr></hr>
                <Row>
                    <Col className='mb-3 single-question-profile' xs={4} md={3} lg={2}>
                        <CardImg className='single-question-profile-pic' src={profilePic}/>
                        <CardText className='single-question-profile-name'>@{this.props.question.author} has a question ????</CardText>
                    </Col>
                    <Col xs={12} md={9} lg={10}>
                        <Row>
                            <Col className='mb-3'>
                                <RenderTags question={this.props.question} />
                            </Col>
                            <Col xs={12}>
                                <CardText className='single-question-description'>{this.props.question.description}</CardText>
                            </Col>
                            {
                                this.props.question.imageUrl
                                ?
                                <Col xs={12} className='mt-5'>
                                    <CardImg src={ baseUrl + this.props.question.imageUrl} alt='Question Image'/>
                                </Col>
                                :
                                <Col></Col>
                            }
                        </Row>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <ButtonGroup>
                        <Button color='info'>
                            <span className='fa fa-lg fa-arrow-circle-up' />
                        </Button>
                        <Button color='info' disabled>
                            {this.props.question.votes}
                        </Button>
                        <Button color='info'>
                            <span className='fa fa-lg fa-arrow-circle-down'></span>
                        </Button>
                        <Button color='danger' onClick={() => this.onCommentsClicked()}>
                            <span className='fa fa-lg fa-comment mr-2' />
                            {this.props.comments.length}
                        </Button>
                        <Button color='success' onClick={() => this.onShareClicked()}>
                            <span className='fa fa-lg fa-share'></span>
                        </Button>
                        <Button>
                            <span className='fa fa-lg fa-trash'></span>
                        </Button>
                        
                    </ButtonGroup>   
                </Row>
            </CardBody>
        </Card>
        <RenderComments 
            commentsArray={this.props.comments}  
            postComment={this.props.postComment}
            deleteComment={this.props.deleteComment} 
            questionId={this.props.question.id} 
            isOpen={this.state.showComments}></RenderComments>
        <Card>
            <CardBody>
                <div className='row justify-content-between'>
                    <CardSubtitle className='col-6'>{this.props.answers.length} Answers(s)</CardSubtitle>
                    <Button className='col-6 col-sm-5 col-md-4 add-ans-btn' color='danger'>
                        <span className='fa fa-lg fa-plus mr-2'></span>
                        ANSWER
                    </Button>
                </div>
                <hr></hr>
                <RenderAnswers answers = {this.props.answers} />
            </CardBody>
        </Card>
        <Modal isOpen={this.state.shareModalOpen} toggle={() => this.onShareClicked()}>
            <ModalHeader toggle={() => this.onShareClicked()}>Let's Share this !!</ModalHeader>
            <ModalBody>
                <FacebookShareButton url={'http://localhost:3000/space-'+this.props.spaceId+'/question-'+this.props.question.id} title={'Can you answer this ??'} quote={'Can you answer this ??'} hashtag={'#Poogle'}>
                    <FacebookIcon round={true}></FacebookIcon>
                </FacebookShareButton>
                <WhatsappShareButton url={'http://localhost:3000/space-'+this.props.spaceId+'/question-'+this.props.question.id+'/#1'} title={'Can you answer this ??'} separator={'\n'}>
                    <WhatsappIcon round={true}></WhatsappIcon>
                </WhatsappShareButton>
                <TelegramShareButton url={'http://localhost:3000/space-'+this.props.spaceId+'/question-'+this.props.question.id} title={'Can you answer this ??'}>
                    <TelegramIcon round></TelegramIcon>
                </TelegramShareButton>
                <LinkedinShareButton url={'http://localhost:3000/space-'+this.props.spaceId+'/question-'+this.props.question.id} title={'Can you answer this ??'} source={'WWW.poogle.com'}>
                    <LinkedinIcon round></LinkedinIcon>
                </LinkedinShareButton>
                <TwitterShareButton url={'http://localhost:3000/space-'+this.props.spaceId+'/question-'+this.props.question.id} title={'Can you answer this ??'} hashtags={'#Poogle'}>
                    <TwitterIcon round></TwitterIcon>
                </TwitterShareButton>
                <RedditShareButton url={'http://localhost:3000/space-'+this.props.spaceId+'/question-'+this.props.question.id} title={'Can you answer this ??'}>
                    <RedditIcon round></RedditIcon>
                </RedditShareButton>
                <PinterestShareButton url={'http://localhost:3000/space-'+this.props.spaceId+'/question-'+this.props.question.id} description={'Can you answer this ??'} title={'Can you answer this ??'}>
                    <PinterestIcon round></PinterestIcon>
                </PinterestShareButton>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.onShareClicked()}>Cancel</Button>
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

        if(this.props.isLoading || this.props.answersIsLoading){
            return(
                <Loading type="spokes" color="grey"/> 
            );
        }
        else if(this.props.errMess || this.props.answersErrMess || this.props.commentsErrMess) {
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
            return(
                <Container className='single-question'>
                    <Row className='justify-content-center mt-5'>
                        <Col lg={10}>
                            <RenderQuestionAnswers 
                                question={this.props.question} 
                                answers={this.props.answers} 
                                comments={this.props.comments} 
                                spaceId={this.props.spaceId}
                                postComment={this.props.postComment} 
                                deleteComment={this.props.deleteComment}
                                onClick={this.props.onClick} />
                        </Col>  
                    </Row> 
                </Container>
            );    
        }
        
    }
}

export default SingleQuestion;