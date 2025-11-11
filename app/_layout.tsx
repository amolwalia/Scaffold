import { useEffect } from 'react';
import { Text, TextInput } from 'react-native';

import { ProfileProvider } from '@/contexts/ProfileContext';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import './global.css';

SplashScreen.preventAutoHideAsync().catch(() => {
  /** ignore splash errors during development */
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  useEffect(() => {
    if (!fontsLoaded) {
      return;
    }

    const applyGlobalFont = (DefaultComponent: any) => {
      const defaultProps = DefaultComponent?.defaultProps ?? {};

      const existingStyle = defaultProps.style;
      const styleArray = Array.isArray(existingStyle)
        ? existingStyle
        : existingStyle
          ? [existingStyle]
          : [];

      DefaultComponent.defaultProps = {
        ...defaultProps,
        style: [...styleArray, { fontFamily: 'Montserrat-Regular' }],
      };
    };

    applyGlobalFont(Text);
    applyGlobalFont(TextInput);

    SplashScreen.hideAsync().catch(() => {
      /** ignore hide errors */
    });
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ProfileProvider>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
      </Stack>
    </ProfileProvider>
  );
}
