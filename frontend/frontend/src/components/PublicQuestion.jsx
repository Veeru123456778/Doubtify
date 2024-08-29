// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import UserContext from '../context/userContext.js';

// const PublicQuestion = () => {
//   const { id } = useParams();
//   const [question, setQuestion] = useState(null);
//   const {backend_url} = useContext(UserContext);

//   useEffect(() => {
//     const fetchQuestion = async () => {
//       try {
//         const quesId = id;
//         const response = await axios.get(`${backend_url}/api/question/${quesId}`);
//         console.log(response);
//         setQuestion(response.data.data);
//       } catch (error) {
//         console.error('Error fetching question:', error);
//       }
//     };
//     fetchQuestion();
//   }, [id]);

//   if (!question) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1><b>Ques is :-</b> {question.body}</h1>
//       <br/>
//       {question.files.map((file) => (
//         <img src={file} alt="image" key={file} />
//       ))}
   
//     </div>
//   );
// };

// export default PublicQuestion;
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext.js';
import { TailSpin } from 'react-loader-spinner';
import { FiX } from 'react-icons/fi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PublicQuestion = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const { backend_url, isDarkTheme } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/question/${id}`);
        setQuestion(response.data.data);
      } catch (error) {
        console.error('Error fetching question:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [id, backend_url]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="text-center text-gray-500">Question not found.</div>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const transformUrl = (url) => {
    // Apply transformations: resize to 800x600, auto format and quality
    return `${url.replace('/upload/', '/upload/f_auto,q_auto/')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className={`p-6 w-full mx-auto bg-white rounded-lg shadow-lg ${isDarkTheme ? 'bg-[#1f2530]' : 'bg-gray-50'}`}>
      <div className={`xl:p-6 p-4 rounded-lg shadow-slate-600 shadow-sm w-full md:w-1/2 my-4 place-items-center relative ${isDarkTheme ? 'bg-[#1f2530]' : 'bg-gray-100'}`}>
        <button className="absolute top-2 right-2 text-gray-500">
          <FiX size={20} />
        </button>
        <div className="cursor-pointer">
    
          <div>
            <h3 className={`text-base font-medium mb-2 w-full ${isDarkTheme ? "text-white" : "text-black"}`}>{question.body}</h3>
            {question.files.length > 1 && (
              <Slider {...sliderSettings}>
                {question.files.map((file, index) => (
                  <div key={index}>
                    <img src={transformUrl(file)} alt={`image-${index}`} className="h-80 w-full overflow-hidden mt-3 mb-3" />
                  </div>
                ))}
              </Slider>
            )}
            {question.files.length === 1 && question.files.map((file, index) => (
              <div key={index}>
                <img src={transformUrl(file)} alt={`image-${index}`} className="mt-3 mb-3" />
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Try out Doubtify
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicQuestion;
