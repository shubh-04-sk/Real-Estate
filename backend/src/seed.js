import "dotenv/config";
import mongoose from "mongoose";

import connectDb from "./db/db.js"
import Property from "./models/Property.js";
import data from "../data/property-list-data.json" with { type: "json" };

const seedProperties = async () => {
  try {
    await connectDb();

    await Property.deleteMany({});

    await Property.insertMany(data.properties);

    console.log(`${data.properties.length} properties inserted successfully`);

    await mongoose.connection.close();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProperties();