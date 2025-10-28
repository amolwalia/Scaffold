import BottomNavigation from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ModalPopover from "../components/ModalPopover";

/* -----------------------------------------------------
   Local chip component — bullet-proof on iPhone
----------------------------------------------------- */
type ChipProps = {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  onPress?: () => void;
};
function Chip({ label, iconName, iconBg, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        chipStyles.container,
        pressed && chipStyles.pressed,
      ]}
    >
      <View style={[chipStyles.iconCircle, { backgroundColor: iconBg }]}>
        <Ionicons name={iconName} size={18} color="#fff" />
      </View>

      <View style={chipStyles.labelWrap}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={chipStyles.label}>
          {label}
        </Text>
      </View>

      <View style={chipStyles.chevWrap}>
        <Ionicons name="chevron-forward" size={16} color="#111" />
      </View>
    </Pressable>
  );
}

const chipStyles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F6F6",
    borderRadius: 18,
    minHeight: 56,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    width: "100%",
    overflow: "hidden",
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
  labelWrap: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    marginRight: 6,
  },
  label: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "700",
    color: "#111",
  },
  chevWrap: {
    width: 18,
    alignItems: "flex-end",
    justifyContent: "center",
    flexShrink: 0,
  },
});

/* -----------------------------------------------------
   Screen
----------------------------------------------------- */
type Key = "eligible" | "funding" | "date" | "age" | "location" | "notes";

type ChipItem = {
  key: Key;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  bg: string;
};

