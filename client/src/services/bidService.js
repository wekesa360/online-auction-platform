import api from "../utils/api";

const bidService = {
  getAllBids: async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.get("bd/bid", {
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
      const { data } = await api.get(`bd/bid/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  createBid: async (auctionId, bidAmount) => {
    try {
      console.log(auctionId, bidAmount)
      const authToken = localStorage.getItem("authToken");
      const bidData = {
        auctionId: auctionId,
        amount: bidAmount
      };
      const { data } = await api.post("bd/bid", bidData, {
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
      const { data } = await api.put(`bd/bid/${id}`, bidData, {
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
      await api.delete(`bd/bid/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    } catch (error) {
      throw error;
    }
  }
};

export default bidService;
