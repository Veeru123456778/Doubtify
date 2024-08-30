import React, { useEffect, useState, useContext } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Hero from '../components/Hero';
import axios from 'axios';
import UserContext from '../context/userContext';
import { TailSpin } from 'react-loader-spinner';

const Questions = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Select Filter');
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading,setLoading] = useState(true);
  const { backend_url,isDarkTheme } = useContext(UserContext);
  const [page,setPage] = useState(1);

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setShowFilter(false);
    applyFilter(filter);
  };

  // const handleScroll = ()=>{
  //   if(window.innerHeight+window.scrollY>=document.body.scrollHeight-2){
  //        setPage(prevPage=>prevPage+1);
  //   }
  // }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/question/questions?page=${page}`);
        if (response.data.success) {
          const questionsWithAnswers = await fetchAnswersForQuestions(response.data.data);
          setQuestions(prevQues=>[...prevQues, ...questionsWithAnswers]); 
          applyFilter(selectedFilter, [...questions,...questionsWithAnswers]); 
          setLoading(false);
        }
      } catch (error) {
        console.error('Error displaying questions:', error);
      }
    };

    fetchData();
  }, [backend_url, selectedFilter,page]);

  // useEffect(()=>{
  //   window.addEventListener('scroll',handleScroll);
    
  //   return ()=>window.removeEventListener('scroll',handleScroll);
  // },[])


  const fetchAnswersForQuestions = async (questions) => {
    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        try {
          const response = await axios.get(`${backend_url}/api/answer/${question._id}`);
          return { ...question, answers: response.data.data || [] };
        } catch (error) {
          console.error(`Error fetching answers for question ${question._id}:`, error);
          return { ...question, answers: [] };
        }
      })
    );
    return questionsWithAnswers;
  };

  const applyFilter = (filter, questionsToFilter = questions) => {
    let sortedQuestions = [...questionsToFilter];
    setLoading(true);
    switch (filter) {
      case 'Recommended':
        // Implement your recommended sorting or filtering logic here
        break;
      case 'Most Upvoted':
        sortedQuestions.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'Latest':
        sortedQuestions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'No Answer':
        sortedQuestions = sortedQuestions.filter(question => question.answers.length === 0);
        break;
      default:
        break;
    }

    setFilteredQuestions([...sortedQuestions]);
    setLoading(false); // Update filteredQuestions state with sorted array
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  
const handleMoreQues=()=>{
  setPage(prev=>prev+1);
}

  return (
    <div className="w-full p-6 flex flex-col items-center">
      <div className="w-full md:w-1/2">
        <div className="flex justify-between">
          <h1 className={`${isDarkTheme?'text-white':'text-black'} text-2xl font-bold`}>All Questions</h1>
          <div className="relative">
            <button
              onClick={handleFilterClick}
              className={`flex items-center px-4 py-2  rounded shadow-sm w-40 xl:w-48 justify-between ${isDarkTheme ?'bg-[#323B4A] border-[#404b5a] text-[#E0E0E0]':'bg-white border border-gray-300'}`}
            >
              {selectedFilter} <FiChevronDown className="ml-2" />
            </button>
            {showFilter && (
              <div className={`absolute right-0 mt-2 w-48  border  rounded shadow-lg z-10 ${isDarkTheme ?'bg-[#323B4A] border-[#404b5a] text-[#E0E0E0]':'bg-white border-gray-300'}`}>
                <button
                  onClick={() => handleFilterSelect('Recommended')}
                  className="block w-full text-left px-4 py-2  hover:bg-[#2C3545]"
                >
                  Recommended
                </button>
                <button
                  onClick={() => handleFilterSelect('Most Upvoted')}
                  className="block w-full text-left px-4 py-2  hover:bg-[#2C3545]"
                >
                  Most Upvoted
                </button>
                <button
                  onClick={() => handleFilterSelect('Latest')}
                  className="block w-full text-left px-4 py-2  hover:bg-[#2C3545]"
                >
                  Latest
                </button>
                <button
                  onClick={() => handleFilterSelect('No Answer')}
                  className="block w-full text-left px-4 py-2  hover:bg-[#2C3545]"
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
        {filteredQuestions.map((ques, index) => (
          <Hero question={ques} key={index} />
        ))}
        <button className='text-blue py-2' onClick={handleMoreQues}>See More Ques</button>

      </div>
    </div>
  );
};

export default Questions;
