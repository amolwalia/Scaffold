// app/(tabs)/index.tsx
import { Ionicons } from "@expo/vector-icons";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import GrantsReceivedCard from "../../components/GrantsReceivedCard";

export default function HomeTab() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 120,
        }} // extra bottom
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="text-base text-gray-600">Hello,</Text>
            <Text className="text-2xl font-extrabold text-gray-900">
              Bob Ross
            </Text>
            <Text className="mt-1 text-sm text-gray-600">
              Apprentice Electrician
            </Text>
          </View>

          <Pressable
            accessibilityLabel="Notifications"
            className="h-10 w-10 items-center justify-center rounded-full bg-[#CBC6FF] active:opacity-80"
          >
            <Ionicons name="notifications-outline" size={22} color="#4B3CF9" />
          </Pressable>
        </View>

        {/* Summary tiles */}
        <View className="mb-8 flex-row items-stretch gap-3">
          {/* Left: grants card */}
          <View className="flex-1">
            <GrantsReceivedCard amount={3500} variant="compact" />
          </View>

          {/* Right: documents tile */}
          <Pressable
            accessibilityLabel="Open documents"
            className="w-[104px] h-[84px] shrink-0 rounded-[10px] bg-[#CBC6FF] items-center justify-center active:opacity-80 overflow-hidden"
          >
            <Ionicons name="folder-outline" size={30} color="#7B6CF6" />
            <Text
              className="mt-1 text-[15px] font-semibold text-gray-900 text-center"
              numberOfLines={1}
              ellipsizeMode="clip"
            >
              Documents
            </Text>
          </Pressable>
        </View>

        {/* Application Tracker */}
        <View className="mb-8">
          <Text className="mb-3 text-xl font-extrabold text-gray-900">
            Application Tracker
          </Text>

          <Text className="mb-2 text-base font-semibold text-gray-800">
            StrongerBC Future Skills Grants
          </Text>

          <Pressable className="mb-3 flex-row items-center justify-between rounded-2xl border border-gray-200 bg-[#F8F8F8] p-4 active:opacity-80">
            <View className="flex-row items-center">
              <View className="mr-3 h-6 w-6 items-center justify-center rounded-full bg-green-100">
                <Ionicons name="checkmark" size={16} color="#22C55E" />
              </View>
              <Text className="text-base font-medium text-gray-800">
                Step 3: submit application
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </Pressable>

          <Pressable className="flex-row items-center justify-between rounded-2xl bg-[#FFF9E6] p-4 active:opacity-80">
            <View>
              <Text className="text-sm text-gray-800">
                Apply to your saved grant
              </Text>
              <Text
                className="text-base font-semibold text-gray-900"
                numberOfLines={1}
              >
                LNG Canada Trades Training Fund
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </Pressable>
        </View>

        {/* Finish your profile */}
        <View>
          <Text className="mb-3 text-xl font-extrabold text-gray-900">
            Finish your profile!
          </Text>

          <View className="rounded-2xl bg-[#FFF9E6] p-5">
            <Text className="text-base font-medium text-gray-900">
              Your profile is{" "}
              <Text className="font-semibold text-[#F59E0B]">40%</Text>{" "}
              complete!
            </Text>
            <Text className="mt-1 text-sm text-gray-600">
              Fill out the next step now.
            </Text>

            {/* Progress segments */}
            <View className="mt-4 mb-3 flex-row space-x-2">
              <View className="h-2 flex-1 rounded-full bg-[#F59E0B]" />
              <View className="h-2 flex-1 rounded-full bg-[#F59E0B]" />
              <View className="h-2 flex-1 rounded-full bg-[#CBC6FF]" />
              <View className="h-2 flex-1 rounded-full bg-gray-300" />
              <View className="h-2 flex-1 rounded-full bg-gray-300" />
            </View>

            {/* CTA */}
            <Pressable className="mt-1 flex-row items-center justify-between active:opacity-80">
              <Text
                className="text-base font-semibold text-[#F59E0B]"
                numberOfLines={1}
              >
                Education Information
              </Text>
              <View className="h-8 w-8 items-center justify-center rounded-full bg-[#F59E0B]">
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
