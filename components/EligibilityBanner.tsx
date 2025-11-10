import { View, Text } from 'react-native';

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
    <View className="rounded-[10px] bg-[#ECEBFF] px-4 py-5 mt-7">
      <Text className="text-[18px] font-montserrat-semibold  text-[#0B0B0F] mb-5">
        You’re eligible for{' '}
        <Text className="text-[#FF890C] font-montserrat-extrabold">
          {count} Grants
        </Text>
      </Text>

      <View className="mb-5">
        {grants.map((g) => (
          <View key={g} className="flex-row items-center mb-2">
            <View className="h-2 w-2 rounded-full bg-[#7B6CF6] mr-3" />
            <Text
              className="flex-1 text-[15px] font-montserrat-medium leading-[18px] text-[#0B0B0F]"
              numberOfLines={1}
            >
              {g}
            </Text>
          </View>
        ))}
      </View>

      <View className=" bg-none pt-5 pb-0 border-t border-solid border-[#F6F6F6]">
        <Text className="text-[15px] font-montserrat-semibold text-[#27252F] flex justify-end items-center">
          Total up to{' '}
          <Text className="font-montserrat-bold text-[26px] text-[#FF890C] ml-1">
            ${total.toLocaleString()}
          </Text>
        </Text>
      </View>
    </View>
  );
}
