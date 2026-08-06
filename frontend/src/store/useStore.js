import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      // Auth State
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),

      // Saved / Favorite Recipe IDs
      favorites: [],
      toggleFavorite: (recipeId) =>
        set((state) => {
          const exists = state.favorites.includes(recipeId);
          return {
            favorites: exists
              ? state.favorites.filter((id) => id !== recipeId)
              : [...state.favorites, recipeId]
          };
        }),

      // Active Filter & Search State
      activeCategory: 'All',
      searchQuery: '',
      dietaryFilter: 'All',
      setCategory: (category) => set({ activeCategory: category }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setDietaryFilter: (filter) => set({ dietaryFilter: filter })
    }),
    {
      name: 'nightingale-app-storage',
      partialize: (state) => ({ user: state.user, token: state.token, favorites: state.favorites })
    }
  )
);
