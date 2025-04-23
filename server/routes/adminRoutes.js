const express = require("express");
const { getComplaints, getUsers, getComments, addComment, updateComplaint } = require("../controllers/adminController");
const adminprotect = require("../middlewares/adminMiddleware");
const router = express.Router();

router.get('/users',adminprotect,getUsers)
router.get('/complaints',adminprotect,getComplaints)
router.put('/:cid',adminprotect,updateComplaint)
router.get('/comments',adminprotect,getComments)
router.post('/:cid',adminprotect,addComment)

module.exports = router