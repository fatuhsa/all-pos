import { create } from 'zustand';
import { Product } from '../../db/schema';
import { db } from '../../db/db';
import { products } from '../../db/schema';
import { eq } from 'drizzle-orm';

interface ProductState {
  items: Product[];
  isLoading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (product: typeof products.$inferInsert) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  items: [],
  isLoading: false,
  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const result = await db.select().from(products).all();
      set({ items: result });
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      set({ isLoading: false });
    }
  },
  addProduct: async (newProduct) => {
    try {
      await db.insert(products).values(newProduct).run();
      await get().fetchProducts();
    } catch (error) {
      console.error('Failed to add product', error);
    }
  },
  deleteProduct: async (id) => {
    try {
      await db.delete(products).where(eq(products.id, id)).run();
      await get().fetchProducts();
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  },
}));
