import React,{useContext, useEffect, useState} from "react";
import Hero from "../components/Hero";
import AnswerCard from "../components/AnswerCard";
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import UserContext from "../context/userContext";

const Answer = () => {
  const [answers,setAnswers] = useState([]);
    const location = useLocation();
    const {question} = location.state;
const {backend_url}=useContext(UserContext);
   
useEffect(() => {
  const fetchAnswers = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/answer/${question._id}`);
      // console.log(response.data.data);
      setAnswers(response.data.data); // Assuming the response contains the answer data
    } catch (error) {
      console.error('Error fetching answers:', error);
    }
  };

  fetchAnswers(); // Call the async function to fetch answers
}, [backend_url, question._id]); // Add dependencies to the dependency array


    return <div className='flex flex-col items-center'>
       <Hero stopOnClick={true} question={question}/>
      <div className=" w-full md:w-1/2 flex flex-col">
      <h1 className="text-2xl font-bold mb-4 mt-8">All Answers</h1>
      <hr className="border-gray-300 mb-8 " />
      </div >
      <div className=" flex flex-col gap-y-4 w-full items-center">
      {answers.map((answer,index)=>{
        return <AnswerCard answer={answer} key={index} question={question}/>
      })}
    
        </div>
      
    </div>;
  };
  
  export default Answer;