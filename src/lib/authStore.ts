import { create } from 'zustand';
import { supabase } from '../utils/supabaseClient';

interface AuthState {
  user: any;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    set({ user: data.user });
    return data.user;
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
