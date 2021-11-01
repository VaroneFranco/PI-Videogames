import './App.css';
import React  from 'react';
import {Route} from 'react-router'
import  Landing from './Components/Landing';
import Home from './Components/Home'
import Videogame from './Components/Videogame';
import VideogameCreator from './Components/VideogameCreator';


function App() {
  return (
    <div className="App">
     
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={Home} />
      <Route path='/videogame/:id' render={({match})=> <Videogame id={match.params.id}/> } />
      <Route exact path="/videogame" component={VideogameCreator}/>
      
    </div>
  );
}

export default App;
