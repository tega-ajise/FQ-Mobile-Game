import { View, Text } from 'react-native';
import React from 'react';

const WaitingScreen = ({ isLobbyScreen }: { isLobbyScreen?: boolean }) => {
  return (
    <View>
      <Text>{`Waiting for ${isLobbyScreen ? 'Lobbies to be added' : "other player's turn"}`}</Text>
    </View>
  );
};

export default WaitingScreen;
