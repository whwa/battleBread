// This file is a skeleton for implementing the React Router. 
// We have not refactored the App to allow for page redirection.
// This page is not currently being used or utilized.  

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

const Root = () => (
  <Router>
    <div>
      <AuthButton/>
      <ul>
        <li><Link to="/gamePage">Public Page</Link></li>
      </ul>
      <Route path="/signup" component={Signup}/>
      <Route path="/login" component={Login}/>
    </div>
  </Router>
);
  
export default Root;