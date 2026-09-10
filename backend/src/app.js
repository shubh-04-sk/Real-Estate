import express from "express";
import cors from "cors";

import propertyRoutes from "./routes/Routes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Real Estate API is running.",
    data: {},
  });
});

app.use("/api/properties", propertyRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;
