import { create } from 'zustand';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
}

const API_URL = 'http://localhost:8000';

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post(`${API_URL}/token`, formData);
      const { access_token } = response.data;

      localStorage.setItem('token', access_token);
      set({ token: access_token, isLoading: false });

      // Get user data
      const userResponse = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      set({ user: userResponse.data });
    } catch (error) {
      set({ error: 'Invalid username or password', isLoading: false });
    }
  },

  register: async (email: string, username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/users/`, {
        email,
        username,
        password,
      });
      // Auto login after registration
      await useAuthStore.getState().login(username, password);
    } catch (error) {
      set({ error: 'Registration failed. Please try again.', isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));
