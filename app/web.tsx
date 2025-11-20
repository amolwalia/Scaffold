import ApplicationTemplet from '@/components/ApplicationTemplet';
import { Theme } from '@/constants/theme';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function WebOnlyTab() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        style={{ backgroundColor: Theme.colors.white }}
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20 }}
      >
        <View>
          <Text
            style={[
              Theme.typography.h1,
              { color: Theme.colors.black, marginBottom: 12 },
            ]}
          >
            Web Supplement
          </Text>
          <ApplicationTemplet />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
