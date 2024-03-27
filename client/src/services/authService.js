import api from "../utils/api";

const authService = {
  login: async (username, password) => {
    try {
      const { data: loginData } = await api.post("/auth/login", { username, password });
      const authToken = loginData.token;
      localStorage.setItem("authToken", authToken);
      const { data: authData } = await api.get('/auth/me', { headers: { Authorization: `Bearer ${authToken}` } });
      return authData;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },


  register: async (registrationData) => {
    try {
      const { data } = await api.post("/auth/register", registrationData);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },


  logout: async () => {
    localStorage.removeItem("authToken");
    // try {
    //   await api.post("/auth/logout");
    // } catch (error) {
    //   throw error;
    // }
  },

};

export default authService;
