const Category = require("../db/category");

//  Create Category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const category = new Category({ name });
    await category.save();

    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {

    if (error.code === 11000 && error.keyPattern?.name) {
      return res.status(400).json({ error: "Category name already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

//  Update Category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Category Id required" });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
        return res.status(404).send({message: "Category Not found"})
    }

    return res
      .status(200)
      .json({
        message: "Category deleted Successfully!",
        category: deletedCategory,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get All Category
const getCategory = async (req, res) =>{
  try {
    const categories = await Category.find()
  return res.status(200).json({message: "All Cateogries", categories})
  }catch(error){
   return res.status(500).json({error: error.message})
  }
}

//Get Category by ID
const getByIdCategory = async (req, res) =>{
  try{
    const {id} = req.params;
    if (!id) {
      return res.status(400).json({ error: "Category Id required" });
    }

    const getcategoryByID = await Category.findById(id);
    if(!getcategoryByID){
      return res.status(404).json({message: "Category not found!"})
    }
    return res.status(200).json({message: "category details", getcategoryByID})
  }catch(error){
   return res.status(500).json({error: error.message})
  }
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getByIdCategory
};
