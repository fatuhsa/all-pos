import { create } from 'zustand';
import { Product } from '../../db/schema';
import { db } from '../../db/db';
import { sales, saleItems } from '../../db/schema';

interface CartItem extends Product {
  quantity: number;
}

interface SalesState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  checkout: (paymentMethod: string) => Promise<void>;
}

export const useSalesStore = create<SalesState>((set, get) => ({
  cart: [],
  addToCart: (product) => {
    const { cart } = get();
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      set({
        cart: cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },
  removeFromCart: (productId) => {
    set({ cart: get().cart.filter((item) => item.id !== productId) });
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set({
      cart: get().cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    });
  },
  clearCart: () => set({ cart: [] }),
  checkout: async (paymentMethod) => {
    const { cart, clearCart } = get();
    if (cart.length === 0) return;

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
      // Start transaction manually if needed, but for simple MVP:
      const saleResult = await db.insert(sales).values({
        totalAmount,
        paymentMethod,
        createdAt: new Date(),
      }).returning({ id: sales.id });

      const saleId = saleResult[0].id;

      for (const item of cart) {
        await db.insert(saleItems).values({
          saleId,
          productId: item.id,
          quantity: item.quantity,
          priceAtSale: item.price,
        }).run();
      }

      clearCart();
    } catch (error) {
      console.error('Checkout failed', error);
      throw error;
    }
  },
}));
