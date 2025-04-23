import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  emergencyContact: { type: String, required: true }
}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
