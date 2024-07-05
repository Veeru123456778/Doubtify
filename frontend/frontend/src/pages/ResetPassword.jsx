// import React, { useState, useEffect } from 'react';

// import Header from '../components/Header.jsx';
// import PageIllustration from '../components/PageIllustration.jsx';
// import HeroHome from '../components/HeroHome.jsx';
// import FeaturesBlocks from '../components/FeaturesBlocks.jsx';
// import Footer from '../components/Footer.jsx';
// import Video from '../components/Video.jsx';

// function ResetPassword() {
//   const [videoModalOpen, setVideoModalOpen] = useState(false);
//   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', theme === 'dark');
//   }, [theme]);

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//   };

//   const openVideoModal = () => setVideoModalOpen(true);
//   const closeVideoModal = () => setVideoModalOpen(false);

//   return (
//     <div className={`flex flex-col min-h-screen overflow-hidden ${theme}`}>
//       {/* Site header */}
//       <Header toggleTheme={toggleTheme} theme={theme} />

//       {/* Page content */}
//       <main className="grow">
//         {/* Page illustration */}
//         <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
//           <PageIllustration />
//         </div>

//         {/* Page sections */}
//         <HeroHome openVideoModal={openVideoModal} />
//         <FeaturesBlocks />
//         {/* <FeaturesZigZag /> */}
//         {/* <Testimonials /> */}
//         {/* <Newsletter /> */}
        
//       </main>
//       {/* <Banner /> */}
      
//       {/* Site footer */}
//       <Video />
//       <Footer />
//     </div>
//   );
// }

// export default ResetPassword;

import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import PageIllustration from '../components/PageIllustration';


function ResetPassword() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 mb-4">Forgot your password?</h1>
                <p className="text-xl text-gray-400">We'll email you instructions on how to reset it.</p>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                      <input id="email" type="email" className="form-input w-full text-gray-300" placeholder="you@yourcompany.com" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Reset Password</button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  <Link to="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Cancel</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default ResetPassword;