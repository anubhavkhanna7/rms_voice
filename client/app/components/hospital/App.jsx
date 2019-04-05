import * as React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import SpeechRecognitionService from './speechRecognitionService';
import SpeechProcessorService from './speechProcessorService';
import asyncHandler from './asyncHandler';
class App extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired // this is passed from the Rails view
  };
  constructor(props) {
    super(props);
    this.state = { recording: false, result: '', username: this.props.username, providerId: '', patientId: '', patientName: '', 
    hospitalName: '', hospitalAddress: '', phoneNum: '', country: '', city: '', state: '', county: '', zip: '' };
    this.recognition = new SpeechRecognitionService();
    this.processor = new SpeechProcessorService();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  startRecording = () => {
    this.recognition.onResult((result, isFinal) => {
      if (isFinal) {
        this.processor.process(result);
        this.speechTranscriptSplitting();
        
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
    this.state.recording ? this.stopRecording() : this.startRecording();
  }

  // used to split the transcript and input the info into fields
  speechProcessing(splittedValue) {
    var tempStringholder = '';
    var foundAttribute = 0;
    for (let i = 0; i < splittedValue.length; i++) {
      if ( splittedValue[i] !== '...' ) {
        if (splittedValue[i] === 'Provider' || splittedValue[i] === 'provider') {
          i += 1;
          foundAttribute = 1;
        } else if (splittedValue[i] === 'Patient' || splittedValue[i] === 'patient') {
          i += 1;
          if (splittedValue[i] === 'Id' || splittedValue[i] === 'id' || splittedValue[i] === 'ID') {
            foundAttribute = 2;
          } else {
            foundAttribute = 3;
          }
        } else if (splittedValue[i] === 'Hospital' || splittedValue[i] === 'hospital') {
          i += 1;
          if (splittedValue[i] === 'Name' || splittedValue[i] === 'name') {
            foundAttribute = 4;
          } else {
            foundAttribute = 5;
          }
        } else if (splittedValue[i] === 'Phone' || splittedValue[i] === 'phone') {
          i += 1;
          foundAttribute = 6;
        } else if (splittedValue[i] === 'City' || splittedValue[i] === 'city') {
          foundAttribute = 7;
        } else if (splittedValue[i] === 'State' || splittedValue[i] === 'state') {
          foundAttribute = 8;
        } else if (splittedValue[i] === 'County' || splittedValue[i] === 'county') {
          foundAttribute = 9;
        } else if (splittedValue[i] === 'Zip' || splittedValue[i] === 'zip') {
          foundAttribute = 10;
        } else {
          foundAttribute = 0;          
        }
        while ( i < splittedValue.length ) {
          i += 1;
          if ( splittedValue[i] !== undefined && splittedValue[i] !== 'undefined' ) {
            tempStringholder += splittedValue[i];
          }
        }
        if (foundAttribute === 1 && (this.state.providerId === '' || this.state.providerId === undefined)) {
          this.setState({providerId: tempStringholder});
        } else if (foundAttribute === 2 && (this.state.patientId === '' || this.state.patientId === undefined)) {
          this.setState({patientId: tempStringholder});
        } else if (foundAttribute === 3 && (this.state.patientName === '' || this.state.patientName === undefined)) {
          this.setState({patientName: tempStringholder});
        } else if (foundAttribute === 4 && (this.state.hospitalName === '' || this.state.hospitalName === undefined)) {
          this.setState({hospitalName: tempStringholder});
        } else if (foundAttribute === 5 && (this.state.hospitalAddress === '' || 
        this.state.hospitalAddress === undefined)) {
          this.setState({hospitalAddress: tempStringholder});
        } else if (foundAttribute === 6 && (this.state.phoneNum === '' || this.state.phoneNum === undefined)) {
          this.setState({phoneNum: tempStringholder});
        } else if (foundAttribute === 7 && (this.state.city === '' || this.state.city === undefined)) {
          this.setState({city: tempStringholder});
        } else if (foundAttribute === 8 && (this.state.state === '' || this.state.state === undefined)) {
          this.setState({state: tempStringholder});
        } else if (foundAttribute === 9 && (this.state.county === '' || this.state.county === undefined)) {
          this.setState({county: tempStringholder});
        } else if (foundAttribute === 10 && (this.state.zip === '' || this.state.zip === undefined)) {
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
  handleFormSubmit(event) {
    event.preventDefault();
    const attributes = {
    hospitalId : this.state.providerId,
    patientId : this.state.patientId,
    patientName : this.state.patientName,
    hospitalName : this.state.hospitalName,
    hospitalAddr : this.state.hospitalAddress,
    phnum : this.state.phoneNum,
    country : this.state.country,
    city : this.state.city,
    state : this.state.state,
    county: this.state.county,
    zip: this.state.zip
    };
    var data = attributes;
    const promiseObject = asyncHandler('/hospital', 'POST', data);
    promiseObject.then(() => {
      // Nothing to do here
    }, () => {
      // Nothing to do here
    });
  }
  onTodoChange(value,field){
    switch(field) {
      case 'pId':
        this.setState({patientId: value});
        break;
      case 'hId':
        this.setState({providerId: value});
        break;
      case 'hName' :
         this.setState({hospitalName :value});
         break;
      case 'phnum':
        this.setState({phoneNum: value});
        break;
      case 'pName' :
        this.setState({patientName :value});
        break;
      case 'hAddr' :
         this.setState({hospitalAddress :value});
         break;
      case 'country':
        this.setState({country: value});
        break;
      case 'city':
        this.setState({city: value});
        break;
      case 'county':
        this.setState({county: value});
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
    console.log("this.state.username", this.props.username);
    return (
      <div id="background">
        <video autoPlay muted loop id="myVideo">
            <source src="https://i.imgur.com/opAFou0.mp4" type="video/mp4" />
        </video>
        <div className="navbar">
            <a href="/home/index">Search</a> 
            <a className="active" href="/index">New Patient</a>
            <button > Logout </button>
            <label value= {this.state.username} /> 
        </div>
        <div className="form">
          <form onSubmit= {this.handleFormSubmit} >
          <h1> Patient Information</h1>
            <input id="hospitalId" placeholder="Hospital Id" value={this.state.providerId} type="text"  onChange={e => this.onTodoChange(e.target.value,'hId')}/> 
            <input id="hospitalName" placeholder="Hospital Name" value={this.state.hospitalName} type="text"  onChange={e => this.onTodoChange(e.target.value,'hName')}/> 
            <input id="hospitalAddr" placeholder="Hospital Address" value={this.state.hospitalAddress} type="text" onChange={e => this.onTodoChange(e.target.value,'hAddr')}/> 
            <input id="patientId" placeholder="Patient Id" value={this.state.patientId} type="text"  onChange={e => this.onTodoChange(e.target.value,'pId')}/> 
            <input id="patientName" placeholder="Patient Name" value={this.state.patientName} type="text"  onChange={e => this.onTodoChange(e.target.value,'pName')}/> 
            <input id="phnum" placeholder="Phone Number" value={this.state.phoneNum} type="text" onChange={e => this.onTodoChange(e.target.value,'phnum')}/>  
            <input id="country" placeholder="Country" value={this.state.country} type="text" onChange={e => this.onTodoChange(e.target.value,'country')}/> 
            <input id="city" placeholder="City"value={this.state.city} type="text" onChange={e => this.onTodoChange(e.target.value,'city')}/>  
            <input id="state" placeholder="State"value={this.state.state} type="text" onChange={e => this.onTodoChange(e.target.value,'state')} />  
            <input id="county" placeholder="County" value={this.state.county} type="text" onChange={e => this.onTodoChange(e.target.value,'county')}/> 
            <input id="zip" placeholder="ZIP" value={this.state.zip} type="text" onChange={e => this.onTodoChange(e.target.value,'zip')}/>
            <div className="lower">
              <button className="submit" value="submit" > Submit </button>  
              <button className="record" onClick={this.toggleRecording}>
              {this.state.recording ? 'Stop' : 'Start'} recording</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
