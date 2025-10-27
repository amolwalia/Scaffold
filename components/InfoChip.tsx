import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  onPress?: () => void;
};

export default function InfoChip({
  label,
  iconName,
  iconColor,
  iconBg,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-[10px] px-3 py-3 flex-row items-center justify-between bg-[#F3F4F6]"
    >
      <View className="flex-row items-center">
        <View
          className="h-8 w-8 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: iconBg }}
        >
          <Ionicons name={iconName} size={16} color={iconColor} />
        </View>
        <Text
          className="text-[14px] font-montSemi text-[#0B0B0F]"
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#6B7280" />
    </Pressable>
  );
}
