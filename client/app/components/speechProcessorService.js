
export default class SpeechProcessorService {

    constructor() {
      this.state = { state: 'LISTENING'};
      
    }
  
    process(transcript) {
      if (this.state.state === 'LISTENING') {
        this.processListening(transcript);
      } else if (this.state.state ===  'ADDING') {
        this.processAdding(transcript);
      }
    }
  
    processListening(transcript) {
      if ((transcript.includes('new') || transcript.includes('another')) && transcript.includes('attribute')) {
        this.state.state = 'ADDING';
      } else if ((transcript.includes('complete') || transcript.includes('finish')) && transcript.includes('task')) {
        this.processToggling(transcript);
      } else {
        this.state.state = 'LISTENING';
      }
    }
  
    processAdding(transcript) {
     
      this.state.state = 'LISTENING';
    }
  
    processToggling(transcript) {
      const index = this.mapNumber(transcript);
      if (index === -1) {
        return;
      }
      
    }
  
    mapNumber(transcript) {
      const numbers = [['one', 'first', '1'], ['two', 'second', '2'], ['three', 'third', '3'],
        ['four', 'fourth', '4'], ['five', 'fifth', '5'], ['six', 'sixth', '6'],
        ['seven', 'seventh', '7'], ['eight', '8'], ['nine', 'ninth', '9']];
      return numbers.findIndex(numberSynonyms => numberSynonyms.some(synonym => transcript.includes(synonym)));
    }
  }
  