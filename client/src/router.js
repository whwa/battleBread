import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

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
  )
  
  export default Root