export default function GrantDetails() {
  const router = useRouter();
  const [open, setOpen] = useState<null | Key>(null);
  const close = () => setOpen(null);

  const data: ChipItem[] = [
    {
      key: "eligible",
      label: "You’re eligible",
      icon: "checkmark-circle",
      bg: "#3B82F6",
    },
    {
      key: "funding",
      label: "Up to $1950",
      icon: "cash-outline",
      bg: "#22C55E",
    },
    {
      key: "date",
      label: "3 Months Before",
      icon: "calendar-outline",
      bg: "#F59E0B",
    },
    {
      key: "age",
      label: "Gr 10+",
      icon: "person-circle-outline",
      bg: "#F59E0B",
    },
    {
      key: "location",
      label: "Legal Work Permit",
      icon: "home-outline",
      bg: "#F59E0B",
    },
    {
      key: "notes",
      label: "Notes",
      icon: "information-circle-outline",
      bg: "#7B6CF6",
    },
  ];

  const renderItem = ({ item }: ListRenderItemInfo<ChipItem>) => (
    <View style={styles.gridItem}>
      <Chip
        label={item.label}
        iconName={item.icon}
        iconBg={item.bg}
        onPress={() => setOpen(item.key)}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        <Stack.Screen options={{ headerShown: false }} />

        <View style={{ width: "100%", paddingTop: 12 }}>
          {/* Top bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <Pressable onPress={() => router.back()} style={styles.iconBtn}>
              <Ionicons name="chevron-back" size={22} color="#111827" />
            </Pressable>
            <Pressable style={styles.iconBtn}>
              <Ionicons name="bookmark-outline" size={22} color="#6B7280" />
            </Pressable>
          </View>

          {/* Title */}
          <Text style={styles.title}>
            Masonry Institute of BC Training Fund
          </Text>

          {/* Chips grid — robust on iOS/Android/Web */}
          <FlatList
            data={data}
            keyExtractor={(it) => it.key}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 12,
            }}
            scrollEnabled={false}
            contentContainerStyle={{ paddingTop: 4 }}
          />

          {/* About card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              The Masonry Institute of BC has evolved from masonry
              organizations, which have been promoting the local masonry
              industry for over 50 years.
            </Text>
            <View style={{ alignItems: "flex-end", marginTop: 8 }}>
              <Ionicons name="chevron-down" size={18} color="#6B6B6B" />
            </View>
          </View>

          {/* Candidate messages */}
          <View style={{ marginTop: 24, marginBottom: 20 }}>
            <Text style={styles.strong}>You are a strong candidate.</Text>
            <Text style={styles.sub}>
              Your profile is missing some information for this grant
              application.
            </Text>
          </View>

          {/* CTA */}
          <Pressable
            style={styles.cta}
            onPress={() => router.push("/grant-saved-apply")}
          >
            <Text style={styles.ctaText}>Get started</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* MODALS (unchanged) */}
      <ModalPopover
        visible={open === "eligible"}
        onClose={close}
        title="You’re eligible"
        titleIconName="checkmark-circle"
        titleIconBg="#3B82F6"
        titleIconColor="#FFFFFF"
        lines={[
          "You appear to qualify for this grant. Please verify your details in the grant portal to confirm eligibility.",
        ]}
      />
      <ModalPopover
        visible={open === "funding"}
        onClose={close}
        title="Up to $1950"
        titleIconName="cash-outline"
        titleIconBg="#22C55E"
        titleIconColor="#FFFFFF"
        lines={[
          "You can receive up to $1950 to be applied to tuition.",
          "First year masons may be eligible to receive an additional $155 to cover textbook costs.",
        ]}
      />
      <ModalPopover
        visible={open === "date"}
        onClose={close}
        title="3 Months Before"
        titleIconName="calendar-outline"
        titleIconBg="#F59E0B"
        titleIconColor="#FFFFFF"
        lines={[
          "Application to this grant must be received 3 months prior to the month training starts.",
        ]}
      />
      <ModalPopover
        visible={open === "age"}
        onClose={close}
        title="Gr 10+"
        titleIconName="person-circle-outline"
        titleIconBg="#F59E0B"
        titleIconColor="#FFFFFF"
        lines={[
          "You must be minimum in Grade 10 and enrolled in the Trowel Trades Training Association.",
        ]}
      />
      <ModalPopover
        visible={open === "location"}
        onClose={close}
        title="Legal Work Permit"
        titleIconName="home-outline"
        titleIconBg="#F59E0B"
        titleIconColor="#FFFFFF"
        lines={["You must be legally allowed to work in Canada."]}
      />
      <ModalPopover
        visible={open === "notes"}
        onClose={close}
        title="Notes"
        titleIconName="information-circle-outline"
        titleIconBg="#7B6CF6"
        titleIconColor="#FFFFFF"
      >
        <View style={{ marginTop: 4 }}>
          <Text
            style={{
              fontSize: 15,
              lineHeight: 20,
              color: "#0B0B0F",
              fontWeight: "600",
              marginBottom: 8,
            }}
          >
            Successful applicants must be:
          </Text>
          {[
            "Enrolled at the Trowel Trades Training Association",
            "In Level 1, 2, or 3 of their apprenticeship",
            "Priority will be given to applicants who are members of the Masonry Institute of BC",
          ].map((t, i) => (
            <View key={i} style={{ flexDirection: "row", marginBottom: 8 }}>
              <Text
                style={{
                  fontSize: 15,
                  lineHeight: 20,
                  color: "#4B5563",
                  marginRight: 8,
                }}
              >
                {"\u2022"}
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  lineHeight: 20,
                  color: "#4B5563",
                }}
              >
                {t}
              </Text>
            </View>
          ))}
        </View>
      </ModalPopover>

      <BottomNavigation activeTab="grants" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: "800",
    color: "#0B0B0F",
    marginBottom: 16,
  },
  gridItem: {
    flex: 1,
  },
  infoCard: {
    marginTop: 20,
    backgroundColor: "#ECEBFF",
    borderRadius: 12,
    padding: 16,
  },
  infoText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#0B0B0F",
  },
  strong: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    color: "#7B6CF6",
    marginBottom: 4,
  },
  sub: {
    textAlign: "center",
    fontSize: 16,
    color: "#F59E0B",
  },
  cta: {
    marginTop: 8,
    backgroundColor: "#E1882C",
    borderRadius: 28,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
});
