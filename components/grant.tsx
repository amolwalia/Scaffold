import { Ionicons } from '@expo/vector-icons';
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
  eligible?: boolean;
  saved?: boolean;
  onPress?: () => void;
  onView?: () => void;
  onSave?: () => void;
  onNavigateToApply?: () => void;
}

export default function Grant({ 
  id, 
  title, 
  organization, 
  amount, 
  deadline, 
  category, 
  description, 
  eligible = false,
  saved = false,
  onPress,
  onView,
  onSave,
  onNavigateToApply
}: GrantProps) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.7}
      className={`rounded-2xl shadow-sm border p-5 mb-4 mx-4 ${
        eligible 
          ? 'bg-white border-gray-200' 
          : 'bg-gray-100 border-gray-300 opacity-75'
      }`}
    >
      {/* Top Section with Bookmark and Logo */}
      <View className="flex-row justify-between items-start mb-4">

        {/* Organization Logo Placeholder */}
        <View className="items-center">
          <View className={`w-12 h-12 rounded-lg items-center justify-center mb-1 ${
            eligible 
              ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
              : 'bg-gray-300'
          }`}>
            <View className={`w-6 h-6 rounded-full ${
              eligible ? 'bg-white' : 'bg-gray-400'
            }`} />
          </View>
          <Text className={`text-xs font-medium ${
            eligible ? 'text-gray-800' : 'text-gray-500'
          }`}>
            {organization}
          </Text>
        </View>

        <TouchableOpacity 
          onPress={(e) => {
            e?.stopPropagation?.();
            onSave?.();
          }} 
          className="p-1"
        >
          <Ionicons 
            name={saved ? "bookmark" : "bookmark-outline"} 
            size={25} 
            color={saved ? "#3B82F6" : (eligible ? "#9CA3AF" : "#D1D5DB")} 
          />
        </TouchableOpacity>
      </View>

      {/* Grant Title */}
      <Text className={`text-lg font-bold mb-3 leading-tight ${
        eligible ? 'text-gray-900' : 'text-gray-500'
      }`} numberOfLines={2}>
        {title}
      </Text>

      {/* Amount Tag */}
      <View className="flex-row justify-between items-center mb-4">
        <View className={`px-3 py-1 rounded-full ${
          eligible ? 'bg-gray-800' : 'bg-gray-400'
        }`}>
          <Text className="text-white text-sm font-medium">
            {amount}
          </Text>
        </View>
        
        {/* Deadline with Calendar Icon */}
        <View className="flex-row items-center">
          <Ionicons 
            name="calendar-outline" 
            size={14} 
            color={eligible ? "#374151" : "#9CA3AF"} 
          />
          <Text className={`text-sm ml-1 ${
            eligible ? 'text-gray-700' : 'text-gray-500'
          }`}>
            {deadline}
          </Text>
        </View>
      </View>

      {/* Bottom Section with Eligibility and Apply Button */}
      <View className="flex-row justify-between items-center">
        {/* Eligibility Message */}
        <View className="flex-row items-center flex-1">
          {eligible ? (
            <>
              <View className="w-5 h-5 bg-green-500 rounded-full items-center justify-center mr-2">
                <Ionicons name="checkmark" size={12} color="white" />
              </View>
              <Text className="text-gray-700 text-sm">
                You're eligible for this grant!
              </Text>
            </>
          ) : (
            <>
              <View className="w-5 h-5 bg-red-400 rounded-full items-center justify-center mr-2">
                <Ionicons name="close" size={12} color="white" />
              </View>
              <Text className="text-red-500 text-sm">
                You're not eligible for this grant
              </Text>
            </>
          )}
        </View>

        {/* View Button */}
        <TouchableOpacity 
          onPress={(e) => {
            e?.stopPropagation?.();
            if (eligible) {
              onNavigateToApply?.();
            }
          }}
          className={`px-6 py-3 rounded-lg ${
            eligible 
              ? 'bg-orange-500' 
              : 'bg-gray-400'
          }`}
          activeOpacity={eligible ? 0.8 : 1}
          disabled={!eligible}
        >
          <Text className="text-black font-medium text-sm">
            View
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
