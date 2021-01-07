import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/main';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  )
}


export default App;
