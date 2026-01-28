import { View } from 'react-native';
import React, { useState } from 'react';
import Slider from '@react-native-community/slider';
import ThemedNavigateButton from '@/components/ThemedNavigateButton';
import { Feather } from '@expo/vector-icons';
import AppText from '@/components/AppText';
import CustomRadio from '@/components/setup/CustomRadio';
import { useGameContext } from '@/hooks/GameProvider';
import AppTextInput from '@/components/AppTextInput';
import { useAppContext } from '@/hooks/AppProvider';
import { useRouter } from 'expo-router';

const Setup = () => {
  const { playerRole, updateGameConfig, globalGameConfig, setSetupCounts, setupCounts } =
    useGameContext();
  const { socket } = useAppContext();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>(playerRole.current ?? 'navigator'); // just for the visual change (the useRef in the provider stores the change under the hood)

  async function createLobby() {
    const res = await socket?.emitWithAck('newRoom', {
      lobbyName: globalGameConfig.lobbyName,
      role: selectedRole,
      ...setupCounts,
    });
    if (!res.ok) {
      router.back();
      throw new Error('Failed to create lobby \n' + globalGameConfig);
    }
  }

  return (
    <View className="flex-1 bg-background">
      <View className="m-auto">
        <AppText className="text-center text-2xl text-secondary">Create Lobby Name</AppText>
        <AppTextInput
          classes="h-[73px] w-[280px]"
          onChangeText={(txt) => updateGameConfig({ lobbyName: txt })}
        />
      </View>
      <View className="m-auto">
        <AppText className="text-center text-[24px] text-secondary">Rounds of Questions</AppText>
        <Slider
          style={{ width: 315, height: 60 }}
          minimumValue={3}
          maximumValue={6}
          minimumTrackTintColor="#FF6633"
          maximumTrackTintColor="#44240C"
          step={1}
          renderStepNumber
          value={setupCounts.numberOfQuestions}
          onValueChange={(value) =>
            setSetupCounts((prev) => ({ ...prev, numberOfQuestions: value }))
          }
        />
      </View>
      <View className="m-auto">
        <AppText className="text-center text-[24px] text-secondary">Number of Candidates</AppText>
        <Slider
          style={{ width: 315, height: 60 }}
          minimumValue={6}
          maximumValue={10}
          minimumTrackTintColor="#FF6633"
          maximumTrackTintColor="#44240C"
          step={1}
          renderStepNumber
          value={setupCounts.numberOfCandidates}
          onValueChange={(value) =>
            setSetupCounts((prev) => ({ ...prev, numberOfCandidates: value }))
          }
        />
      </View>
      <View>
        <AppText className="text-center text-[24px] text-secondary">Role</AppText>
        <CustomRadio
          options={[
            { label: 'Navigator', value: 'navigator' },
            { label: 'Curator', value: 'curator' },
          ]}
          onChange={(value) => {
            setSelectedRole(value);
            playerRole.current = value;
          }}
          checkedValue={selectedRole}
        />
      </View>
      <ThemedNavigateButton
        text="Start Game"
        icon={() => <Feather name="play" size={24} color="white" />}
        route={{ pathname: '/[gameplay]', params: { gameplay: globalGameConfig?.lobbyName ?? '' } }}
        style="primary"
        onClick={createLobby}
        disabled={!globalGameConfig.lobbyName || !playerRole}
      />
    </View>
  );
};

export default Setup;
