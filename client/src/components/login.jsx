import React from 'react'

const Login = () => (
  <div>
    <h2>Login</h2>
    <form action="/login" method="post">
    </form>
    <div>
      <label for="username">Username:</label>
      <input id="username" type="text" name="username"></input>
    </div>
    <div>
      <label for="password">Password:</label>
      <input id="password" type="password" name="password"></input>
    </div>
    <div>
      <input type="submit" value="Login"></input>
    </div>
    <div>
      <a href="/signup">Login with your Google Account</a>
    </div>
  </div>
);