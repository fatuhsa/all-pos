import * as z from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Nama produk wajib diisi'),
  price: z.string().refine((val) => !isNaN(Number(val)), 'Harga harus berupa angka'),
  barcode: z.string().default(''),
  unit: z.string().default('pcs'),
});

export type ProductFormData = z.infer<typeof productSchema>;
