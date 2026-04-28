import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useProductStore } from '../store';
import { useNavigation } from '@react-navigation/native';

export default function ProductListScreen() {
  const { items, isLoading, fetchProducts } = useProductStore();
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">Produk</Text>
        <TouchableOpacity 
          className="bg-blue-600 px-4 py-2 rounded-lg"
          onPress={() => navigation.navigate('AddProduct')}
        >
          <Text className="text-white font-bold">+ Tambah</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="border-b border-gray-200 py-3 flex-row justify-between items-center">
              <View>
                <Text className="text-lg font-semibold">{item.name}</Text>
                <Text className="text-gray-500">{item.barcode || 'No Barcode'}</Text>
              </View>
              <Text className="text-lg font-bold text-blue-700">
                Rp {item.price.toLocaleString()}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-center text-gray-400 mt-10">Belum ada produk</Text>
          }
        />
      )}
    </View>
  );
}
