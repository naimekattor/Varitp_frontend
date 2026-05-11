import { create } from "zustand";
import api from "@/lib/api";

export type CartItem = {
  id: string; // food_item_id
  title: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
};

interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItem: (foodItemId: string, quantity?: number) => Promise<void>;
  removeItem: (foodItemId: string) => Promise<void>;
  updateQuantity: (foodItemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalPrice: 0,
  totalItems: 0,
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/product/api/v1/cart-items/");
      if (response.data.success) {
        const backendItems = response.data.data.cart_items.map((item: any) => ({
          id: item.food_item.id,
          title: item.food_item.name,
          price: parseFloat(item.food_item.price),
          image: item.food_item.image,
          quantity: item.quantity,
          category: item.food_item.category,
        }));
        
        const totalItems = backendItems.reduce((acc: number, item: any) => acc + item.quantity, 0);
        const totalPrice = backendItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
        
        set({ 
          items: backendItems,
          totalItems,
          totalPrice
        });
      }
    } catch (err: any) {
      console.error("Fetch cart error:", err);
      set({ error: err.response?.data?.message || "Failed to fetch cart" });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (foodItemId, quantity = 1) => {
    console.log("Adding item to cart:", { foodItemId, quantity });
    set({ isLoading: true });
    try {
      const response = await api.post("/product/api/v1/cart-items/add/", {
        food_item_id: foodItemId,
        quantity,
      });
      console.log("Add to cart response:", response.data);
      if (response.data.success) {
        await get().fetchCart();
      }
    } catch (err: any) {
      console.error("Add to cart error:", err);
      set({ error: err.response?.data?.message || "Failed to add item" });
    } finally {
      set({ isLoading: false });
    }
  },

  removeItem: async (foodItemId) => {
    set({ isLoading: true });
    try {
      const currentItem = get().items.find((item) => item.id === foodItemId);
      const response = await api.post("/product/api/v1/cart-items/remove/", {
        food_item_id: foodItemId,
        quantity: currentItem?.quantity || 0,
      });
      if (response.data?.success) {
        await get().fetchCart();
      }
    } catch (err: any) {
      console.error("Remove item error:", err);
      console.error("Response data:", err.response?.data);
      set({ error: err.response?.data?.message || "Failed to remove item" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateQuantity: async (foodItemId, quantity) => {
    set({ isLoading: true });
    try {
      const currentItem = get().items.find((item) => item.id === foodItemId);
      if (!currentItem) return;
      const delta = quantity - currentItem.quantity;
      if (delta === 0) return;

      await api.post("/product/api/v1/cart-items/add/", {
        food_item_id: foodItemId,
        quantity: delta,
      });
      await get().fetchCart();
    } catch (err: any) {
      console.error("Update quantity error:", err);
      set({ error: err.response?.data?.message || "Failed to update quantity" });
    } finally {
      set({ isLoading: false });
    }
  },

  clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
}));
