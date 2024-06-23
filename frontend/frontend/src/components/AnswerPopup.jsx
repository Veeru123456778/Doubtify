// // src/components/AnswerPopup.jsx
// import React, { useState,useContext } from 'react';
// import axios from 'axios';
// import UserContext from '../context/userContext';
// import useFetchUser from '../hooks/useFetchUser';

// const AnswerPopup = ({question,setShowAnswerPopup }) => {
//   const [answer, setAnswer] = useState('');
//   // const [question, setQuestion] = useState('');
//   const [rows, setRows] = useState(1);
//   const [files, setFiles] = useState([]);
//   const maxRows = 5;
//   const {backend_url,token,setUser,user} = useContext(UserContext)
//   const loading = useFetchUser(token, setUser);

//   const handleInputChange = (e) => {
//     const textareaLineHeight = 24;
//     const previousRows = e.target.rows;
//     e.target.rows = 1; // reset number of rows in textarea

//     const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

//     if (currentRows === previousRows) {
//       e.target.rows = currentRows;
//     }

//     if (currentRows >= maxRows) {
//       e.target.rows = maxRows;
//       e.target.scrollTop = e.target.scrollHeight;
//     }

//     setRows(currentRows < maxRows ? currentRows : maxRows);
//     setAnswer(e.target.value);
//   };

//   const handleAddAnswer = async () => {
//     const formData = new FormData();
//     formData.append('body', answer);
//     files.forEach((file, index) => {
//       formData.append('files', file);
//     });
//     try {
//       const response = await axios.post(
//         `${backend_url}/api/answer/${user._id}/${question._id}/add`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       if (response.status === 200) {
//         alert('Answer added successfully!');
//         onClose();
//       }
//     } catch (error) {
//       console.error('Error adding question:', error);
//       alert('Failed to add question. Please try again.');
//     }
//   };

//   if(loading){
//     return <div>Loading...</div>
//   }

//   function onClose(){
//     setShowAnswerPopup(false);
//     // console.log(answer);
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[750px] relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//           &#10005;
//         </button>
//         <h2 className="text-xl font-semibold mb-8 text-center">{question.body}</h2>
//         <div className="mb-4">
//           <textarea
//             className="w-full border border-gray-300 p-2 rounded resize-none overflow-auto"
//             rows={rows}
//             placeholder="Start typing your Answer..."
//             value={answer}
//             onChange={handleInputChange}
//             style={{ lineHeight: '24px' }}
//           />
//         </div>
//         <div className="flex items-center justify-between mt-6">
//           <label className="flex items-center">
//             <input type="file" className="hidden"  onChange={(e) => setFiles([...e.target.files])} />
//             <span className="cursor-pointer text-blue-500">Attach file</span>
//           </label>
//           <button
//             onClick={handleAddAnswer}
//             className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded hover:from-blue-500 hover:to-blue-700"
//           >
//             Publish
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnswerPopup;

// import React, { useState, useContext, useRef, useEffect } from 'react';
// import axios from 'axios';
// import UserContext from '../context/userContext';
// import useFetchUser from '../hooks/useFetchUser';

// const AnswerPopup = ({ onClose, question }) => {
//   const [answer, setAnswer] = useState('');
//   const [rows, setRows] = useState(1);
//   const [files, setFiles] = useState([]);
//   const maxRows = 5;
//   const { backend_url, token, setUser, user } = useContext(UserContext);
//   const loading = useFetchUser(token, setUser);
//   const popupRef = useRef(null);

//   const handleInputChange = (e) => {
//     const textareaLineHeight = 24;
//     const previousRows = e.target.rows;
//     e.target.rows = 1; // reset number of rows in textarea

//     const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

//     if (currentRows === previousRows) {
//       e.target.rows = currentRows;
//     }

//     if (currentRows >= maxRows) {
//       e.target.rows = maxRows;
//       e.target.scrollTop = e.target.scrollHeight;
//     }

