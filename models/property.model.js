const mongoose = require("mongoose");

// Create the Mongoose schema
const PropertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Property name is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Property description is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    exactAddress: {
      type: String,
      required: [true, "Exact address is required"],
      trim: true,
    },
    availabilityStatus: {
      type: String,
      required: [true, "Availability status is required"],
      enum: ["Available", "Sold", "Under Contract", "Pending"],
      default: "Available",
    },
    size: {
      type: String,
      required: [true, "Property size is required"],
      trim: true,
    },
    bedrooms: {
      type: Number,
      required: [true, "Number of bedrooms is required"],
      min: [0, "Bedrooms cannot be negative"],
    },
    bathrooms: {
      type: Number,
      required: [true, "Number of bathrooms is required"],
      min: [0, "Bathrooms cannot be negative"],
    },
    imagePaths: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "Property must have at least one image",
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
    versionKey: false, // Removes __v field
  }
);

// Add indexes for better query performance

// Create and export the model
module.exports = mongoose.model("Property", PropertySchema);
