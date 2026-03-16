import { create } from "zustand";

const userAuthStore = create((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  logout: () => set({ token: null }),
}));

export default userAuthStore;