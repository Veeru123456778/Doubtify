import React,{useContext} from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import PageIllustration from '../components/PageIllustration';
import { GoogleLogin } from '@react-oauth/google';
import { createOrGetUser } from '../utils';
import UserContext from '../context/userContext';

// import Banner from '../components/Banner';

function SignUp() {
  const {isDarkTheme} = useContext(UserContext);
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
                <h1 className={isDarkTheme ? 'h1 text-white' : 'h1 text-black'}>Welcome. We exist to solve your doubts.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      
                      <GoogleLogin width={375} onSuccess={(response)=>{createOrGetUser(response)}} onError={()=>{console.log("Error")}}/>
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
                  <div className="text-gray-400">Or, register with your email</div>
                  <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
                </div>
                <form>
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className={isDarkTheme ? ' font-medium mb-1 text-sm block text-gray-300' : 'font-medium mb-1  block text-sm text-black'} htmlFor="email">Email <span className="text-red-600">*</span></label>
                      <input id="email" type="email" className="form-input w-full text-gray-900" placeholder="Example@gamil.com" required />
                    </div>
                    </div>
                    

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className={isDarkTheme ? ' font-medium mb-1 text-sm block text-gray-300' : 'font-medium mb-1  block text-sm text-black'} htmlFor="password">Password <span className="text-red-600">*</span></label>
                      <input id="password" type="password" className="form-input w-full text-gray-900" placeholder="Password (at least 10 characters)" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className={isDarkTheme ? ' font-medium mb-1 text-sm block text-gray-300' : 'font-medium mb-1  block text-sm text-black'} htmlFor="password">confirm Password <span className="text-red-600">*</span></label>
                      <input id="password" type="password" className="form-input w-full text-gray-900" placeholder="Password (at least 10 characters)" required />
                    </div>
                  </div>
                  <div className="flex  -mx-3 mb-4">
                    <div className="w-full flex flex-col px-3">
                      <label className={isDarkTheme ? ' font-medium mb-1 text-sm block text-gray-300' : 'font-medium mb-1  block text-sm text-black'} htmlFor="full-name">First Name<span className="text-red-600">*</span></label>
                      <input id="full-name" type="text" className="form-input w-full text-gray-900" placeholder="First name" required />
                    </div>
                    <div className="w-full flex flex-col px-3">
                      <label className={isDarkTheme ? ' font-medium mb-1 text-sm block text-gray-300' : 'font-medium mb-1  block text-sm text-black'} htmlFor="full-name">Last Name <span className="text-red-600">*</span></label>
                      <input id="full-name" type="text" className="form-input w-full text-gray-900" placeholder="last name" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className={isDarkTheme ? ' font-medium mb-1 text-sm block text-gray-300' : 'font-medium mb-1  block text-sm text-black'} htmlFor="profile-picture">Profile Picture</label>
                      <input id="profile-picture" type="file" className="form-input w-full text-gray-900" />
                    </div>
                  </div>
                  {/* <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="company-name">Company Name <span className="text-red-600">*</span></label>
                      <input id="company-name" type="text" className="form-input w-full text-gray-300" placeholder="Your company or app name" required />
                    </div>
                  </div> */}
                
                  <div className="text-sm text-gray-500 text-center">
                    I agree to be contacted by Open PRO about this offer as per the Open PRO <Link to="#" className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out">Privacy Policy</Link>.
                                </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign up</button>
                    </div>
                 </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                Already have an account? <Link to="signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign in</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* <Banner /> */}

    </div>
  );
}

export default SignUp;