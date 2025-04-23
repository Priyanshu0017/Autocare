const asyncHandler = require("express-async-handler");
const Complaint = require("../models/complaintModel");
const User = require("../models/userModel");

const getComplaints = asyncHandler(async (req, res) => {
  // Find if user exists
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const complaints = await Complaint.find({ user: req.user._id });
  if (!complaints) {
    res.status(404);
    throw new Error("No Complaints Found..");
  } else {
    res.status(200);
    res.json(complaints);
  }
});

const raiseComplaint = asyncHandler(async (req, res) => {

  // Logic to create a new complaint

  const { laptop ,description , image} = req.body

  if(!laptop || !description || !image){
    res.status(400);
    throw new Error('Please Fill All Details')
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  // create-complaint

  const newComplaint = await Complaint.create({
    user : user._id,
    laptop,
    description,
    image
  })

  if(!newComplaint){
    res.status(400)
    throw new Error('Complaint Not Registered')
  }else{
    res.status(201)
    res.json(newComplaint)
  }
  
});

const getComplaint = asyncHandler(async (req, res) => {
  
  // Logic to retrieve a complaint by ID

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    res.status(404);
    throw new Error("Complaint Not Found..");
  } else {
    res.status(200);
    res.json(complaint);
  }


});
const updateComplaint = asyncHandler(async (req, res) => {
  
  // Logic to update a complaint by ID

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const updatedComplaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, {new : true})

  if (!updatedComplaint) {
    res.status(404);
    throw new Error("Complaint Not Updated..");
  } else {
    res.status(200);
    res.json(updatedComplaint);
  }
});

module.exports = {
  getComplaints,
  raiseComplaint,
  getComplaint,
  updateComplaint,
};
