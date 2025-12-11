import { StatusBar } from 'expo-status-bar';

import '../../global.css';
import { View } from 'react-native';
import ThemedNavigateButton from '@/components/ThemedNavigateButton';

export default function App() {
  return (
    <>
      <View>
        <ThemedNavigateButton route="/setup" text="New Game" />
        <ThemedNavigateButton route="/lobbies" text="Existing Game" />
        <ThemedNavigateButton route="/instructions" text="Instructions" />
      </View>
      <StatusBar style="auto" />
    </>
  );
}
