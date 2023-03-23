import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongoDb/connect.js";
import userRouter from "./routes/user.routes.js";
import propertyRouter from "./routes/property.routes.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.get("/", (req, res) => {
  res.send({ message: "Hello from the backend" });
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties", propertyRouter);
const startServer = async () => {
  try {
    // connect to db
    connectDB(process.env.CLOUD_CONNECTION_URL);
    app.listen(PORT, () =>
      console.log(`Server Has started successfully on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};
startServer();