//     setRows(currentRows < maxRows ? currentRows : maxRows);
//     setAnswer(e.target.value);
//   };

//   const handleAddAnswer = async () => {
//     const formData = new FormData();
//     formData.append('body', answer);
//     files.forEach((file, index) => {
//       formData.append('files', file);
//     });
//     try {
//       const response = await axios.post(
//         `${backend_url}/api/answer/${user._id}/${question._id}/add`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       if (response.status === 200) {
//         alert('Answer added successfully!');
//         onClose();
//       }
//     } catch (error) {
//       console.error('Error adding question:', error);
//       alert('Failed to add question. Please try again.');
//     }
//   };

//   const handleClickOutside = (e) => {
//     if (popupRef.current && !popupRef.current.contains(e.target)) {
//       onClose();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg w-[750px] relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//           &#10005;
//         </button>
//         <h2 className="text-xl font-semibold mb-8 text-center">{question.body}</h2>
//         <div className="mb-4">
//           <textarea
//             className="w-full border border-gray-300 p-2 rounded resize-none overflow-auto"
//             rows={rows}
//             placeholder="Start typing your Answer..."
//             value={answer}
//             onChange={handleInputChange}
//             style={{ lineHeight: '24px' }}
//           />
//         </div>
//         <div className="flex items-center justify-between mt-6">
//           <label className="flex items-center">
//             <input type="file" className="hidden" onChange={(e) => setFiles([...e.target.files])} />
//             <span className="cursor-pointer text-blue-500">Attach file</span>
//           </label>
//           <button
//             onClick={handleAddAnswer}
//             className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded hover:from-blue-500 hover:to-blue-700"
//           >
//             Publish
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnswerPopup;


// import React, { useState, useContext, useRef, useEffect } from 'react';
// import axios from 'axios';
// import UserContext from '../context/userContext';
// import useFetchUser from '../hooks/useFetchUser';

// const AnswerPopup = ({ question, setShowAnswerPopup }) => {
//   const [answer, setAnswer] = useState('');
//   const [rows, setRows] = useState(1);
//   const [files, setFiles] = useState([]);
//   const maxRows = 5;
//   const { backend_url, token, setUser, user } = useContext(UserContext);
//   const loading = useFetchUser(token, setUser);
//   const popupRef = useRef(null);

//   const handleInputChange = (e) => {
//     const textareaLineHeight = 24;
//     const previousRows = e.target.rows;
//     e.target.rows = 1; // reset number of rows in textarea

//     const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

//     if (currentRows === previousRows) {
//       e.target.rows = currentRows;
//     }

//     if (currentRows >= maxRows) {
//       e.target.rows = maxRows;
//       e.target.scrollTop = e.target.scrollHeight;
//     }

//     setRows(currentRows < maxRows ? currentRows : maxRows);
//     setAnswer(e.target.value);
//   };

//   const handleAddAnswer = async () => {
//     const formData = new FormData();
//     formData.append('body', answer);
//     files.forEach((file, index) => {
//       formData.append('files', file);
//     });
//     try {
//       const response = await axios.post(
//         `${backend_url}/api/answer/${user._id}/${question._id}/add`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       if (response.status === 200) {
//         alert('Answer added successfully!');
//         onClose();
//       }
//     } catch (error) {
//       console.error('Error adding question:', error);
//       alert('Failed to add question. Please try again.');
//     }
//   };

//   const handleClickOutside = (e) => {
//     if (popupRef.current && !popupRef.current.contains(e.target)) {
//       onClose();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const onClose = () => {
//     console.log(answer);
//     setShowAnswerPopup(false);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg w-[750px] relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//           &#10005;
//         </button>
//         <h2 className="text-xl font-semibold mb-8 text-center">{question.body}</h2>
//         <div className="mb-4">
//           <textarea
//             className="w-full border border-gray-300 p-2 rounded resize-none overflow-auto"
//             rows={rows}
//             placeholder="Start typing your Answer..."
//             value={answer}
//             onChange={handleInputChange}
//             style={{ lineHeight: '24px' }}
//           />
//         </div>
//         <div className="flex items-center justify-between mt-6">
//           <label className="flex items-center">
//             <input type="file" className="hidden" onChange={(e) => setFiles([...e.target.files])} />
//             <span className="cursor-pointer text-blue-500">Attach file</span>
//           </label>
//           <button
//             onClick={handleAddAnswer}
//             className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded hover:from-blue-500 hover:to-blue-700"
//           >
//             Publish
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnswerPopup;


