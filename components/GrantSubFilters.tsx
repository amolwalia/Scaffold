import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface GrantSubFiltersProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function GrantSubFilters({ selectedFilter, onFilterChange }: GrantSubFiltersProps) {
  return (
    <View className="flex-row mb-4">
      <TouchableOpacity
        onPress={() => onFilterChange('Applied')}
        className="flex-1 items-center py-2"
      >
        <Text className={`text-base font-medium ${
          selectedFilter === 'Applied' 
            ? 'text-purple-600' 
            : 'text-gray-500'
        }`}>
          Applied
        </Text>
        <View className={`mt-2 h-0.5 w-full ${
          selectedFilter === 'Applied' 
            ? 'bg-purple-600' 
            : 'bg-gray-500'
        }`} />
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => onFilterChange('Saved')}
        className="flex-1 items-center py-2"
      >
        <Text className={`text-base font-medium ${
          selectedFilter === 'Saved' 
            ? 'text-purple-600' 
            : 'text-gray-500'
        }`}>
          Saved
        </Text>
        <View className={`mt-2 h-0.5 w-full ${
          selectedFilter === 'Saved' 
            ? 'bg-purple-600' 
            : 'bg-gray-500'
        }`} />
      </TouchableOpacity>
    </View>
  );
}
