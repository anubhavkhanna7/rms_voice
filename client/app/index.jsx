import ReactOnRails from 'react-on-rails';
import $ from 'jquery';
import HelloWorld from './components/HelloWorld';
import App from './components/App'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  App
});


// This is needed to add the csrf token to every ajax call
$.ajaxSetup({
  beforeSend: (xhr) => {
    xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
  },
});
