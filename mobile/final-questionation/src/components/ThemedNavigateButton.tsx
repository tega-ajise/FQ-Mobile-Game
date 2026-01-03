import { Pressable, View } from 'react-native';
import React from 'react';
import { HrefObject, Link } from 'expo-router';
import AppText from './AppText';
import { bgMapping } from '@/consts/theme';
import { useGameContext } from '@/hooks/GameProvider';

interface Props {
  text?: string;
  route: string | HrefObject;
  style: 'primary' | 'secondary' | 'howToPlay';
  icon?: () => React.ReactNode;
}

const ThemedNavigateButton = ({ text, route, style, icon }: Props) => {
  const { globalGameConfig } = useGameContext();

  return (
    <Link asChild href={route}>
      <Pressable
        className={`m-auto h-[75px] w-[315px] rounded-xl ${bgMapping[style]} active:shadow-none`}
        onPress={() => console.log(globalGameConfig)}>
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
