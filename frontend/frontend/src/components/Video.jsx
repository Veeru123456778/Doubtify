// "use client";

// import Image from "next/image";
import { useContext } from "react";
import UserContext from "../context/userContext";
// import SectionTitle from "../Common/SectionTitle";

const Video = () => {
  const {isDarkTheme} = useContext(UserContext);

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        {/* <div
          title="We are ready to help"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
          mb="80px"
        /> */}
         <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className={isDarkTheme ? 'h1 mb-4 text-white' : 'h1 mb-4 text-black'}>See Our Platform in Action.
            </h2>
            <p className="text-xl text-gray-400">Watch this quick demo to learn how Doubtify works. Discover how easy it is to ask questions, get answers, and make the most out of our powerful features.</p>
          </div>
       

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="mx-auto max-w-[770px] overflow-hidden rounded-md"
              data-wow-delay=".15s"
            >
              <div className="relative aspect-[77/40] items-center justify-center">
                <video width="100%" controls>
                  <source src="/Demo_video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Video;
