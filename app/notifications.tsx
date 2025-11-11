import { SafeAreaView, View, Text, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import NotificationListItem from '../components/NotificationListItem';
import EyeIcon from '../components/icons/EyeIcon';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    eyebrow: 'Youth Work in Trades (WRK) Scholarship',
    title: 'View your status!',
    subtitle: 'You’ve heard back!',
  },
  {
    id: '2',
    eyebrow: 'StrongerBC Future Skills Grants',
    title: 'Application closes in 3 days!',
    subtitle: 'Finish applying now',
  },
];

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center pt-[30px] pr-[20px] pl-[20px] pb-[30px]">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back-outline" size={20} color="#1F2937" />
        </Pressable>
        <Text className="ml-[22px] text-[24px] font-montserrat-bold text-[#111827]">
          Notifications
        </Text>
      </View>

      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="h-0" />}
        renderItem={({ item, index }) => (
          <NotificationListItem
            eyebrow={item.eyebrow}
            title={item.title}
            subtitle={item.subtitle}
            onPress={() => {
              // TODO: hook up to detail screen
            }}
            rightAccessory={index === 0 ? <EyeIcon size={38} /> : undefined}
          />
        )}
      />
    </SafeAreaView>
  );
}
