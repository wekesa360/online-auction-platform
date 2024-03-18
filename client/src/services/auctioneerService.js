import api from "../utils/api";

const auctioneerService = {
  createAuctioneer: async (auctioneerData) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.post("/auctioneers", auctioneerData, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  getAuctioneerById: async (id) => {
    try {
      const { data } = await api.get(`/auctioneers/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  },

  getAllAuctioneers: async () => {
    try {
      const { data } = await api.get("/auctioneers");
      return data;
    } catch (error) {
      throw error;
    }
  },

  updateAuctioneer: async (id, auctioneerData) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.put(`/auctioneers/${id}`, auctioneerData, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  deleteAuctioneer: async (id) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await api.delete(`/auctioneers/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    } catch (error) {
      throw error;
    }
  }
};

export default auctioneerService;
