// // src/components/Questions.js

// import React, { useEffect, useState, useContext } from 'react';
// import { FiChevronDown } from 'react-icons/fi';
// import Hero from '../components/Hero';
// import axios from 'axios';
// import UserContext from '../context/userContext';

// const Questions = () => {
//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState('Select Filter');
//   const [questions, setQuestions] = useState([]);
//   const { backend_url } = useContext(UserContext);
//   const [filteredQuestions, setFilteredQuestions] = useState([]);

//   const handleFilterClick = () => {
//     setShowFilter(!showFilter);
//   };

//   const handleFilterSelect = (filter) => {
//     setSelectedFilter(filter);
//     setShowFilter(false);
//     applyFilter();
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${backend_url}/api/question/questions`);
//         if (response.data.success) {
//           setQuestions(response.data.data);
//           console.log(response.data);
//         }
//       } catch (error) {
//         console.error('Error displaying questions:', error);
//       }
//     };

//     fetchData();
//   }, [backend_url]);


//   // const fetchAnswers = async () => {
//   //   try {
//   //     const response = await axios.get(`${backend_url}/api/answer/${question._id}`);
//   //     console.log(response.data.data);
//   //     setAnswers(response.data.data); // Assuming the response contains the answer data
//   //   } catch (error) {
//   //     console.error('Error fetching answers:', error);
//   //   }
//   // };
  
//   const applyFilter = (filter) => {
//     let sortedQuestions = [...questions];

//     switch (filter) {
//       case 'Recommended':
//         // Apply your recommended sorting logic
//         // sortedQuestions = ...;
//         break;
//       case 'Most Upvoted':
//         sortedQuestions.sort((a, b) => b.upvotes - a.upvotes);
//         break;
//       case 'Latest':
//         sortedQuestions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         break;
//       case 'No Answer':
//         sortedQuestions = sortedQuestions.filter(question => question.answers.length === 0);
//         break;
//       default:
//         break;
//     }

//     setFilteredQuestions(sortedQuestions);
//   };

//   return (
//     <div className="w-full p-6 flex flex-col items-center">
//       <div className="w-full md:w-1/2">
//         <div className="flex justify-between">
//           <h1 className="text-2xl font-bold">All Questions</h1>
//           <div className="relative">
//             <button
//               onClick={handleFilterClick}
//               className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm w-40 xl:w-48 justify-between"
//             >
//               {selectedFilter} <FiChevronDown className="ml-2" />
//             </button>
//             {showFilter && (
//               <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
//                 <button
//                   onClick={() => handleFilterSelect('Recommended')}
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Recommended
//                 </button>
//                 <button
//                   onClick={() => handleFilterSelect('Most Upvoted')}
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Most Upvoted
//                 </button>
//                 <button
//                   onClick={() => handleFilterSelect('Latest')}
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Latest
//                 </button>
//                 <button
//                   onClick={() => handleFilterSelect('No Answer')}
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   No Answer
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         <hr className="mt-3 border-gray-300" />
//       </div>
//       <hr className="border-gray-300" />
//       <div className="flex flex-col justify-center items-center w-full">
//         {filteredQuestions.map((ques, index) => (
//           <Hero question={ques} key={index} />
//         ))}
//         {/* {questions.map((ques, index) => (
//           <Hero question={ques} key={index} />
//         ))} */}
//       </div>
//     </div>
//   );
// };

// export default Questions;

// import React, { useEffect, useState, useContext } from 'react';
// import { FiChevronDown } from 'react-icons/fi';
// import Hero from '../components/Hero';
// import axios from 'axios';
// import UserContext from '../context/userContext';

// const Questions = () => {
//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState('Select Filter');
//   const [questions, setQuestions] = useState([]);
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const { backend_url } = useContext(UserContext);

//   const handleFilterClick = () => {
//     setShowFilter(!showFilter);
//   };

//   const handleFilterSelect = (filter) => {
//     setSelectedFilter(filter);
//     setShowFilter(false);
//     applyFilter(filter);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${backend_url}/api/question/questions`);
//         if (response.data.success) {
//           const questionsWithAnswers = await fetchAnswersForQuestions(response.data.data);
//           setQuestions(questionsWithAnswers);
//           applyFilter(selectedFilter, questionsWithAnswers);
//           console.log(questionsWithAnswers);
//         }
//       } catch (error) {
//         console.error('Error displaying questions:', error);
//       }
//     };

