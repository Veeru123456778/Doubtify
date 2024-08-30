import React, {useContext,useState,useEffect} from 'react';
import Hero from '../components/Hero';
import AnswerCard from '../components/AnswerCard';
import AnswerPopup from '../components/AnswerPopup';
import UserContext from '../context/userContext';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';

const Home = () => {
  const [questions, setQuestions] = useState([]);
const { backend_url } = useContext(UserContext);
const [loading,setLoading] = useState(true);
const [page,setPage] = useState(1);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/question/questions?page=${page}`);
      if (response.data.success) {
        const quesResponse = response.data.data;
        setQuestions([...questions,...quesResponse]);
        setLoading(false);
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error displaying questions:', error);
    }
  };

  fetchData();
}, [backend_url,page]);

useEffect(()=>{
  window.addEventListener('scroll',handleScroll);

  return ()=>window.removeEventListener('scroll',handleScroll);
},[])

const handleScroll = ()=>{
  if(window.innerHeight+window.scrollY>=document.body.scrollHeight-2){
    setPage(prevPage=>prevPage+1);
  }
}


if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <TailSpin color="#00BFFF" height={80} width={80} />
    </div>
  );
}


  return <div className='flex flex-col justify-center items-center'>
    {questions.map((ques, index) => (
          <Hero question={ques} key={index} />
        ))}
       
  </div>;
};

export default Home;
