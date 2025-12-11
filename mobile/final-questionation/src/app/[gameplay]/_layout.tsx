import GameProvider from '@/hooks/GameProvider';
import { Slot } from 'expo-router';

export default function RootGameplay() {
  // put a header (exit game) and footer (misc information)
  // the parameter of this layout group is the LOBBY ID/LOBBY NAME/ROOM ID (however this will be handled)
  return (
    <GameProvider>
      <Slot />
    </GameProvider>
  );
}
