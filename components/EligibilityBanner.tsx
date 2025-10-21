import { View, Text } from "react-native";

export default function EligibilityBanner({
  count,
  grants,
  total,
}: {
  count: number;
  grants: string[];
  total: number;
}) {
  return (
    <View className="rounded-[10px] bg-[#ECEBFF] px-4 py-4 mb-6">
      <Text className="text-[18px] leading-[22px] font-extrabold text-[#0B0B0F] mb-3">
        You’re eligible for {count} Grants
      </Text>

      <View className="mb-3">
        {grants.map((g) => (
          <View key={g} className="flex-row items-center mb-2">
            <View className="h-2 w-2 rounded-full bg-[#7B6CF6] mr-3" />
            <Text
              className="flex-1 text-[15px] leading-[18px] text-[#0B0B0F]"
              numberOfLines={1}
            >
              {g}
            </Text>
          </View>
        ))}
      </View>

      <View className="rounded-[10px] bg-white px-4 py-2">
        <Text className="text-[15px] text-[#4B5563]">
          Total up to{" "}
          <Text className="font-extrabold text-[#0B0B0F]">
            ${total.toLocaleString()}
          </Text>
        </Text>
      </View>
    </View>
  );
}
