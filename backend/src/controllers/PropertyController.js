import Property from "../models/Property.js";

export const getProperties = async (req, res, next) => {
  try {
    const properties = await Property.find().sort({ id: 1 });

    res.status(200).json({
      success: true,
      message: "Properties fetched successfully.",
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

export const getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findOne({
      id: Number(req.params.id),
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
        errors: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Operation completed successfully.",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

export const getPropertyBySlug = async (req, res, next) => {
  try {
    const property = await Property.findOne({
      slug: req.params.slug,
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
        errors: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Operation completed successfully.",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

export const createProperty = async (req, res, next) => {
  try {
    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      message: "Property created successfully.",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req, res, next) => {
  try {
    const property = await Property.findOneAndUpdate(
      { id: Number(req.params.id) },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
        errors: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Property updated successfully.",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findOneAndDelete({
      id: Number(req.params.id),
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
        errors: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully.",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};
