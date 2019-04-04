import ReactOnRails from 'react-on-rails';
import $ from 'jquery';
import HelloWorld from './components/HelloWorld';
import App from './components/hospital/App';
import Login from './components/hospital_login/login';
import Search from './components/hospital/index'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  App,
  Login,
  Search
});

// This is needed to add the csrf token to every ajax call
$.ajaxSetup({
  beforeSend: (xhr) => {
    xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
  },
});
