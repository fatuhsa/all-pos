import { 
  USBPrinter, 
  NetPrinter, 
  BLEPrinter,
} from 'react-native-thermal-receipt-printer';

export async function discoverPrinters() {
  try {
    const devices = await BLEPrinter.init();
    return await BLEPrinter.getDeviceList();
  } catch (error) {
    console.error('Failed to discover printers', error);
    throw error;
  }
}

export async function connectPrinter(address: string) {
  try {
    await BLEPrinter.connectPrinter(address);
    return true;
  } catch (error) {
    console.error('Failed to connect printer', error);
    throw error;
  }
}

export async function printReceipt(sale: any, items: any[]) {
  try {
    await BLEPrinter.printText("<C>AllPOS</C>\n");
    await BLEPrinter.printText("<C>Terima Kasih Atas Kunjungan Anda</C>\n");
    await BLEPrinter.printText("--------------------------------\n");
    
    for (const item of items) {
      const line = `${item.name} x${item.quantity}`.padEnd(20) + `Rp${(item.price * item.quantity).toLocaleString()}`.padStart(12);
      await BLEPrinter.printText(`${line}\n`);
    }
    
    await BLEPrinter.printText("--------------------------------\n");
    const totalLine = "TOTAL".padEnd(20) + `Rp${sale.totalAmount.toLocaleString()}`.padStart(12);
    await BLEPrinter.printText(`<B>${totalLine}</B>\n`);
    await BLEPrinter.printText("\n\n\n");
  } catch (error) {
    console.error('Printing failed', error);
    throw error;
  }
}
