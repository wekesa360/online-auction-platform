import api from "../utils/api";

const bidService = {
  getAllBids: async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.get("/bid", {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  getBidById: async (id) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.get(`/bid/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  createBid: async (bidData) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.post("/bid", bidData, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  updateBid: async (id, bidData) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.put(`/bid/${id}`, bidData, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  deleteBid: async (id) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await api.delete(`/bid/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    } catch (error) {
      throw error;
    }
  }
};

export default bidService;
