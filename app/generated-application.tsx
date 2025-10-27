import BottomNavigation from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function GeneratedApplicationScreen() {
  const router = useRouter();
  const [writtenAnswers, setWrittenAnswers] = useState({
    goal: "",
    career: ""
  });

  // Mock profile data - in production this would come from user profile
  const profileData = {
    fullName: "Mateo Alvarez",
    streetAddress: "123 Main Street",
    city: "Vancouver, BC",
    email: "mateo.alvarez@email.com",
    phone: "(604) 555-0123",
    currentEmployer: "ABC Construction Ltd.",
    tuitionCost: "$2,500",
    apprenticeshipLevel: "Level 2"
  };

  const handleApplyPress = () => {
    console.log('Apply button pressed - navigate to external portal');
    // In production, this would open the external application portal
  };

  const handleUploadDocuments = () => {
    console.log('Upload documents pressed');
    // In production, this would open document upload interface
  };

  return (
    <View className="flex-1 bg-white">
      {/* Hides the default header */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Custom Header */}
      <View className="flex-row items-center justify-between px-4 py-6 pt-12">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="bookmark" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Top Section */}
        <View className="px-4 mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            You're almost done!
          </Text>
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Masonry Institute of BC Training Fund
          </Text>
          <Text className="text-gray-700 text-base leading-relaxed mb-4">
            We've auto-filled your application using your profile. {" "}
            <Text className="text-purple-600">Finish applying through the portal</Text>.
          </Text>
          
          {/* Apply Button */}
          <TouchableOpacity 
            className="bg-[#7CD23E] rounded-xl py-5 flex-row items-center justify-center mb-6"
            onPress={handleApplyPress}
          >
            <Text className="text-black font-medium text-base mr-2">Apply here</Text>
            <Ionicons name="open-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Application Template Section */}
        <View className="px-4 mb-8">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Your application template
          </Text>
          
          {/* Missing Profile Warning 
          <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <Text className="text-red-600 font-medium text-base">
              Missing from your profile...
            </Text>
          </View>
          

          {/* Basic Profile Section */}
          <View className="bg-gray-50 border border-green-500 rounded-2xl p-4 mb-4">
            <Text className="text-lg font-bold text-gray-900 mb-4">Basic Profile</Text>
            
            <View className="space-y-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-600 text-sm mb-1">Full Name</Text>
                <Text className="text-gray-900 text-base">{profileData.fullName}</Text>
              </View>
              
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-600 text-sm mb-1">Street Address</Text>
                <Text className="text-gray-900 text-base">{profileData.streetAddress}</Text>
              </View>
              
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-600 text-sm mb-1">City</Text>
                <Text className="text-gray-900 text-base">{profileData.city}</Text>
              </View>
              
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-600 text-sm mb-1">Email</Text>
                <Text className="text-gray-900 text-base">{profileData.email}</Text>
              </View>
              
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-600 text-sm mb-1">Phone</Text>
                <Text className="text-gray-900 text-base">{profileData.phone}</Text>
              </View>
              
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-600 text-sm mb-1">Current Employer</Text>
                <Text className="text-gray-900 text-base">{profileData.currentEmployer}</Text>
              </View>
            </View>
          </View>

          {/* Education and Training Section */}
          <View className="bg-gray-50 border border-green-500 rounded-2xl p-4 mb-4">
            <Text className="text-lg font-bold text-gray-900 mb-4">Education and training</Text>
            
            <View className="space-y-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-600 text-sm mb-1">Cost of Tuition</Text>
                <Text className="text-gray-900 text-base">{profileData.tuitionCost}</Text>
              </View>
              
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-600 text-sm mb-1">Apprenticeship Level</Text>
                <Text className="text-gray-900 text-base">{profileData.apprenticeshipLevel}</Text>
              </View>
            </View>
          </View>

          {/* References Section */}
          <View className="bg-gray-50 border border-green-500 rounded-2xl p-4 mb-4">
            <Text className="text-lg font-bold text-gray-900 mb-4">References</Text>
            
            <View className="space-y-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-600 text-sm mb-1">Full Name</Text>
                <Text className="text-gray-400 text-base italic">Not provided</Text>
              </View>
              
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-600 text-sm mb-1">Phone</Text>
                <Text className="text-gray-400 text-base italic">Not provided</Text>
              </View>
            </View>
          </View>

          {/* Written Answers Section */}
          <View className="bg-gray-50 border border-green-500 rounded-2xl p-4 mb-4">
            <Text className="text-lg font-bold text-gray-900 mb-4">Written Answers</Text>
            
            <View className="space-y-4">
              <View>
                <Text className="text-gray-600 text-sm mb-2">What is your future goal as a mason?</Text>
                <TextInput
                  className="bg-white border border-gray-300 rounded-lg p-3 text-gray-900 min-h-[80px]"
                  placeholder="Enter your response here..."
                  value={writtenAnswers.goal}
                  onChangeText={(text) => setWrittenAnswers(prev => ({ ...prev, goal: text }))}
                  multiline
                  textAlignVertical="top"
                />
              </View>
              
              <View>
                <Text className="text-gray-600 text-sm mb-2">Why have you chosen a career in masonry?</Text>
                <TextInput
                  className="bg-white border border-gray-300 rounded-lg p-3 text-gray-900 min-h-[80px]"
                  placeholder="Enter your response here..."
                  value={writtenAnswers.career}
                  onChangeText={(text) => setWrittenAnswers(prev => ({ ...prev, career: text }))}
                  multiline
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>

          {/* Documents Section */}
          <View className="bg-gray-50 border border-green-500 rounded-2xl p-4 mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-4">Documents</Text>
            
            <View className="space-y-3">
              <View className="flex-row items-center">
                <Ionicons name="folder" size={20} color="#F97316" />
                <Text className="text-gray-900 text-base ml-3">Unofficial transcript (high school or post-secondary)</Text>
              </View>
              
              <View className="flex-row items-center">
                <Ionicons name="folder" size={20} color="#F97316" />
                <Text className="text-gray-900 text-base ml-3">Proof of registration and acceptance in your program</Text>
              </View>
              
              <View className="flex-row items-center">
                <Ionicons name="folder" size={20} color="#F97316" />
                <Text className="text-gray-900 text-base ml-3">Letter of support from your current employer</Text>
              </View>
              
              <View className="flex-row items-center">
                <Ionicons name="folder" size={20} color="#F97316" />
                <Text className="text-gray-900 text-base ml-3">Confirmation of membership status with the Masonry Institute of BC</Text>
              </View>
              
              <TouchableOpacity 
                className="flex-row items-center mt-4"
                onPress={handleUploadDocuments}
              >
                <Ionicons name="cloud-upload-outline" size={20} color="#3B82F6" />
                <Text className="text-blue-600 text-base ml-3 font-medium">Upload documents</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <BottomNavigation activeTab="grants" />
    </View>
  );
}
