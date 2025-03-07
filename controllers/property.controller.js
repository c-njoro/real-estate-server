const Property = require("../models/property.model");

//get all properties
const getAllProperties = async (req, res) => {
  try {
    const { name, availabilityStatus, bedrooms, city } = req.query;

    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    if (availabilityStatus) {
      query.availabilityStatus = {
        $regex: `^${availabilityStatus}$`,
        $options: "i",
      };
    }

    if (bedrooms) {
      query.bedrooms = parseInt(bedrooms);
    }

    if (city) {
      query.city = { $regex: city, $options: "i" };
    }

    const properties = await Property.find(query).sort({ createdAt: -1 });
    return res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get paginated properties
const getPaginatedProperties = async (req, res) => {
  try {
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 10;
    const skip = (page - 1) * limit;

    const totalProperties = await Property.countDocuments();
    const properties = await Property.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      properties,
      currentPage: page,
      totalPages: Math.ceil(totalProperties / limit),
      totalProperties,
      hasMore: skip + properties.length < totalProperties,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create a property
const createAProperty = async (req, res) => {
  try {
    const details = req.body;
    const newProperty = new Property(details);
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update a property
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const details = req.body;
    const updatedProperty = await Property.findByIdAndUpdate(id, details);

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(updatedProperty);
  } catch (error) {
    console.log("ERROR UPDATING PROPERTY: ", error);
    res.status(500).json({ message: error.message });
  }
};

//get property by id
const getOneProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete a property
const deleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Could not find the property" });
    }

    return res.status(200).json(deletedProperty);
  } catch (error) {
    res.status(500).json({ message: `Could not delete: ${error.message}` });
  }
};

module.exports = {
  getAllProperties,
  createAProperty,
  updateProperty,
  getOneProperty,
  getPaginatedProperties,
  deleteProperty,
};
