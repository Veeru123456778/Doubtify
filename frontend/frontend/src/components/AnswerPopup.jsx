// src/components/AnswerPopup.jsx
import React, { useState,useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/userContext';
import useFetchUser from '../hooks/useFetchUser';

const AnswerPopup = ({ onClose,question }) => {
  const [answer, setAnswer] = useState('');
  // const [question, setQuestion] = useState('');
  const [rows, setRows] = useState(1);
  const [files, setFiles] = useState([]);
  const maxRows = 5;
  const {backend_url,token,setUser,user} = useContext(UserContext)
  const loading = useFetchUser(token, setUser);

  const handleInputChange = (e) => {
    const textareaLineHeight = 24;
    const previousRows = e.target.rows;
    e.target.rows = 1; // reset number of rows in textarea

    const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
      e.target.scrollTop = e.target.scrollHeight;
    }

    setRows(currentRows < maxRows ? currentRows : maxRows);
    setAnswer(e.target.value);
  };

  const handleAddAnswer = async () => {
    const formData = new FormData();
    formData.append('body', answer);
    files.forEach((file, index) => {
      formData.append('files', file);
    });
    try {
      const response = await axios.post(
        `${backend_url}/api/answer/${user._id}/${question._id}/add`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status === 200) {
        alert('Answer added successfully!');
        onClose();
      }
    } catch (error) {
      console.error('Error adding question:', error);
      alert('Failed to add question. Please try again.');
    }
  };

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[750px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &#10005;
        </button>
        <h2 className="text-xl font-semibold mb-8 text-center">{question.body}</h2>
        <div className="mb-4">
          <textarea
            className="w-full border border-gray-300 p-2 rounded resize-none overflow-auto"
            rows={rows}
            placeholder="Start typing your Answer..."
            value={answer}
            onChange={handleInputChange}
            style={{ lineHeight: '24px' }}
          />
        </div>
        <div className="flex items-center justify-between mt-6">
          <label className="flex items-center">
            <input type="file" className="hidden"  onChange={(e) => setFiles([...e.target.files])} />
            <span className="cursor-pointer text-blue-500">Attach file</span>
          </label>
          <button
            onClick={handleAddAnswer}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded hover:from-blue-500 hover:to-blue-700"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerPopup;
