import { View, Pressable, TextInput, TextProps } from 'react-native';
import React, { useRef, useState } from 'react';
import { bgMapping } from '@/consts/theme';
import AppTextInput from '../AppTextInput';
import { Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useGameContext } from '@/hooks/GameProvider';
import AppText from '../AppText';
import { useAppContext } from '@/hooks/AppProvider';
import { GameLoopState } from '@/types/types';

interface ListItmProps {
  choiceNumber: number;
  val?: string;
  isSetup?: boolean;
  swap?: (offset: number) => void;
  crossedItemState?: [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>];
  textBoxProps?: TextProps;
}

const NavigatorGameItem = ({
  choiceNumber,
  isSetup,
  swap,
  val,
  crossedItemState,
  textBoxProps,
}: ListItmProps) => {
  const { globalGameConfig, updateGameConfig, playerRole } = useGameContext();
  const { gameState } = useAppContext();

  const [canEdit, setCanEdit] = useState(false);
  const [currentlyCrossedItem, setCurrentlyCrossedItem] = crossedItemState || [null, null]; // for navigator in game loop, to handle changes for selecting items to eliminate

  /** Determining crossed out items for game loop */
  const currentItemData = (gameState as GameLoopState)?.candidates?.find((v) => v.content === val); // need to do this instead of using choiceNumber to find value
  const hasCrossedOut = currentlyCrossedItem === val;
  const isEliminated = currentItemData?.isEliminated || hasCrossedOut;

  /** For setup */
  const isNavigator = playerRole.current === 'navigator';
  const ranking = choiceNumber + 1;
  const textRef = useRef<TextInput>(null);

  return (
    <View className="my-4">
      <View className="flex flex-row justify-center gap-6">
        {!isNavigator && (globalGameConfig.candidates ?? [])?.length > 1 && isSetup && (
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
          ref={textRef} // supposed to be for the "automatically enable cursor feature when pressing the "edit" icon in setup - might remove"
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
          classes={`w-[258px] ${isEliminated && 'opacity-40'}`}
          textClasses="text-md"
          value={val ?? globalGameConfig?.candidates?.[choiceNumber]} // "val" is just the explicit value for the game loop
          multiline
          readOnly={!canEdit || !isNavigator}
          {...(isNavigator && {
            onChangeText: (txt) => {
              const prevCandidates = globalGameConfig.candidates ?? [];
              prevCandidates[choiceNumber] = txt;
              updateGameConfig({ candidates: prevCandidates });
            },
            onBlur: () => setCanEdit(false),
            ...textBoxProps,
          })}
        />
        {isNavigator && (
          <Pressable
            className={`h-[40px] w-[40px] rounded-full ${bgMapping.secondary} active:shadow-none`}
            onPress={
              isSetup
                ? () => {
                    textRef?.current?.focus();
                    setCanEdit(true);
                  }
                : () => {
                    setCurrentlyCrossedItem?.(val);
                  }
            }>
            {isSetup ? (
              <FontAwesome5 name="pen" size={18} color="white" style={{ margin: 'auto' }} />
            ) : (
              <Feather name="x" size={24} color="white" style={{ margin: 'auto' }} />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default NavigatorGameItem;
