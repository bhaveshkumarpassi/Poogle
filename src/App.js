import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history'
import Header from './components/header_footer/header';
import Footer from './components/header_footer/footer'
import Home from './components/home_page/home'
function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path ='/'>
            <Header/>
            <Home/>
            <Footer/>
          </Route>
          
        </Switch>
        
      </Router>
    </div>
  )
}


export default App;
