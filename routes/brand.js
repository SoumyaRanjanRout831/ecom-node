const express = require("express");

const {
  createBrand,
  getAllBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../handlers/brand-handler");

const router = express.Router();

//Routes
router.post("/", createBrand);
router.get("/", getAllBrand);
router.get("/:id", getBrandById);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);

module.exports = router;
