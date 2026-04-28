import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pin, setPin] = useState('');
  const CORRECT_PIN = '1234'; // Default PIN for MVP

  const handlePress = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin === CORRECT_PIN) {
        onLogin();
      } else if (newPin.length === 4) {
        Alert.alert('Error', 'PIN Salah');
        setPin('');
      }
    }
  };

  return (
    <View className="flex-1 bg-white justify-center items-center p-6">
      <Text className="text-3xl font-black text-blue-800 mb-2">AllPOS</Text>
      <Text className="text-gray-500 mb-10">Masukkan PIN Keamanan</Text>

      <View className="flex-row mb-12">
        {[1, 2, 3, 4].map((i) => (
          <View 
            key={i} 
            className={`w-4 h-4 rounded-full mx-2 ${pin.length >= i ? 'bg-blue-600' : 'bg-gray-200'}`} 
          />
        ))}
      </View>

      <View className="flex-row flex-wrap justify-center w-64">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((btn) => (
          <TouchableOpacity
            key={btn}
            className="w-16 h-16 m-2 items-center justify-center bg-gray-50 rounded-full"
            onPress={() => {
              if (btn === 'C') setPin('');
              else if (btn === '⌫') setPin(pin.slice(0, -1));
              else handlePress(btn);
            }}
          >
            <Text className="text-xl font-bold text-gray-700">{btn}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
