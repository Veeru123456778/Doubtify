// import React, {useContext,useState,useEffect} from 'react';
// import { useLocation } from 'react-router-dom'; 
// import Hero from '../components/Hero';
// import AnswerCard from '../components/AnswerCard';
// import AnswerPopup from '../components/AnswerPopup';
// import UserContext from '../context/userContext';
// import axios from 'axios';
// import { TailSpin } from 'react-loader-spinner';

// const SearchPage = () => {
//   const [questions, setQuestions] = useState([]);
// const { backend_url,isDarkTheme } = useContext(UserContext);
// const [loading,setLoading] = useState(true);
// const location  = useLocation();
// const {suggestions} = location.state;

// console.log('insearch',suggestions);
// // useEffect(() => {
// //   const fetchData = async () => {
// //     try {
// //       const response = await axios.get(`${backend_url}/api/question/questions`);
// //       if (response.data.success) {
// //         setQuestions(response.data.data);
// //         setLoading(false);
// //         console.log(response.data);
// //       }
// //     } catch (error) {
// //       console.error('Error displaying questions:', error);
// //     }
// //   };

// //   fetchData();
// // }, [backend_url]);

// if (loading) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <TailSpin color="#00BFFF" height={80} width={80} />
//     </div>
//   );
// }

//   return <div className='flex flex-col justify-center items-center'>
//       <h1 className={`${isDarkTheme?'text-white':'text-black'} text-2xl font-bold`}>Search Results :</h1>
//     {suggestions.map((ques, index) => (
//           <Hero question={ques} key={index} />
//         ))}
//   </div>;
// };

// export default SearchPage;

import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import UserContext from '../context/userContext';
import { TailSpin } from 'react-loader-spinner';

const SearchPage = () => {
  const [questions, setQuestions] = useState([]);
  const { backend_url, isDarkTheme } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const suggestions = location.state ? location.state.suggestions : [];

  useEffect(() => {
    if (!suggestions.length) {
      // If there are no suggestions, navigate back to home or show a message
      navigate('/');
    } else {
      setQuestions(suggestions);
      setLoading(false);
    }
  }, [suggestions, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className={`${isDarkTheme ? 'text-white' : 'text-black'} text-2xl font-bold`}>
        Search Results :
      </h1>
      {questions.length > 0 ? (
        questions.map((ques, index) => (
          <Hero question={ques} key={index} />
        ))
      ) : (
        <p className={`${isDarkTheme ? 'text-white' : 'text-black'} text-lg`}>
          No results found.
        </p>
      )}
    </div>
  );
};

export default SearchPage;
