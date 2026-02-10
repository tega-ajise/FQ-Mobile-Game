import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import ElasticBarLoader from './ElasticLoader';

type Props = {
  visible: boolean;
  message?: string;
  backgroundColor?: string; // overlay background
  barColor?: string;
};

export default function FullScreenElasticLoader({
  visible,
  message = 'Loading...',
  backgroundColor = 'rgba(0,0,0,0.55)',
  barColor = '#FFFFFF',
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={[styles.backdrop, { backgroundColor }]} pointerEvents="auto">
        <View style={styles.content}>
          <ElasticBarLoader width={100} height={15} color={barColor} />
          {!!message && <Text style={styles.message}>{message}</Text>}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  message: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    textAlign: 'center',
  },
});
