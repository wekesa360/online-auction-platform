import api from "../utils/api";

const profileService = {
  getProfile: async () => {
    try {
      console.log("We are here trying to debug the issue with the code below:: \n in UserService")
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.get("user/profile", {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  createProfile: async (profileData) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.post("user/profile", profileData, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  updateProfile: async (profileData) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await api.put("user/profile", profileData, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  deleteProfile: async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      await api.delete("user/profile", {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
};

export default profileService;
