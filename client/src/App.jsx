import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AllComplaints from "./pages/AllComplaints";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleComplaint from "./pages/SingleComplaint";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RaiseComplaint from "./pages/RaiseComplaint";
import PrivateComponent from "./components/PrivateComponent";
import { ToastContainer } from "react-toastify";
import AllUsers from "./pages/AllUsers";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateComponent/>}>
          <Route path="" element={<Home />}></Route>
          <Route path="admin" element={<AdminDashboard />}></Route>
          <Route path="admin/users" element={<AllUsers />}></Route>
          <Route path="complaints" element={<AllComplaints />}></Route>
          <Route path="complaints/:id" element={<SingleComplaint />}></Route>
          <Route path="raise-complaint" element={<RaiseComplaint />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      <ToastContainer />
      <Footer />
    </Router>
  );
};

export default App;
