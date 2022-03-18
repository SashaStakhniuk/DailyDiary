import '../styles/App.css';
import React from 'react';
import {Switch,NavLink,Route, BrowserRouter as Router} from "react-router-dom"
import Login from './Login.js'
import NotFound from './NotFound'
import Student, {} from './Students/Student'

function App(props) {

  return (
    <Router>
          <Switch>
            <Route exact path="/" element={Login}></Route>
            <Route path="/student" element={Student}></Route>
            <Route path='*' exact={true} element={NotFound}></Route>
          </Switch>
    </Router>
  );
}

export default App;
