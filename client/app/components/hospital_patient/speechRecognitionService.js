export default class SpeechRecognitionService {
    
    
    constructor() {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
      this.recognition.maxAlternatives = 1;
    }
  
    onResult = (callback) => {
      this.recognition.onresult = (event) => {
        if (!event.results) {
          return;
        }
        const lastResult = event.results[event.results.length - 1];
        if (!lastResult.isFinal) {
          callback('...', false);
          return;
        }
        callback(lastResult[0].transcript, true);
      };
    }
  
    onEnd = (callback) => {
      this.recognition.onend = () => callback();
    }
  
    start = () => {
      this.recognition.start();
    }
  
    stop = () => {
      this.recognition.stop();
    }
}
  