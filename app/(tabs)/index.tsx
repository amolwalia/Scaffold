import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import EligibilityBanner from '../../components/EligibilityBanner';
import FinishProfileCard from '../../components/FinishProfileCard';
import HeaderGreeting from '../../components/HeaderGreeting';
import SavedGrantRow from '../../components/SavedGrantRow';

export default function HomeTab() {
  const router = useRouter();
  const user = { name: 'Mateo Alvarez', role: 'Apprentice Electrician' };
  const eligible = {
    count: 4,
    total: 7750,
    items: [
      'StrongerBC Future Skills Grant',
      'Youth Work in Trades (WRK) Scholarship',
      'LNG Canada Trades Training Fund',
      'Masonry Institute of BC Training Fund',
    ],
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="bg-white"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 25, paddingBottom: 120 }}
      >
        {/* phone-width canvas for web parity */}
        <View className="w-full px-5 mx-auto">
          <HeaderGreeting
            name={user.name}
            role={user.role}
            onBellPress={() => router.push('/notifications')}
          />

          <EligibilityBanner
            count={eligible.count}
            grants={eligible.items}
            total={eligible.total}
          />

          <View className="mt-[12px]">
            <SavedGrantRow label="Explore your eligible grants now" />
          </View>

          <Text className="mb-3 mt-6 text-[22px] font-montserrat-bold text-[#000000]">
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
