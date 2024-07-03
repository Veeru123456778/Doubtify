// // import React, { useState } from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import NavBar from './components/NavBar';
// // import LeftSidebar from './components/LeftSidebar';
// // import RightSidebar from './components/RightSidebar';
// // import Home from './pages/Home';
// // import Questions from './pages/Questions';
// // import Profile from './pages/Profile';
// // import Drafts from './pages/Drafts';
// // import Bookmarks from './pages/Bookmarks';
// // import Categories from './pages/Categories';
// // import Answer from './pages/Answer';
// // import UserContextProvider from "./context/userContextProvider";
// // import SignUp from "./pages/SignUp";
// // import SignIn from "./pages/SignIn";

// // function App() {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const toggleSidebar = () => {
// //     setIsSidebarOpen(!isSidebarOpen);
// //   };

// //   return (
// //     <UserContextProvider>
// //     <Router>
// //     <Routes>
// //     <Route path="/" element={<SignUp />} />
// //     <Route path="/signup" element={<SignUp />} />
// //     <Route path="/signin" element={<SignIn />} />
// //     </Routes>
// //       <div className="App w-full">
// //         { <NavBar toggleSidebar={toggleSidebar} />}
// //         <div className="flex pt-16 justify-center items-center">
// //           { <LeftSidebar className="w-1/4" isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
// //           <div className={`w-1/2 flex-grow p-4 transition-all duration-300`}>
         
// //           {/* <InfiniteScroll
// //               dataLength={items.length}
// //               next={fetchMoreData}
// //               hasMore={true}
// //               loader={<h4>Loading...</h4>}
// //               endMessage={
// //                 <p style={{ textAlign: 'center' }}>
// //                   <b>Yay! You have seen it all</b>
// //                 </p>
// //               }
// //             > */}

// //             <Routes>
// //               <Route path="/home" element={<Home />} />
// //               <Route path="/questions" element={<Questions />} />
// //               <Route path="/profile" element={<Profile />} />
// //               <Route path="/drafts" element={<Drafts />} />
// //               <Route path="/bookmarks" element={<Bookmarks />} />
// //               <Route path="/categories" element={<Categories />} />
// //               <Route path="/bookmarks/answer" element={<Answer />} />
// //               <Route path="/questions/answer" element={<Answer />} />
// //               <Route path="/home/answer" element={<Answer />} />
// //             </Routes>

// //             {/* </InfiniteScroll> */}

// //           </div>
// //           {<RightSidebar className="w-1/4" />}
// //         </div>
// //       </div>
// //     </Router>
// //     </UserContextProvider>
// //   );
// // }

// // export default App;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// import NavBar from './components/NavBar';
// import LeftSidebar from './components/LeftSidebar';
// import RightSidebar from './components/RightSidebar';
// import Home from './pages/Home';
// import Questions from './pages/Questions';
// import Profile from './pages/Profile';
// import Drafts from './pages/Drafts';
// import Bookmarks from './pages/Bookmarks';
// import Categories from './pages/Categories';
// import Answer from './pages/Answer';
// import UserContextProvider from "./context/userContextProvider";
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";

// function App() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const location = useLocation();

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // Check if the current path is /signup or /signin
//   const isAuthPage = location.pathname === '/' || '/signin' || location.pathname === '/signup';

//   return (
//     <UserContextProvider>
//       {!isAuthPage && <NavBar toggleSidebar={toggleSidebar} />}
//       <div className={`flex ${!isAuthPage ? 'pt-16' : ''} justify-center items-center`}>
//         {!isAuthPage && <LeftSidebar className="w-1/4" isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
//         <div className={`flex-grow p-4 transition-all duration-300 ${isAuthPage ? 'w-full' : 'w-1/2'}`}>
//           <Routes>
//             <Route path="/" element={<SignUp />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/signin" element={<SignIn />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/questions" element={<Questions />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/drafts" element={<Drafts />} />
//             <Route path="/bookmarks" element={<Bookmarks />} />
//             <Route path="/categories" element={<Categories />} />
//             <Route path="/bookmarks/answer" element={<Answer />} />
//             <Route path="/questions/answer" element={<Answer />} />
//             <Route path="/home/answer" element={<Answer />} />
//           </Routes>
//         </div>
//         {!isAuthPage && <RightSidebar className="w-1/4" />}
//       </div>
//     </UserContextProvider>
//   );
// }

// function AppContainer() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }

// export default AppContainer;


import React, { useState,useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import NavBar from './components/NavBar';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Profile from './pages/Profile';
import Drafts from './pages/Drafts';
import Bookmarks from './pages/Bookmarks';
import Categories from './pages/Categories';
//import DetailedCategory from './pages/DetailedCategory';
import Answer from './pages/Answer';
import UserContextProvider from "./context/userContextProvider";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { ToastContainer, toast } from 'react-toastify';
import PublicQuestion from './components/PublicQuestion';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify';
import './index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Landing from './pages/landing.jsx'
import UserContext from './context/userContext.js';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {isDarkTheme} = useContext(UserContext);
  // const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change


  // Correct condition to check if the current path is /, /signin or /signup
  const isAuthPage = location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup' || location.pathname.startsWith('/question/');

  return (
 
    // <UserContextProvider>
     
      <div className={isDarkTheme ? 'bg-dark' : 'bg-white'}>
     {!isAuthPage && <NavBar toggleSidebar={toggleSidebar}/>}
      <div className={`flex ${!isAuthPage ? 'pt-16' : ''} justify-center items-center`}>
        {!isAuthPage && <LeftSidebar className="w-1/4" isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
        <div className={`flex-grow p-4 transition-all duration-300 ${isAuthPage ? 'w-full' : 'w-1/2'}`}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/drafts" element={<Drafts />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/bookmarks/answer" element={<Answer />} />
            <Route path="/questions/answer" element={<Answer />} />
            <Route path="/home/answer" element={<Answer />} />
            <Route path="/question/:id" element={<PublicQuestion />} />

          </Routes>
        </div>
        {!isAuthPage && <RightSidebar className="w-1/4" />}
      </div>
      <ToastContainer  autoClose={3000} // auto-close after 3 seconds
      />
   </div>


  );
      {/* </UserContextProvider> */}
}

function AppContainer() {
  return (
    <UserContextProvider>
    <Router>
      <App />
    </Router>
    </UserContextProvider>
  );
}

export default AppContainer;
