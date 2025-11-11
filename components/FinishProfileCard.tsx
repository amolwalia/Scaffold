import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  percent: number; // 0..1  e.g., 0.4
  ctaLabel: string; // e.g., "Education Information"
  onPress?: () => void;
};

export default function FinishProfileCard({
  percent = 0.4,
  ctaLabel,
  onPress,
}: Props) {
  const pct = Math.max(0, Math.min(1, percent)) * 100;

  return (
    <View className="rounded-[10px] bg-[#F3F2FF] px-4 py-5">
      {/* Text block */}
      <Text className="text-[18px] font-montserrat-semibold leading-[24px] text-[#000000]">
        Your profile is{' '}
        <Text className="font-montserrat-extrabold text-[#FF890C]">
          {Math.round(pct)}%
        </Text>{' '}
        complete!
      </Text>
      <Text className=" text-[14px] font-montserrat-medium leading-[20px] text-[#000000]">
        Fill out the next step now.
      </Text>

      {/* Progress bar */}
      <View className="mt-6 h-[14px] bg-white/90 rounded-full overflow-hidden">
        {/* gradient fill */}
        <View
          style={{
            width: `${pct}%`,
            height: '100%',
          }}
          className="rounded-full"
        >
          <LinearGradient
            colors={['#FFA341', '#C3B7FF']} // orange → lavender
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ flex: 1 }}
          />
        </View>

        {/* white thumb */}
        {/*<View
          style={{
            position: 'absolute',
            left: `${pct}%`,
            top: '50%',
            marginLeft: -11,
            marginTop: -11,
          }}
          className="h-[22px] w-[22px] rounded-full bg-white"
        />*/}
      </View>

      {/* CTA */}
      <View className="mt-6 flex-row items-center justify-end gap-4">
        <Text className="text-[16px] font-montserrat-bold text-[#8E78FF]">
          {ctaLabel}
        </Text>

        <Pressable
          onPress={onPress}
          accessibilityRole="button"
          className="h-8 w-8 items-center justify-center rounded-full bg-[#7260CC] active:opacity-80"
        >
          <Ionicons name="arrow-forward-outline" size={22} color="#F6F6F6" />
        </Pressable>
      </View>
    </View>
  );
}
