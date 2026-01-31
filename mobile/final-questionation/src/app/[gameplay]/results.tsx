import { FontAwesome5 } from '@expo/vector-icons';
import { View } from 'react-native';
import React from 'react';
import { useAppContext } from '@/hooks/AppProvider';
import AppTextInput from '@/components/AppTextInput';
import AppText from '@/components/AppText';

const Results = () => {
  const { gameState } = useAppContext();

  const FINAL_ROUND = gameState?.stepIdx ?? (gameState?.roundQuestions ?? []).length - 1; // this value should be the last index of the round questions (3 in my test examples)

  return (
    <View className="flex-1 bg-background p-6">
      <View className="mx-auto flex flex-col items-end gap-2">
        <AppTextInput
          value={gameState?.roundQuestions?.[FINAL_ROUND] ?? ''}
          prefixIcon={() => <FontAwesome5 name="question" size={24} color="white" />}
          classes="w-[310px] h-[81px] mx-auto"
        />
        <AppText className="text-2xl text-accent">Final Questionation</AppText>
      </View>
    </View>
  );
};

export default Results;
