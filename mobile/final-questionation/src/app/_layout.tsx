import { LuckiestGuy_400Regular, useFonts } from '@expo-google-fonts/luckiest-guy';
import { SplashScreen, Stack } from 'expo-router';
import '../../global.css';
import SafeScreen from '@/components/SafeScreen';
import GameProvider from '@/hooks/GameProvider';
import AppProvider from '@/hooks/AppProvider';

/** NAVIGATION CONCEPTS:
 * Recall - a (tabgroup) name does NOT get included in the route of a screen – does not impact the route
 * a directory/file name DOES get included in path of a screen tho – static route – url matches exactly as it is in tree
 * Everything in the app directory will have a route
 */

/** Load fonts in this file – use expo-fonts package */
/**
 * @returns const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
 */
export default function RootLayout() {
  const [fontLoaded] = useFonts({
    LuckiestGuy_400Regular,
  });

  if (!fontLoaded) return null;

  SplashScreen.hideAsync();

  return (
    <AppProvider>
      <GameProvider>
        <SafeScreen>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: '#1C0F04',
              },
            }}>
            {/** once the user clicks "start game", they should not be able to navigate back (pop the screen off the stack) */}
            {/** the gameplay navigator should "override" the root navigator – current solution, if there's a better one use that */}
            <Stack.Screen
              name="[gameplay]"
              options={{ headerBackVisible: false, gestureEnabled: false }}
            />
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </SafeScreen>
      </GameProvider>
    </AppProvider>
  );
}
