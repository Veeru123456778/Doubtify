

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/userContext";
import PasswordInput from "./PasswordInput";
import useFetchUser from "../hooks/useFetchUser.js";

const Signin = () => {
  const { token, setToken, backend_url, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

 useFetchUser(token, setUser);

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };
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
    <div className="flex bg-signin-bg justify-center items-center min-h-screen bg-blue-200">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <PasswordInput
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4 flex justify-center">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          className="w-full bg-gradient-to-r bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg "
        >
          Sign In
        </button>
        <div className="flex items-center gap-2 mt-3">
          <p className="text-gray-700">Create an account?</p>
          <p onClick={handleSignUp} className="cursor-pointer text-blue-500 hover:underline">
            Click here
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;

// import React, { useState } from 'react';
// import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';

// const Singin = () => {
//   const [rightPanelActive, setRightPanelActive] = useState(false);

//   const handleSignUpClick = () => {
//     setRightPanelActive(true);
//   };

//   const handleSignInClick = () => {
//     setRightPanelActive(false);
//   };

//   return (
//     <div className=" flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className={`relative w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden ${rightPanelActive ? 'right-panel-active' : ''}`}>
//         <div className={`absolute inset-0 transition-transform duration-600 ease-in-out transform ${rightPanelActive ? 'translate-x-full' : ''}`}>
//           <div className="w-1/2 h-full float-left flex flex-col items-center justify-center px-8 py-12 bg-white">
//             <form className="flex flex-col items-center justify-center w-full h-full">
//               <h1 className="text-2xl font-bold mb-4">Create Account</h1>
//               <div className="flex justify-center mb-4">
//                 <a href="#" className="p-3 mx-1 border rounded-full"><FaFacebookF className="text-xl text-gray-600" /></a>
//                 <a href="#" className="p-3 mx-1 border rounded-full"><FaGooglePlusG className="text-xl text-gray-600" /></a>
//                 <a href="#" className="p-3 mx-1 border rounded-full"><FaLinkedinIn className="text-xl text-gray-600" /></a>
//               </div>
//               <span className="mb-4 text-sm">or use your email for registration</span>
//               <input type="text" placeholder="Name" className="w-full px-4 py-2 mb-3 border rounded bg-gray-100" />
//               <input type="email" placeholder="Email" className="w-full px-4 py-2 mb-3 border rounded bg-gray-100" />
//               <input type="password" placeholder="Password" className="w-full px-4 py-2 mb-3 border rounded bg-gray-100" />
//               <button className="px-6 py-2 mt-4 text-sm font-bold text-white bg-red-500 rounded hover:bg-red-600">Sign Up</button>
//             </form>
//           </div>
//           <div className="w-1/2 h-full float-left flex flex-col items-center justify-center px-8 py-12 bg-white">
//             <form className="flex flex-col items-center justify-center w-full h-full">
//               <h1 className="text-2xl font-bold mb-4">Sign in</h1>
//               <div className="flex justify-center mb-4">
//                 <a href="#" className="p-3 mx-1 border rounded-full"><FaFacebookF className="text-xl text-gray-600" /></a>
//                 <a href="#" className="p-3 mx-1 border rounded-full"><FaGooglePlusG className="text-xl text-gray-600" /></a>
//                 <a href="#" className="p-3 mx-1 border rounded-full"><FaLinkedinIn className="text-xl text-gray-600" /></a>
//               </div>
//               <span className="mb-4 text-sm">or use your account</span>
//               <input type="email" placeholder="Email" className="w-full px-4 py-2 mb-3 border rounded bg-gray-100" />
//               <input type="password" placeholder="Password" className="w-full px-4 py-2 mb-3 border rounded bg-gray-100" />
//               <a href="#" className="mb-4 text-sm">Forgot your password?</a>
//               <button className="px-6 py-2 mt-4 text-sm font-bold text-white bg-red-500 rounded hover:bg-red-600">Sign In</button>
//             </form>
//           </div>
//         </div>
//         <div className="absolute inset-0 w-1/2 transition-transform duration-600 ease-in-out transform bg-gradient-to-r from-red-400 to-pink-500 z-10">
//           <div className="absolute flex flex-col items-center justify-center w-1/2 h-full px-8 py-12 text-center text-white bg-opacity-75 overlay-left left-0">
//             <h1 className="text-2xl font-bold mb-4">Welcome Back!</h1>
//             <p className="mb-4 text-sm">To keep connected with us please login with your personal info</p>
//             <button className="px-6 py-2 mt-4 text-sm font-bold text-white border border-white rounded hover:bg-white hover:text-red-500" onClick={handleSignInClick}>Sign In</button>
//           </div>
//           <div className="absolute flex flex-col items-center justify-center w-1/2 h-full px-8 py-12 text-center text-white bg-opacity-75 overlay-right right-0">
//             <h1 className="text-2xl font-bold mb-4">Hello, Friend!</h1>
//             <p className="mb-4 text-sm">Enter your personal details and start journey with us</p>
//             <button className="px-6 py-2 mt-4 text-sm font-bold text-white border border-white rounded hover:bg-white hover:text-red-500" onClick={handleSignUpClick}>Sign Up</button>
//           </div>
//         </div>
//       </div>
//       <footer className="fixed bottom-0 w-full p-4 text-sm text-center text-white bg-gray-800">
//         <p>
//           Created with <i className="fa fa-heart text-red-500"></i> by
//           <a target="_blank" href="https://florin-pop.com" className="text-blue-400"> Florin Pop </a>
//           - Read how I created this and how you can join the challenge
//           <a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/" className="text-blue-400"> here</a>.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Singin;

// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import UserContext from "../context/userContext";
// import PasswordInput from "./PasswordInput";

// const Signin = () => {
//   const { token, setToken, backend_url, setUser } = useContext(UserContext);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
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
//             onChange={(e) =>
//               setFormData({ ...formData, password: e.target.value })
//             }
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
//           <p
//             onClick={() => navigate("/signup")}
//             className="cursor-pointer text-blue-500 hover:underline"
//           >
//             Click here
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Signin;
