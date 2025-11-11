import { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightAccessory?: ReactNode;
};

export default function NotificationListItem({
  eyebrow,
  title,
  subtitle,
  onPress,
  rightAccessory,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !onPress }}
      onPress={onPress}
      className="flex-row items-center justify-between bg-white pl-[36px] pr-[20px] pt-[25px] pb-[24px] border-b border-solid border-[#B2B1B8] active:opacity-80"
    >
      <View className="flex-1 pr-4">
        <Text className="text-[13px] font-montserrat-medium text-[#7260CC]">
          {eyebrow}
        </Text>
        <Text className="mt-[5px] text-[16px] font-montserrat-bold text-[#000000]">
          {title}
        </Text>
        {subtitle ? (
          <Text className="mt-[5px] text-[12px] font-montserrat-medium text-[#000000]">
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View className="items-center justify-center pl-3">
        {rightAccessory ?? (
          <Ionicons name="chevron-forward-outline" size={18} color="#000000" />
        )}
      </View>
    </Pressable>
  );
}
