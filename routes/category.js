const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../handlers/category-handleer");

const router = express.Router();

// Routes
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
