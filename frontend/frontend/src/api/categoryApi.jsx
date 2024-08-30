import axios from 'axios';

export const fetchCategories = async(backend_url)=>{

    try{
const categories = await axios.get(`${backend_url}/api/category/getCategories`);

if(categories.data.success){
    return categories.data;
}
}catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
}
}

export const getCategoryWithQuestions = async(backend_url,category_id)=>{
   try{
    const categoryWithQuestions = await axios.get(`${backend_url}/api/category/getCategory/${category_id}`);
    
    
    if(categoryWithQuestions.data.success){
    return categoryWithQuestions.data.data;
    }

   }catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
}
}

