import api from './axiosConfig';

interface UserData {
  username: string;
  password: string;
  email?: string;
}

interface Credentials {
  email: string;
  password: string;
}

export const registerUser = async (userData: UserData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials: Credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};
