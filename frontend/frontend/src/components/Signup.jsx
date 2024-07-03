// // import React, { useContext, useState } from "react";
// // import axios from "axios";
// // import UserContext from "../context/userContext";
// // import { useNavigate } from "react-router-dom";

// // const Signup = () => {
// //   const { token, setToken,backend_url } = useContext(UserContext);
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //     firstName: "",
// //     lastName:"",
// //     profilePicture: null,
// //   });

// //   const url = `${backend_url}/api/user/signup`;
// //   const [errors, setErrors] = useState({
// //     passwordMatch: true,
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });
// //   };

// //   const handleFileChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       profilePicture: e.target.files[0],
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (formData.password !== formData.confirmPassword) {
// //       setErrors({ ...errors, passwordMatch: false });
// //       return;
// //     }

// //     const data = new FormData();
// //     Object.keys(formData).forEach((key) => {
// //       data.append(key, formData[key]);
// //     });

// //     console.log("Form Data: ",formData);
// //     const res = await axios.post(url, data, {
// //       headers: {
// //         "Content-Type": "multipart/form-data",
// //       },
// //     });

// //     if (res.data.success) {
// //       setToken(res.data.token);
// //       localStorage.setItem("token", res.data.token);
// //       navigate("/home");
// //     }
// //   };

// //   const handleSignIn = () => {
// //     navigate("/signin");
// //   };

// //   return (
// //     <div className="flex flex-col justify-center items-center min-h-screen bg-blue-200">
// //       <form
// //         className="bg-white p-6 rounded-lg shadow-md w-full mt-5 mb-5 max-w-md"
// //         onSubmit={handleSubmit}
// //       >
// //         <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
// //         <div className="mb-4">
// //           <label className="block text-gray-700 font-semibold mb-1">Email</label>
// //           <input
// //             type="text"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             className="w-full px-3 py-2 border rounded-lg"
// //             required
// //           />
// //         </div>
// //         <div className="mb-4">
// //           <label className="block text-gray-700 font-semibold mb-1">Password</label>
// //           <input
// //             type="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             className="w-full px-3 py-2 border rounded-lg"
// //             required
// //           />
       

// //         </div>
// //         <div className="mb-4">
// //           <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
// //           <input
// //             type="password"
// //             name="confirmPassword"
// //             value={formData.confirmPassword}
// //             onChange={handleChange}
// //             className="w-full px-3 py-2 border rounded-lg"
// //             required
// //           />
// //           {!errors.passwordMatch && (
// //             <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
// //           )}
// //         </div>
// //         <div className="mb-4 flex gap-5">
// //         <div className="flex flex-col">
// //           <label className="block text-gray-700 font-semibold mb-1">First Name</label>
// //           <input
// //             type="text"
// //             name="firstName"
// //             value={formData.firstName}
// //             onChange={handleChange}
// //             className="w-full px-3 py-2 border rounded-lg"
// //             required
// //           />
// //           </div>
// //           <div className="flex flex-col">
// //           <label className="block text-gray-700 font-semibold mb-1">Last Name</label>
// //           <input
// //             type="text"
// //             name="lastName"
// //             value={formData.lastName}
// //             onChange={handleChange}
// //             className="w-full px-3 py-2 border rounded-lg"
            
// //           />
// //           </div>
// //         </div>
// //         <div className="mb-4">
// //           <label className="block text-gray-700 font-semibold mb-1">
// //             Profile Picture (Optional)
// //           </label>
// //           <input
// //             type="file"
// //             name="profilePicture"
// //             onChange={handleFileChange}
// //             className="w-full px-3 py-2 border rounded-lg "
// //             id="fileInput"
// //           />
           

// //         </div>
// //         <div className="flex mb-4">
// //           <input type="checkbox" className="mb-5" required />
// //           <p className=" ml-3 text-gray-700">
// //             By Continuing, i agree to the terms of use and privacy policy.
// //           </p>
// //         </div>

// //         <button
// //           type="submit"
// //           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg  "
// //         >
// //           Sign Up
// //         </button>

       
// //         <div className="flex items-center gap-2 mt-3">
// //           <p className=" text-gray-700">Already have an account?</p>
// //           <p onClick={handleSignIn} className="cursor-pointer text-blue-500 hover:underline">
// //             Click here
// //           </p>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Signup;

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
//     /* global google */
//     google.accounts.id.initialize({
//       client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
//       callback: handleGoogleResponse,
//     });
//     google.accounts.id.renderButton(
//       document.getElementById("google-signin-button"),
//       { theme: "outline", size: "large" }
//     );
//   }, []);

  
//   const handleGoogleResponse = () => {
//     // Construct the authorization URL
//     const clientId = '512931546932-ieh0fudt046hdug92sv8tcgi5rsiegbe.apps.googleusercontent.com'; // Replace with your Google OAuth2 client ID
//     const redirectUri = `${window.location.origin}/auth/google/callback`;
//     const scopes = 'profile email'; // Specify the scopes your app needs

//     // Construct the Google OAuth2 authorization URL
//     const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=code`;

//     // Redirect the user to Google for authentication
//     window.location.href = authUrl;
// };

// const handleGoogleSignIn = async (code) => {
//   try {
//     const response = await axios.post('/auth/google/callback', { code });
//     const { success, user } = response.data;

//     if (success) {
//       console.log('User Info:', user);
//       // Handle user information in your React component state or context
//     } else {
//       console.error('Failed to fetch user info from backend');
//       // Handle error scenario
//     }
//   } catch (error) {
//     console.error('Error fetching user info:', error);
//     // Handle error scenario
//   }
// };



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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       setErrors({ ...errors, passwordMatch: false });
//       return;
//     }

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     console.log("Form Data: ", formData);
//     const res = await axios.post(url, data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     if (res.data.success) {
//       setToken(res.data.token);
//       localStorage.setItem("token", res.data.token);
//       navigate("/home");
//     }
//   };

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
//             className="w-full px-3 py-2 border rounded-lg "
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
//         {/* <div id="google-signin-button" className="mt-4" onClick={handleGoogleResponse}></div> */}
//         <button onClick={handleGoogleResponse}>Sign In With Google</button>
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

/* global google */
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { token, setToken, backend_url } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    profilePicture: null,
  });

  const url = `${backend_url}/api/user/signup`;
  const [errors, setErrors] = useState({
    passwordMatch: true,
  });

  useEffect(() => {
    // Initialize Google Sign-In button and OAuth flow
    const initializeGoogleSignIn = async () => {
      await new Promise((resolve) => {
        // Load Google Sign-In API asynchronously
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.onload = () => {
          console.log("Google Sign-In script loaded");
          resolve();
        };
        document.body.appendChild(script);
      });

      if (google) {
        // Initialize Google Sign-In button
        google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });

        google.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          { theme: "outline", size: "large" }
        );
      } else {
        console.error("Google object is not available");
      }
    };

    initializeGoogleSignIn();
  }, []);

  const handleGoogleResponse = async (response) => {
    console.log("Google Sign-In response:", response);
    try {
      const res = await axios.post(`${backend_url}/auth/google/callback`, {
        credential: response.credential,
      });

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else {
        console.error("Failed to authenticate via Google.");
        // Handle error scenario
      }
    } catch (error) {
      console.error("Error exchanging Google One Tap code:", error);
      // Handle error scenario
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, passwordMatch: false });
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const res = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else {
        console.error("Signup failed:", res.data.message);
        // Handle signup failure
      }
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error scenario
    }
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-200">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full mt-5 mb-5 max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
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
          <label className="block text-gray-700 font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          {!errors.passwordMatch && (
            <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
          )}
        </div>
        <div className="mb-4 flex gap-5">
          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Profile Picture (Optional)
          </label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg"
            id="fileInput"
          />
        </div>
        <div className="flex mb-4">
          <input type="checkbox" className="mb-5" required />
          <p className="ml-3 text-gray-700">
            By Continuing, I agree to the terms of use and privacy policy.
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Sign Up
        </button>
        <div id="google-signin-button" className="mt-4"></div>
        <div className="flex items-center gap-2 mt-3">
          <p className="text-gray-700">Already have an account?</p>
          <p onClick={handleSignIn} className="cursor-pointer text-blue-500 hover:underline">
            Click here
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
