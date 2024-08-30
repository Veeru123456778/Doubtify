// frontend/src/components/DropdownComponent.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from "../context/userContext";
import { fetchCategories } from '../api/categoryApi.jsx';

const DropdownComponent = ({categoryId,setCategoryId}) => {

    const [categoriesData, setCategoriesData] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [error, setError] = useState(null);
    const { isDarkTheme,backend_url } = useContext(UserContext);

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await fetchCategories(backend_url);
                console.log(response.categories);
                setCategoriesData(response.categories);
                setLoadingCategories(false);
            } catch (error) {
                setError('Error fetching categories');
                setLoadingCategories(false);
            }
        };

        fetchAllCategories();
    }, []);
    
    return (
        <div className="flex-col sm:flex sm:flex-row gap-6 2xl:w-12">
            <div className="mb-4">
                <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-slate-200' : 'text-gray-700'}`} htmlFor="category">
                    Category
                </label>
                <div className="relative mb-4">
                    {loadingCategories ? (
                        <p>Loading categories...</p>
                    ) : (
                        <select
                            id="category"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className={`block appearance-none w-64 xl:w-80 2xl:w-96 border border-gray-400 hover:border-gray-500 p-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline ${isDarkTheme ? 'bg-[#858EAC] text-white' : 'bg-white'}`}
                        >
                            <option value="">Select a category</option>
                            {categoriesData && categoriesData.map((Category) => (
                                <option key={Category._id} value={Category._id}>
                                    {Category.categoryName}
                                </option>
                            ))}
                        </select>
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
                   </div>
    );
};

export default DropdownComponent;


