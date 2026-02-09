// ElasticBarLoader.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, ViewStyle } from 'react-native';

type Props = {
  width?: number;
  height?: number;
  color?: string;
  durationMs?: number;
  style?: ViewStyle;
};

export default function ElasticBarLoader({
  width = 56,
  height = 10,
  color = '#FFFFFF',
  durationMs = 900,
  style,
}: Props) {
  const t = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(t, {
          toValue: 1,
          duration: durationMs * 0.55,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(t, {
          toValue: 0,
          duration: durationMs * 0.45,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ])
    );

    anim.start();
    return () => {
      anim.stop();
      t.stopAnimation();
    };
  }, [t, durationMs]);

  const scaleX = t.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1.25],
  });

  const scaleY = t.interpolate({
    inputRange: [0, 1],
    outputRange: [1.15, 0.85],
  });

  const translateX = t.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.15, width * 0.15],
  });

  const opacity = t.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1],
  });

  return (
    <View style={[styles.wrap, { width, height }, style]}>
      <View style={[styles.track, { borderRadius: height / 2 }]} />
      <Animated.View
        style={[
          styles.bar,
          {
            backgroundColor: color,
            borderRadius: height / 2,
            opacity,
            transform: [{ translateX }, { scaleX }, { scaleY }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { justifyContent: 'center' },
  track: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    opacity: 0.18,
  },
  bar: {
    width: '60%',
    height: '100%',
    alignSelf: 'center',
  },
});
