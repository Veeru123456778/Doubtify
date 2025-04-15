import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

export const createOrGetUser = async (response) => {

    try {
    const decoded = jwtDecode(response.credential);
    const { given_name, family_name, picture, email } = decoded;
    
    const userPayload = {
      email: email,
      profile_picture: picture,
      firstName: given_name,
      lastName: family_name,
      GoogleLogin: true,
    };
   console.log(userPayload);
    const result = await axios.post(`https://doubtify-3.onrender.com/api/user/google-login`, userPayload);

 
    if (result.data.success) {
      localStorage.setItem("token", result.data.token);
      window.location.href = "/home";
    } else {
      console.error("Google login failed:", result.data.message);
    }
  } catch (error) {
    console.error('Error creating or getting user:', error);
  }
};



const url = ''; 

export const getUser = async (response) => {
    const url = `https://doubtify-3.onrender.com/api/user/signinGoogle`;
    try {
        const decoded = jwtDecode(response.credential);
        const { email } = decoded;
        
        const userPayload = {
            email: email,
            GoogleLogin:true
        };
        console.log(userPayload);
        const res = await axios.post(url, userPayload);
        if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            window.location.href = "/home";
        } else {
            console.log(res.data.message);
        }
    } catch (error) {
        console.error("Signin error:", error);
        console.log(error.message);
    }
};
