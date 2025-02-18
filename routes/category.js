const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getByIdCategory
} = require("../handlers/category-handleer");

const router = express.Router();

// Routes
router.get("/", getCategory);
router.post("/", createCategory);
router.get("/:id", getByIdCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
