import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

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
    <View
      className="rounded-[10px] bg-[#F3F2FF] px-4 py-5"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
      }}
    >
      {/* Text block */}
      <Text className="text-[20px] leading-[24px] text-[#0B0B0F]">
        Your profile is{" "}
        <Text className="font-extrabold text-[#F59E0B]">
          {Math.round(pct)}%
        </Text>{" "}
        complete!
      </Text>
      <Text className="mt-1 text-[16px] leading-[20px] text-[#4B5563]">
        Fill out the next step now.
      </Text>

      {/* Progress bar */}
      <View className="mt-5 h-[14px] bg-white/90 rounded-full overflow-hidden">
        {/* gradient fill */}
        <View style={{ width: `${pct}%`, height: "100%" }}>
          <LinearGradient
            colors={["#F59E0B", "#B983FF"]} // orange → lavender
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ flex: 1 }}
          />
        </View>

        {/* white thumb */}
        <View
          style={{
            position: "absolute",
            left: `${pct}%`,
            top: "50%",
            marginLeft: -11,
            marginTop: -11,
          }}
          className="h-[22px] w-[22px] rounded-full bg-white"
        />
      </View>

      {/* CTA */}
      <View className="mt-5 flex-row items-center justify-between">
        <Text className="text-[20px] font-extrabold text-[#7B6CF6]">
          {ctaLabel}
        </Text>

        <Pressable
          onPress={onPress}
          accessibilityRole="button"
          className="h-12 w-12 items-center justify-center rounded-full bg-[#7B6CF6] active:opacity-80"
        >
          <Ionicons name="arrow-forward" size={22} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}
