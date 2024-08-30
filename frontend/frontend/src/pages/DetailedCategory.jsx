import React, { useEffect, useState, useContext } from 'react';
import {useLocation} from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import Hero from '../components/Hero';
import axios from 'axios';
import UserContext from '../context/userContext';
import { getCategoryWithQuestions } from '../api/categoryApi.jsx';

const DetailedCategory = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Select Filter');
  const [questions, setQuestions] = useState([]);
  const [categoryData,setCategoryData] = useState({});
  const { backend_url,isDarkTheme } = useContext(UserContext);
  const location = useLocation();
  const {id} = location.state;
  
  useEffect(() => {
    const getFullCategory = async () => {
        try {
            const data = await getCategoryWithQuestions(backend_url,id);
            console.log(data);
            setCategoryData(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    getFullCategory();
}, [backend_url]);

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

  return (
    <div className="w-full p-6 flex flex-col items-center">
      <div className="w-full md:w-1/2">
        <div className="flex justify-between">
          <h1 className={`text-2xl font-bold ${isDarkTheme?'text-white':'text-black'}`}>{categoryData.categoryName}</h1>
          <div className="relative">
            <button
              onClick={handleFilterClick}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm w-40 xl:w-48 justify-between"
            >
              {selectedFilter} <FiChevronDown className="ml-2" />
            </button>
            {showFilter && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                <button
                  onClick={() => handleFilterSelect('Recommended')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Recommended
                </button>
                <button
                  onClick={() => handleFilterSelect('Most Upvoted')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Most Upvoted
                </button>
                <button
                  onClick={() => handleFilterSelect('Latest')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Latest
                </button>
                <button
                  onClick={() => handleFilterSelect('No Answer')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  No Answer
                </button>
              </div>
            )}
          </div>
        </div>
        <hr className="mt-3 border-gray-300" />
      </div>
      <hr className="border-gray-300" />
  
      <div className="flex flex-col justify-center items-center w-full">
  {categoryData.questions && categoryData.questions.length > 0 ? (
    categoryData.questions.map((ques, index) => (
      <Hero question={ques} key={index} />
    ))
  ) : (
    <p>No Questions Found for this particular Category!</p>
  )}
</div>

    </div>
  );
};


    
    
export default DetailedCategory;
