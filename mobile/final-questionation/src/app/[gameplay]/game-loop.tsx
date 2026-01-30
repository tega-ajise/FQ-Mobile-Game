import { View, Text } from 'react-native';
import React from 'react';

const RoundDeetsGoHere = () => {
  // first thing that needs to be done is copying over globalGameConfig

  return (
    <View>
      <Text className="text-3xl">The Common View. Read Only for the Curator</Text>
      <Text>Ranking & Questions conditionally shown for the Curator</Text>
    </View>
  );
};

export default RoundDeetsGoHere;
