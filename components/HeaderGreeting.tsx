import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  name: string;
  role: string;
  onBellPress?: () => void;
};

export default function HeaderGreeting({ name, role, onBellPress }: Props) {
  return (
    <View className="mb-6 flex-row items-center justify-between">
      <View>
        <Text className="text-base text-gray-600">Hello,</Text>
        <Text className="text-2xl font-extrabold text-gray-900">{name}</Text>
        <Text className="mt-1 text-sm text-gray-600">{role}</Text>
      </View>

      <Pressable
        accessibilityLabel="Notifications"
        onPress={onBellPress}
        className="h-10 w-10 items-center justify-center rounded-full bg-[#ECEBFF] active:opacity-80"
      >
        <Ionicons name="notifications-outline" size={22} color="#7B6CF6" />
      </Pressable>
    </View>
  );
}
