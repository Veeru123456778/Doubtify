import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/userContext';
import { toast } from 'react-toastify';
import DropdownComponent from './DropdownComponent';

const AskQuestionPopup = ({ onClose }) => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [rows, setRows] = useState(1);
  const [files, setFiles] = useState([]);

  const {backend_url,user} = useContext(UserContext);

  const maxRows = 5;

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
    setQuestion(e.target.value);
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  // const categories = Array.from({ length: 10 }, (_, i) => `Category ${i + 1}`);
  // const subCategories = Array.from({ length: 10 }, (_, i) => `Sub-Category ${i + 1}`);

  
  // const handleAddQuestion = async () => {
  //   const formData = new FormData();
  //   formData.append('body', question);
  //   formData.append('categories', category);
  //   formData.append('subCategories', subCategory);
  //   files.forEach((file, index) => {
  //     formData.append('files', file);
  //   });

    const handleAddQuestion = async () => {
    const formData = new FormData();
    formData.append('body', question);
    formData.append('category', category); // Changed from 'categories' to 'category'
    formData.append('subCategory', subCategory); // Changed from 'subCategories' to 'subCategory'
    files.forEach((file, index) => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post(
        `${backend_url}/api/question/${user._id}/add`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status === 201) {
       toast.success(response.data.message);
       window.location.reload();
        onClose();
      }
    } catch (error) {
      console.error('Error adding question:', error);
      toast.error('Failed to add question. Please try again.');
    }
  };
  const {isDarkTheme} = useContext(UserContext);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`${isDarkTheme? 'bg-[#1f2530]':'bg-white '} shadow-slate-700 shadow-md p-6  w-11/12 sm:w-4/5 md:w-3/5 relative `}>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 ">
          &#10005;
        </button>
        <h2 className={`${isDarkTheme?' text-white text-xl font-semibold mb-8 text-center':' text-black text-xl font-semibold mb-8 text-center'}`}>Add Question</h2>
        <div className="mb-4">
          <textarea
            className={`w-full border  p-2 rounded resize-none overflow-auto ${isDarkTheme? 'bg-[#323B4A] placeholder-[#E0E0E0] border-[#404b5a] text-[#E0E0E0]':'bg-[white] border-gray-300'}`}
            rows={rows}
            placeholder="Start typing your question..."
            value={question}
            onChange={handleInputChange}
            style={{ lineHeight: '24px' }}
          />
        </div>
        {/* <div className='flex-col sm:flex sm:flex-row gap-3'>
        <div className="mb-4">
          <select
            className="w-48 border border-gray-300 p-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            className="w-48 border border-gray-300 p-2 rounded"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="">Sub-Categories</option>
            {subCategories.map((subCat, index) => (
              <option key={index} value={subCat}>{subCat}</option>
            ))}
          </select>
        </div>
        </div> */}
        <DropdownComponent category={category} subCategory={subCategory} setCategory={setCategory} setSubCategory={setSubCategory}/>
        <div className="flex items-center justify-between mt-6">
          <label className="flex items-center">
            <input type="file" className="hidden" multiple onChange={handleFileChange} />
            <span className="cursor-pointer text-blue-500">Attach file</span>
          </label>
          <button
            onClick={handleAddQuestion}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded hover:from-blue-500 hover:to-blue-700"
          >
            Add Question
          </button>
        </div>
        <div className="mt-4">
          {files.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Attached Files:</h4>
              <ul className="list-inside flex gap-5">
                {files.map((file, index) => (
                  <li key={index} className="text-gray-700">{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AskQuestionPopup;
