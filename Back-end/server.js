import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send( "Basic Server");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("server is connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error", err);
  });
