import { View, Pressable, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import { bgMapping } from '@/consts/theme';
import AppTextInput from '../AppTextInput';
import { Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useGameContext } from '@/hooks/GameProvider';
import AppText from '../AppText';

interface ListItmProps {
  choiceNumber: number;
  isSetup?: boolean;
  swap?: (offset: number) => void;
  isNavigator?: boolean;
}

const NavigatorGameItem = ({ choiceNumber, isSetup, swap, isNavigator }: ListItmProps) => {
  const { globalGameConfig, updateGameConfig } = useGameContext();
  const [canEdit, setCanEdit] = useState(false);
  const ranking = choiceNumber + 1;
  const textRef = useRef<TextInput>(null);

  return (
    <View className="my-4">
      <View className="flex flex-row justify-center gap-6">
        {!isNavigator && (globalGameConfig.candidates ?? [])?.length > 1 && (
          <View>
            {choiceNumber === 0 ? (
              <Pressable className="translate-y-2" onPress={() => swap?.(1)}>
                <Entypo name="chevron-down" size={24} color="white" />
              </Pressable>
            ) : choiceNumber < (globalGameConfig.candidates?.length ?? 1) - 1 ? (
              <>
                <Pressable onPress={() => swap?.(-1)}>
                  <Entypo name="chevron-up" size={24} color="white" />
                </Pressable>
                <Pressable onPress={() => swap?.(1)}>
                  <Entypo name="chevron-down" size={24} color="white" />
                </Pressable>
              </>
            ) : (
              <Pressable className="translate-y-2.5" onPress={() => swap?.(-1)}>
                <Entypo name="chevron-up" size={24} color="white" />
              </Pressable>
            )}
          </View>
        )}
        <AppTextInput
          ref={textRef}
          prefixIcon={() =>
            isNavigator ? (
              <Feather name="star" size={24} color="white" />
            ) : (
              <AppText
                className={`translate-y-1 text-xl ${ranking === 1 ? 'text-accent' : 'text-primary'}`}>
                {ranking}
              </AppText>
            )
          }
          classes="w-[258px]"
          textClasses="text-md"
          value={globalGameConfig?.candidates?.[choiceNumber]}
          multiline
          readOnly={!canEdit || !isNavigator}
          {...(isNavigator && {
            onChangeText: (txt) => {
              const prevCandidates = globalGameConfig.candidates ?? [];
              prevCandidates[choiceNumber] = txt;
              updateGameConfig({ candidates: prevCandidates });
            },
            onBlur: () => setCanEdit(false),
          })}
        />
        {isNavigator && isSetup && (
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

export default NavigatorGameItem;
