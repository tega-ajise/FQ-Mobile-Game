import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const lobbies = () => {
  return (
    <View>
      <Text>lobbies</Text>
      <Link href="/existingRoom">
        <Text>Test Lobby Here</Text>
      </Link>
    </View>
  );
};

export default lobbies;
