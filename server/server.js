const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db_config");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
require("dotenv").config();
const cors = require("cors");

// DB CONNECTION
connectDB();

app.use(cors({origin : "*"}));

// Body-Parser
app.use(express.json());

// Url-Encoded
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({
    msg: "AUTOCARE API RUNNING...",
  });
});

// user Routes
app.use("/api/user", require("./routes/authRoutes"));
//Complaint Routes
app.use("/api/complaint", require("./routes/complaintRoutes"));

// Admin routes
app.use("/api/admin", require("./routes/adminRoutes"));

// errorHandler
app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`server is running on port : ${PORT}`.bgBlue.black);
});
