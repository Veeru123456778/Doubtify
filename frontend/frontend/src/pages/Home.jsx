import React, {useContext,useState,useEffect} from 'react';
import Hero from '../components/Hero';
import AnswerCard from '../components/AnswerCard';
import AnswerPopup from '../components/AnswerPopup';
import UserContext from '../context/userContext';
import axios from 'axios';

const Home = () => {
  const [questions, setQuestions] = useState([]);
const { backend_url } = useContext(UserContext);

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

  return <div className='flex flex-col justify-center items-center'>
    {questions.map((ques, index) => (
          <Hero question={ques} key={index} />
        ))}
     {/* <Hero classname="mt-[50px]" />
     <Hero classname="mt-[50px]" />
     <Hero classname="mt-[50px]" /> */}
  </div>;
};

export default Home;
