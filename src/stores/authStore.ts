import { create } from 'zustand'

interface AuthState {
  walletAddress: string
  accessToken: string
  setAuth: (walletAddress: string, accessToken: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  walletAddress: '',
  accessToken: '',
  setAuth: (walletAddress, accessToken) => set({ walletAddress, accessToken }),
  clearAuth: () => set({ walletAddress: '', accessToken: '' }),
}))
