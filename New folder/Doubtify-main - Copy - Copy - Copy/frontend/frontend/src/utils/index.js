// import {jwtDecode} from 'jwt-decode';
// import axios from 'axios';

// export const createOrGetUser = async(response,addUser)=>{
// const decoded = jwtDecode(response.credential);
// const {given_name,family_name,picture,sub,email} = decoded;
// const user={
//     firstName:given_name,
//     lastName:family_name,
//     email:email,
//     profilePicture:picture,
//     isGoogleLogin:true
// }


// }

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
      // You can add a flag to differentiate Google login users
      GoogleLogin: true,
    };
   console.log(userPayload);
    const result = await axios.post('http://localhost:3000/api/user/google-login', userPayload);

    // Assuming your backend returns a token
    if (result.data.success) {
    //   addUser(result.data.user);
      localStorage.setItem("token", result.data.token);
      // Navigate to the desired route, e.g., home
      window.location.href = "/home";
    } else {
      console.error("Google login failed:", result.data.message);
      // Handle login failure
    }
  } catch (error) {
    console.error('Error creating or getting user:', error);
    // Handle error scenario
  }
};

const url = ''; // replace with your backend endpoint

export const getUser = async (response) => {
    const backend_url ='http://localhost:3000';
    const url = `${backend_url}/api/user/signinGoogle`;
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
