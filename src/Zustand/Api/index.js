
export const baseUrl = "https://fakestoreapi.com";

// Products store
import { create } from "zustand";

export const getProducts = create((set) => ({
  Products: [],
  isLoading: false,
  error: null,

  fetchProductData: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${baseUrl}/products`);
      const data = await response.json();
      set({ Products: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

// Categories store
export const GetCategories = create((set) => ({
  allCategories: [],
  isLoading: false,
  error: null,

  fetchCategorieData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${baseUrl}/products/categories`);
      const data = await response.json();
      set({ allCategories: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
