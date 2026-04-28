import "./global.css";
import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Navigation } from './src/core/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAppMigrations } from './src/hooks/useAppMigrations';
import LoginScreen from './src/core/screens/LoginScreen';

export default function App() {
  const { isReady, error } = useAppMigrations();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  if (!isAuthenticated) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LoginScreen onLogin={() => setIsAuthenticated(true)} />
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
