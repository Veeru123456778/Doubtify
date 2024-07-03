import React,{useContext} from 'react';
import Modal from '../utils/Modal';
import HeroImage from '../images/hero-image-01.jpg';
import UserContext from '../context/userContext';

function HeroHome() {
  const {isDarkTheme} = useContext(UserContext);
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative h-screen mt-16">
        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className={isDarkTheme ? 'h1 mb-4 text-white' : 'h1 mb-4 text-black'} data-aos="fade-up">
            Unlock Your Learning Potential with Peer-Powered Solutions
            </h1>
            <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="200">
            Welcome to Doubtify, the ultimate platform where students can ask questions and get answers from teachers, fellow students, and alumni. Connect, collaborate, and conquer your academic challenges together!
            </p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div data-aos="fade-up" data-aos-delay="400">
                <a className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0" href="#0">
                  Lets Try
                </a>
              </div>
              {/* <div data-aos="fade-up" data-aos-delay="600">
                <a className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#0">
                  Learn more
                </a>
              </div> */}
            </div>
          </div>

          {/* Hero image */}
          <div>
            {/* <div className="relative flex justify-center items-center" data-aos="fade-up" data-aos-delay="200">
              <img className="mx-auto" src={HeroImage} width="1024" height="504" alt="Hero" />
            </div> */}

            {/* Modal */}
            <Modal id="modal" ariaLabel="modal-headline" show={false} handleClose={() => {}}>
              {/* Empty Modal content since video component is removed */}
            </Modal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroHome;
