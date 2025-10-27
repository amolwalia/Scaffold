import BottomNavigation from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function GrantSavedApplyScreen() {
  const router = useRouter();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<{ [key: string]: boolean }>({
    step1: false,
    step2: false,
    step3: true, // Step 3 is expanded by default as shown in the image
    step4: true, // Step 4 is expanded by default as shown in the image
  });
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    eligibility1: false,
    eligibility2: false,
    document1: false,
    document2: false,
    document3: false,
    document4: false,
  });

  const grantData = {
    title: "Masonry Institute of BC Training Fund",
    organization: "Masonry Institute",
    amount: "Up to $1,950",
    deadline: "3m before training starts",
    description: "The Masonry Institute of BC has evolved from masonry organizations, which have been promoting the local masonry industry for over 50 years.",
    fullDescription: "The Masonry Institute of BC has evolved from masonry organizations, which have been promoting the local masonry industry for over 50 years." + "\n" + " We are committed to advancing the masonry trade through education, training, and professional development. Our training fund provides financial support to apprentices and tradespeople pursuing masonry-related education and certification programs." + "\n" + "This includes support for various levels of apprenticeship training, specialized masonry techniques, and continuing education opportunities that enhance skills and career advancement in the masonry industry.",
  };

  const toggleStepExpansion = (stepKey: string) => {
    setExpandedSteps((prev) => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  const toggleCheckbox = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApplicationResult = (result: 'approved' | 'pending' | 'rejected') => {
    console.log('Application result:', result);
    // Handle application result logic here
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
        {/* Grant Title */}
        <View className="px-4 mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            {grantData.title}
          </Text>
        </View>

        {/* Description Section */}
        <View className="px-4 mb-6">
          <View className="bg-gray-100 rounded-2xl p-4">
            <Text className="text-gray-700 text-base leading-relaxed">
              {isDescriptionExpanded ? grantData.fullDescription : grantData.description}
            </Text>
            <TouchableOpacity
              onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="mt-2"
            >
              <View className="flex-row items-center justify-end">
                <Text className="text-gray-500 text-sm mr-1">
                  {isDescriptionExpanded ? "Show less" : "Show more"}
                </Text>
                <Ionicons
                  name={isDescriptionExpanded ? "chevron-up" : "chevron-down"}
                  size={16}
                  color="#6B7280"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Generate Application Button */}
        <View className="px-4 mb-6">
          <TouchableOpacity 
            className="bg-orange-400 rounded-3xl py-4"
            onPress={() => router.push('/generated-application')}
          >
            <Text className="text-black text-center font-medium text-base">
              Generate my application
            </Text>
          </TouchableOpacity>
        </View>

        {/* Progress Tracker Section */}
        <View className="px-4 mb-8">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Progress tracker
          </Text>

          {/* Step 1: Check eligibility */}
          <View className="mb-4">
            <View className="border border-[#C3B7FF] rounded-2xl overflow-hidden">
              <TouchableOpacity
                className="flex-row items-center justify-between p-4"
                onPress={() => toggleStepExpansion('step1')}
              >
                <View className="flex-row items-center">
                  <View className="bg-[#8E78FF] rounded-full w-6 h-6 items-center justify-center mr-3">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                  <View>
                    <Text className="text-gray-500 text-sm">Step 1</Text>
                    <Text className="text-gray-900 font-bold text-base">Check eligibility</Text>
                  </View>
                </View>
                <Ionicons
                  name={expandedSteps.step1 ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>

              {expandedSteps.step1 && (
                <View className=" pb-4">
                  <View className="rounded-xl p-4 ">
                    <TouchableOpacity
                      className="flex-row items-start mb-4"
                      onPress={() => toggleCheckbox("eligibility1")}
                    >
                      <View
                        className={`w-5 h-5 border-2 rounded mr-3 mt-0.5 items-center justify-center ${
                          checkedItems.eligibility1
                            ? "bg-black border-black"
                            : "border-gray-300"
                        }`}
                      >
                        {checkedItems.eligibility1 && (
                          <Ionicons name="checkmark" size={14} color="white" />
                        )}
                      </View>
                      <Text className="text-gray-900 text-sm flex-1">
                        Enrolled for training at the Trowel Trades Training Association
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="flex-row items-start"
                      onPress={() => toggleCheckbox("eligibility2")}
                    >
                      <View
                        className={`w-5 h-5 border-2 rounded mr-3 mt-0.5 items-center justify-center ${
                          checkedItems.eligibility2
                            ? "bg-black border-black"
                            : "border-gray-300"
                        }`}
                      >
                        {checkedItems.eligibility2 && (
                          <Ionicons name="checkmark" size={14} color="white" />
                        )}
                      </View>
                      <Text className="text-gray-900 text-sm flex-1">
                        In Level 1, 2, 3 of their apprenticeship
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Step 2: Gather documents */}
          <View className="mb-4">
            <View className="border border-[#C3B7FF] rounded-2xl overflow-hidden">
              <TouchableOpacity
                className="flex-row items-center justify-between p-4"
                onPress={() => toggleStepExpansion('step2')}
              >
                <View className="flex-row items-center">
                  <View className="bg-[#8E78FF] rounded-full w-6 h-6 items-center justify-center mr-3">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                  <View>
                    <Text className="text-gray-500 text-sm">Step 2</Text>
                    <Text className="text-gray-900 font-bold text-base">Gather documents</Text>
                  </View>
                </View>
                <Ionicons
                  name={expandedSteps.step2 ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>

              {expandedSteps.step2 && (
                <View className="pb-4">
                  <View className="rounded-xl p-4">
                    <TouchableOpacity
                      className="flex-row items-start mb-4"
                      onPress={() => toggleCheckbox("document1")}
                    >
                      <View
                        className={`w-5 h-5 border-2 rounded mr-3 mt-0.5 items-center justify-center ${
                          checkedItems.document1
                            ? "bg-black border-black"
                            : "border-gray-300"
                        }`}
                      >
                        {checkedItems.document1 && (
                          <Ionicons name="checkmark" size={14} color="white" />
                        )}
                      </View>
                      <Text className="text-gray-900 text-sm flex-1">
                        Statement of Personal Goals
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="flex-row items-start mb-4"
                      onPress={() => toggleCheckbox("document2")}
                    >
                      <View
                        className={`w-5 h-5 border-2 rounded mr-3 mt-0.5 items-center justify-center ${
                          checkedItems.document2
                            ? "bg-black border-black"
                            : "border-gray-300"
                        }`}
                      >
                        {checkedItems.document2 && (
                          <Ionicons name="checkmark" size={14} color="white" />
                        )}
                      </View>
                      <Text className="text-gray-900 text-sm flex-1">
                        Proof of registration and acceptance in your program
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="flex-row items-start mb-4"
                      onPress={() => toggleCheckbox("document3")}
                    >
                      <View
                        className={`w-5 h-5 border-2 rounded mr-3 mt-0.5 items-center justify-center ${
                          checkedItems.document3
                            ? "bg-black border-black"
                            : "border-gray-300"
                        }`}
                      >
                        {checkedItems.document3 && (
                          <Ionicons name="checkmark" size={14} color="white" />
                        )}
                      </View>
                      <Text className="text-gray-900 text-sm flex-1">
                        References - employer and one additional
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="flex-row items-start"
                      onPress={() => toggleCheckbox("document4")}
                    >
                      <View
                        className={`w-5 h-5 border-2 rounded mr-3 mt-0.5 items-center justify-center ${
                          checkedItems.document4
                            ? "bg-black border-black"
                            : "border-gray-300"
                        }`}
                      >
                        {checkedItems.document4 && (
                          <Ionicons name="checkmark" size={14} color="white" />
                        )}
                      </View>
                      <Text className="text-gray-900 text-sm flex-1">
                        Confirm current membership status in the Masonry Institute of BC
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Step 3: Submit application */}
          <View className="mb-4">
            <View className="border border-[#C3B7FF] rounded-2xl overflow-hidden">
              <TouchableOpacity
                className="flex-row items-center justify-between p-4"
                onPress={() => toggleStepExpansion('step3')}
              >
                <View className="flex-row items-center">
                  <View className="bg-gray-300 rounded-full w-6 h-6 items-center justify-center mr-3">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                  <View>
                    <Text className="text-gray-500 text-sm">Step 3</Text>
                    <Text className="text-gray-900 font-bold text-base">Submit application</Text>
                  </View>
                </View>
                <Ionicons
                  name={expandedSteps.step3 ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>

              {expandedSteps.step3 && (
                <View className="pb-4">
                  <View className="rounded-xl p-4 ">
                    <Text className="text-gray-900 text-sm mb-4">
                      Submit your application in the <Text className="font-bold">Masonry Institute of British Columbia</Text> portal
                    </Text>
                    <TouchableOpacity className="bg-[#7CD23E] rounded-xl py-5 flex-row items-center justify-center">
                      <Text className="text-black font-medium text-base mr-2">Apply here</Text>
                      <Ionicons name="open-outline" size={20} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Step 4: Wait for results */}
          <View className="mb-4">
            <View className="border border-[#C3B7FF] rounded-2xl overflow-hidden">
              <TouchableOpacity
                className="flex-row items-center justify-between p-4"
                onPress={() => toggleStepExpansion('step4')}
              >
                <View className="flex-row items-center">
                  <View className="bg-gray-300 rounded-full w-6 h-6 items-center justify-center mr-3">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                  <View>
                    <Text className="text-gray-500 text-sm">Step 4</Text>
                    <Text className="text-gray-900 font-bold text-base">Wait for results</Text>
                  </View>
                </View>
                <Ionicons
                  name={expandedSteps.step4 ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>

              {expandedSteps.step4 && (
                <View className=" pb-4">
                  <View className=" rounded-xl p-4">
                    <Text className="text-gray-900 text-sm mb-4">
                      Did your application get approved? Let us know!
                    </Text>
                    <View className="flex-row space-x-2">
                      <TouchableOpacity
                        className="bg-[#7CD23E] rounded-2xl py-3 flex-1"
                        onPress={() => handleApplicationResult('approved')}
                      >
                        <Text className="text-black text-center font-medium text-sm">Approved</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="bg-yellow-500 rounded-2xl py-3 flex-1"
                        onPress={() => handleApplicationResult('pending')}
                      >
                        <Text className="text-black text-center font-medium text-sm">Pending</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="bg-red-500 rounded-2xl py-3 flex-1"
                        onPress={() => handleApplicationResult('rejected')}
                      >
                        <Text className="text-black text-center font-medium text-sm">Rejected</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* {/* Bottom Navigation Bar 
      <View className="bg-white border-t border-gray-200 px-4 py-2">
        <View className="flex-row justify-around items-center">
          <TouchableOpacity 
            className="items-center py-2"
            onPress={() => router.push('/(tabs)')}
          >
            <Ionicons name="home-outline" size={24} color="#9CA3AF" />
            <Text className="text-gray-500 text-xs mt-1">home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="items-center py-2"
            onPress={() => router.push('/(tabs)/grants')}
          >
            <Ionicons name="compass" size={24} color="#8B5CF6" />
            <Text className="text-purple-600 text-xs mt-1">Grants</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center py-2">
            <Ionicons name="person-outline" size={24} color="#9CA3AF" />
            <Text className="text-gray-500 text-xs mt-1">Profile</Text>
          </TouchableOpacity>
        </View>} 
        </View>*/}
      <BottomNavigation activeTab="grants" />
    </View>
  );
}
