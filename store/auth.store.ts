import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserProfile } from '@/types'

interface AuthState {
  user: any | null;
  profile: UserProfile | null;
  roles: string[];
  isAuthenticated: boolean;
  setAuth: (user: any, profile: UserProfile | null, roles: string[]) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      roles: [],
      isAuthenticated: false,
      setAuth: (user, profile, roles) => set({
        user,
        profile,
        roles: roles || [],
        isAuthenticated: !!user
      }),
      clearAuth: () => set({
        user: null,
        profile: null,
        roles: [],
        isAuthenticated: false
      })
    }),
    {
      name: 'jkuat-auth-storage'
    }
  )
)
