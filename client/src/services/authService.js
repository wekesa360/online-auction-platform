import api from "../utils/api";

const userService = {
  login: async (username, password) => {
    try {
      const { data: loginData } = await api.post("/auth/login", { username, password });
      const authToken = loginData.token;
      localStorage.setItem("authToken", authToken);
      const { data: authData } = await api.get('/auth/me', { headers: { Authorization: `Bearer ${authToken}` } });
      console.log('Auth user', authData);
      return authData;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Incorrect email or password");
      }
      throw error;
    }
  },

  register: async (email, password, username, role) => {
    try {
      const { data } = await api.post("/auth/register", { email, password, username, role });
      return data;
    } catch (error) {
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

export default userService;
