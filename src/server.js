import "dotenv/config";
import express from "express";
import morgan from "morgan";
const { upload } = require("./config/s3");

const app = express();
const logger = morgan("dev");
app.use(logger);

const uploadRouter = express.Router();
const homeRouter = express.Router();

const getHome = (req, res, next) => { 
  return res.status(200).send("Hello, It's Image Server ✅");
}

const postupload = (req, res, next) => {
  const img = req.file;
  console.log("Image:", img);
  return res.status(200).json({ok:true,imgPath:img.location});
};

homeRouter.get("/", getHome);
uploadRouter.post("/", upload.single("chatImg"), postupload);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Max-Age", 600);
  next();
});

app.use("/", homeRouter);
app.use("/upload", uploadRouter);

const PORT = 9090;

const handleListening = () =>
  console.log(`✅ Server listening on port:${PORT}`);

app.listen(PORT, handleListening);
