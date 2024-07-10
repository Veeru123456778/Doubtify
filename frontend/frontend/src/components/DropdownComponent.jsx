// frontend/src/components/DropdownComponent.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from "../context/userContext";

const DropdownComponent = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingSubcategories, setLoadingSubcategories] = useState(false);
    const [error, setError] = useState(null);
    const { isDarkTheme } = useContext(UserContext);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/category/categories');
                setCategories(response.data);
                setLoadingCategories(false);
            } catch (error) {
                setError('Error fetching categories');
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchSubcategories = async () => {
            if (selectedCategory) {
                setLoadingSubcategories(true);
                try {
                    const response = await axios.get(`http://localhost:3000/api/category/subcategories/${selectedCategory}`);
                    setSubcategories(response.data);
                    setLoadingSubcategories(false);
                } catch (error) {
                    setError('Error fetching subcategories');
                    setLoadingSubcategories(false);
                }
            } else {
                setSubcategories([]);
            }
        };

        fetchSubcategories();
    }, [selectedCategory]);

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
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className={`block appearance-none w-64 xl:w-80 2xl:w-96 border border-gray-400 hover:border-gray-500 p-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline ${isDarkTheme ? 'bg-[#858EAC] text-white' : 'bg-white'}`}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
            <div className="mb-4">
                <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-slate-200' : 'text-gray-700'}`} htmlFor="subcategory">
                    Subcategory
                </label>
                <div className="relative">
                    {loadingSubcategories ? (
                        <p>Loading subcategories...</p>
                    ) : (
                        <select
                            id="subcategory"
                            value={selectedSubcategory}
                            onChange={(e) => setSelectedSubcategory(e.target.value)}
                            className={`block appearance-none w-64 xl:w-80 2xl:w-96 border border-gray-400 hover:border-gray-500 p-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline ${isDarkTheme ? 'bg-[#858EAC] text-white' : 'bg-white'}`}
                            disabled={!selectedCategory}
                        >
                            <option value="">Select a subcategory</option>
                            {subcategories.map((subcategory) => (
                                <option key={subcategory} value={subcategory}>
                                    {subcategory}
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
