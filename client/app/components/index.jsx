import * as React from 'react';
import './index.css';

export default class Index extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
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