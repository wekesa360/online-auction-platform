import api from "../utils/api";
const auctioneerService = {
  createAuctioneer: async (auctioneerData) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.post("au/auctioneers", auctioneerData, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  getAuctioneerById: async (id) => {
    try {
      const { data } = await api.get(`au/auctioneers/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  },

  getAllAuctioneers: async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.get("au/auctioneers", {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  updateAuctioneer: async (id, auctioneerData) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.put(`au/auctioneers/${id}`, auctioneerData, {
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
      await api.delete(`au/auctioneers/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    } catch (error) {
      throw error;
    }
  }
};

export default auctioneerService;
