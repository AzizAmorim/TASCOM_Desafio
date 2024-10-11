import mongoose from "mongoose";

const Tag = mongoose.model("Tag", {
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

export default Tag;