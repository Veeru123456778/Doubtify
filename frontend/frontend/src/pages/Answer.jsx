import React from "react";
import Hero from "../components/Hero";
import AnswerCard from "../components/AnswerCard";

const Answer = () => {
    
    return <div className='flex flex-col items-center'>
       <Hero stopOnClick={true} />
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