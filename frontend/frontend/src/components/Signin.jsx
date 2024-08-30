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
  const {isDarkTheme} = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useFetchUser(token, setUser);

  const navigate = useNavigate();

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
                <h1 className={isDarkTheme ? 'h1 text-white' : 'h1 text-black'}>Welcome back. We exist to solve your doubts.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                   
                      <GoogleLogin width={375} onSuccess={(response)=>{getUser(response)}} onError={()=>{console.log("Error")}}/>
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
                     
                    <label className={isDarkTheme ? ' font-medium mb-1 text-sm block text-gray-300' : 'font-medium mb-1  block text-sm text-black'} htmlFor="email">Email</label>            
                              <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input w-full text-gray-900"
                        placeholder="Example@gmail.com"
                        required
                      />
                      
        
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                   
                    <label className={isDarkTheme ? ' font-medium mb-1 text-sm block text-gray-300' : 'font-medium mb-1  block text-sm text-black'} htmlFor="password">Password</label>
                  
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
                          <span className={isDarkTheme ? ' font-medium mb-1 text-sm block text-gray-300 ml-2' : 'font-medium mb-1  block text-sm text-black ml-2'}>Keep me signed in</span>
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
