
import { useEffect, useRef, useState } from 'react';

const useSpeechToText = ({ continuous }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
  
    let recognition = null;
  
    const startListening = () => {
      if (!recognition) {
        recognition = new window.webkitSpeechRecognition(); // Adjust for different browsers if needed
        recognition.continuous = false ;
        // recognition.continuous = continuous ;
        recognition.onresult = handleResult;
        recognition.onerror = handleError;
        recognition.onend = () => setIsListening(false);
      }
      recognition.start();
      setIsListening(true);
    };
  
    const stopListening = () => {
      if (recognition) {
        recognition.stop();
      }
      setIsListening(false);
    };
  
    const handleResult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
  
      setTranscript(currentTranscript);
    };
  
    const handleError = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
  
    return { isListening, transcript, startListening, stopListening };
  };
  

export default useSpeechToText;
