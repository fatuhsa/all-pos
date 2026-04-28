import { productSchema } from '../validation';

describe('productSchema', () => {
  it('should validate correct product data', () => {
    const data = {
      name: 'Kopi Susu',
      price: '15000',
      barcode: '123456',
      unit: 'pcs',
    };
    const result = productSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('should fail if name is empty', () => {
    const data = {
      name: '',
      price: '15000',
    };
    const result = productSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Nama produk wajib diisi');
    }
  });

  it('should fail if price is not a number', () => {
    const data = {
      name: 'Kopi Susu',
      price: 'abc',
    };
    const result = productSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Harga harus berupa angka');
    }
  });
});
