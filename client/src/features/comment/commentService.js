import axios from "axios";
import { ApiUrl } from "../../config";

const fetchComments = async (id, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${ApiUrl}/api/complaint/${id}/comment`, options);
  return response.data;
};

const addComment = async (formData, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${ApiUrl}/api/complaint/${formData.id}/comment`,formData, options);
  return response.data;
};

export const commentService = { addComment, fetchComments };
