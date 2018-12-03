import React, { Component } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Homepage from "./Components/Homepage";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Create from "./Components/Create";
import ViewDetails from "./Components/ViewDetails";
import history from './history';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <div className="header">
            <h1>I-O-U</h1>
          </div>
          <div id="content">

          </div>

    <div>
      <header>
        {/* <nav>
          <Link to={`/`} >Home</Link> |
          <Link to={`/search`} >Search</Link>
        </nav> */}
      </header>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/create" component={Create}/>
        <Route exact path="/viewdetails" component={ViewDetails}/>
      </Switch>
    </div>
    </div>
      </Router>
    );
  }
}

export default App;
