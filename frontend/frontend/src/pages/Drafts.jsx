import React,{useContext, useState,useEffect} from 'react';
import DraftCard from '../components/DraftCard';
import UserContext from '../context/userContext';
import useFetchUser from '../hooks/useFetchUser';
import axios from 'axios';

const Drafts = () => {
  const {backend_url,token,user,setUser,isDarkTheme} = useContext(UserContext);
  const loading =  useFetchUser(token,setUser);
  const [drafts,setDrafts] = useState([]);
  
  useEffect(() => {
    if(user){
    const userId = user._id;
    console.log("UserId: ",userId);
  

    const fetchDrafts = async () => {
      try {
          const response = await axios.get(`${backend_url}/api/draft/get/${userId}`);
          if(response.data.success){
            setDrafts(response.data.drafts);
            console.log(drafts);
          }
      } catch (error) {
          console.error("Error fetching drafts:", error);
      }
    };
      fetchDrafts();
  }
    }, [backend_url,user,drafts]);

    if(loading){
    return <div>Loading...</div>
     }
     if(!user){
      return null;
     }
  return <div className='gap-y-8 flex flex-col h-full w-full items-center'>

      <div className='w-full md:w-1/2 mt-4'>
        <h1 className={`${isDarkTheme?'text-white':'text-black'} text-2xl font-bold`}>My Drafts</h1>
        <hr className='mt-3 border-gray-300'/>
      </div>
    <div className='gap-y-8 flex flex-col justify-center items-center w-full '>
    {drafts.length === 0 && (
          <p className="text-gray-600">You have no drafts yet.</p>
        )}
    {drafts.map((draft, index) => (
          <div key={index} className='flex flex-col items-center w-full'>
            <DraftCard draft={draft} />
        </div>
        ))}
    </div>
  </div>;
};

export default Drafts;
