import { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import InfoChip from "../components/InfoChip";
import ModalPopover from "../components/ModalPopover";

export default function GrantDetails() {
  const router = useRouter();
  const [open, setOpen] = useState<
    null | "eligible" | "funding" | "date" | "age" | "location" | "notes"
  >(null);
  const close = () => setOpen(null);

  return (
    <SafeAreaView className="flex-1 bg-white font-mont">
      <ScrollView
        className="bg-white"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="w-full max-w-[390px] mx-auto px-5 pt-3">
          {/* Top bar */}
          <View className="flex-row items-center justify-between mb-4">
            <Pressable
              onPress={() => router.back()}
              className="h-9 w-9 items-center justify-center"
            >
              <Ionicons name="chevron-back" size={22} color="#111827" />
            </Pressable>
            <Pressable className="h-9 w-9 items-center justify-center">
              <Ionicons name="bookmark-outline" size={22} color="#6B7280" />
            </Pressable>
          </View>

          {/* Title */}
          <Text className="text-[26px] leading-[30px] font-montExtra text-[#0B0B0F] mb-4">
            Masonry Institute of BC Training Fund
          </Text>

          {/* Chips grid (2 columns) */}
          <View className="grid grid-cols-2 gap-3">
            <InfoChip
              label="You’re eligible"
              iconName="checkmark-circle"
              iconColor="#3B82F6"
              iconBg="#E5F0FF"
              onPress={() => setOpen("eligible")}
            />
            <InfoChip
              label="Up to $1950"
              iconName="cash-outline"
              iconColor="#22C55E"
              iconBg="#E6F9EC"
              onPress={() => setOpen("funding")}
            />
            <InfoChip
              label="3 Months Before"
              iconName="calendar-outline"
              iconColor="#F59E0B"
              iconBg="#FEF3E7"
              onPress={() => setOpen("date")}
            />
            <InfoChip
              label="Gr 10+"
              iconName="person-circle-outline"
              iconColor="#F59E0B"
              iconBg="#FEF3E7"
              onPress={() => setOpen("age")}
            />
            <InfoChip
              label="Legal Work Permit"
              iconName="home-outline"
              iconColor="#F59E0B"
              iconBg="#FEF3E7"
              onPress={() => setOpen("location")}
            />
            <InfoChip
              label="Notes"
              iconName="information-circle-outline"
              iconColor="#7B6CF6"
              iconBg="#ECEBFF"
              onPress={() => setOpen("notes")}
            />
          </View>

          {/* About card */}
          <View className="mt-5 rounded-[10px] bg-[#ECEBFF] px-4 py-4">
            <Text className="text-[15px] leading-[20px] text-[#0B0B0F]">
              The Masonry Institute of BC has evolved from masonry
              organizations, which have been promoting the local masonry
              industry for over 50 years.
            </Text>
            <View className="items-end mt-2">
              <Ionicons name="chevron-down" size={18} color="#6B6B6B" />
            </View>
          </View>

          {/* Candidate messages */}
          <View className="mt-8 mb-5">
            <Text className="text-center text-[18px] font-montExtra text-[#7B6CF6] mb-1">
              You are a strong candidate.
            </Text>
            <Text className="text-center text-[16px] text-[#F59E0B]">
              Your profile is missing some information for this grant
              application.
            </Text>
          </View>

          {/* CTA */}
          <Pressable
            className="h-[56px] rounded-full items-center justify-center"
            style={{ backgroundColor: "#E1882C" }}
          >
            <Text className="text-[18px] font-montSemi text-black">
              Get started
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* MODALS */}
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
        <View className="mt-1">
          <Text className="text-[15px] leading-[20px] text-[#0B0B0F] font-montSemi mb-2">
            Successful applicants must be:
          </Text>
          {[
            "Enrolled at the Trowel Trades Training Association",
            "In Level 1, 2, or 3 of their apprenticeship",
            "Priority will be given to applicants who are members of the Masonry Institute of BC",
          ].map((t, i) => (
            <View key={i} className="flex-row mb-2">
              <Text className="text-[15px] leading-[20px] text-[#4B5563] mr-2">
                {"\u2022"}
              </Text>
              <Text className="flex-1 text-[15px] leading-[20px] text-[#4B5563]">
                {t}
              </Text>
            </View>
          ))}
        </View>
      </ModalPopover>
    </SafeAreaView>
  );
}
