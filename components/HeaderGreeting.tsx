import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  name: string;
  role: string;
  onBellPress?: () => void;
};

export default function HeaderGreeting({ name, role, onBellPress }: Props) {
  return (
    <View className=" pb-3 flex-row items-center justify-between border-b border-solid border-[#B2B1B8]">
      <View>
        <Text className="text-[18px] font-montserrat-medium text-[#000000]">
          Hello,
        </Text>
        <Text className="text-[26px] font-montserrat-bold text-[#000000] mt-1">
          {name}
        </Text>
        <Text className="text-sm font-montserrat-medium  text-[#000000] ">
          {role}
        </Text>
      </View>

      <Pressable
        accessibilityLabel="Notifications"
        onPress={onBellPress}
        className="h-12 w-12 items-center justify-center rounded-full bg-[#7260CC]"
      >
        <Ionicons name="notifications-outline" size={27} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}
