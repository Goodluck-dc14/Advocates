const mongoose = require("mongoose");

const advocatesModel = mongoose.Schema(
  {
    profile_pic: {
      type: String,
    },
    profile_pic_id: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    twitter: {
      type: String,
      required: true,
    },
    companies: [Number],
    follower_count: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("advocates", advocatesModel);
