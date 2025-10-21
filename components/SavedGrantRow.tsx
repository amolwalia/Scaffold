import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  label: string; // e.g., "Apply to your saved grant"
  onPress?: () => void;
};

export default function SavedGrantRow({ label, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="rounded-[10px] bg-[#F3F2FF] active:opacity-80"
      style={{
        minHeight: 84,
        paddingHorizontal: 16,
        paddingVertical: 18,
      }}
    >
      <View className="flex-row items-center justify-between">
        <Text
          className="text-[18px] leading-[22px] text-[#0B0B0F]"
          numberOfLines={1}
        >
          {label}
        </Text>

        {/* Right chevron, centered and consistent size */}
        <View className="h-8 w-8 items-center justify-center">
          <Ionicons name="chevron-forward" size={20} color="#111111" />
        </View>
      </View>
    </Pressable>
  );
}
