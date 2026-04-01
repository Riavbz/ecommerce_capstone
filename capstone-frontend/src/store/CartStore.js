import { create } from 'zustand';

const savedCart = JSON.parse(localStorage.getItem('cart-storage')) || [];


export const useCartStore = create((set) => ({
  items: savedCart,

  addItem: (product) => set((state) => {
    const existing = state.items.find(item => item._id === product._id);
    let newItems;
    
    if (existing) {
      newItems = state.items.map((item) =>
      item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newItems = [...state.items, { ...product, quantity: 1 }];
      }

      // 2. Save to localStorage every time an item is added
      localStorage.setItem('cart-storage', JSON.stringify(newItems));
      return { items: newItems };
    }),

  removeItem: (_id) =>
    set((state) => {
      const newItems = state.items.filter((item) => item._id !== _id);
      // 3. Update localStorage after removal
      localStorage.setItem('cart-storage', JSON.stringify(newItems));
      return { items: newItems };
    }),

  clearCart: () => {
    // 4. Clear localStorage when the cart is emptied
    localStorage.removeItem('cart-storage');
    set({ items: [] });
  },
}));