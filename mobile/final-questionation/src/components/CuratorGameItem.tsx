import { View, Pressable } from 'react-native';
import React from 'react';
import { bgMapping } from '@/consts/theme';
import AppText from './AppText';
import AppTextInput from './AppTextInput';
import { FontAwesome5 } from '@expo/vector-icons';

interface ListItmProps {
  currentRound?: number;
  isSetup?: boolean;
}

const CuratorGameItem = ({ currentRound, isSetup }: ListItmProps) => {
  return (
    <View className="my-2">
      <View className="flex flex-row justify-center gap-6">
        <View className="flex flex-col items-end gap-2">
          <AppTextInput
            prefixIcon={() => <FontAwesome5 name="question" color="white" />}
            classes="w-[258px] h-[42px]"
          />
          <AppText className="text-[14px] text-secondary">Round {currentRound}</AppText>
        </View>
        {isSetup && (
          <Pressable
            className={`h-[40px] w-[40px] rounded-full ${bgMapping.secondary} active:shadow-none`}>
            <FontAwesome5 name="pen" size={18} color="white" style={{ margin: 'auto' }} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default CuratorGameItem;
