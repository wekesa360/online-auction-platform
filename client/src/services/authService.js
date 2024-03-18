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
      if (error.response && error.response.status === 500) {
        throw new Error("internal_error")
      }
      if (error.response && error.response.status === 401 ) {
        if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }else {
          throw error
        }
      }
      throw error;
    }
  },
  

  register: async (registrationData) => {
    try {
      const { data } = await api.post("/auth/register", registrationData);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 500) {
        throw new Error("internal_error")
      }
      if (error.response && error.response.status === 400 ) {
        if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }else {
          throw error
        }
      }
      throw error;
    }
  },


  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      throw error;
    }
  },

};

export default authService;
