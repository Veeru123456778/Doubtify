// import React, { useContext } from 'react';
// import searchIcon from '../assets/search.png'; // Ensure the path is correct
// import CategoryCard from '../components/CategoryCard';
// import UserContext from '../context/userContext';

// const Categories = () => {
//   const {isDarkTheme} = useContext(UserContext);
//   return (
//     <div className="w-full h-screen  p-6 flex flex-col items-center">
    
//         <div className='md:w-1/2 w-full'>
//         <div className="flex justify-between items-start">
//           <h1 className={`${isDarkTheme ? 'text-white' : 'text-black'}  text-2xl font-bold`}>Categories</h1>
//           <input
//             type="text"
//             placeholder="Search"
//             className={`w-1/3 md:w-30 lg:w-30 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 ${isDarkTheme?'bg-[#858EAC] text-white placeholder-white':'bg-white text-black'}`}
//             style={{
//               backgroundImage: `url(${searchIcon})`,
//               backgroundSize: '16px',
//               backgroundPosition: '10px center',
//               backgroundRepeat: 'no-repeat',
//             }}
//           />
//         </div>
//         <hr className="mt-3 border-gray-300" />
//         </div>

//        <div className="flex justify-center items-center">
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 mt-4 gap-5">
//         <CategoryCard category="Blockchain" count="2585" />
//         <CategoryCard category="Data Structures" count="253" />
//         <CategoryCard category="Machine Learning" count="1285" />
//         <CategoryCard category="Artificial Intelligence" count="2585" />
//         <CategoryCard category="Operating System" count="2285" />
//         <CategoryCard category="Computer Networks" count="25" />
        
//         {/* Add more CategoryCard components here */}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Categories;


import React, { useState, useContext,useEffect } from 'react';
import searchIcon from '../assets/search.png'; // Ensure the path is correct
import CategoryCard from '../components/CategoryCard';
import UserContext from '../context/userContext';
import { fetchCategories } from '../api/categoryApi.jsx';

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesData,setCategoriesData] = useState([]);
  const { isDarkTheme,backend_url } = useContext(UserContext);

  useEffect(() => {
    const getCategories = async () => {
        try {
            const data = await fetchCategories(backend_url);
            console.log(data.categories);
            setCategoriesData(data.categories);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    getCategories();
}, [backend_url]);



  // Filter categories based on search query
  const filteredCategories = categoriesData.filter(category =>
    category.categoryName.replace(/\s+/g, '').toLowerCase().includes(searchQuery.replace(/\s+/g, '').toLowerCase())
  );


  return (
    <div className="w-full h-screen p-6 flex flex-col items-center">
      <div className='md:w-1/2 w-full'>
        <div className="flex justify-between items-start">
          <h1 className={`${isDarkTheme ? 'text-white' : 'text-black'} text-2xl font-bold`}>Categories</h1>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-1/3 md:w-30 lg:w-30 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 ${isDarkTheme ? 'bg-[#858EAC] text-white placeholder-white' : 'bg-white text-black'}`}
            style={{
              backgroundImage: `url(${searchIcon})`,
              backgroundSize: '16px',
              backgroundPosition: '10px center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
        <hr className="mt-3 border-gray-300" />
      </div>

      <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 mt-4 gap-5">
        {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <CategoryCard key={category._id} category={category}  />
            ))
          ) : (
            <p>No categories found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;


 
