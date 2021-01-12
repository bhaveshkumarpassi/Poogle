import React, { Component } from 'react';
import { Route, Router, Switch, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchSpaces, fetchQuestions } from '../redux/ActionCreators';
import history from '../history'
import Header from './header_footer/header';
import Footer from './header_footer/footer';
import Home from './home_page/home';
import Spaces from './spaces_page/Spaces';
import Questions from './all_ques_page/questions';
import Profile_page from './profile_page/profile'

const mapStateToProps = state => {
    return {
      spaces: state.spaces,
      questions: state.questions
    }
  }

const mapDispatchToProps = dispatch => ({

    fetchSpaces: () => { dispatch(fetchSpaces())},
    fetchQuestions: () => { dispatch(fetchQuestions())}
});

class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSpaces();
        this.props.fetchQuestions();
    }

    render() {

        const SpaceWithId = ({match}) => {
            return(
            <Questions 
                space={this.props.spaces.spaces.filter((space) => space.id === parseInt(match.params.spaceId,10))[0]}
                questions={this.props.questions.questions.filter((question) => question.tagIds.indexOf(parseInt(match.params.spaceId,10)) > -1)}
                questionsErrMess={this.props.questions.errMess}
                questionsIsLoading={this.props.questions.isLoading}
                errMess={this.props.spaces.errMess}
                isLoading={this.props.spaces.isLoading}
            />
            );
        }

        return(
            <div>
                <Router history={history}>
                    <Header/>
                    <Switch>
                        <Route path ='/home' component={() => <Home/>}/>
                        <Route exact path ='/spaces' component={() => <Spaces spaces={this.props.spaces}/>}/>
                        <Route path ='/spaces/:spaceId' component={SpaceWithId}/>
                        <Route path="/profile" component={() => <Profile_page/>}/>
                        <Redirect to="/home" />
                    </Switch>
                    <Footer/>
                </Router>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));