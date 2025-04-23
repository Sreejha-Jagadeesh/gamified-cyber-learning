// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import profileRoutes from "./routes/profileRoutes.js";
// import postRoutes from "./routes/postRoutes.js"; // ✅ Import post routes

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.log(err));

// // Routes
// app.use("/api/profile", profileRoutes);
// app.use("/api/posts", postRoutes); // ✅ Add posts route

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import profileRoutes from "./routes/profileRoutes.js";
import postRoutes from "./routes/postRoutes.js"; // ✅ Import post routes

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Ensure uploads folder exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `sos_recording_${Date.now()}.webm`);
  },
});
const upload = multer({ storage });

// ✅ New API to Handle Video Uploads
app.post("/api/upload", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  res.status(200).json({ success: true, message: "Recording saved successfully!", file: req.file.filename });
});

// Existing Routes
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes); // ✅ Add posts route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
