import { CartItem } from "@repo/ui/types";
import { create } from "zustand";

type State = {
  open: boolean;
  loadingCart: boolean;
  cartItems: CartItem[];
};

type Actions = {
  toggle: (value?: boolean) => void;
  fetchCart: () => void;
  setCartItems: (items: CartItem[]) => void;
  addCartItem: (item: CartItem) => void;
  clearCart: () => void;
};

const useMiniCart = create<State & Actions>((set) => ({
  open: false,
  loadingCart: false,
  cartItems: [],
  clearCart: () => {
    set({ cartItems: [] });
  },
  fetchCart: async () => {
    try {
      set({ loadingCart: true });
      const response = await fetch("/api/cart");
      const data = await response.json();
      if (data.success) {
        set({ cartItems: data.data });
      }
    } catch (e) {
      console.error(e);
    } finally {
      set({ loadingCart: false });
    }
  },
  setCartItems: (items: CartItem[]) => {
    set({ cartItems: items });
  },
  addCartItem: (item: CartItem) => {
    set((state) => {
      const existingItem = state.cartItems.findIndex(
        (i) => i.productId === item.productId
      );
      if (existingItem > -1) {
        state.cartItems[existingItem].quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }
      return { cartItems: [...state.cartItems] };
    });
  },
  toggle: (value) => {
    set((state) => ({ open: value ?? !state.open }));
  },
}));

export default useMiniCart;
