import "./global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#FFFFFF" } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* other stacks can keep their headers */}
    </Stack>
  );
}
