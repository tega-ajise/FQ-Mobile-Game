import { View } from 'react-native';
import { Slot } from 'expo-router';

export default function RootGameplay() {
  // put a header (exit game) and footer (misc information)
  // the parameter of this layout group is the LOBBY NAME
  return (
    <View className="flex-1 bg-background">
      <Slot />
    </View>
  );
}
