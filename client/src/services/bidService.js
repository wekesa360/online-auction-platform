import api from "../utils/api";

export const getAllBids = async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    const { data } = await api.get("/bid", {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getBidById = async (id) => {
  try {
    const authToken = localStorage.getItem("authToken");
    const { data } = await api.get(`/bid/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const createBid = async (bidData) => {
  try {
    const authToken = localStorage.getItem("authToken");
    const { data } = await api.post("/bid", bidData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateBid = async (id, bidData) => {
  try {
    const authToken = localStorage.getItem("authToken");
    const { data } = await api.put(`/bid/${id}`, bidData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteBid = async (id) => {
  try {
    const authToken = localStorage.getItem("authToken");
    await api.delete(`/bid/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
  } catch (error) {
    throw error;
  }
};
