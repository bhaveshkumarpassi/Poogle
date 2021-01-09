import React, { Component } from 'react';
import { Route, Router, Switch, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchSpaces } from '../redux/ActionCreators';
import history from '../history'
import Header from './header_footer/header';
import Footer from './header_footer/footer';
import Home from './home_page/home';
import Spaces from './spaces_page/Spaces';

const mapStateToProps = state => {
    return {
      spaces: state.spaces
    }
  }

const mapDispatchToProps = dispatch => ({

    fetchSpaces: () => { dispatch(fetchSpaces())}
});

class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSpaces();
    }

    const 
    render() {
        return(
            <div>
                {/* <Router history={history}> */}
                    <Header/>
                    <Switch>
                        <Route path ='/home' component={() => <Home/>}/>
                        <Route path ='/spaces' component={() => <Spaces spaces={this.props.spaces}/>}/>
                        <Redirect to="/home" />
                    </Switch>
                    <Footer/>
                {/* </Router> */}
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));