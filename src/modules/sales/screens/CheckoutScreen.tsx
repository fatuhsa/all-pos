import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useSalesStore } from '../store';
import { useNavigation } from '@react-navigation/native';

const PAYMENT_METHODS = [
  { id: 'Cash', label: 'Tunai', icon: 'cash-outline' },
  { id: 'Transfer', label: 'Transfer Bank', icon: 'business-outline' },
  { id: 'QRIS', label: 'QRIS', icon: 'qr-code-outline' },
  { id: 'E-wallet', label: 'E-Wallet', icon: 'wallet-outline' },
];

export default function CheckoutScreen() {
  const { cart, checkout } = useSalesStore();
  const [selectedMethod, setSelectedMethod] = useState('Cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigation = useNavigation<any>();

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      await checkout(selectedMethod);
      Alert.alert('Sukses', 'Transaksi berhasil disimpan', [
        { text: 'OK', onPress: () => navigation.popToTop() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Gagal memproses transaksi');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-2 text-center">Checkout</Text>
      <Text className="text-4xl font-black text-blue-700 text-center mb-8">
        Rp {totalAmount.toLocaleString()}
      </Text>

      <Text className="text-gray-600 mb-4 font-semibold">Pilih Metode Pembayaran:</Text>
      
      <View className="flex-row flex-wrap justify-between">
        {PAYMENT_METHODS.map((method) => (
          <TouchableOpacity
            key={method.id}
            onPress={() => setSelectedMethod(method.id)}
            className={`w-[48%] p-6 rounded-2xl mb-4 border-2 ${
              selectedMethod === method.id ? 'border-blue-600 bg-blue-50' : 'border-gray-100'
            }`}
          >
            <Text className={`text-center font-bold ${
              selectedMethod === method.id ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {method.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="mt-auto">
        <TouchableOpacity 
          className={`p-5 rounded-2xl flex-row justify-center items-center ${
            isProcessing ? 'bg-gray-400' : 'bg-blue-600'
          }`}
          onPress={handleCheckout}
          disabled={isProcessing}
        >
          {isProcessing && <ActivityIndicator color="white" className="mr-2" />}
          <Text className="text-white text-center font-bold text-xl">
            Selesaikan Pembayaran
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="mt-4 p-4"
          onPress={() => navigation.goBack()}
          disabled={isProcessing}
        >
          <Text className="text-center text-gray-500 font-bold">Batal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
