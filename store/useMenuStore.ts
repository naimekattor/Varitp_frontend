import { create } from "zustand";
import api from "@/lib/api";

export interface FoodImage {
  image: string;
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  short_details: string | null;
  description: string;
  price: string;
  images: FoodImage[];
}

export interface MenuData {
  id: string;
  date: string;
  foods: FoodItem[];
}

interface MenuState {
  menu: MenuData | null;
  loading: boolean;
  error: string | null;
  selectedDate: string;
  fetchMenu: (date?: string) => Promise<void>;
  setSelectedDate: (date: string) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  menu: null,
  loading: false,
  error: null,
  selectedDate: new Date().toISOString().split("T")[0],

  fetchMenu: async (date) => {
    const targetDate = date || new Date().toISOString().split("T")[0];
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/product/api/v1/menu/?date=${targetDate}`);
      if (response.data.success) {
        set({ menu: response.data.data, loading: false });
      } else {
        set({ error: response.data.message || "Failed to fetch menu", loading: false });
      }
    } catch (err: any) {
      console.error("Fetch menu error:", err);
      set({ 
        error: err.response?.data?.message || "Failed to fetch menu items", 
        loading: false,
        menu: null 
      });
    }
  },

  setSelectedDate: (date) => set({ selectedDate: date }),
}));
