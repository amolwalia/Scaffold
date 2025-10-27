import { Modal, View, Text, Pressable, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

type Action = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary"; // optional CTA row (if you ever need it)
};

type Props = {
  visible: boolean;
  onClose: () => void;

  // Title row
  title?: string; // e.g. "09/01 – 09/14"
  titleIconName?: string; // e.g. "calendar-outline"
  titleIconBg?: string; // e.g. "#F59E0B"
  titleIconColor?: string; // e.g. "#FFFFFF"

  // Body
  lines?: string[]; // each line becomes its own <Text>
  children?: React.ReactNode; // or pass custom JSX

  // Optional CTAs
  actions?: Action[];
};

export default function ModalPopover({
  visible,
  onClose,
  title,
  titleIconName = "calendar-outline",
  titleIconBg = "#F59E0B",
  titleIconColor = "#FFFFFF",
  lines,
  children,
  actions = [],
}: Props) {
  const cardShadow = {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/40 items-center justify-center px-5"
      >
        {/* Stop touches from bubbling to the backdrop */}
        <Pressable
          onPress={() => {}}
          className="w-full max-w-[360px] rounded-[10px] bg-white px-5 py-4"
          style={cardShadow}
        >
          {/* Title row */}
          {!!title && (
            <View className="flex-row items-center mb-2">
              <View
                className="h-8 w-8 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: titleIconBg }}
              >
                <Ionicons
                  name={titleIconName as any}
                  size={18}
                  color={titleIconColor}
                />
              </View>
              <Text className="text-[18px] leading-[22px] text-[#0B0B0F] font-montExtra">
                {title}
              </Text>
            </View>
          )}

          {/* Body */}
          {children ? (
            children
          ) : (
            <View className="mt-1">
              {(lines ?? []).map((line, i) => (
                <Text
                  key={i}
                  className="text-[15px] leading-[20px] text-[#4B5563] mb-2 font-mont"
                >
                  {line}
                </Text>
              ))}
            </View>
          )}

          {/* Optional actions row */}
          {actions.length > 0 && (
            <View className="mt-3 flex-row justify-end gap-3">
              {actions.map(({ label, onPress, variant = "secondary" }) => (
                <Pressable
                  key={label}
                  onPress={onPress}
                  className={
                    variant === "primary"
                      ? "px-4 py-2 rounded-[10px] bg-[#7B6CF6]"
                      : "px-4 py-2 rounded-[10px] bg-[#F3F4F6]"
                  }
                >
                  <Text
                    className={
                      variant === "primary"
                        ? "text-white font-montSemi"
                        : "text-[#111827] font-montSemi"
                    }
                  >
                    {label}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
