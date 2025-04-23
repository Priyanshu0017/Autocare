const { mongoose } = require("mongoose");

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  laptop: {
    type: String,
    enum: ["apple", "hp", "lenovo", "asus", "dell", "acer"],
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "closed", "pending"],
    default: "open",
    required: true,
  },
  description: {
    type: String, 
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
},{
    timestamps : true
});

module.exports = mongoose.model('Complaint',complaintSchema)