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
//   const { backend_url, user, setUser, token,isDarkTheme } = useContext(UserContext);
//   const loading = useFetchUser(token, setUser);

//   const handleFilterClick = () => {
//     setShowFilter(!showFilter);
//   };

//   const handleFilterSelect = (filter) => {
//     setSelectedFilter(filter);
//     setShowFilter(false);
//     // applyFilter(filter);
//   };

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

//   const handleRemoveBookmark = async (questionId, answerId, bookmarkId) => {
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
//         console.error("Failed to remove bookmark:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error removing bookmark:", error);
//     }
//   };

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className={`w-full p-6 flex flex-col items-center ${isDarkTheme?'bg-dark':'bg-white'}`}>
//       <div className="w-full md:w-1/2">
//         <div className="flex justify-between">
//           <h1 className={`text-2xl font-bold ${isDarkTheme?'text-white':'text-black'}`}>My Bookmarks</h1>
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
//         {bookmarks.length === 0 && (<div className='items-center'>
//           <p className="mt-4 text-gray-600">You have no bookmarks yet.</p>
          
//           </div>
//         )}

//         {bookmarks.map((bookmark, index) => (
//           <div key={index} className={`flex flex-col items-center w-full  ${isDarkTheme?'bg-dark':'bg-white'}`}>
//             {bookmark.questionId ? (
//               <>
//                 <Hero question={bookmark.questionId}  />
//                 {bookmark.answerId && (
//                   <AnswerCard answer={bookmark.answerId} question={bookmark.questionId} />
//                 )}
//                 <button
//                   onClick={() => handleRemoveBookmark(bookmark.questionId._id, bookmark.answerId, bookmark._id)}
//                   className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                 >
//                   Remove Bookmark
//                 </button>
//               </>
//             ) : (
//               <p>.</p>
            
//             )}
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
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const { backend_url, user, setUser, token, isDarkTheme } = useContext(UserContext);
  const loading = useFetchUser(token, setUser);

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setShowFilter(false);
    applyFilter(filter);
  };

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/bookmark/get/${user._id}`);
      if (response.data.success) {
        setBookmarks(response.data.bookmarks);
        setFilteredBookmarks(response.data.bookmarks); // Initialize filtered bookmarks
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

  useEffect(() => {
    applyFilter(selectedFilter); // Apply filter when selectedFilter changes
  }, [selectedFilter]);

  const applyFilter = (filter) => {
    let filtered = [...bookmarks];
    
    // Example filters; adjust these according to your requirements
    switch (filter) {
      case 'Recommended':
        // Apply your recommended filter logic here
        break;
      case 'Latest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'Oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }

    setFilteredBookmarks(filtered);
  };

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
        setBookmarks(prevBookmarks => prevBookmarks.filter(bookmark => bookmark._id !== bookmarkId));
        setFilteredBookmarks(prevFilteredBookmarks => prevFilteredBookmarks.filter(bookmark => bookmark._id !== bookmarkId));
        toast.success("Bookmark removed successfully");
      } else {
        console.error("Failed to remove bookmark:", response.data.message);
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={`w-full p-6 flex flex-col items-center ${isDarkTheme ? 'bg-dark' : 'bg-white'}`}>
      <div className="w-full md:w-1/2">
        <div className="flex justify-between">
          <h1 className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>My Bookmarks</h1>
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
        {filteredBookmarks.length === 0 && (
          <div className='items-center'>
            <p className="mt-4 text-gray-600">You have no bookmarks yet.</p>
          </div>
        )}

        {filteredBookmarks.map((bookmark, index) => (
          <div key={index} className={`flex flex-col items-center w-full ${isDarkTheme ? 'bg-dark' : 'bg-white'}`}>
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
