import { SafeAreaView, ScrollView, Text, View } from "react-native";
import ApplicationProgressCard from "../../components/ApplicationProgressCard";
import EligibilityBanner from "../../components/EligibilityBanner";
import FinishProfileCard from "../../components/FinishProfileCard";
import HeaderGreeting from "../../components/HeaderGreeting";
import SavedGrantRow from "../../components/SavedGrantRow";

export default function HomeTab() {
  const user = { name: "Mateo Alvarez", role: "Apprentice Electrician" };
  const eligible = {
    count: 4,
    total: 7750,
    items: [
      "StrongerBC Future Skills Grant",
      "Youth Work in Trades (WRK) Scholarship",
      "LNG Canada Trades Training Fund",
      "Masonry Institute of BC Training Fund",
    ],
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="bg-white"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 120 }}
      >
        {/* phone-width canvas for web parity */}
        <View className="w-full max-w-[390px] px-5 mx-auto">
          <HeaderGreeting name={user.name} role={user.role} />

          <EligibilityBanner
            count={eligible.count}
            grants={eligible.items}
            total={eligible.total}
          />

          <Text className="mb-3 text-xl font-extrabold text-gray-900">
            Application Tracker
          </Text>

          <ApplicationProgressCard
            title="StrongerBC Future Skills Grants"
            logoUri="https://upload.wikimedia.org/wikipedia/en/7/7a/WorkBC_logo.png"
            totalSteps={5}
            currentStep={3}
          />

          <View className="mt-3">
            <SavedGrantRow label="Apply to your saved grant" />
          </View>

          <Text className="mb-3 text-xl font-extrabold text-[#0B0B0F]">
            Finish your profile!
          </Text>
          <FinishProfileCard
            percent={0.4}
            ctaLabel="Education Information"
            onPress={() => {
              /* navigate */
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
