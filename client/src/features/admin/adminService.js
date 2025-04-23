import axios from "axios";

const fetchUsers = async (token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const responce = await axios.get("/api/admin/users", options);
  return responce.data;
};


const fetchAllComplaints = async (token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const responce = await axios.get("/api/admin/complaints", options);
  return responce.data;
};


const updateComplaint = async (token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const responce = await axios.get("/api/admin/users", options);
  return responce.data;
};

export const adminService = {
  fetchUsers,
  fetchAllComplaints,
  updateComplaint,
};
