const express = require("express");
const Property = require("../models/property.model");
const router = express.Router();
const {
  getAllProperties,
  createAProperty,
  updateProperty,
  getOneProperty,
  getPaginatedProperties,
  deleteProperty,
} = require("../controllers/property.controller");

router.get("/allProperties", getAllProperties);
router.get("/paginatedProperties", getPaginatedProperties);
router.get("/oneProperty/:id", getOneProperty);
router.post("/newProperty", createAProperty);
router.put("/updateProperty/:id", updateProperty);
router.delete("/deleteProperty/:id", deleteProperty);

module.exports = router;
