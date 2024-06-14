import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.CONNECTION_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(url).then(() => {
      const dbName = mongoose.connection.name;
      const hostName = mongoose.connection.host;

      console.log(`🗄️  Connected To\n| DB: ${dbName} | Host: ${hostName}`);
    });
  } catch (error) {
    console.log(`Error Occured: ${error.messge}`);
    throw error;
  }
};
export default connectDB;
