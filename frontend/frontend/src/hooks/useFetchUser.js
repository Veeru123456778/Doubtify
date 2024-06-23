import { useEffect, useState,useContext } from "react";
import axios from "axios";
import UserContext from "../context/userContext";

const useFetchUser = (token, setUser) => {
  const [loading, setLoading] = useState(true);
  const { backend_url } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await axios.get(
            `${backend_url}/api/user/userInfo`,
            {
              headers: { token },
            }
          );
          if (res.data.success) {
            setUser(res.data.user);
          } else {
            console.error("Failed to fetch user details");
          }
        } catch (error) {
          console.error("Error fetching user information", error);
        }
        setLoading(false);
      }
    };
    fetchUser();
  }, [token, setUser]);

  return loading;
};

export default useFetchUser;

// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import UserContext from "../context/userContext";

// const useFetchUser = (token, setUser) => {
//   const [loading, setLoading] = useState(true);
//   const { backend_url } = useContext(UserContext);

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (token) {
//         try {
//           const res = await axios.get(
//             `${backend_url}/api/user/userInfo`,
//             {
//               headers: {token} // Update header to pass token correctly
//             }
//           );
//           if (res.data.success) {
//             setUser(res.data.user);
//           } else {
//             console.error("Failed to fetch user details");
//           }
//         } catch (error) {
//           console.error("Error fetching user information", error);
//         }
//       }
//       setLoading(false); // Move setLoading(false) inside the try-catch block
//     };
//     fetchUser();
//   }, [token, setUser, backend_url]); // Include backend_url in the dependency array

//   return loading;
// };

// export default useFetchUser;
