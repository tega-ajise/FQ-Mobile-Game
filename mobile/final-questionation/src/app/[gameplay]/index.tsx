import { View, Button, Pressable, FlatList } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Step from '@/components/Step';
import { useGameContext } from '@/hooks/GameProvider';
import AppTextInput from '@/components/AppTextInput';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { bgMapping } from '@/consts/theme';
import AppText from '@/components/AppText';
import CuratorGameItem from '@/components/setup/CuratorGameItem';
import { SETUP_STEPS } from '@/consts/config';
import { GameConfig } from '@/types/types';
import NavigatorGameItem from '@/components/setup/NavigatorGameItem';
import { useAppContext } from '@/hooks/AppProvider';

const RoundOne = () => {
  const router = useRouter();

  const { handleViewChange, globalGameConfig, setupCounts, updateGameConfig, playerRole } =
    useGameContext();
  const { socket, gameState } = useAppContext();

  const stepIdx = gameState
    ? gameState.stepIdx < SETUP_STEPS.length
      ? gameState.stepIdx
      : gameState.stepIdx - 1
    : 0;
  const [stagedListItem, setStagedListItem] = useState<string>('');

  const changeStepActive = useCallback(() => {
    // when change step, update the current lobby about the game state
    const newStep = stepIdx + 1;
    socket
      ?.emitWithAck('nextStep', { ...globalGameConfig, stepIdx: newStep })
      .then((cb) => {
        if (!cb.ok) throw new Error('Could not update view');
      })
      .catch((err) => {
        throw err;
      });
  }, [globalGameConfig, socket, stepIdx]);

  const swapSetupItemsOrder = useCallback(
    (listName: keyof GameConfig, currentIdx: number, offset: number) => {
      const ls = globalGameConfig[listName] as string[];
      const temp = ls[currentIdx];
      ls[currentIdx] = ls[currentIdx + offset];
      ls[currentIdx + offset] = temp;
      updateGameConfig({ [listName]: ls });
    },
    [globalGameConfig, updateGameConfig]
  );

  // 1) only gameState can trigger this useEffect (reason for !gameState upon initial render leading to return)
  // when gameState triggers it, it updates gameConfig, so other player can see candidate/question updates
  // 2) second half of early return if statement checks if globalGameConfig has already been updated
  // it will be updated when stepIdx changes from what it previously was (granted stepIdx is a defined property)

  // UPDATE: remove updateGameConfig entirely --> deal with linting error later
  useEffect(() => {
    if (!gameState) return;
    if (gameState.stepIdx >= SETUP_STEPS.length)
      router.navigate(`/${(gameState as GameConfig)?.lobbyName}/game-loop`);
    else updateGameConfig(gameState as GameConfig);
  }, [gameState, router, playerRole]);

  return (
    <View className="size-full bg-background p-2">
      <Step step="Choose question" currentStep={SETUP_STEPS[stepIdx]} changeStep={changeStepActive}>
        <>
          {(globalGameConfig.roundQuestions ?? []).length <= setupCounts.numberOfQuestions && (
            <View className="relative mr-16 flex flex-col items-end gap-2">
              <AppTextInput
                onChangeText={(txt) => setStagedListItem(txt)}
                value={stagedListItem}
                prefixIcon={() => <FontAwesome5 name="question" size={24} color="white" />}
                classes="w-[310px] h-[81px]"
              />
              <AppText className="text-2xl text-secondary">{`Round ${globalGameConfig.roundQuestions?.length ?? 0}/${setupCounts.numberOfQuestions}`}</AppText>
              <View className="absolute -right-[55px] top-[17%]">
                <Pressable
                  className={`h-[40px] w-[40px] rounded-full ${bgMapping.primary} active:shadow-none`}
                  onPress={() => {
                    const currentQuestions = globalGameConfig.roundQuestions ?? [];
                    const newQuestions = [...currentQuestions, stagedListItem];
                    updateGameConfig({ roundQuestions: newQuestions });
                    setStagedListItem('');
                  }}>
                  <Feather name="check" size={24} color="white" style={{ margin: 'auto' }} />
                </Pressable>
              </View>
            </View>
          )}
          <View className="my-4 w-full border-t border-primary" />
          <FlatList
            data={globalGameConfig.roundQuestions ?? []}
            keyExtractor={(_, index) => `round-$${index}`}
            renderItem={({ index }) => (
              <SetupListItems
                currentStep={stepIdx}
                currentRound={index}
                swapFn={swapSetupItemsOrder}
              />
            )}
            style={{ marginBottom: 'auto' }}
          />
        </>
      </Step>

      <Step
        step="Create candidates list"
        currentStep={SETUP_STEPS[stepIdx]}
        changeStep={changeStepActive}>
        <AppText className="m-4 text-center text-3xl text-accent">
          {globalGameConfig?.roundQuestions?.[0]}
        </AppText>
        {(globalGameConfig.candidates ?? []).length <= setupCounts.numberOfCandidates && (
          <View className="relative mr-16 flex flex-col items-end gap-2">
            <AppTextInput
              onChangeText={(txt) => setStagedListItem(txt)}
              value={stagedListItem}
              prefixIcon={() => <Feather name="star" size={24} color="white" />}
              classes="w-[310px] h-[81px]"
            />
            <AppText className="text-2xl text-secondary">{`Round ${globalGameConfig.candidates?.length ?? 0}/${setupCounts.numberOfCandidates}`}</AppText>
            <View className="absolute -right-[55px] top-[17%]">
              <Pressable
                className={`h-[40px] w-[40px] rounded-full ${bgMapping.primary} active:shadow-none`}
                onPress={() => {
                  const currentCandidates = globalGameConfig.candidates ?? [];
                  const newCandidates = [...currentCandidates, stagedListItem];
                  updateGameConfig({ candidates: newCandidates });
                  setStagedListItem('');
                }}>
                <Feather name="check" size={24} color="white" style={{ margin: 'auto' }} />
              </Pressable>
            </View>
          </View>
        )}
        <View className="my-4 w-full border-t border-primary" />
        <FlatList
          data={globalGameConfig?.candidates ?? []}
          keyExtractor={(_, index) => `choice-${index + 1}`}
          renderItem={({ index }) => (
            <SetupListItems
              currentStep={stepIdx}
              currentRound={index}
              swapFn={swapSetupItemsOrder}
            />
          )}
        />
      </Step>

      <Step step="Rank candidates" currentStep={SETUP_STEPS[stepIdx]} changeStep={changeStepActive}>
        <View className="relative mx-auto flex flex-col items-end gap-2">
          <AppTextInput
            value={globalGameConfig?.roundQuestions?.at(-1)}
            prefixIcon={() => <FontAwesome5 name="question" size={24} color="white" />}
            readOnly
            multiline
          />
          <AppText className="text-2xl text-accent">Final Questionation</AppText>
        </View>
        <View className="my-4 w-full border-t border-primary" />
        <FlatList
          data={globalGameConfig?.candidates ?? []}
          keyExtractor={(_, index) => `ranking-${index + 1}`}
          renderItem={({ index }) => (
            <SetupListItems
              swapFn={swapSetupItemsOrder}
              currentStep={stepIdx}
              currentRound={index}
            />
          )}
        />
      </Step>
      <Button onPress={handleViewChange} title="Handle View Change" />
    </View>
  );
};

const SetupListItems = ({
  currentStep,
  currentRound,
  swapFn,
}: {
  currentStep: number;
  currentRound: number;
  swapFn: (listName: keyof GameConfig, currentIdx: number, offset: number) => void;
}) => {
  switch (currentStep) {
    case 0:
      return (
        <CuratorGameItem
          currentRound={currentRound}
          swap={swapFn.bind(null, 'roundQuestions', currentRound)}
          isSetup
        />
      );
    case 1:
      return (
        <NavigatorGameItem
          choiceNumber={currentRound}
          swap={swapFn.bind(null, 'candidates', currentRound)}
          isSetup
          isNavigator
        />
      );
    case 2:
      const ranking = currentRound;
      return (
        <NavigatorGameItem
          choiceNumber={ranking}
          swap={swapFn.bind(null, 'candidates', ranking)}
          isSetup
        />
      );
    default:
      break;
  }
};

export default RoundOne;
