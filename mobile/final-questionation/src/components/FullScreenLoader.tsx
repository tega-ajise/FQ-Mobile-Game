import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
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
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible, opacity]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.backdrop, { backgroundColor, opacity }]} pointerEvents="auto">
      <View style={styles.content}>
        <ElasticBarLoader width={100} height={15} color={barColor} />
        {!!message && <Text style={styles.message}>{message}</Text>}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
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
