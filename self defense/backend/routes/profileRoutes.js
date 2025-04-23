import express from "express";
import Profile from "../models/Profile.js";

const router = express.Router();

// Save profile
router.post("/save-profile", async (req, res) => {
  try {
    const { name, phoneNumber, address, emergencyContact } = req.body;
    const profile = new Profile({ name, phoneNumber, address, emergencyContact });
    await profile.save();
    res.status(201).json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get the latest profile (optional)
router.get("/get-profile", async (req, res) => {
  try {
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    res.status(200).json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
