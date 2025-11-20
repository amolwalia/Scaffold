import { Theme } from "@/constants/theme";
import { useProfile } from "@/contexts/ProfileContext";
import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import EligibilityBanner from "../../components/EligibilityBanner";
import FinishProfileCard from "../../components/FinishProfileCard";
import HeaderGreeting from "../../components/HeaderGreeting";
import SavedGrantRow from "../../components/SavedGrantRow";

export default function HomeTab() {
  const router = useRouter();
  const { profileData } = useProfile();
  const basicFields = [
    profileData.name,
    profileData.dateOfBirth,
    profileData.gender,
    profileData.phone,
    profileData.email,
  ];
  const residenceFields = [
    profileData.address,
    profileData.postalCode,
    profileData.province,
    profileData.citizenshipStatus,
  ];
  const householdFields = [
    profileData.householdSize,
    profileData.familyComposition,
    profileData.annualFamilyNetIncome,
    profileData.guardianName,
    profileData.guardianPhone,
    profileData.guardianEmail,
  ];
  const educationFields = [
    profileData.highestEducation,
    profileData.highSchoolName,
    profileData.graduationDate,
    profileData.tradeSchoolName,
    profileData.tradeProgramName,
    profileData.tradeGraduationDate,
    profileData.trade,
    profileData.apprenticeshipLevel,
  ];
  const totalFields =
    basicFields.length +
    residenceFields.length +
    householdFields.length +
    educationFields.length;
  const filledFields =
    basicFields.filter(Boolean).length +
    residenceFields.filter(Boolean).length +
    householdFields.filter(Boolean).length +
    educationFields.filter(Boolean).length;
  const profilePercent = totalFields ? filledFields / totalFields : 0;
  const headerName = profileData.name?.trim() || "Friend";
  const roleParts = [
    profileData.apprenticeshipLevel?.trim(),
    profileData.trade?.trim(),
  ].filter(Boolean);
  const roleText =
    roleParts.length > 0 ? roleParts.join(" • ") : "Share your apprenticeship";
  const eligible = {
    count: 4,
    total: 7750,
    items: [
      "StrongerBC Future Skills Grant",
      "Youth Work in Trades (WRK) Scholarship",
      "LNG Canada Trades Training Fund",
      "Masonry Institute of BC Training Fund",
    ],
    icons: [
      require("../../assets/images/workBC.png"),
      require("../../assets/images/workBC.png"),
      require("../../assets/images/LNG.png"),
      require("../../assets/images/Masonry.png"),
    ],
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        style={{ backgroundColor: Theme.colors.white }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 25, paddingBottom: 120 }}
      >
        {/* phone-width canvas for web parity */}
        <View className="w-full px-5 mx-auto">
          <HeaderGreeting
            name={headerName}
            role={roleText}
            onBellPress={() => router.push("/notifications")}
          />

          <EligibilityBanner
            count={eligible.count}
            grants={eligible.items}
            total={eligible.total}
            icons={eligible.icons}
          />

          <View style={{ marginTop: 12 }}>
            <SavedGrantRow
              label="Explore your eligible grants now"
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/grants",
                  params: { tab: "Eligible" },
                })
              }
            />
          </View>

          <Text
            style={[
              Theme.typography.h2,
              { color: Theme.colors.black, marginTop: 27, marginBottom: 14 },
            ]}
          >
            Finish your profile!
          </Text>
          <FinishProfileCard
            percent={profilePercent}
            ctaLabel={profilePercent >= 1 ? "Profile Complete" : "Continue Profile"}
            onPress={() => router.push("/(tabs)/profile")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
