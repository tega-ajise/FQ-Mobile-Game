import { View, Pressable, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import { bgMapping } from '@/consts/theme';
import AppText from './AppText';
import AppTextInput from './AppTextInput';
import { FontAwesome5 } from '@expo/vector-icons';
import { useGameContext } from '@/hooks/GameProvider';

interface ListItmProps {
  currentRound: number;
  isSetup?: boolean;
}

const CuratorGameItem = ({ currentRound, isSetup }: ListItmProps) => {
  const { globalGameConfig, updateGameConfig } = useGameContext();
  const [canEdit, setCanEdit] = useState(false);

  const textRef = useRef<TextInput>(null);

  return (
    <View className="my-4">
      <View className="flex flex-row justify-center gap-6">
        <View className="flex flex-col items-end gap-2">
          <AppTextInput
            ref={textRef}
            prefixIcon={() => <FontAwesome5 name="question" color="white" />}
            classes="w-[258px]"
            textClasses="text-md"
            value={globalGameConfig?.roundQuestions?.[currentRound]}
            onChangeText={(txt) => {
              const prevQuestions = globalGameConfig.roundQuestions ?? [];
              prevQuestions[currentRound] = txt;
              updateGameConfig({ roundQuestions: prevQuestions });
            }}
            multiline
            onBlur={() => setCanEdit(false)}
            readOnly={!canEdit}
          />
          <AppText className="text-[14px] text-secondary">Round {currentRound}</AppText>
        </View>
        {isSetup && (
          <Pressable
            className={`h-[40px] w-[40px] rounded-full ${bgMapping.secondary} active:shadow-none`}
            onPress={() => {
              textRef?.current?.focus();
              setCanEdit(true);
            }}>
            <FontAwesome5 name="pen" size={18} color="white" style={{ margin: 'auto' }} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default CuratorGameItem;
