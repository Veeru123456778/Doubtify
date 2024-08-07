import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero'; // Adjust path as per your project structure
import { TailSpin } from 'react-loader-spinner'; // Adjust path as per your project structure
import axios from 'axios'; // Adjust path as per your project structure

const SearchPage = () => {
  const location = useLocation();
  const { suggestions } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (suggestions && suggestions.length > 0) {
      setQuestions(suggestions);
      setLoading(false);
    } else {
      setLoading(true); // Handle case where suggestions are empty or undefined
    }
  }, [suggestions]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mt-10">
        Search Results:
      </h1>
      {questions && questions.length > 0 ? (
        questions.map((ques, index) => (
           <Hero question={ques} key={index} />
          // Replace Hero with your component that displays each question
        ))
      ) : (
        <p className="text-lg">
          No results found.
        </p>
      )}      
      
    </div>
  );
};

export default SearchPage;

