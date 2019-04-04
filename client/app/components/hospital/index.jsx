import * as React from 'react';
import './index.css';
import SpeechRecognitionService from './speechRecognitionService';
import SpeechProcessorService from './speechProcessorService';
export default class Search extends React.Component {
  constructor() {
    super();
    this.state = { recording: false, result: '', patientName: '', phoneNum: '', country: '', city: '', state: '', zip: '' };
    this.recognition = new SpeechRecognitionService();
    this.processor = new SpeechProcessorService();
  }
  startRecording = () => {
    this.recognition.onResult((result, isFinal) => {
      if (isFinal) {
        this.processor.process(result);
        // this.speechTranscriptSplitting();
      }
      this.setState({ result });
      this.speechTranscriptSplitting();
    });
    this.recognition.onEnd(() => {
      this.setState({ recording: false });
    });
    this.recognition.start();
    this.setState({ recording: true });
  }
  stopRecording = () => {
    this.setState({ recording: false });
    this.recognition.stop();
  }
  toggleRecording = () => {
    debugger;
    this.state.recording ? this.stopRecording() : this.startRecording();
  }
  speechProcessing(splittedValue) {
    var tempStringholder = '';
    var foundAttribute = 0;
    for (let i = 0; i < splittedValue.length; i++) {
      if ( splittedValue[i] !== '...' ) {
        if (splittedValue[i] === 'Patient' || splittedValue[i] === 'patient') {
          i += 1;
          if (splittedValue[i] === 'Name' || splittedValue[i] === 'name' || splittedValue[i] === 'NAME') {
            foundAttribute = 1;
          } 
        } else if (splittedValue[i] === 'Phone' || splittedValue[i] === 'phone') {
          i += 1;
          foundAttribute = 2;
        } else if (splittedValue[i] === 'City' || splittedValue[i] === 'city') {
          foundAttribute = 3;
        } else if (splittedValue[i] === 'State' || splittedValue[i] === 'state') {
          foundAttribute = 4;
        } else if (splittedValue[i] === 'Zip' || splittedValue[i] === 'zip') {
          foundAttribute = 5;
        } else {
          foundAttribute = 0;          
        }
        while ( i < splittedValue.length ) {
          i += 1;
          if ( splittedValue[i] !== undefined && splittedValue[i] !== 'undefined' ) {
            tempStringholder += splittedValue[i];
          }
        }
        if (foundAttribute === 1 && (this.state.patientName === '' || this.state.patientName === undefined)) {
          this.setState({patientName: tempStringholder});
        } else if (foundAttribute === 2 && (this.state.phoneNum === '' || this.state.phoneNum === undefined)) {
          this.setState({phoneNum: tempStringholder});
        } else if (foundAttribute === 3 && (this.state.city === '' || this.state.city === undefined)) {
          this.setState({city: tempStringholder});
        } else if (foundAttribute === 4 && (this.state.state === '' || this.state.state === undefined)) {
          this.setState({state: tempStringholder});
        } else if (foundAttribute === 5 && (this.state.zip === '' || this.state.zip === undefined)) {
          this.setState({zip: tempStringholder});
        } else {
          foundAttribute = 0;
        }
      }
    }
  }
  speechTranscriptSplitting() {
    if (this.state.result !== undefined && this.state.recording === true) {
      var splitText = this.state.result.split(' ', 30);
      if (splitText.length !== 1) {
        this.speechProcessing(splitText);
      }      
    }
  }
  onTodoChange(value,field){
    switch(field) {
      case 'phnum':
        this.setState({phoneNum: value});
        break;
      case 'pName' :
        this.setState({patientName :value});
        break;
      case 'country':
        this.setState({country: value});
        break;
      case 'city':
        this.setState({city: value});
        break;
      case 'state':
        this.setState({state: value});
        break;
      case 'zip':
        this.setState({zip: value});
        break;
      default : 
        break;
    }
  }

  render() {
    
    return (
      <div id="background" >
        <video autoPlay muted loop id="myVideo">
          <source src="https://i.imgur.com/opAFou0.mp4" type="video/mp4" />
        </video>
        <div className="navbar">
          <a className="active" href="home/index"> Search </a> 
          <a href="/hospital/index"> New Patient </a> 
          <button > Logout </button>
          <label> Edwards,Abraham </label>
        </div>
        <div className="sidenav">
          <form >
          <input id="patientName" placeholder="Patient Name*" value={this.state.patientName} type="text"  onChange={e => this.onTodoChange(e.target.value,'pName')} required/> 
            <input id="phnum" placeholder="Phone Number*" value={this.state.phoneNum} type="text" onChange={e => this.onTodoChange(e.target.value,'phnum')} required/>  
            <input id="country" placeholder="Country" value={this.state.country} type="text" onChange={e => this.onTodoChange(e.target.value,'country')}/> 
            <input id="city" placeholder="City" value={this.state.city} type="text" onChange={e => this.onTodoChange(e.target.value,'city')}/>  
            <input id="state" placeholder="State" value={this.state.state} type="text" onChange={e => this.onTodoChange(e.target.value,'state')} />  
            <input id="zip" placeholder="ZIP"  type="text" />
            <button className="submit" value="submit" > Submit </button>  
          </form>
          <button className="record" onClick={this.toggleRecording}>
              {this.state.recording ? 'Recording' : 'Record'} </button>
         </div>        
      </div>
    );      
  }
}
