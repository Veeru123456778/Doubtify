import React, { useState,useEffect, useContext,lazy,Suspense } from 'react';
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
import {GoogleOAuthProvider} from '@react-oauth/google';
import ResetPassword from './pages/ResetPassword.jsx';
import CommentsPage from './pages/comments.jsx';
import SearchPage from './pages/searchPage.jsx';
import DetailedCategory from './pages/DetailedCategory.jsx';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {isDarkTheme} = useContext(UserContext);
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
  const isAuthPage = location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup' || (location.pathname.startsWith('/question/') &&  !location.pathname.includes('/comments')) || location.pathname.startsWith('/reset-password');

  return (
 
    // <UserContextProvider>
     
      <div className={isDarkTheme ? 'bg-dark' : 'bg-white'}>
     {!isAuthPage && <NavBar toggleSidebar={toggleSidebar}/>}
      <div className={`flex ${!isAuthPage ? 'pt-16' : ''} justify-center items-center`}>
        {!isAuthPage && <LeftSidebar className="w-1/4" isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
        <div className={`flex-grow p-4 transition-all duration-300 ${isAuthPage ? 'w-full' : 'w-1/2'}`}>
        <Suspense fallback={<h1>Loading...</h1>}>
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
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/answer" element={<Answer />} />
            <Route path="/question/:questionId/answer/:answerId/comments" element={<CommentsPage />} />
            {/* <Route path="/commentsReplies/:commentId" element={<RepliesPage />} /> */}
            <Route path="/detailedCategory" element={<DetailedCategory />} />
            <Route path="/detailedCategory/answer" element={<Answer />} />
            <Route path="/profile/answer" element={<Answer />} />
          </Routes>
          </Suspense>
        </div>
        {!isAuthPage && <RightSidebar className="w-1/4" />}
      </div>
      <ToastContainer  autoClose={1000} // auto-close after 3 seconds
      />
   </div>


  );
      {/* </UserContextProvider> */}
}

function AppContainer() {
  return (
    <UserContextProvider>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <Router>
      <App />
    </Router>
    </GoogleOAuthProvider>
    </UserContextProvider>
  );
}

export default AppContainer;

