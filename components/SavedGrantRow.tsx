import { Pressable, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  label: string; // e.g., "Apply to your saved grant"
  onPress?: () => void;
};

export default function SavedGrantRow({ label, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="rounded-[10px] bg-[#7260CC]"
      style={{
        height: 60,
        paddingHorizontal: 20,
        paddingVertical: 15,
      }}
    >
      <View className="flex-row items-center justify-between">
        <Text
          className="text-[16px] font-montserrat-bold leading-[22px] text-[#FFFFFF]"
          numberOfLines={1}
        >
          {label}
        </Text>

        {/* Right chevron, centered and consistent size */}
        <View className="h-8 w-8 items-center justify-center rounded-full bg-[#EFEFFF]">
          <Ionicons name="arrow-forward-outline" size={22} color="#7260CC" />
        </View>
      </View>
    </Pressable>
  );
}
