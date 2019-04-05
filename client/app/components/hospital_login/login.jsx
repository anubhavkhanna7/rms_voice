import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../hospital/App';
import asyncHandler from '../hospital/asyncHandler';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: ''};
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  onTodoChange(value, field){
    if(field === "uname") {
      this.setState({username: value});
    } else {
      this.setState({password: value});
    }
    
  }
  handleFormSubmit(event) {
    event.preventDefault();
    var data = {employeeId: this.state.username, password: this.state.password};
    const promiseObject = asyncHandler('/login', 'GET', data);
    promiseObject.then((results) => {
      var details = (Object.values(results));
      console.log("got results ",details);
      ReactDOM.render(<App username= {this.state.username} />, document.body);
    }, (error) => {
      console.log(error);
      // Nothing to do here
    });
    //window.location.assign('/hospital/index/', this.state.username);  

    return (<App username={this.state.username} />);
  }
  render() {
    return (
      <div id = "background">
        <video autoPlay muted loop id="myVideo">
          <source src="https://i.imgur.com/opAFou0.mp4" type="video/mp4" />
        </video>
        <div id="container">     
          <form onSubmit= {this.handleFormSubmit}>
            <label >Username:</label>
            <input id="username" placeholder="User Name" value={this.state.username} type="text"  onChange={e => this.onTodoChange(e.target.value,"uname")} />
            <label >Password:</label>
            <input type="password" value={this.state.password} onChange={e => this.onTodoChange(e.target.value,"pass")} placeholder="Password" id="password" name="password" />
            <div id="lower">
                <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    );      
        
  }
}