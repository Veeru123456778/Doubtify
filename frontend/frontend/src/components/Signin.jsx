

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
