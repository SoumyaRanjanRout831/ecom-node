const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory
} = require("../handlers/category-handleer");

const router = express.Router();

// Routes
router.get("/", getCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
