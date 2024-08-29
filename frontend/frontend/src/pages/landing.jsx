import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import PageIllustration from '../components/PageIllustration';
import HeroHome from '../components/HeroHome';
import FeaturesBlocks from '../components/FeaturesBlocks';

import Footer from '../components/Footer';
import Video from '../components/Video';

function Home() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const openVideoModal = () => setVideoModalOpen(true);
  const closeVideoModal = () => setVideoModalOpen(false);

  return (
    <div className={`flex flex-col min-h-screen overflow-hidden ${theme}`}>
      {/* Site header */}
      <Header toggleTheme={toggleTheme} theme={theme} />

      {/* Page content */}
      <main className="grow">
        {/* Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        {/* Page sections */}
        <HeroHome openVideoModal={openVideoModal} />
        <FeaturesBlocks />
    
        
      </main>
      
      <Video />
      <Footer />
    </div>
  );
}

export default Home;
