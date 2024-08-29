import React,{useContext} from 'react';
import UserContext from '../context/userContext';

function FeaturesBlocks() {

  const {isDarkTheme} = useContext(UserContext);

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className={isDarkTheme ? 'h1 mb-4 text-white' : 'h1 mb-4 text-black'}>Explore Our Powerful Features.</h2>
            <p className="text-xl text-gray-400">"Discover the tools that make Doubtify the best platform for resolving academic doubts. From saving important questions to sharing and searching for answers, we've got everything you need to enhance your learning experience.</p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none" data-aos-id-blocks>

            {/* 1st item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
            
              <img src="/bookmark.png" alt="" className=" w-16 h-16 mb-4"/>
              <h4 className={isDarkTheme ? 'h4 mb-2 text-white' : 'h4 mb-2 text-black'}>Bookmark Questions</h4>
              <p className="text-lg text-gray-400 text-center">Never lose track of your important queries. Save and easily access your bookmarked questions anytime. Stay organized and focused on your learning.</p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="100" data-aos-anchor="[data-aos-id-blocks]">
            
              <img src="/link-alt.png" alt="" className=" w-16 h-16 mb-4"/>
              <h4 className={isDarkTheme ? 'h4 mb-2 text-white' : 'h4 mb-2 text-black'}>Copy Link to Share</h4>
              <p className="text-lg text-gray-400 text-center">Share knowledge instantly with a simple link. Effortlessly share specific questions with friends or mentors. Spread valuable information with ease.</p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="200" data-aos-anchor="[data-aos-id-blocks]">
           
              <img src="/search.png" alt="" className=" w-16 h-16 mb-4"/>
              <h4 className={isDarkTheme ? 'h4 mb-2 text-white' : 'h4 mb-2 text-black'}>Search Questions
              </h4>
              <p className="text-lg text-gray-400 text-center">Find answers fast with our advanced search tool. Quickly locate relevant questions and solutions in no time. Make your learning more efficient and effective.</p>
            </div>

          </div>

        </div>
      </div>
     
    </section>
  );
}

export default FeaturesBlocks;
