import { View } from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';
import ThemedNavigateButton from '@/components/ThemedNavigateButton';
import { Feather } from '@expo/vector-icons';
import AppText from '@/components/AppText';
import CustomRadio from '@/components/CustomRadio';
import { useGameContext } from '@/hooks/GameProvider';
import AppTextInput from '@/components/AppTextInput';

const Setup = () => {
  const { playerRole, setPlayerRole } = useGameContext();

  return (
    <View className="flex-1 bg-background">
      <View className="m-auto">
        <AppText className="text-center text-2xl text-secondary">Create Lobby Name</AppText>
        <AppTextInput classes="h-[73px] w-[280px]" />
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
        />
      </View>
      <View>
        <AppText className="text-center text-[24px] text-secondary">Role</AppText>
        <CustomRadio
          options={[
            { label: 'Navigator', value: 'navigator' },
            { label: 'Curator', value: 'curator' },
          ]}
          onChange={(value) => setPlayerRole(value)}
          checkedValue={playerRole}
        />
      </View>
      <ThemedNavigateButton
        text="Start Game"
        icon={() => <Feather name="play" size={24} color="white" />}
        route="/"
        style="primary"
      />
    </View>
  );
};

export default Setup;
