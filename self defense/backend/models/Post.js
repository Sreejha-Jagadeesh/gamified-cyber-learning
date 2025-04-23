import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    author: { type: String, required: true }
  },
  { timestamps: true } // THIS gives createdAt and updatedAt
);

const Post = mongoose.model("Post", postSchema);
export default Post;
