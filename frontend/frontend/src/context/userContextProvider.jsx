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

  const backend_url ="https://doubtify-3.onrender.com";
  
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
 


  return (
    <UserContext.Provider value={{ token, setToken, user, setUser, logo_url , backend_url,isDarkTheme,toggleTheme,setIsDarkTheme }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

