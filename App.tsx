import "./global.css";
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Navigation } from './src/core/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAppMigrations } from './src/hooks/useAppMigrations';

export default function App() {
  const { isReady, error } = useAppMigrations();

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <ActivityIndicator size="large" color="#ef4444" />
        <StatusBar style="auto" />
      </View>
    );
  }

  if (!isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
