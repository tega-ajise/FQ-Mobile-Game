import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const setup = () => {
  return (
    <View>
      <Text>setup</Text>
      <Link href="/existingRoom">
        <Text>Start game</Text>
      </Link>
    </View>
  );
};

export default setup;
