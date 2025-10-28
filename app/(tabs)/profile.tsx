// app/(tabs)/profile.tsx
import { View, Text } from "react-native";

export default function Profile() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Profile</Text>
      <Text style={{ marginTop: 8, textAlign: "center" }}>
        Coming soon — this tab is just a placeholder for now.
      </Text>
    </View>
  );
}
