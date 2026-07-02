import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;          // Variant specific identifier
  productId: string;   // Parent product ID
  name: string;        // Product name (e.g., "Classic Fit Oxford Shirt")
  sku: string;         // Unique Variant SKU
  color: string;       // e.g., "Classic Navy"
  size: string;        // e.g., "M"
  fit: string;         // e.g., "Custom Slim Fit"
  price: number;       // Item baseline unit price
  image: string;       // Thumbnail lookbook image
  quantity: number;    // How many units added
  inventory: number;   // Max stock limit allowed from backend database
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // Adds item to cart, combining quantities if the exact variant SKU already exists
      addItem: (newItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.sku === newItem.sku);

        if (existingItem) {
          const updatedQuantity = existingItem.quantity + newItem.quantity;
          
          // Guardrail to prevent checking out more items than are physically in warehouse stock
          if (updatedQuantity > newItem.inventory) {
            alert(`Apologies, only ${newItem.inventory} units of this specific item variant are currently available.`);
            return;
          }

          set({
            items: currentItems.map((item) =>
              item.sku === newItem.sku ? { ...item, quantity: updatedQuantity } : item
            ),
          });
        } else {
          set({ items: [...currentItems, newItem] });
        }
      },

      // Removes an entire item variant tier completely from the active bag array
      removeItem: (sku) => {
        set({
          items: get().items.filter((item) => item.sku !== sku),
        });
      },

      // Directly alters item variant amounts within checkout grid boards
      updateQuantity: (sku, quantity) => {
        const item = get().items.find((i) => i.sku === sku);
        if (!item) return;

        if (quantity > item.inventory) {
          alert(`Apologies, maximum available stock limit reached (${item.inventory} items).`);
          return;
        }

        if (quantity <= 0) {
          get().removeItem(sku);
          return;
        }

        set({
          items: get().items.map((i) => (i.sku === sku ? { ...i, quantity } : i)),
        });
      },

      // Empties the cart system entirely (called after a completed Stripe payment process)
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'ralph-lauren-cart-storage', // Key name used for client local storage container caching
    }
  )
);
