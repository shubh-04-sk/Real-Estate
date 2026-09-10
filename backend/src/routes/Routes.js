import express from "express";

import {
  getProperties,
  getPropertyById,
  getPropertyBySlug,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/PropertyController.js";

const router = express.Router();

router.get("/", getProperties);

router.get("/slug/:slug", getPropertyBySlug);

router.get("/:id", getPropertyById);

router.post("/", createProperty);

router.put("/:id", updateProperty);

router.delete("/:id", deleteProperty);

export default router;
