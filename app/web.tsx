import { Theme } from '@/constants/theme';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function WebOnlyTab() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        style={{ backgroundColor: Theme.colors.white }}
        contentContainerStyle={{ paddingVertical: 48, paddingHorizontal: 20 }}
      >
        <View>
          <Text
            style={[
              Theme.typography.h1,
              { color: Theme.colors.black, marginBottom: 12 },
            ]}
          >
            Web Workspace
          </Text>
          <Text
            style={[
              Theme.typography.body,
              { color: Theme.colors.grayDark, marginBottom: 16 },
            ]}
          >
            This tab stays hidden from the bottom navigation but is reachable by
            typing /web in the browser address bar.
          </Text>
          <Text style={[Theme.typography.body, { color: Theme.colors.black }]}>
            Build any web-only tools or prototypes here without surfacing them
            inside the mobile navigation.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
