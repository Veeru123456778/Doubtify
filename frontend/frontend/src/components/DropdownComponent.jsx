// frontend/src/components/DropdownComponent.jsx
import React, { useEffect, useState,useContext} from 'react';
import axios from 'axios';
import UserContext from "../context/userContext";


const DropdownComponent = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/category/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchSubcategories = async () => {
            if (selectedCategory) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/category/subcategories/${selectedCategory}`);
                    setSubcategories(response.data);
                } catch (error) {
                    console.error('Error fetching subcategories:', error);
                }
            } else {
                setSubcategories([]);
            }
        };

        fetchSubcategories();
    }, [selectedCategory]);
    const {isDarkTheme} = useContext(UserContext);

    return (
        <div className="p-4">
            <div className="mb-4">
                <label className={`block text-gray-700 text-sm font-bold mb-2 ${isDarkTheme?'text-slate-200':'text-gray-700'}`} htmlFor="category">
                    Category
                </label>
                <div className="relative">
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={`block appearance-none w-full  border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline ${isDarkTheme? 'bg-[#858EAC] text-white':'bg-white'} `}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option  key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        {/* <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.5 8l4.5 4 4.5-4h-9z"/></svg> */}
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <label className={`block text-gray-700 text-sm font-bold mb-2 ${isDarkTheme?'text-slate-200':'text-gray-700'}`} htmlFor="subcategory">
                    Subcategory
                </label>
                <div className="relative">
                    <select
                        id="subcategory"
                        value={selectedSubcategory}
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                        className={`block appearance-none w-full  border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline ${isDarkTheme? 'bg-[#858EAC] text-white':'bg-white'} `}
                        disabled={!selectedCategory}
                    >
                        <option value="">Select a subcategory</option>
                        {subcategories.map((subcategory) => (
                            <option  key={subcategory} value={subcategory}>
                                {subcategory}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        {/* <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.5 8l4.5 4 4.5-4h-9z"/></svg> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropdownComponent;
