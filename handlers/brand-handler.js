const Brand = require("../db/brand");

//create Brand
const createBrand = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(404).json({ message: "No data found" });
    }

    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      return res.status(400).json({ message: "Brand name already exists" });
    }

    const brandCreated = await Brand.create({ name });
    if (!brandCreated) {
      return res.status(500).json({ message: "Failed to create brand" });
    }

    return res.status(201).json({ message: "Brand Created!", brandCreated });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Brand name already exists" });
    }
    return res.status(500).json({ message: error.message });
  }
};

//Get All Brand
const getAllBrand = async (req, res) => {
  try {
    const allBrands = await Brand.find();
    return res.status(200).json({ message: "All Brands data", allBrands });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Get Brand by ID
const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "No ID found!" });
    }
    const brandNameById = await Brand.findById(id);
    return res
      .status(200)
      .json({ message: "product name by ID", brandNameById });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Update Brand
const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!id && !name) {
      return res.status(404).json({ message: "ID and name are required" });
    }
    const updateBrand = await Brand.findByIdAndUpdate(id, { name });
    if (!updateBrand) {
      return res.status(401).json({ message: "id not found!" });
    }
    return res.status(200).json({ message: "Brand updated sucessfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Delete brand
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: "No ID found!" });
    }
    const deleteBrand = await Brand.findByIdAndDelete(id);

    if (!deleteBrand) {
      return res.status(404).send({ message: "Brand Not found" });
    }
    return res.status(200).json({ message: "Brand deleted sucessfully" });
  } catch (error) {
    return res.sttus(500).json({ message: error.message });
  }
};

module.exports = {
  createBrand,
  getAllBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
};
