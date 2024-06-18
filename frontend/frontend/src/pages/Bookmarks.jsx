import React, { useState,useContext,useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Hero from '../components/Hero';
import UserContext from '../context/userContext';
import axios from 'axios';

const Bookmarks = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Select Filter');
  const [questions, setQuestions] = useState([]);
  const { backend_url } = useContext(UserContext);

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };
  
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setShowFilter(false);
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/question/questions`);
        if (response.data.success) {
          setQuestions(response.data.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error displaying questions:', error);
      }
    };

    fetchData();
  }, [backend_url]);


  return(
    <div className="w-full p-6 flex flex-col items-center">
      <div className=' w-full md:w-1/2'>
      <div className='flex justify-between'>
      <h1 className="text-2xl font-bold">My Bookmarks</h1>
      <div className="relative">
      <button onClick={handleFilterClick} className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm xl:w-48 lg:w-40 justify-between">
            {selectedFilter} <FiChevronDown className="ml-2" />
          </button>

          {showFilter && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
              <button onClick={() => handleFilterSelect('Recommended')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Recommended
              </button>
             
              <button onClick={() => handleFilterSelect('Latest')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Latest
              </button>
              <button onClick={() => handleFilterSelect('Oldest')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
              Oldest
              </button>
            </div>
          )}
        </div>

      </div>
      <hr className="mt-3 border-gray-300" />
      </div>
      <div className='flex flex-col justify-center items-center w-full'>
      {questions.map((ques, index) => (
          <Hero question={ques} key={index} />
        ))}
      </div>
    </div>
  )
   
  
};

export default Bookmarks;
