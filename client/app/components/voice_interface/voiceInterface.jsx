import * as React from 'react';
import ReactDOM from 'react-dom';
import './voiceInterface.css';
import SpeechRecognitionService from './speechRecognitionService';
import SpeechProcessorService from './speechProcessorService';

export default class voiceInterface extends React.Component {

  constructor (props) {
  super(props);
  this.state = {
    recording: false,
    result: '',
  };
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
    this.state.recording ? this.stopRecording() : this.startRecording();
  }

  speechTranscriptSplitting() {
    if (this.state.result !== undefined && this.state.recording === true) {
      var splitText = this.state.result.split(' ', 30);
      if (splitText.length !== 1) {
        this.speechProcessing(splitText);
      }      
    }
  }

  render() {
    //return ();
  }
}