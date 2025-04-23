import express from "express";
import Post from "../models/Post.js";
import Profile from "../models/Profile.js";

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post with latest profile as author
router.post("/", async (req, res) => {
  const { title, content } = req.body;

  try {
    // Get the latest profile
    const latestProfile = await Profile.findOne().sort({ createdAt: -1 });

    if (!latestProfile) {
      return res.status(400).json({ message: "No profile found. Please create your profile first." });
    }

    const author = latestProfile.name;

    const newPost = new Post({ title, content, author });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
