import React, { useState, useContext, useEffect, useRef } from "react";
import { BellIcon, MenuIcon, MicrophoneIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import searchIcon from "../assets/search.png";
import searchDark from '../assets/searchDark.png'

import AskQuestionPopup from "./AskQuestionPopup";
import NotificationPopup from "./NotificationPopup";
import MicrophonePopup from "./MicrophonePopup"; // Import the MicrophonePopup component
import LogoutPopup from "./LogoutPopup"; // Import the LogoutPopup component
import UserContext from "../context/userContext";
import { toast } from "react-toastify";
import useFetchUser from "../hooks/useFetchUser";
import useSpeechToText from "../hooks/useSpeechToText";
import axios from "axios";
import ThemeToggler from "./ThemeToggler";

const NavBar = ({ toggleSidebar }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMicrophonePopupOpen, setIsMicrophonePopupOpen] = useState(false); // State for MicrophonePopup
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false); // State for LogoutPopup
  const navigate = useNavigate();
  const { setToken, setUser, user, token, backend_url, isDarkTheme } = useContext(UserContext);
  const loading = useFetchUser(token, setUser);
  const [textInput, setTextInput] = useState("");
  const { isListening, transcript, startListening, stopListening } = useSpeechToText({ continuous: false });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeout = useRef(null);

  useEffect(() => {
    if (!isListening) {
      setIsMicrophonePopupOpen(false);
      setTextInput(transcript);
    }
  }, [isListening, transcript]);

  const startStopListening = () => {
    const startSound = new Audio('/sounds/din-ding-89718.mp3');

    if (isListening) {
      stopListening();
      startSound.play();
    } else {
      startSound.play();
      setTextInput("");
      startListening();
      setIsMicrophonePopupOpen(true);
    }
  };

  useEffect(() => {
    setShowSuggestions(false); // Close suggestions dropdown on component mount
  }, []);

  useEffect(() => {
    if (!textInput.trim()) {
      setShowSuggestions(false);
      return;
    }
  
    debounce(() => {
      handleSearch(textInput.trim());
    }, 200);
  }, [textInput]);
  

  const handleSearch = (query) => {
    axios
      .get(`${backend_url}/api/search/ques?q=${encodeURIComponent(query)}`)
      .then((response) => {
        setSuggestions(response.data);
        setShowSuggestions(true);
      })
      .catch((error) => {
        console.error("Error searching:", error);
        // Handle error, show toast message, etc.
      });
  };
  

  const debounce = (func, delay) => {
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      func();
    }, delay);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setTextInput(inputValue);
    setShowSuggestions(false);
    debounce(() => {
      handleSearch(inputValue);
    }, 200);
  };

  const handleLogOut = () => {
    setIsLogoutPopupOpen(true);
  };

  const confirmLogOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    navigate("/signin");
    toast.info("Logged Out Successfully!");
  };

  const cancelLogOut = () => {
    setIsLogoutPopupOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    window.location.reload();
  };

  if (loading) {
    return <div>Loading...</div>;
  }
 
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && textInput.trim() !== '') {
      // handleSearch(textInput.trim());
      setShowSuggestions(false); 
      setTextInput('');
      navigate('/search', { state: { suggestions } }); 
    }
  };
  

  return (
    <div>
      <div className={`flex items-center justify-between p-2 xl:p-4 shadow-md fixed top-0 w-full z-50 ${isDarkTheme ? "bg-dark" : "bg-gray-100"}`}>
        <div className="flex justify-between items-center space-x-4">
        <img src="/logo.png" alt="" className="md:h-10 h-6 " />

          <button className="md:hidden" onClick={toggleSidebar}>
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center">
          <div className="relative flex-grow">
          <input
              type="text"
              placeholder="Search for any question"
              value={textInput}
              onChange={handleInputChange}
              className={`pl-7 xl:pl-10 w-40 sm:w-full xl:w-96 pr-12 py-1 xl:py-2 rounded-full border ${isDarkTheme ? "text-[#E0E0E0] border-[#404b5a] bg-[#323B4A] placeholder-[#E0E0E0]" : "border-gray-300"} focus:outline-none focus:ring focus:border-blue-300`}
              style={{
                backgroundImage: `url(${isDarkTheme? searchDark : searchIcon  })`,
                backgroundSize: "16px",
                backgroundPosition: "8px center",
                backgroundRepeat: "no-repeat",
              }}
              onKeyDown={handleKeyPress}
            />
            <button
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 focus:outline-none ${
                isListening ? "bg-red-100" : "bg-white"
              }`}
              onClick={startStopListening}
            >
              <MicrophoneIcon className="w-5 h-5" />
            </button>
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-b-lg shadow-lg z-10">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setTextInput(item.body);
                      setShowSuggestions(false);
                      handleSearch(item.body);
                    }}
                  >
                      {item.body}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ThemeToggler />
          <div className="flex items-center space-x-4 ml-4 flex-shrink-0">
            <button onClick={() => setIsNotificationOpen(true)}>
              {isDarkTheme?<img className="h-6 w-6 md:h-5 md:w-5 text-gray-700 cursor-pointer" src="/bellLight.png" alt="Notifications" />:<img className="h-6 w-6 md:h-5 md:w-5 text-gray-700 cursor-pointer" src="/bell.png" alt="Notifications" />}
            </button>
            <button
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs md:text-base px-1 py-1 md:px-4 md:py-2 rounded-lg hover:from-blue-500 hover:to-blue-700"
              onClick={() => setIsPopupOpen(true)}
            >
              Ask a Question
            </button>
            <div className="relative">
              <img
                src={user.profile_picture}
                alt="User"
                className="w-6 h-6 md:w-9 md:h-9 rounded-full border border-gray-300 cursor-pointer"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              />
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <div className="py-1">
                    <Link
                      to="#"
                      onClick={handleProfileClick}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      View Profile
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isNotificationOpen && (
        <NotificationPopup onClose={() => setIsNotificationOpen(false)} />
      )}
      {isPopupOpen && <AskQuestionPopup onClose={() => setIsPopupOpen(false)} />}
      {isMicrophonePopupOpen && (
        <MicrophonePopup
          transcript={transcript}
          isListening={isListening}
          stopListening={stopListening}
        />
      )}
      {isLogoutPopupOpen && (
        <LogoutPopup onConfirm={confirmLogOut} onCancel={cancelLogOut} />
      )}
    </div>
  );
};

export default NavBar;
