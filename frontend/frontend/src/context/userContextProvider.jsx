import React, { useState,useEffect } from "react";
import UserContext from "./userContext";
import useFetchUser from "../hooks/useFetchUser";

const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // const loading = useFetchUser(token,setUser);
  const logo_url =
    "https://res.cloudinary.com/dbghqv6ep/image/upload/v1717357720/logo_hpfbyj.jpg";

  const backend_url ="http://localhost:3000";
  
  const toggleTheme = () => {
     setIsDarkTheme(prevTheme => !prevTheme);
     localStorage.setItem('theme', isDarkTheme ? 'light' : 'dark');
   };

   useEffect(() => {
    document.body.classList.toggle('bg-dark', isDarkTheme);
    document.body.classList.toggle('bg-white', !isDarkTheme);
  }, [isDarkTheme]);
 
   useEffect(()=>{
   const theme = localStorage.getItem('theme');
   if(theme==='dark'){
     setIsDarkTheme(true);
   }
   else if(theme==='light'){
   setIsDarkTheme(false);
 }
   },[])
 

  // if(loading){
  //   <div>Loading...</div>
  // }

  return (
    <UserContext.Provider value={{ token, setToken, user, setUser, logo_url , backend_url,isDarkTheme,toggleTheme,setIsDarkTheme }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import UserContext from "./userContext";

// const UserContextProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const logo_url =
//     "https://res.cloudinary.com/dbghqv6ep/image/upload/v1717357720/logo_hpfbyj.jpg";
//   const backend_url = "http://localhost:3000";

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (token) {
//         try {
//           const res = await axios.get(`${backend_url}/api/user/userInfo`, {
//             headers: {token}
//           });
//           if (res.data.success) {
//             setUser(res.data.user);
//           } else {
//             console.error("Failed to fetch user details");
//           }
//         } catch (error) {
//           console.error("Error fetching user information", error);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [token]);

//   useEffect(() => {
//     // Store token in localStorage whenever it changes
//     localStorage.setItem("token", token);
//   }, [token]);

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post(`${backend_url}/api/user/login`, {
//         email,
//         password
//       });
//       if (res.data.success) {
//         const { token } = res.data;
//         setToken(token);
//       } else {
//         console.error("Login failed:", res.data.message);
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//     }
//   };

//   const logout = () => {
//     setToken("");
//     setUser(null);
//     localStorage.removeItem("token");
//   };

//   const updateUser = async (userId, userData) => {
//     try {
//       const res = await axios.put(`${backend_url}/api/user/update/${userId}`, userData, {
//         headers: {token}
//       });
//       if (res.data.success) {
//         setUser(res.data.user);
//         console.log("User updated successfully");
//       } else {
//         console.error("Failed to update user:", res.data.message);
//       }
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   return (
//     <UserContext.Provider
//       value={{ token, user, setUser, login, logout, updateUser, logo_url, backend_url, loading ,setToken}}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserContextProvider;
