import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  price: real('price').notNull(),
  barcode: text('barcode'),
  image: text('image'),
  unit: text('unit').default('pcs'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(new Date()),
});

export const sales = sqliteTable('sales', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  totalAmount: real('total_amount').notNull(),
  paymentMethod: text('payment_method').notNull(), // Cash, Transfer, QRIS, E-wallet
  createdAt: integer('created_at', { mode: 'timestamp' }).default(new Date()),
});

export const saleItems = sqliteTable('sale_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  saleId: integer('sale_id').references(() => sales.id),
  productId: integer('product_id').references(() => products.id),
  quantity: integer('quantity').notNull(),
  priceAtSale: real('price_at_sale').notNull(),
});

export type Product = typeof products.$inferSelect;
export type Sale = typeof sales.$inferSelect;
export type SaleItem = typeof saleItems.$inferSelect;
