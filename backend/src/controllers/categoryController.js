import categoryModel from "../models/categoryModel.js";


const fetchCategories = async(req,res)=>{
    const categories = await categoryModel.find();

    if(!categories){
       return res.json({message:"No Category Found"});
    }
    console.log(categories);
    return res.json({success:true,categories:categories});
}

// Controller function to get a category with its questions
const getCategoryWithQuestions = async (req, res) => {
    // Extract the categoryId from the route parameters
    const { categoryId } = req.params;
  
    try {
      // Fetch the category along with its questions using populate
      const category = await categoryModel.findById(categoryId).populate('questions').exec();
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Send the category data back in the response
      console.log(category);
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  

export {fetchCategories,getCategoryWithQuestions};