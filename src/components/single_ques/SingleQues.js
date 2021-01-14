import React, {Component} from 'react';
import { Row, Col, Container, 
        Card, CardBody, CardTitle, CardSubtitle, CardText,
        ButtonGroup, Button, CardImg, Badge} from "reactstrap";
import { Image } from 'react-bootstrap';
import Loading from "../loading";
import { baseUrl } from "../../shared/baseUrl";
import profilePic from '../../Images/profile_pic.png';
import "../single_ques/SingleQues.css";

const RenderTags = ({question}) => question.tagNames.map((tag) => {
    return(
        <Badge pill className='mr-2' color='primary'>{tag}</Badge>
    );
})

const RenderAnswers = ({answers}) => answers.map((ans) => {
    return(
        <Card>
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
                            <span className='fa fa-lg fa-share'></span>
                        </Button>
                        <Button>
                            <span className='fa fa-lg fa-trash'></span>
                        </Button>
                    </ButtonGroup>   
                </Row>
            </CardBody>
        </Card>
    );
});

const RenderQuestionAnswers = ({question, answers, onClick}) => {

    
    return(
    <div>
        <Card>
            <CardBody>
                <CardTitle className='single-question-heading'>{question.question}</CardTitle>
                <hr></hr>
                <Row>
                    <Col className='mb-3 single-question-profile' xs={4} md={3} lg={2}>
                        <CardImg className='single-question-profile-pic' src={profilePic}/>
                        <CardText className='single-question-profile-name'>@{question.author} has a question ????</CardText>
                    </Col>
                    <Col xs={12} md={9} lg={10}>
                        <Row>
                            <Col className='mb-3'>
                                <RenderTags question={question} />
                            </Col>
                            <Col xs={12}>
                                <CardText className='single-question-description'>{question.description}</CardText>
                            </Col>
                            {
                                question.imageUrl
                                ?
                                <Col xs={12} className='mt-5'>
                                    <CardImg src={ baseUrl + question.imageUrl} alt='Question Image'/>
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
                            {question.votes}
                        </Button>
                        <Button color='info'>
                            <span className='fa fa-lg fa-arrow-circle-down'></span>
                        </Button>
                        <Button color='danger'>
                            <span className='fa fa-lg fa-comment mr-2' />
                            {question.votes}
                        </Button>
                        <Button color='success'>
                            <span className='fa fa-lg fa-share'></span>
                        </Button>
                        <Button>
                            <span className='fa fa-lg fa-trash'></span>
                        </Button>
                    </ButtonGroup>   
                </Row>
            </CardBody>
        </Card>
        <Card>
            <CardBody>
                <CardSubtitle>{answers.length} Answers(s)</CardSubtitle>
                <hr></hr>
                <RenderAnswers answers = {answers} />
            </CardBody>
        </Card>
    </div>
    );
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
        else if(this.props.errMess || this.props.answersErrMess) {
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
                            <RenderQuestionAnswers question={this.props.question} answers={this.props.answers} onClick={this.props.onClick} />
                        </Col>  
                    </Row> 
                </Container>
            );    
        }
        
    }
}

export default SingleQuestion;