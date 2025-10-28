// components/InfoChip.tsx
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type InfoChipProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor?: string; // background of the icon circle
  label: string;
  onPress?: () => void;
};

export default function InfoChip({
  iconName,
  iconColor = "#FFB980",
  label,
  onPress,
}: InfoChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      {/* Icon */}
      <View style={[styles.iconCircle, { backgroundColor: iconColor }]}>
        <Ionicons name={iconName} size={18} color="#fff" />
      </View>

      {/* Label (never lets chevron wrap below) */}
      <View style={styles.labelWrap}>
        <Text
          style={styles.label}
          numberOfLines={1}
          ellipsizeMode="tail"
          allowFontScaling={false}
          includeFontPadding={false}
        >
          {label}
        </Text>
      </View>

      {/* Chevron (fixed box so it can’t wrap) */}
      <View style={styles.chevWrap}>
        <Ionicons name="chevron-forward" size={16} color="#111" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    // PILL
    backgroundColor: "#F6F6F6",
    borderRadius: 18,
    minHeight: 56,
    paddingHorizontal: 12,

    // ROW that NEVER wraps
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    overflow: "hidden",
    width: "100%",
  },
  pressed: { opacity: 0.95 },

  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    flexShrink: 0,
  },

  // Magic trio so text truncates and chevron stays on same row
  labelWrap: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0, // allow Text to actually shrink
    marginRight: 6,
  },
  label: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "700",
    color: "#111",
  },

  // Reserve space for chevron so it never drops
  chevWrap: {
    width: 18,
    alignItems: "flex-end",
    justifyContent: "center",
    flexShrink: 0,
  },
});
