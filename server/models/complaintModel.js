const { mongoose } = require("mongoose");

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  car: {
    type: String,
    enum: ["toyota", "honda", "hyundai", "tata", "mahindra", "bmw"],
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