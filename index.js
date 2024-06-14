import dotenv from "dotenv";
import connectDB from "./config/dbConnection.config.js";
import transporter from "./config/emailTransport.config.js";
import app from "./app.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
    transporter.verify( (error,success) => {
      if(error){
        console.error(`Error Running Email Server: ${error.message}`)
      } else {
        console.log(`✉️ Email Server Running: ${success}`);
      }
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
