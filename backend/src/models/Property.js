import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "Property ID is required"],
      unique: true,
    },

    slug: {
      type: String,
      required: [true, "Property slug is required"],
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: [true, "Property title is required"],
      trim: true,
    },

    property_image: {
      type: String,
      required: [true, "Property image is required"],
      validate: {
        validator: (value) => /^https?:\/\/.+/i.test(value),
        message: "Property image must be a valid URL",
      },
    },

    property_price: {
      type: Number,
      required: [true, "Property price is required"],
      min: [0, "Property price cannot be negative"],
    },

    currency: {
      type: String,
      required: [true, "Currency is required"],
      trim: true,
    },

    area: {
      type: String,
      required: [true, "Area is required"],
      trim: true,
    },

    developer: {
      type: String,
      required: [true, "Developer is required"],
      trim: true,
    },

    project_description: {
      type: String,
      required: [true, "Project description is required"],
    },

    small_description: {
      type: String,
      required: [true, "Small description is required"],
    },

    property_type: {
      type: String,
      required: [true, "Property type is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

propertySchema.index({ property_type: 1 });
propertySchema.index({ developer: 1 });

const Property = mongoose.model("Property", propertySchema);

export default Property;
