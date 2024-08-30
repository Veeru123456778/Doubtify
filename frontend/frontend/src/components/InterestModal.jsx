// src/InterestModal.js

import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import UserContext from '../context/userContext';

Modal.setAppElement('#root'); // This is important for accessibility

const InterestModal = ({ isOpen, onClose, userId }) => {
  const [availableInterests, setAvailableInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  // const { backend_url } = useContext(UserContext);
  const { isDarkTheme,backend_url } = useContext(UserContext);

  
  useEffect(() => {
    if (isOpen) {
      axios.get(`${backend_url}/api/user/${userId}/interests`)
        .then((response) => {
          // console.log(response.data.user.interests);
            setSelectedInterests(response.data.user.interests);
        })
        .catch((error) => {
          console.error('Error fetching interests:', error);
        });
    }
  }, [isOpen, backend_url]);

  useEffect(() => {
    if (isOpen) {
      axios.get(`${backend_url}/api/interests`)
        .then((response) => {
          if (response.data.length > 0) {
            const allInterests = response.data[0].names;
            const filteredInterest = allInterests.filter(interest=>!selectedInterests.includes(interest));
            console.log("Filtered Interest: ",filteredInterest);
            setAvailableInterests(filteredInterest);
          }
        })
        .catch((error) => {
          console.error('Error fetching interests:', error);
        });
    }
  }, [isOpen, backend_url,selectedInterests]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
      setAvailableInterests([...availableInterests, interest]);
    } else {
      setSelectedInterests([...selectedInterests, interest]);
      setAvailableInterests(availableInterests.filter((item) => item !== interest));
    }
  };


  const handleSubmit = () => {
    axios.put(`${backend_url}/api/user/${userId}/interests`, { interests: selectedInterests })
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error('Error updating interests:', error);
      });
  };


  console.log(selectedInterests);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Select Interests"
      className={` p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-20 ${isDarkTheme ? 'bg-[#1f2530]':'bg-white'}`}
      
  overlayClassName={{
    base: `fixed inset-0 flex justify-center items-center ${isDarkTheme ? 'bg-[#1f2530]/60' : 'bg-gray-200/60'}`, // Added this line
    afterOpen: '',
    beforeClose: ''
  }}
  

    >
    <div className='flex justify-between'>
      <h2 className={`text-xl font-semibold mb-4 ${isDarkTheme ?'text-white':''}`}>Select Your Areas of Interest</h2>
      <p className={`cursor-pointer text-2xl ${isDarkTheme ?'text-white':''} `} onClick={()=>onClose()}>&times;</p>
      </div>
      <div className="mb-4">
        {selectedInterests.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedInterests.map((interest, index) => (
              <div key={index} className="flex items-center bg-blue-600 text-white p-2 rounded-full cursor-pointer font-semibold">
                <p className='ml-2'>{interest}</p>
                <button
                  className="ml-2 text-white"
                  onClick={() => toggleInterest(interest)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <h2 className={`text-xl font-semibold mb-4 ${isDarkTheme ?'text-white':''}`}>Popular Areas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {availableInterests.map((interest, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-2 border rounded-lg cursor-pointer  ${isDarkTheme ?'bg-[#323B4A] text-white border-[#404b5a]':'bg-gray-100'}`}
            onClick={() => toggleInterest(interest)}
          >
            <span>{interest}</span>
            <button className="text-xl">
              +
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </Modal>
  );
};

export default InterestModal;
