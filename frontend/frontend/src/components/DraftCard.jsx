// import React,{useContext} from 'react';
// import { FaEdit, FaTrashAlt, FaTimes } from 'react-icons/fa';
// import axios from 'axios';
// import UserContext from '../context/userContext';

// const DraftCard = ({draft}) => {
//   const {backend_url} = useContext(UserContext);

//   const handleDiscard = async(req,res)=>{
//     try{
//       const response = await axios.post(`${backend_url}/api/draft/remove/${draft._id}`);
  
//       if (response.data.success) {
//         console.log('Draft Deleted successfully');
//       } else {
//         console.error('Failed to Delete draft:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error Deleting draft:', error);
//     }
//     };

//   return (
//     <div className="relative p-4 bg-white rounded-lg shadow-md w-full md:w-1/2">
//       <div className="absolute top-2 left-4 text-gray-600 text-xs">Answer • Unpublished</div>
//       <button className="absolute top-2 right-4 text-gray-500 hover:text-gray-700">
//         <FaTimes />
//       </button>
//       <div className="mt-2 mb-4">
//         <h2 className="text-lg font-bold">How can I learn data structures efficiently?</h2>
//         <p className="text-gray-700 mt-1 font-light leading-5">
//           {draft.body}
//         </p>
//       </div>
//       <div className="flex space-x-4 mt-2">
//         <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
//           <FaEdit className="mr-2" /> Edit
//         </button>
//         <button className="flex items-center px-4 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600" onClick={handleDiscard}>
//           <FaTrashAlt className="mr-2" /> Discard
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DraftCard;


// import React, { useContext, useState } from 'react';
// import PropTypes from 'prop-types';
// import { FaEdit, FaTrashAlt, FaTimes } from 'react-icons/fa';
// import axios from 'axios';
// import UserContext from '../context/userContext';
// import AnswerPopup from './AnswerPopup';

// const DraftCard = ({ draft }) => {
//   const { backend_url } = useContext(UserContext);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//     const [showAnswerPopup, setShowAnswerPopup] = useState(false);
//     const [question, setQuestion] = useState(false);

//   console.log('Draft IDD: ',draft._id);

//   const handleDiscard = async () => {
//     setIsLoading(true);
//     setError('');
//     try {
//       const response = await axios.delete(`${backend_url}/api/draft/remove/${draft._id}`);
//       if (response.data.success) {
//         console.log('Draft Deleted successfully');
//       } else {
//         console.error('Failed to Delete draft:', response.data.message);
//         setError(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error Deleting draft:', error);
//       setError('An error occurred while deleting the draft.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = ()=>{
//     setShowAnswerPopup(true);
//   }
 
//   return (
//     <div className="relative p-4 bg-white rounded-lg shadow-md w-full md:w-1/2">
//       <div className="absolute top-2 left-4 text-gray-600 text-xs">Answer • Unpublished</div>
//       <button className="absolute top-2 right-4 text-gray-500 hover:text-gray-700">
//         <FaTimes />
//       </button>
//       <div className="mt-2 mb-4">
//         <h2 className="text-lg font-bold">How can I learn data structures efficiently?</h2>
//         <p className="text-gray-700 mt-1 font-light leading-5">
//           {draft.body}
//         </p>
//       </div>
//       <div className="flex space-x-4 mt-2">
//         <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600" onClick={handleEdit}>
//           <FaEdit className="mr-2" /> Edit
//         </button>
//         <button
//           className="flex items-center px-4 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 disabled:opacity-50"
//           onClick={handleDiscard}
//           disabled={isLoading}
//         >
//           <FaTrashAlt className="mr-2" /> {isLoading ? 'Discarding...' : 'Discard'}
//         </button>
//       </div>
//       {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
//       {showAnswerPopup && (
//          <AnswerPopup
//            question={{ body: "How can I learn data structures efficiently?", _id: draft.question_id }}
//             setShowAnswerPopup={setShowAnswerPopup}
//            draft={draft}
//           />
//         )}
//     </div>
//   );
// };

// DraftCard.propTypes = {
//   draft: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     body: PropTypes.string.isRequired,
//   }).isRequired,
// };

// export default DraftCard;

import React, { useContext, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrashAlt, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserContext from '../context/userContext';
import AnswerPopup from './AnswerPopup';

const DraftCard = ({ draft }) => {
  const { backend_url } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAnswerPopup, setShowAnswerPopup] = useState(false);
  const {isDarkTheme} = useContext(UserContext);


  console.log('Draft IDD: ', draft._id);

  const handleDiscard = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.delete(`${backend_url}/api/draft/remove/${draft._id}`);
      if (response.data.success) {
        toast.success('Draft discarded successfully!');
      } else {
        console.error('Failed to discard draft:', response.data.message);
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error discarding draft:', error);
      setError('An error occurred while discarding the draft.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setShowAnswerPopup(true);
  };
  
  return (
  <div className={`relative p-4  rounded-lg shadow-slate-600 shadow-sm w-full md:w-1/2 ${isDarkTheme ? 'bg-[#1f2530]' : 'bg-white'}`}>
      <div className={`absolute top-2 left-4  text-xs ${isDarkTheme?'text-gray-300':'text-gray-600'}`}>Answer • Unpublished</div>
      {/* <button className="absolute top-2 right-4 text-gray-500 hover:text-gray-700">
        <FaTimes />
      </button> */}
      <div className="mt-2 mb-4">
        <h2 className={`text-lg font-bold ${isDarkTheme?'text-white':'text-black'}`}>{draft.question_id.body}</h2>
        <p className={` mt-1 font-light leading-5 ${isDarkTheme?'text-gray-300':'text-gray-700'}`}>
          {draft.body}
        </p>
      </div>
      <div className="flex space-x-4 mt-2">
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600" onClick={handleEdit}>
          <FaEdit className="mr-2" /> Edit
        </button>
        <button
          className="flex items-center px-4 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 disabled:opacity-50"
          onClick={handleDiscard}
          disabled={isLoading}
        >
          <FaTrashAlt className="mr-2" /> {isLoading ? 'Discarding...' : 'Discard'}
        </button>
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      {showAnswerPopup && (
        <AnswerPopup
          question={{ body: draft.question_id.body, _id: draft.question_id._id }}
          setShowAnswerPopup={setShowAnswerPopup}
          draft={draft}
        />
      )}
    </div>
  );
};

DraftCard.propTypes = {
  draft: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default DraftCard;
