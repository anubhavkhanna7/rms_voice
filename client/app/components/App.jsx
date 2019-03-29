import * as React from 'react';
import './App.css';
import SpeechRecognitionService from './speechRecognitionService';
import SpeechProcessorService from './speechProcessorService';

class App extends React.Component {

  constructor() {
    super();
    this.state = { recording: false, result: '', providerId: '', patientId: '', patientName: '', 
    hospitalName: '', hospitalAddress: '', phoneNum: '', city: 'tryout', state: '', county: '', zip: '' };
    this.recognition = new SpeechRecognitionService();
    this.processor = new SpeechProcessorService();
    console.log(this.state.city);
  }

  startRecording = () => {
    this.recognition.onResult((result, isFinal) => {
      if (isFinal) {
        this.processor.process(result);
        this.speechTranscriptSplitting();
        
      }
       console.log(result);
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

  // componentDidUpdate() { }
  speechTranscriptSplitting() {
    if (this.state.result !== undefined && this.state.recording === true) {
      var splitText = this.state.result.split(' ', 30);
      if (splitText.length !== 1) {
        this.speechProcessing(splitText);
      }      
      
    }
  }

  onTodoChange(value,feild){
    switch(feild) {
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
    return (
      <div>
        <header className="App-header">
        RMS
        </header>
        
        <div className="form">
          <br /> <br />
          
            <div className="column">
              <div className="row">
                <label className="labelText">Provider Id: </label><br /><br /> 
              </div>
              <div className="row">
                <label className="labelText">Patient Id: </label><br /><br /> 
              </div>
              <div className="row">
                <label className="labelText">Patient Name: </label><br /><br /> 
              </div>
              <div className="row">
                <label className="labelText">Hospital Name: </label><br /><br /> 
              </div>
              <div className="row">
                <label className="labelText">Hospital Address: </label><br /><br /> 
              </div>
              <div className="row">
                <label className="labelText">Phone Number: </label><br /><br /> 
              </div>
              <div className="row">
                <label className="labelText">City: </label><br /><br />
              </div>
              <div className="row">
                <label className="labelText">State: </label><br /><br /> 
              </div>
              <div className="row">
                <label className="labelText">County: </label><br /><br /> 
              </div>
              <div className="row">
                <label>ZIP: </label><br /><br /> 
              </div>
              
            </div>
            <div className="column">
              <form>
              <div className="row">
                  <input id="hospitalId" value={this.state.providerId} onChange={e => this.onTodoChange(e.target.value,'hId')}/> <br /> <br /> 
                </div>
                <div className="row">
                  <input id="patientId" value={this.state.patientId} onChange={e => this.onTodoChange(e.target.value,'pId')}/> <br /> <br /> 
                </div>
                <div className="row">
                  <input id="patientName" value={this.state.patientName} onChange={e => this.onTodoChange(e.target.value,'pName')}/> <br /> <br /> 
                </div>
                <div className="row">
                  <input id="hospitalName" value={this.state.hospitalName} onChange={e => this.onTodoChange(e.target.value,'hName')}/> <br /> <br /> 
                </div>
                <div className="row">
                  <input id="hospitalAddr" value={this.state.hospitalAddress} onChange={e => this.onTodoChange(e.target.value,'hAddr')}/> <br /> <br /> 
                </div>
                <div className="row">
                  <input id="phnum" value={this.state.phoneNum} onChange={e => this.onTodoChange(e.target.value,'phnum')}/> <br /> <br /> 
                </div>
                <div className="row">
                  <input id="city" value={this.state.city} onChange={e => this.onTodoChange(e.target.value,'city')}/> <br /> <br /> 
                </div>
                <div className="row">
                  <input id="state" value={this.state.state} onChange={e => this.onTodoChange(e.target.value,'state')} /> <br /> <br /> 
                </div>
                <div className="row">
                  <input id="county" value={this.state.county} onChange={e => this.onTodoChange(e.target.value,'county')}/> <br /> <br /> 
                </div>
                <div className="row">
                  <input id="zip" value={this.state.zip} onChange={e => this.onTodoChange(e.target.value,'zip')}/> <br /> <br /> 
                </div>
                <br />
                <div className="row">
                  <input id="submit" className="submit" value="Submit"/> <br /> <br /> 
                </div>
              </form>
            </div>
            <div className="column">
              <button className="record" onClick={this.toggleRecording}>
              {this.state.recording ? 'Stop' : 'Start'} recording</button>
               
            </div>
          
        </div>
      </div>
    );
  }
}

export default App;
