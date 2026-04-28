import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductListScreen from '../modules/product/screens/ProductListScreen';
import AddProductScreen from '../modules/product/screens/AddProductScreen';
import SalesScreen from '../modules/sales/screens/SalesScreen';
import CheckoutScreen from '../modules/sales/screens/CheckoutScreen';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DailyReportScreen from '../modules/report/screens/DailyReportScreen';
import SettingsScreen from '../modules/settings/screens/SettingsScreen';

const Stack = createStackNavigator();

function DashboardScreen({ navigation }: any) {
  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <View className="flex-row justify-between items-center mb-10">
        <Text className="text-3xl font-black text-blue-800">AllPOS</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={28} color="#374151" />
        </TouchableOpacity>
      </View>
      
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
        className="bg-orange-500 p-6 rounded-3xl items-center"
        onPress={() => navigation.navigate('DailyReport')}
      >
        <Text className="text-white font-bold text-lg">Laporan Hari Ini</Text>
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
        <Stack.Screen 
          name="DailyReport" 
          component={DailyReportScreen} 
          options={{ title: 'Laporan Penjualan' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: 'Pengaturan' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