//     fetchData();
//   }, [backend_url]);

//   const fetchAnswersForQuestions = async (questions) => {
//     const questionsWithAnswers = await Promise.all(
//       questions.map(async (question) => {
//         try {
//           const response = await axios.get(`${backend_url}/api/answer/${question._id}`);
//           return { ...question, answers: response.data.data || [] };
//         } catch (error) {
//           console.error(`Error fetching answers for question ${question._id}:`, error);
//           return { ...question, answers: [] };
//         }
//       })
//     );
//     return questionsWithAnswers;
//   };
   
 
//     const applyFilter = async(filter, questionsToFilter = questions) => {
//       let sortedQuestions = [...questionsToFilter];
  
//        switch (filter) {
//         case 'Recommended':
//           // Apply your recommended sorting logic
//           // sortedQuestions = ...;
//           break;
//         case 'Most Upvoted':
//           // sortedQuestions.sort((a, b) => b.upvotes - a.upvotes);
//           console.log('Before Sorting:', sortedQuestions);
//           sortedQuestions.sort((a, b) => {
//             return b.upvotes - a.upvotes;
//           });
//           console.log('After Sorting:', sortedQuestions);
          
//           break;
//         case 'Latest':
//           sortedQuestions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//           break;
//         case 'No Answer':
//           sortedQuestions = sortedQuestions.filter(question => question.answers.length === 0);
//           break;
//         default:
//           break;
//       }
//       await setFilteredQuestions(sortedQuestions);
//     };
  
  
//   return (
//     <div className="w-full p-6 flex flex-col items-center">
//       <div className="w-full md:w-1/2">
//         <div className="flex justify-between">
//           <h1 className="text-2xl font-bold">All Questions</h1>
//           <div className="relative">
//             <button
//               onClick={handleFilterClick}
//               className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm w-40 xl:w-48 justify-between"
//             >
//               {selectedFilter} <FiChevronDown className="ml-2" />
//             </button>
//             {showFilter && (
//               <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
//                 <button
//                   onClick={() => handleFilterSelect('Recommended')}
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Recommended
//                 </button>
//                 <button
//                   onClick={() => handleFilterSelect('Most Upvoted')}
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Most Upvoted
//                 </button>
//                 <button
//                   onClick={() => handleFilterSelect('Latest')}
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Latest
//                 </button>
//                 <button
//                   onClick={() => handleFilterSelect('No Answer')}
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   No Answer
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         <hr className="mt-3 border-gray-300" />
//       </div>
//       <hr className="border-gray-300" />
//       <div className="flex flex-col justify-center items-center w-full">
//         {filteredQuestions.map((ques, index) => (
//           <Hero question={ques} key={index} />
//         ))}

//       </div>
//     </div>
//   );
// };

// export default Questions;

import React, { useEffect, useState, useContext } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Hero from '../components/Hero';
import axios from 'axios';
import UserContext from '../context/userContext';

const Questions = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Select Filter');
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const { backend_url } = useContext(UserContext);

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setShowFilter(false);
    applyFilter(filter);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/question/questions`);
        if (response.data.success) {
          const questionsWithAnswers = await fetchAnswersForQuestions(response.data.data);
          setQuestions(questionsWithAnswers); // Update questions state with fetched data
          applyFilter(selectedFilter, questionsWithAnswers); // Apply initial filter
        }
      } catch (error) {
        console.error('Error displaying questions:', error);
      }
    };

    fetchData();
  }, [backend_url, selectedFilter]);

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

    setFilteredQuestions([...sortedQuestions]); // Update filteredQuestions state with sorted array
  };

  return (
    <div className="w-full p-6 flex flex-col items-center">
      <div className="w-full md:w-1/2">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">All Questions</h1>
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
        {filteredQuestions.map((ques, index) => (
          <Hero question={ques} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Questions;
