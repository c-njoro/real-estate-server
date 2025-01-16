const express = require("express");
const Property = require("../models/property.model");
const router = express.Router();
const {
  getAllProperties,
  createAProperty,
  updateProperty,
  getOneProperty,
} = require("../controllers/property.controller");

router.get("/allProperties", getAllProperties);
router.get("/oneProperty/:id", getOneProperty);
router.post("/newProperty", createAProperty);
router.put("/updateProperty/:id", updateProperty);

module.exports = router;
// Compare this snippet from backend/routes/planRoutes.js:
