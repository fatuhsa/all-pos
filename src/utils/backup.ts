import * as FileSystem from 'expo-file-system';
import { db } from '../db/db';
import { products, sales, saleItems } from '../db/schema';

export async function exportData() {
  try {
    const allProducts = await db.select().from(products).all();
    const allSales = await db.select().from(sales).all();
    const allSaleItems = await db.select().from(saleItems).all();

    const data = {
      products: allProducts,
      sales: allSales,
      saleItems: allSaleItems,
      exportDate: new Date().toISOString(),
    };

    const jsonString = JSON.stringify(data);
    const fileUri = (FileSystem as any).documentDirectory + 'allpos_backup.json';
    
    await FileSystem.writeAsStringAsync(fileUri, jsonString);
    return fileUri;
  } catch (error) {
    console.error('Export failed', error);
    throw error;
  }
}

export async function importData(jsonString: string) {
  try {
    const data = JSON.parse(jsonString);
    
    // Simple import logic: clear and refill
    // In a real app, you might want to merge or handle conflicts
    await db.delete(saleItems).run();
    await db.delete(sales).run();
    await db.delete(products).run();

    if (data.products) await db.insert(products).values(data.products).run();
    if (data.sales) await db.insert(sales).values(data.sales).run();
    if (data.saleItems) await db.insert(saleItems).values(data.saleItems).run();
    
    return true;
  } catch (error) {
    console.error('Import failed', error);
    throw error;
  }
}
