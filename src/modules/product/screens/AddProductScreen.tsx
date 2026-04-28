import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useProductStore } from '../store';
import { useNavigation } from '@react-navigation/native';

import { productSchema, ProductFormData } from '../../../utils/validation';

export default function AddProductScreen() {
  const { addProduct } = useProductStore();
  const navigation = useNavigation();
  
  const { control, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: '',
      price: '',
      barcode: '',
      unit: 'pcs',
    }
  });

  const onSubmit = async (data: ProductFormData) => {
    await addProduct({
      name: data.name,
      price: Number(data.price),
      barcode: data.barcode,
      unit: data.unit,
    });
    navigation.goBack();
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-6">Tambah Produk Baru</Text>

      <View className="mb-4">
        <Text className="text-gray-700 mb-1">Nama Produk</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Contoh: Kopi Susu"
            />
          )}
        />
        {errors.name && <Text className="text-red-500 text-sm mt-1">{errors.name.message}</Text>}
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 mb-1">Harga Jual</Text>
        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="0"
              keyboardType="numeric"
            />
          )}
        />
        {errors.price && <Text className="text-red-500 text-sm mt-1">{errors.price.message}</Text>}
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 mb-1">Barcode (Opsional)</Text>
        <Controller
          control={control}
          name="barcode"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Scan atau ketik barcode"
            />
          )}
        />
      </View>

      <TouchableOpacity 
        className="bg-blue-600 p-4 rounded-xl mt-4"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white text-center font-bold text-lg">Simpan Produk</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
