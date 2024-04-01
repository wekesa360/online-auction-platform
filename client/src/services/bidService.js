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
      throw new Error(error.response.data.message);
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
      throw new Error(error.response.data.message);
    }
  },

  createBid: async (auctionId, bidAmount) => {
    try {
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
      throw new Error(error.response.data.message);
    }
  },

  closeBid: async (bidId, auctionId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.post(`bd/bid/close/${bidId}/${auctionId}`, {}, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },


  getLatestBidForAuction: async (bidId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await api.get(`bd/bid/latest/${bidId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching latest bid:', error);
      throw new Error(error.response.data.message);
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
      throw new Error(error.response.data.message);
    }
  },

  deleteBid: async (id) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await api.delete(`bd/bid/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
};

export default bidService;
