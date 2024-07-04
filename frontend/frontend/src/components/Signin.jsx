// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import UserContext from "../context/userContext";
// import PasswordInput from "./PasswordInput";
// import useFetchUser from "../hooks/useFetchUser.js";

// const Signin = () => {
//   const { token, setToken, backend_url, setUser } = useContext(UserContext);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//  useFetchUser(token, setUser);

//   const navigate = useNavigate();

//   const handleSignUp = () => {
//     navigate("/signup");
//   };
//   const url = `${backend_url}/api/user/signin`;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(url, formData);
//       if (res.data.success) {
//         setToken(res.data.token);
//         localStorage.setItem("token", res.data.token);
//         navigate("/home");
//       } else {
//         setErrorMessage(res.data.message);
//       }
//     } catch (error) {
//       console.error("Signin error:", error);
//       setErrorMessage(error.message);
//     }
//   };

//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }

//   console.log("Rendering Signin component");

//   return (
//     <div className="flex bg-signin-bg justify-center items-center min-h-screen bg-blue-200">
//       <form
//         className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
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
//           <label className="block text-gray-700">Password</label>
//           <PasswordInput
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//           />
//         </div>
//         {errorMessage && (
//           <p className="text-red-500 text-sm mb-4 flex justify-center">
//             {errorMessage}
//           </p>
//         )}
//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg "
//         >
//           Sign In
//         </button>
//         <div className="flex items-center gap-2 mt-3">
//           <p className="text-gray-700">Create an account?</p>
//           <p onClick={handleSignUp} className="cursor-pointer text-blue-500 hover:underline">
//             Click here
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Signin;

import React, { useState, useContext } from "react";
import useFetchUser from "../hooks/useFetchUser";
import UserContext from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import PageIllustration from "../components/PageIllustration";
import PasswordInput from "./PasswordInput";
import {GoogleLogin,googleLogout} from '@react-oauth/google';
import { getUser } from "../utils";
import { createOrGetUser } from "../utils";

// import Banner from '../components/Banner';

function SignIn() {
  const { token, setToken, backend_url, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useFetchUser(token, setUser);

  const navigate = useNavigate();

  // const handleSignUp = () => {
  //   navigate("/signup");
  // };
  const url = `${backend_url}/api/user/signin`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(url, formData);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (error) {
      console.error("Signin error:", error);
      setErrorMessage(error.message);
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  console.log("Rendering Signin component");

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div
          className="relative max-w-6xl mx-auto h-0 pointer-events-none"
          aria-hidden="true"
        >
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">
                  Welcome back. We exist to solve your doubts.
                </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      {/* <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                        <svg
                          className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                        </svg>
                        <span
                          className="h-6 flex items-center border-r border-white border-opacity-25 mr-4"
                          aria-hidden="true"
                        ></span>
                        <span className="flex-auto pl-16 pr-8 -ml-16">
                          Sign in with Google
                        </span>
                      </button> */}
                      <GoogleLogin onSuccess={(response)=>{getUser(response)}} onError={()=>{console.log("Error")}}/>
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-700 border-dotted grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-400">
                    Or, sign in with your email
                  </div>
                  <div
                    className="border-t border-gray-700 border-dotted grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input w-full text-gray-300"
                        placeholder="Example@gmail.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      {/* <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-300"
                        placeholder="Password (at least 10 characters)"
                        required
                      /> */}
                      <PasswordInput
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-400 ml-2">
                            Keep me signed in
                          </span>
                        </label>
                        <Link
                          to="/reset-password"
                          className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      {errorMessage && (
                        <p className="text-red-500 text-sm mb-4 flex justify-center">
                          {errorMessage}
                        </p>
                      )}
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" onClick={handleSubmit}>
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  Don’t you have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                  >
                    Sign up
                  </Link>
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

export default SignIn;
