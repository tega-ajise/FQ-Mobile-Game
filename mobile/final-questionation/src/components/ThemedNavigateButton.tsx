import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { HrefObject, Link } from 'expo-router';

interface Props {
  text: string;
  route: string | HrefObject;
  style?: object;
}

const ThemedNavigateButton = ({ text, route }: Props) => {
  return (
    <Link asChild href={route}>
      <TouchableOpacity>
        <Text>{text}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default ThemedNavigateButton;
