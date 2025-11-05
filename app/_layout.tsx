import { ProfileProvider } from "@/contexts/ProfileContext";
import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
    <ProfileProvider>
      <Stack screenOptions={{ contentStyle: { backgroundColor: "#FFFFFF" } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* other stacks can keep their headers */}
      </Stack>
    </ProfileProvider>
  );
}
