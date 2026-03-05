import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import AppTextInput from '@/components/AppTextInput';
import { useGameContext } from '@/hooks/GameProvider';
import NavigatorGameItem from '@/components/setup/NavigatorGameItem';
import { shuffle } from '@/utils/arrShuffling';
import AppText from '@/components/AppText';
import { bgMapping } from '@/consts/theme';
import { useAppContext } from '@/hooks/AppProvider';
import { GameLoopState } from '@/types/types';
import { Redirect } from 'expo-router';

const RoundDeetsGoHere = () => {
  // For the curator: need a button that pulls up the questions , highlighting the current question (View Questions btn)
  // For both: Submit button should index to highlighting the next question
  // For navigator: either pass in function to "cross out" list items OR handle it in <NavigatorGameItem />
  // first thing that needs to be done is copying over globalGameConfig
  const { playerRole } = useGameContext();
  const { gameState, socket } = useAppContext();
  const crossedItemState = useState<string | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const currentRound = gameState?.stepIdx ?? 0;

  const candidatesData = useMemo(
    () =>
      playerRole.current === 'navigator'
        ? shuffle((gameState as GameLoopState)?.candidates)
        : ((gameState as GameLoopState)?.candidates ?? []),
    [gameState, playerRole]
  );

  // MEANS WE MOVE ON TO FINAL QUESTIONATION
  if (currentRound === (gameState?.roundQuestions ?? [])?.length - 1) {
    return <Redirect href={`/${gameState?.lobbyName}/results`} />;
  }

  return (
    <View className="flex-1 p-6">
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsModalVisible(!isModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={gameState?.roundQuestions}
              renderItem={({ item, index }) => (
                <Text>
                  {`Round ${index}: ${item}`}
                  {index === currentRound && ' (Current Round)'}
                </Text>
              )}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsModalVisible(false)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <AppTextInput
        value={gameState?.roundQuestions?.[currentRound] ?? ''}
        prefixIcon={() => <FontAwesome5 name="question" size={24} color="white" />}
        classes="w-[310px] h-auto mx-auto"
        multiline
      />
      <View className="my-8 w-full border border-t-primary" />
      <FlatList
        data={candidatesData}
        className="flex-1"
        keyExtractor={(_, idx) => `Order-Number-${idx}`}
        renderItem={({ item, index }) => (
          <NavigatorGameItem
            choiceNumber={index}
            key={index}
            val={item.content}
            crossedItemState={crossedItemState}
          />
        )}
      />
      <Pressable
        className={`mx-auto mt-2 h-[70px] w-[240px] rounded-xl ${playerRole.current === 'navigator' ? bgMapping.primary : bgMapping.secondary} overflow-visible active:shadow-none disabled:opacity-50`}
        onPress={
          playerRole.current === 'navigator'
            ? () => {
                crossedItemState[1](''); // reset after every round
                socket?.emit('eliminateItem', {
                  lobbyName: gameState?.lobbyName,
                  value: crossedItemState[0],
                });
              }
            : () => setIsModalVisible(true)
        }
        disabled={playerRole.current === 'navigator' && !crossedItemState[0]}>
        <View className="flex-1 flex-col justify-center">
          <View className="flex-row justify-center gap-2">
            {playerRole.current === 'navigator' && <Feather name="check" size={24} color="white" />}
            <AppText
              className={`text-center text-primary ${playerRole.current === 'navigator' ? 'text-4xl' : 'text-2xl'}`}>
              {playerRole.current === 'navigator' ? 'Submit' : 'View Questions'}
            </AppText>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const { height: screenHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    height: screenHeight / 2,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default RoundDeetsGoHere;
