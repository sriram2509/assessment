const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please provide post"],
    minLength: 3,
    maxLength: 300,
    trim: true,
  },
  
  userID: {
    type: String,
    required: [true, "Please provide UserID"],
    trim: true,
  },
 
  approval: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
  request: {
    type: Array,
    default: [],
  },
  deleted: {
    type: Boolean,
    default: false,
  }

},
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
