import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useProductStore } from '../../product/store';
import { useSalesStore } from '../store';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function SalesScreen() {
  const { items, fetchProducts } = useProductStore();
  const { cart, addToCart, updateQuantity, totalAmount = 0 } = useSalesStore((state) => ({
    cart: state.cart,
    addToCart: state.addToCart,
    updateQuantity: state.updateQuantity,
    totalAmount: state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }));
  
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = items.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    (p.barcode && p.barcode.includes(search))
  );

  return (
    <View className="flex-1 bg-gray-100 flex-row">
      {/* Product Selection Area (Left/Main) */}
      <View className="flex-[2] bg-white p-4 border-r border-gray-200">
        <TextInput
          className="bg-gray-100 p-3 rounded-lg mb-4"
          placeholder="Cari produk atau scan barcode..."
          value={search}
          onChangeText={setSearch}
        />
        
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              className="flex-1 m-1 p-4 bg-gray-50 rounded-xl border border-gray-100 items-center"
              onPress={() => addToCart(item)}
            >
              <Text className="font-bold text-center">{item.name}</Text>
              <Text className="text-blue-600">Rp {item.price.toLocaleString()}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Cart Area (Right) */}
      <View className="flex-1 bg-white p-4">
        <Text className="text-xl font-bold mb-4">Keranjang</Text>
        
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="mb-4 pb-2 border-b border-gray-100">
              <Text className="font-semibold">{item.name}</Text>
              <View className="flex-row justify-between items-center mt-1">
                <View className="flex-row items-center">
                  <TouchableOpacity 
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 rounded-full w-6 h-6 items-center justify-center"
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text className="mx-3">{item.quantity}</Text>
                  <TouchableOpacity 
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 rounded-full w-6 h-6 items-center justify-center"
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
                <Text>Rp {(item.price * item.quantity).toLocaleString()}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text className="text-gray-400 text-center mt-10">Keranjang kosong</Text>}
        />

        <View className="mt-auto pt-4 border-t border-gray-200">
          <View className="flex-row justify-between mb-4">
            <Text className="text-lg font-bold">Total</Text>
            <Text className="text-lg font-bold text-blue-700">Rp {totalAmount.toLocaleString()}</Text>
          </View>
          
          <TouchableOpacity 
            className={`p-4 rounded-xl ${cart.length > 0 ? 'bg-green-600' : 'bg-gray-300'}`}
            disabled={cart.length === 0}
            onPress={() => navigation.navigate('Checkout')}
          >
            <Text className="text-white text-center font-bold text-lg">Bayar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
