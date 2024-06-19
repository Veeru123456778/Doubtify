import React,{useContext} from "react";
import Hero from "../components/Hero";
import AnswerCard from "../components/AnswerCard";
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import UserContext from "../context/userContext";

const Answer = () => {
    const location = useLocation();
    const {question} = location.state;
const {backend_url}=useContext(UserContext);

    const answers = ()=>{
      const ans = axios.get(`${backend_url}/api/answer/${question._id}`)
    }

    
    return <div className='flex flex-col items-center'>
       <Hero stopOnClick={true} question={question}/>
      <div className=" w-full md:w-1/2 flex flex-col">
      <h1 className="text-2xl font-bold mb-4 mt-8">All Answers</h1>
      <hr className="border-gray-300 mb-8 " />
      </div >
      <div className=" flex flex-col gap-y-4 w-full items-center">
        <AnswerCard/>
        <AnswerCard/>
        </div>
      
    </div>;
  };
  
  export default Answer;