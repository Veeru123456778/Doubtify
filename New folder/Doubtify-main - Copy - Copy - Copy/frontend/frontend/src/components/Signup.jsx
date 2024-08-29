// /* global google */
// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import UserContext from "../context/userContext";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const { token, setToken, backend_url } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     firstName: "",
//     lastName: "",
//     profilePicture: null,
//   });

//   const url = `${backend_url}/api/user/signup`;
//   const [errors, setErrors] = useState({
//     passwordMatch: true,
//   });

//   useEffect(() => {
//     // Initialize Google Sign-In button and OAuth flow
//     const initializeGoogleSignIn = async () => {
//       await new Promise((resolve) => {
//         // Load Google Sign-In API asynchronously
//         const script = document.createElement("script");
//         script.src = "https://accounts.google.com/gsi/client";
//         script.onload = () => {
//           console.log("Google Sign-In script loaded");
//           resolve();
//         };
//         document.body.appendChild(script);
//       });

//       if (google) {
//         // Initialize Google Sign-In button
//         google.accounts.id.initialize({
//           client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
//           callback: handleGoogleResponse,
//         });

//         google.accounts.id.renderButton(
//           document.getElementById("google-signin-button"),
//           { theme: "outline", size: "large" }
//         );
//       } else {
//         console.error("Google object is not available");
//       }
//     };

//     initializeGoogleSignIn();
//   }, []);

//   const handleGoogleResponse = async (response) => {
//     console.log("Google Sign-In response:", response);
//     try {
//       const res = await axios.post(`${backend_url}/auth/google/callback`, {
//         credential: response.credential,
//       });

//       if (res.data.success) {
//         setToken(res.data.token);
//         localStorage.setItem("token", res.data.token);
//         navigate("/home");
//       } else {
//         console.error("Failed to authenticate via Google.");
//         // Handle error scenario
//       }
//     } catch (error) {
//       console.error("Error exchanging Google One Tap code:", error);
//       // Handle error scenario
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       profilePicture: e.target.files[0],
//     });
//   };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (formData.password !== formData.confirmPassword) {
  //     setErrors({ ...errors, passwordMatch: false });
  //     return;
  //   }

  //   const data = new FormData();
  //   Object.keys(formData).forEach((key) => {
  //     data.append(key, formData[key]);
  //   });

  //   try {
  //     const res = await axios.post(url, data, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     if (res.data.success) {
  //       setToken(res.data.token);
  //       localStorage.setItem("token", res.data.token);
  //       navigate("/home");
  //     } else {
  //       console.error("Signup failed:", res.data.message);
  //       // Handle signup failure
  //     }
  //   } catch (error) {
  //     console.error("Error signing up:", error);
  //     // Handle error scenario
  //   }
  // };

//   const handleSignIn = () => {
//     navigate("/signin");
//   };

//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen bg-blue-200">
//       <form
//         className="bg-white p-6 rounded-lg shadow-md w-full mt-5 mb-5 max-w-md"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-1">Email</label>
//           <input
//             type="text"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-1">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg"
//             required
//           />
//           {!errors.passwordMatch && (
//             <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
//           )}
//         </div>
//         <div className="mb-4 flex gap-5">
//           <div className="flex flex-col">
//             <label className="block text-gray-700 font-semibold mb-1">First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="block text-gray-700 font-semibold mb-1">Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg"
//             />
//           </div>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-1">
//             Profile Picture (Optional)
//           </label>
//           <input
//             type="file"
//             name="profilePicture"
//             onChange={handleFileChange}
//             className="w-full px-3 py-2 border rounded-lg"
//             id="fileInput"
//           />
//         </div>
//         <div className="flex mb-4">
//           <input type="checkbox" className="mb-5" required />
//           <p className="ml-3 text-gray-700">
//             By Continuing, I agree to the terms of use and privacy policy.
//           </p>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
//         >
//           Sign Up
//         </button>
//         <div id="google-signin-button" className="mt-4"></div>
//         <div className="flex items-center gap-2 mt-3">
//           <p className="text-gray-700">Already have an account?</p>
//           <p onClick={handleSignIn} className="cursor-pointer text-blue-500 hover:underline">
//             Click here
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Signup;


import React,{useContext} from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import PageIllustration from '../components/PageIllustration';
import { GoogleLogin } from '@react-oauth/google';
import { createOrGetUser } from '../utils';
// import Banner from '../components/Banner';

// const SignUp = ()=> {
  // const signUp = useGoogleLogin({
  //   onSuccess:(response)=>{
  //     createOrGetUser(response);
  //   },
  //   onError:(error)=>{
  //   console.log(error);
  //   }
  // })


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
                      {/* <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center" onClick={signUp}>
                        <svg className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                        </svg>
                        <span className="h-6 flex items-center border-r border-white border-opacity-25 mr-4" aria-hidden="true"></span>
                        <span className="flex-auto pl-16 pr-8 -ml-16">Sign up with Google</span>
                      </button> */}
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
                      <input id="email" type="email" className="form-input w-full text-gray-900" placeholder="Example@gmail.com" required />
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