import api from "../utils/api";

const auctionService = {
  getAllAuctions: async () => {

    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.get("/an/auction", {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  getAuctionById: async (id) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.get(`/an/auction/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  createAuction: async (auctionData) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.post("/an/auction", auctionData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data"
        }
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  updateAuction: async (id, auctionData) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.put(`/an/auction/${id}`, auctionData, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  deleteAuction: async (id) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await api.delete(`/an/auction/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
};

export default auctionService;
