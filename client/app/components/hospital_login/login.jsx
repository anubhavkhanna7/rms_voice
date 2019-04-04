import * as React from 'react';
import './index.css';

export default class Login extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div id = "background">
        <video autoPlay muted loop id="myVideo">
          <source src="https://i.imgur.com/opAFou0.mp4" type="video/mp4" />
        </video>
        <div id="container">     
          <form>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" />
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" />
            <div id="lower">
                <input type="checkbox" id="checkbox"/><label for="checkbox">Keep me logged in</label>
                <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    );      
        
  }
}