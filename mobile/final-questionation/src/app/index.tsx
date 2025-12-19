import { StatusBar } from 'expo-status-bar';

import { View, Image } from 'react-native';
import ThemedNavigateButton from '@/components/ThemedNavigateButton';
import AppText from '@/components/AppText';
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function App() {
  return (
    <View className="bg-background flex-1">
      <View className="relative">
        <Image
          source={require('../../assets/fq_logo.png')}
          style={{
            height: 300,
            width: 386,
          }}
        />
        <AppText className="absolute top-1/3 m-auto text-center text-6xl text-white">
          Final Questionation
        </AppText>
      </View>
      <View className="mt-12 flex-col gap-8">
        <ThemedNavigateButton
          route="/setup"
          text="New Game"
          style="primary"
          icon={() => <Feather name="play" size={24} color="white" />}
        />
        <ThemedNavigateButton
          route="/lobbies"
          text="Existing Game"
          style="secondary"
          icon={() => <MaterialCommunityIcons name="account-multiple" size={24} color="white" />}
        />
        <ThemedNavigateButton
          route="/instructions"
          text="Instructions"
          style="howToPlay"
          icon={() => <FontAwesome5 name="book-open" size={24} color="white" />}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
