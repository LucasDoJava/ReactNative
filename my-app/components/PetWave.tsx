import { Animated, Text } from 'react-native';
import { useEffect, useRef } from 'react';

export default function PetWave() {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation]);

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '20deg'],
  });

  return (
    <Animated.Text style={{ fontSize: 48, transform: [{ rotate }] }}>
      🐾
    </Animated.Text>
  );
}