import React, { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../context/userContext';
import useFetchUser from '../hooks/useFetchUser';
import { toast } from 'react-toastify';


const AnswerPopup = ({ question, setShowAnswerPopup,draft=null }) => {
  const [answer, setAnswer] = useState(draft?draft.body : '');
  const [rows, setRows] = useState(1);
  const [files, setFiles] = useState([]);
  const maxRows = 5;
  const { backend_url, token, setUser, user } = useContext(UserContext);
  const loading = useFetchUser(token, setUser);
  const popupRef = useRef(null);
  const answerRef = useRef('');

  const handleInputChange = (e) => {
    const textareaLineHeight = 24;
    const previousRows = e.target.rows;
    e.target.rows = 1; // reset number of rows in textarea

    const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
      e.target.scrollTop = e.target.scrollHeight;
    }

    setRows(currentRows < maxRows ? currentRows : maxRows);
    setAnswer(e.target.value);
    answerRef.current=e.target.value;
  };

  const handleAddAnswer = async () => {
    const formData = new FormData();
    formData.append('body', answer);
    files.forEach((file, index) => {
      formData.append('files', file);
    });
    try {
      const response = await axios.post(
        `${backend_url}/api/answer/${user._id}/${question._id}/add`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status === 201) {
        toast.success('Answer added successfully!');
        onClose();
      }
    } catch (error) {
      console.error('Error adding question:', error);
      alert('Failed to add question. Please try again.');
    }
  };

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // const onClose = async() => {
  //   console.log('Answer on close:', answerRef.current);

  //   const data = {
  //     question_id:question._id,
  //     body:answerRef.current,
  //     user_id:user._id
  //   }
  //   try{
  //   const response = await axios.post(`${backend_url}/api/draft/add`,{data:data});

  //   if (response.data.success) {
  //     console.log('Draft saved successfully');
  //   } else {
  //     console.error('Failed to save draft:', response.data.message);
  //   }
  // } catch (error) {
  //   console.error('Error saving draft:', error);
  // }

  //   setShowAnswerPopup(false);
  // };

  const onClose = async () => {
    console.log('Answer on close:', answerRef.current);
    const data = {
        question_id: question._id,
        body: answerRef.current,
        user_id: user._id,
    };
    
    try {
        if (!draft) {
            // Add draft if it doesn't exist
            const response = await axios.post(`${backend_url}/api/draft/add`, { data: data });

            if (response.data.success) {
                console.log('Draft saved successfully');
            } else {
                console.error('Failed to save draft:', response.data.message);
            }
        } else {
            // Update draft if it exists
            const response = await axios.post(`${backend_url}/api/draft/update`, { data: data });

            if (response.data.success) {
                console.log('Draft updated successfully');
            } else {
                console.error('Failed to update draft:', response.data.message);
            }
        }
    } catch (error) {
        console.error('Error saving/updating draft:', error);
    }

    setShowAnswerPopup(false);
};


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg w-[750px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &#10005;
        </button>
        <h2 className="text-xl font-semibold mb-8 text-center">{question.body}</h2>
        <div className="mb-4">
          <textarea
            className="w-full border border-gray-300 p-2 rounded resize-none overflow-auto"
            rows={rows}
            placeholder="Start typing your Answer..."
            value={answer}
            onChange={handleInputChange}
            style={{ lineHeight: '24px' }}
          />
        </div>
        <div className="flex items-center justify-between mt-6">
          <label className="flex items-center">
            <input type="file" className="hidden" onChange={(e) => setFiles([...e.target.files])} />
            <span className="cursor-pointer text-blue-500">Attach file</span>
          </label>
          <button
            onClick={handleAddAnswer}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded hover:from-blue-500 hover:to-blue-700"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerPopup;


// import React, { useState, useContext, useRef, useEffect } from 'react';
// import axios from 'axios';
// import UserContext from '../context/userContext';
// import useFetchUser from '../hooks/useFetchUser';

// const AnswerPopup = ({ question, setShowAnswerPopup, draft }) => {
//   const [answer, setAnswer] = useState(draft.body || '');
//   const [rows, setRows] = useState(1);
//   const [files, setFiles] = useState([]);
//   const maxRows = 5;
//   const { backend_url, token, setUser, user } = useContext(UserContext);
//   const loading = useFetchUser(token, setUser);
//   const popupRef = useRef(null);
//   const answerRef = useRef(answer);

//   const handleInputChange = (e) => {
//     const textareaLineHeight = 24;
//     const previousRows = e.target.rows;
//     e.target.rows = 1; // reset number of rows in textarea

//     const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

//     if (currentRows === previousRows) {
//       e.target.rows = currentRows;
//     }

//     if (currentRows >= maxRows) {
//       e.target.rows = maxRows;
//       e.target.scrollTop = e.target.scrollHeight;
//     }

//     setRows(currentRows < maxRows ? currentRows : maxRows);
//     setAnswer(e.target.value);
//     answerRef.current = e.target.value;
//   };

//   const handleAddAnswer = async () => {
//     const formData = new FormData();
//     formData.append('body', answer);
//     files.forEach((file, index) => {
//       formData.append('files', file);
//     });
//     try {
//       const response = await axios.post(
//         `${backend_url}/api/answer/${user._id}/${question._id}/add`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       if (response.status === 200) {
//         alert('Answer added successfully!');
//         onClose();
//       }
//     } catch (error) {
//       console.error('Error adding question:', error);
//       alert('Failed to add question. Please try again.');
//     }
//   };

//   const handleClickOutside = (e) => {
//     if (popupRef.current && !popupRef.current.contains(e.target)) {
//       onClose();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const onClose = async () => {
//     console.log('Answer on close:', answerRef.current);
//     const data = {
//       question_id: question._id,
//       body: answerRef.current,
//       user_id: user._id,
//     };
//     // try {
//     //   const response = await axios.post(`${backend_url}/api/draft/add`, { data });
//     //   if (response.data.success) {
//     //     console.log('Draft saved successfully');
//     //   } else {
//     //     console.error('Failed to save draft:', response.data.message);
//     //   }
//     // } catch (error) {
//     //   console.error('Error saving draft:', error);
//     // }
//     // setShowAnswerPopup(false);
//     try {
//       const response = await axios.post(`${backend_url}/api/draft/update`, { data });
//       if (response.data.success) {
//         console.log('Draft updated successfully');
//       } else {
//         console.error('Failed to update draft:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error updating draft:', error);
//     }
//     setShowAnswerPopup(false);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg w-[750px] relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//           &#10005;
//         </button>
//         <h2 className="text-xl font-semibold mb-8 text-center">{question.body}</h2>
//         <div className="mb-4">
//           <textarea
//             className="w-full border border-gray-300 p-2 rounded resize-none overflow-auto"
//             rows={rows}
//             placeholder="Start typing your Answer..."
//             value={answer}
//             onChange={handleInputChange}
//             style={{ lineHeight: '24px' }}
//           />
//         </div>
//         <div className="flex items-center justify-between mt-6">
//           <label className="flex items-center">
//             <input type="file" className="hidden" onChange={(e) => setFiles([...e.target.files])} />
//             <span className="cursor-pointer text-blue-500">Attach file</span>
//           </label>
//           <button
//             onClick={handleAddAnswer}
//             className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded hover:from-blue-500 hover:to-blue-700"
//           >
//             Publish
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnswerPopup;
