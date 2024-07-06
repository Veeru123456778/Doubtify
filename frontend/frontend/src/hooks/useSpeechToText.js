// import React, { useEffect, useRef, useState } from 'react'

// const useSpeechToText = (options={}) => {
//     const [isListening , setIsListening] = useState(false);
//     const [showSpeech , setShowSpeech] = useState(true);
//     const [transcript,setTranscript] = useState('');
//     const recognitionRef = useRef(null);

//     useEffect(()=>{
//         if(!('webkitSpeechRecognition' in window)){
//             console.log("Web is not supported for this!!");
//             setShowSpeech(false);
//             return;
//         }
//         recognitionRef.current = new window.webkitSpeechRecognition();
//         const recognition = recognitionRef.current;
//         recognition.interimResults = options.interimResults || true;
//         recognition.lang = options.lang || "en-US";
//         recognition.continuous = options.continuous || false;

//         if('webkitSpeechGrammarList' in window){
//             const grammar = "#JGSF v1.0; grammar punctuation; public <punc>= . | , | ? |! | ; | : ;"
//             const speechRecognitionList = new window.webkitSpeechGrammarList();
//             speechRecognitionList.addFromString(grammar,1);
//             recognition.grammars = speechRecognitionList;
//         }

//         recognition.onresult = (event)=>{
//             let text = ""
//             for(let i=0;i<event.results.length;i++){
//              text += event.results[i][0].transcript;
//             }
//             setTranscript(text);
//         }
//         recognition.onerror = (event)=>{
//             console.error("Speech Recognition error: ",event.error);
//         }
//         recognition.onend = ()=>{
//             setIsListening(false);
//             setTranscript("")
//         }
//         return () => {
//          recognition.stop()
//         }
//     },[])

//     const startListening = ()=>{
//         if(recognitionRef.current && !isListening){
//          recognitionRef.current.start();
//          isListening(true);
//         }
//     }
//     const stopListening = ()=>{
//         if(recognitionRef.current && isListening){
//          recognitionRef.current.stop();
//          isListening(false);
//         }
//     }
//   return {
//   isListening,
//   transcript,
//   startListening,
//   stopListening
//   }

// }

// export default useSpeechToText


import { useEffect, useRef, useState } from 'react';

// const useSpeechToText = (options = {}) => {
//     const [isListening, setIsListening] = useState(false);
//     const [showSpeech, setShowSpeech] = useState(true);
//     const [transcript, setTranscript] = useState('');
//     const recognitionRef = useRef(null);

//     useEffect(() => {
//         if (!('webkitSpeechRecognition' in window)) {
//             console.log("Web is not supported for this!!");
//             setShowSpeech(false);
//             return;
//         }

//         recognitionRef.current = new window.webkitSpeechRecognition();
//         const recognition = recognitionRef.current;
//         recognition.interimResults = options.interimResults || true;
//         recognition.lang = options.lang || "en-US";
//         recognition.continuous = options.continuous || false;

//         if ('webkitSpeechGrammarList' in window) {
//             const grammar = "#JGSF v1.0; grammar punctuation; public <punc>= . | , | ? |! | ; | : ;";
//             const speechRecognitionList = new window.webkitSpeechGrammarList();
//             speechRecognitionList.addFromString(grammar, 1);
//             recognition.grammars = speechRecognitionList;
//         }

//         recognition.onresult = (event) => {
//             let text = "";
//             for (let i = 0; i < event.results.length; i++) {
//                 text += event.results[i][0].transcript;
//             }
//             setTranscript(text);
//         };

//         recognition.onerror = (event) => {
//             console.error("Speech Recognition error: ", event.error);
//         };

//         recognition.onend = () => {
//             setIsListening(false);
//         };

//         return () => {
//             recognition.stop();
//         };
//     }, []);

//     const startListening = () => {
//         if (recognitionRef.current && !isListening) {
//             recognitionRef.current.start();
//             setIsListening(true);
//         }
//     };

//     const stopListening = () => {
//         if (recognitionRef.current && isListening) {
//             recognitionRef.current.stop();
//             setIsListening(false);
//         }
//     };

//     return {
//         isListening,
//         transcript,
//         startListening,
//         stopListening,
//         showSpeech
//     };
// };
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
