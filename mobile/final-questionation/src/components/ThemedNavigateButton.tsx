import { Pressable, View } from 'react-native';
import React from 'react';
import { HrefObject, Link } from 'expo-router';
import AppText from './AppText';

interface Props {
  text?: string;
  route: string | HrefObject;
  style: 'primary' | 'secondary' | 'howToPlay';
  icon?: () => React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const homeBgMapping = {
  primary: 'bg-btnprimary shadow-[0px_4.6px_0px_rgba(40,118,40,1)]',
  secondary: 'bg-btnsecondary shadow-[0px_4.6px_0px_rgba(239,64,6,1)]',
  howToPlay: 'bg-instructions shadow-[0px_4.6px_0px_rgba(31,27,25,1)]',
};

const ThemedNavigateButton = ({ text, route, style, icon, onClick, disabled = false }: Props) => {
  return (
    <Link asChild href={route}>
      <Pressable
        className={`m-auto h-[75px] w-[315px] rounded-xl ${homeBgMapping[style]} active:shadow-none disabled:opacity-50`}
        disabled={disabled}
        onPress={onClick}>
        <View className="flex-1 flex-col justify-center">
          <View className="flex-row justify-center gap-2">
            {icon?.()}
            <AppText className="text-center text-4xl text-primary">{text}</AppText>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default ThemedNavigateButton;
