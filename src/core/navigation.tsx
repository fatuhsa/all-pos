import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductListScreen from '../modules/product/screens/ProductListScreen';
import AddProductScreen from '../modules/product/screens/AddProductScreen';
import SalesScreen from '../modules/sales/screens/SalesScreen';
import CheckoutScreen from '../modules/sales/screens/CheckoutScreen';
import { TouchableOpacity, Text, View } from 'react-native';

const Stack = createStackNavigator();

function DashboardScreen({ navigation }: any) {
  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <Text className="text-3xl font-black mb-10 text-center text-blue-800">AllPOS Dashboard</Text>
      
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity 
          className="bg-blue-600 p-8 rounded-3xl flex-1 mr-2 items-center"
          onPress={() => navigation.navigate('Sales')}
        >
          <Text className="text-white font-bold text-xl">POS</Text>
          <Text className="text-blue-100">Penjualan</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-purple-600 p-8 rounded-3xl flex-1 ml-2 items-center"
          onPress={() => navigation.navigate('ProductList')}
        >
          <Text className="text-white font-bold text-xl">Produk</Text>
          <Text className="text-purple-100">Inventory</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        className="bg-gray-100 p-6 rounded-3xl items-center"
        onPress={() => alert('Fitur Laporan segera hadir')}
      >
        <Text className="text-gray-700 font-bold">Laporan Harian</Text>
      </TouchableOpacity>
    </View>
  );
}

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ProductList" 
          component={ProductListScreen} 
          options={{ title: 'Daftar Produk' }}
        />
        <Stack.Screen 
          name="AddProduct" 
          component={AddProductScreen} 
          options={{ title: 'Tambah Produk' }}
        />
        <Stack.Screen 
          name="Sales" 
          component={SalesScreen} 
          options={{ title: 'Point of Sale' }}
        />
        <Stack.Screen 
          name="Checkout" 
          component={CheckoutScreen} 
          options={{ title: 'Pembayaran', presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
