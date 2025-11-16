import { Theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
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
    icons: [
      require('../../assets/images/workBC.png'),
      require('../../assets/images/workBC.png'),
      require('../../assets/images/LNG.png'),
      require('../../assets/images/Masonry.png'),
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
            name={user.name}
            role={user.role}
            onBellPress={() => router.push('/notifications')}
          />

          <EligibilityBanner
            count={eligible.count}
            grants={eligible.items}
            total={eligible.total}
            icons={eligible.icons}
          />

          <View style={{ marginTop: 12 }}>
            <SavedGrantRow label="Explore your eligible grants now" />
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
