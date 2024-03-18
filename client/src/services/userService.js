import api from "../utils/api";

export const getProfile = async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    const { data } = await api.get("/profile", {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const createProfile = async (profileData) => {
  try {
    const authToken = localStorage.getItem("authToken");
    const { data } = await api.post("/profile", profileData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const authToken = localStorage.getItem("authToken");
    const { data } = await api.put("/profile", profileData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteProfile = async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    await api.delete("/profile", {
      headers: { Authorization: `Bearer ${authToken}` }
    });
  } catch (error) {
    throw error;
  }
};
