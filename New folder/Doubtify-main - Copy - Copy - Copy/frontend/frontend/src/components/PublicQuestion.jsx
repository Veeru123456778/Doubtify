import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserContext from '../context/userContext.js';

const PublicQuestion = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
//   const [answers, setAnswers] = useState([]);
  const {backend_url} = useContext(UserContext);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const quesId = id;
        const response = await axios.get(`${backend_url}/api/question/${quesId}`);
        console.log(response);
        setQuestion(response.data.data);
        // setAnswers(response.data.answers);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };
    fetchQuestion();
  }, [id]);

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1><b>Ques is :-</b> {question.body}</h1>
      <br/>
      {question.files.map((file) => (
        <img src={file} alt="image" key={file} />
      ))}
      {/* <div>
        {answers.map(answer => (
          <div key={answer._id}>
            <p>{answer.text}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default PublicQuestion;
