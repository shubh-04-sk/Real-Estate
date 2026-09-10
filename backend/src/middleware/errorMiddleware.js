export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];

    return res.status(400).json({
      success: false,
      message: `${field} already exists.`,
      errors: null,
    });
  }

  // Validation error
  if (err.name === "ValidationError") {
    const errors = {};

    Object.keys(err.errors).forEach((field) => {
      errors[field] = err.errors[field].message;
    });

    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors,
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error.",
    errors: null,
  });
};

export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
    errors: null,
  });
};
