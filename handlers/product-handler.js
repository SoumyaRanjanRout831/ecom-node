const Product = require("../db/product");

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    return res.status(200).json({ message: "All Brands data", allProducts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      shortDescription,
      description,
      price,
      discount,
      images,
      categoryId,
    } = req.body;
    if (!name || !price || !discount) {
      return res
        .status(400)
        .json({ message: "Name, price, and discount are required" });
    }
    const newProduct = new Product({
      name,
      shortDescription,
      description,
      price,
      discount,
      images: [images],
      categoryId: [categoryId],
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product created successfully!",
      product: savedProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "No ID found!" });
    }
    const productById = await Product.findById(id);
    return res.status(200).json({ message: "product name by ID", productById });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      shortDescription,
      description,
      price,
      discount,
      images,
      categoryId,
    } = req.body;

    if (!id || !name || !price || !discount) {
      return res
        .status(404)
        .json({ message: "name, price, discount are required" });
    }
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        shortDescription,
        description,
        price,
        discount,
        images,
        categoryId,
      },
      { new: true }
    );
    if (!updateProduct) {
      return res.status(401).json({ message: "id not found!" });
    }
    return res.status(200).json({ message: "Brand updated sucessfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "No ID found!" });
    }
    const deleteProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct) {
      return res.status(404).send({ message: "Product Not found" });
    }
    return res.status(200).json({ message: "Product deleted sucessfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
