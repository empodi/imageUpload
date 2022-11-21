import "dotenv/config";
import express from "express";
import morgan from "morgan";
const { upload } = require("./config/s3");

const app = express();
const logger = morgan("dev");
app.use(logger);

const uploadRouter = express.Router();

const postupload = (req, res, next) => {
  const img = req.file;
  console.log("Image path:", img.location);
  return res.status(200).send("OK");
};

uploadRouter.post("/", upload.single("chatImg"), postupload);

app.use("/upload", uploadRouter);

const PORT = 9090;

const handleListening = () =>
  console.log(`✅ Server listening on port:${PORT}`);

app.listen(PORT, handleListening);
