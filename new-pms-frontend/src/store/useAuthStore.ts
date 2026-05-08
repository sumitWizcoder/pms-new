import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

// "persist" automatically saves this info to your browser's memory
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        localStorage.setItem('pms_token', token); // Save for Axios
        set({ user, token });
      },
      logout: () => {
        localStorage.removeItem('pms_token'); // Clear for Axios
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth-storage', // The name in LocalStorage
    }
  )
);
