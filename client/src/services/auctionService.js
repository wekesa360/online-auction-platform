import api from "../utils/api";

export const getAllAuctions = async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    const { data } = await api.get("/auction", {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAuctionById = async (id) => {
  try {
    const authToken = localStorage.getItem("authToken");
    const { data } = await api.get(`/auction/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const createAuction = async (auctionData) => {
  try {
    const authToken = localStorage.getItem("authToken");
    const { data } = await api.post("/auction", auctionData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateAuction = async (id, auctionData) => {
  try {
    const authToken = localStorage.getItem("authToken");
    const { data } = await api.put(`/auction/${id}`, auctionData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteAuction = async (id) => {
  try {
    const authToken = localStorage.getItem("authToken");
    await api.delete(`/auction/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
  } catch (error) {
    throw error;
  }
};
