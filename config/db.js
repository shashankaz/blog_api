import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "blog-api",
    })
    .then(() => {
      console.log(`Database Connected to ${mongoose.connection.host}`);
      console.log(`dbName: ${mongoose.connection.name}`);
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);
    });
};
