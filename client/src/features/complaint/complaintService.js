import axios from "axios";
import { ApiUrl } from "../../config";

const fetchComplaints = async (token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${ApiUrl}/api/complaint`, options);
  return response.data
};

const fetchComplaint = async (id,token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${ApiUrl}/api/complaint/${id}`, options);
  return response.data
};

const addComplaint = async (formData , token)=> {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${ApiUrl}/api/complaint`,formData, options);
  return response.data
}

const update = async(formdata ,token)=> {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${ApiUrl}/api/complaint/${formdata.id}`,formdata
    , options);
  return response.data
}


export const complaintService = {update, addComplaint, fetchComplaints ,fetchComplaint };
