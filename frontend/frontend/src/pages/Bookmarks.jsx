// import React, { useState, useContext, useEffect } from 'react';
// import { FiChevronDown } from 'react-icons/fi';
// import Hero from '../components/Hero';
// import UserContext from '../context/userContext';
// import axios from 'axios';
// import useFetchUser from '../hooks/useFetchUser';
// import AnswerCard from '../components/AnswerCard';
// import { toast } from 'react-toastify';
// import { TailSpin } from 'react-loader-spinner';


// const Bookmarks = () => {
//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState('Select Filter');
//   const [questions, setQuestions] = useState([]);
//   const [bookmarks, setBookmarks] = useState([]);
//   const { backend_url, user, setUser, token } = useContext(UserContext);
//   const loading = useFetchUser(token, setUser);

  
//   const handleFilterClick = () => {
//     setShowFilter(!showFilter);
//   };

//   const handleFilterSelect = (filter) => {
//     setSelectedFilter(filter);
//     setShowFilter(false);
//     // applyFilter(filter);

//   };


//   // const applyFilter = (filter) => {
//   //   let sortedBookmarks = [...bookmarks];
//   //   if (filter === 'Latest') {
//   //     sortedBookmarks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//   //   } else if (filter === 'Oldest') {
//   //     sortedBookmarks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//   //   } else if (filter === 'Recommended') {
//   //     sortedBookmarks.sort((a, b) => b.recommendations - a.recommendations); // Assuming bookmarks have a 'recommendations' field
//   //   }
//   //   setBookmarks(sortedBookmarks);
//   // };


//   // useEffect(() => {
//   //   applyFilter(selectedFilter);
//   // }, [bookmarks]);

//   const fetchBookmarks = async () => {
//     try {
//       const response = await axios.get(`${backend_url}/api/bookmark/get/${user._id}`);
//       if (response.data.success) {
//         setBookmarks(response.data.bookmarks);
//       }
//     } catch (error) {
//       console.error("Error fetching bookmarks:", error);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${backend_url}/api/question/questions`);
//       if (response.data.success) {
//         setQuestions(response.data.data);
//       }
//     } catch (error) {
//       console.error('Error displaying questions:', error);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchData();
//       fetchBookmarks();
//     }
//   }, [backend_url, user]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <TailSpin color="#00BFFF" height={80} width={80} />
//       </div>
//     );
//   }


//   const handleRemoveBookmark = async (questionId,answerId,bookmarkId) => {
//     try {
//       const response = await axios.delete(`${backend_url}/api/bookmark/remove`, {
//         data: {
//           questionId,
//           userId: user._id,
//           answerId
//         }
//       });

//       if (response.data.success) {
//         // Remove the bookmark from local state
//         setBookmarks(prevBookmarks => prevBookmarks.filter(bookmark => bookmark._id !== bookmarkId));
//         toast.success("Bookmark removed successfully");
//       } else {
//         toast.error("Failed to remove bookmark:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error removing bookmark:", error);
//     }
//   };
//   console.log(bookmarks);

//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="w-full p-6 flex flex-col items-center">
//       <div className="w-full md:w-1/2">
//         <div className="flex justify-between">
//           <h1 className="text-2xl font-bold">My Bookmarks</h1>
//           <div className="relative">
//             <button
//               onClick={handleFilterClick}
//               className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm xl:w-48 lg:w-40 justify-between"
//             >
//               {selectedFilter} <FiChevronDown className="ml-2" />
//             </button>

//             {showFilter && (
//               <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
//                 <button
//                   onClick={() => handleFilterSelect('Recommended')}
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Recommended
//                 </button>

//                 <button
//                   onClick={() => handleFilterSelect('Latest')}
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Latest
//                 </button>

//                 <button
//                   onClick={() => handleFilterSelect('Oldest')}
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Oldest
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         <hr className="mt-3 border-gray-300" />
//       </div>

//       <div className="flex flex-col justify-center items-center w-full">
//         {bookmarks.length === 0 && (
//           <p className="mt-4 text-gray-600">You have no bookmarks yet.</p>
//         )}

//         {bookmarks.map((bookmark, index) => (
//          <div key={index} className="flex flex-col items-center w-full">
//             <Hero question={bookmark.questionId} />
//             {bookmark.answerId && (
//               <AnswerCard answer={bookmark.answerId} question={bookmark.questionId} />
//             )}
//             <button
//               // onClick={() => handleRemoveBookmark(bookmark.questionId._id,bookmark.answerId,bookmark._id)}
//               className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               Remove Bookmark
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Bookmarks;


import React, { useState, useContext, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Hero from '../components/Hero';
import UserContext from '../context/userContext';
import axios from 'axios';
import useFetchUser from '../hooks/useFetchUser';
import AnswerCard from '../components/AnswerCard';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';

const Bookmarks = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Select Filter');
  const [questions, setQuestions] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const { backend_url, user, setUser, token } = useContext(UserContext);
  const loading = useFetchUser(token, setUser);

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setShowFilter(false);
    // applyFilter(filter);
  };

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/bookmark/get/${user._id}`);
      if (response.data.success) {
        setBookmarks(response.data.bookmarks);
      }
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/question/questions`);
      if (response.data.success) {
        setQuestions(response.data.data);
      }
    } catch (error) {
      console.error('Error displaying questions:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
      fetchBookmarks();
    }
  }, [backend_url, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  const handleRemoveBookmark = async (questionId, answerId, bookmarkId) => {
    try {
      const response = await axios.delete(`${backend_url}/api/bookmark/remove`, {
        data: {
          questionId,
          userId: user._id,
          answerId
        }
      });

      if (response.data.success) {
        // Remove the bookmark from local state
        setBookmarks(prevBookmarks => prevBookmarks.filter(bookmark => bookmark._id !== bookmarkId));
        toast.success("Bookmark removed successfully");
      } else {
        console.error("Failed to remove bookmark:", response.data.message);
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="w-full p-6 flex flex-col items-center">
      <div className="w-full md:w-1/2">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">My Bookmarks</h1>
          <div className="relative">
            <button
              onClick={handleFilterClick}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm xl:w-48 lg:w-40 justify-between"
            >
              {selectedFilter} <FiChevronDown className="ml-2" />
            </button>

            {showFilter && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                <button
                  onClick={() => handleFilterSelect('Recommended')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Recommended
                </button>

                <button
                  onClick={() => handleFilterSelect('Latest')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Latest
                </button>

                <button
                  onClick={() => handleFilterSelect('Oldest')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Oldest
                </button>
              </div>
            )}
          </div>
        </div>
        <hr className="mt-3 border-gray-300" />
      </div>

      <div className="flex flex-col justify-center items-center w-full">
        {bookmarks.length === 0 && (
          <p className="mt-4 text-gray-600">You have no bookmarks yet.</p>
        )}

        {bookmarks.map((bookmark, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            {bookmark.questionId ? (
              <>
                <Hero question={bookmark.questionId} />
                {bookmark.answerId && (
                  <AnswerCard answer={bookmark.answerId} question={bookmark.questionId} />
                )}
                <button
                  onClick={() => handleRemoveBookmark(bookmark.questionId._id, bookmark.answerId, bookmark._id)}
                  className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove Bookmark
                </button>
              </>
            ) : (
              <p>.</p>
            
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
