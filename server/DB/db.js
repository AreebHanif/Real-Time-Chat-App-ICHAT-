import dotenv from "dotenv"
dotenv.config({path:"./config.env"})
import mongoose from "mongoose"
const mongoURI = process.env.DATABASE; 

let connectToMongo = () => {
  mongoose.connect(mongoURI)
    .then(() => {
      console.log("MongoDB is connected successfully");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

export default connectToMongo;
