import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Switch } from 'react-native';
import { exportData, importData } from '../../../utils/backup';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useColorScheme } from 'nativewind';

export default function SettingsScreen() {
  const [loading, setLoading] = useState(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const handleBackup = async () => {
    setLoading(true);
    try {
      const fileUri = await exportData();
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert('Backup Selesai', `File disimpan di: ${fileUri}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal membuat backup');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
      });

      if (!result.canceled) {
        const fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri);
        await importData(fileContent);
        Alert.alert('Sukses', 'Data berhasil dipulihkan. Silakan restart aplikasi untuk melihat perubahan.');
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal memulihkan data. Pastikan file backup benar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-slate-900 p-6">
      <Text className="text-2xl font-bold mb-8 dark:text-white">Pengaturan</Text>

      <View className="bg-gray-50 dark:bg-slate-800 p-6 rounded-3xl mb-4 border border-gray-100 dark:border-slate-700">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-lg font-bold dark:text-white">Mode Gelap</Text>
            <Text className="text-gray-500 dark:text-gray-400">Sesuaikan tampilan aplikasi</Text>
          </View>
          <Switch 
            value={colorScheme === 'dark'} 
            onValueChange={toggleColorScheme} 
          />
        </View>

        <Text className="text-lg font-bold mb-2 dark:text-white">Backup & Restore</Text>
        <Text className="text-gray-500 dark:text-gray-400 mb-6">Amankan data Anda atau pindahkan ke perangkat lain.</Text>

        <TouchableOpacity 
          className="bg-blue-600 p-4 rounded-2xl mb-3 flex-row justify-center items-center"
          onPress={handleBackup}
          disabled={loading}
        >
          {loading && <ActivityIndicator color="white" className="mr-2" />}
          <Text className="text-white font-bold text-center">Buat Backup (Export JSON)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-white dark:bg-slate-700 border-2 border-blue-600 p-4 rounded-2xl flex-row justify-center items-center"
          onPress={handleRestore}
          disabled={loading}
        >
          <Text className="text-blue-600 dark:text-blue-400 font-bold text-center">Pulihkan Data (Import JSON)</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-gray-50 dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700">
        <Text className="text-lg font-bold mb-2 dark:text-white">Tentang Aplikasi</Text>
        <Text className="text-gray-500 dark:text-gray-400">AllPOS Beta v1.0.0</Text>
        <Text className="text-gray-500 dark:text-gray-400">100% Offline-First & Gratis</Text>
      </View>
    </View>
  );
}
