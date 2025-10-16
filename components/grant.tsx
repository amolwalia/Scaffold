import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface GrantProps {
  id: string;
  title: string;
  organization: string;
  amount: string;
  deadline: string;
  category: string;
  description: string;
  onPress?: () => void;
}

export default function Grant({ 
  id, 
  title, 
  organization, 
  amount, 
  deadline, 
  category, 
  description, 
  onPress 
}: GrantProps) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 mx-4"
      activeOpacity={0.7}
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-bold text-gray-900 flex-1 mr-2" numberOfLines={2}>
          {title}
        </Text>
        <View className="bg-blue-100 px-2 py-1 rounded-full">
          <Text className="text-xs font-medium text-blue-800">
            {category}
          </Text>
        </View>
      </View>
      
      <Text className="text-sm text-gray-600 mb-2">
        {organization}
      </Text>
      
      <Text className="text-gray-700 mb-3" numberOfLines={2}>
        {description}
      </Text>
      
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-xs text-gray-500">Amount</Text>
          <Text className="text-lg font-bold text-green-600">
            {amount}
          </Text>
        </View>
        
        <View className="items-end">
          <Text className="text-xs text-gray-500">Deadline</Text>
          <Text className="text-sm font-medium text-red-600">
            {deadline}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
