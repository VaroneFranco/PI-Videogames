import './App.css';
import React, { Component }  from 'react';
import {Route} from 'react-router'
import { Landing } from './Components/Landing';
function App() {
  return (
    <div className="App">
      {/* <h1>Henry Videogames</h1> */}
      <Route path='/' component={Landing}/>
    </div>
  );
}

export default App;
