import React, { useEffect,useState } from "react";
import { MicrophoneIcon } from "@heroicons/react/solid";

const MicrophonePopup = ({ transcript, isListening, stopListening }) => {

    const [dots, setDots] = useState("");
    const [input,setTextInput] = useState('');

    useEffect(() => {
      if (isListening) {
        const interval = setInterval(() => {
          setDots((prevDots) => {
            switch (prevDots) {
              case "":
                return ".";
              case ".":
                return "..";
              case "..":
                return "...";
              default:
                return "";
            }
          });
        }, 500); // Adjust the interval as needed for the animation speed
  
        return () => clearInterval(interval);
      } else {
        setDots("");
      }
    }, [isListening]);
  
  useEffect(() => {
    if (!isListening) {
      stopListening();
    }
  }, [isListening, stopListening]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-lg text-center relative">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-24 w-24 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center mb-4 shadow-xl">
            <MicrophoneIcon className="h-12 w-12 text-white animate-pulse" />
          </div>
          <p className="text-gray-700 text-xl font-medium dots">
            { (
              <span className="dots">Listening {dots}</span>
            )}
          </p>
        </div>
        {!isListening && (
          <button
            onClick={stopListening}
            className="absolute top-0 right-0 m-2 text-gray-700 hover:text-gray-900"
          >
            &#10005;
          </button>
        )}
      </div>
    </div>
  );
};

export default MicrophonePopup;
