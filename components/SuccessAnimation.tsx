import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface SuccessAnimationProps {
  size?: number;
  iconSize?: number;
  dotColor?: string;
  iconColor?: string;
  dotSize?: number;
  duration?: number;
  backgroundColor?: string;
  animatedLayerColor?: string;
  onAnimationEnd?: () => void;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
  size = 120,
  iconSize = 120 * 0.7,
  dotColor = "#44c6b1",
  iconColor = "white",
  dotSize = 20,
  duration = 2000,
  backgroundColor = "#44c6b1",
  animatedLayerColor = "white",
  onAnimationEnd = () => {},
}) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 2,
      duration,
      useNativeDriver: false,
    }).start(() => onAnimationEnd());
  }, [animation, duration, onAnimationEnd]);

  const particleScale = animation.interpolate({
    inputRange: [0, 1.5],
    outputRange: [dotSize, 0],
    extrapolate: "clamp",
  });

  const particleRadius = animation.interpolate({
    inputRange: [0, 1.5],
    outputRange: [dotSize / 2, 0],
    extrapolate: "clamp",
  });

  const particleOpacity = animation.interpolate({
    inputRange: [0, 0.5, 0.65],
    outputRange: [0, 0.1, 1],
    extrapolateRight: "clamp",
  });

  const Icon = Animated.createAnimatedComponent(Feather);
  const SIZE = size;

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Animated.View
          style={[
            styles.animatedView,
            {
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
              backgroundColor,
              transform: [
                {
                  scaleX: animation.interpolate({
                    inputRange: [0, 0.4],
                    outputRange: [0, 1],
                    extrapolateRight: "clamp",
                  }),
                },
                {
                  scaleY: animation.interpolate({
                    inputRange: [0, 0.4],
                    outputRange: [0, 1],
                    extrapolateRight: "clamp",
                  }),
                },
              ],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.animatedView,
            {
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
              backgroundColor: animatedLayerColor,
              opacity: animation.interpolate({
                inputRange: [0, 1, 1.5],
                outputRange: [1, 0.5, 0],
                extrapolateRight: "clamp",
              }),
              transform: [
                {
                  scaleX: animation.interpolate({
                    inputRange: [0, 0.4, 1.1],
                    outputRange: [0, 0.7, 1.1],
                    extrapolateRight: "clamp",
                  }),
                },
                {
                  scaleY: animation.interpolate({
                    inputRange: [0, 0.4, 1.1],
                    outputRange: [0, 0.7, 1.1],
                    extrapolateRight: "clamp",
                  }),
                },
              ],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.animatedView,
            {
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
              backgroundColor,
              justifyContent: "center",
              alignItems: "center",
              transform: [
                {
                  scaleX: animation.interpolate({
                    inputRange: [0, 0.4, 1],
                    outputRange: [0, 0.25, 1],
                    extrapolateRight: "clamp",
                  }),
                },
                {
                  scaleY: animation.interpolate({
                    inputRange: [0, 0.4, 1],
                    outputRange: [0, 0.25, 1],
                    extrapolateRight: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <Icon
            name="check"
            style={{
              alignSelf: "center",
            }}
            size={iconSize}
            color={iconColor}
          />
        </Animated.View>
      </View>

      {Array.from({ length: 4 }).map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              width: particleScale,
              height: particleScale,
              borderRadius: particleRadius,
              opacity: particleOpacity,
              backgroundColor: dotColor,
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [
                      0,
                      index % 2 === 0 ? -SIZE * 0.417 : SIZE * 0.417,
                      index % 2 === 0 ? -SIZE * 0.92 : SIZE * 0.92,
                    ],
                    extrapolateRight: "clamp",
                  }),
                },
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [
                      0,
                      index < 2 ? -SIZE * 0.417 : SIZE * 0.417,
                      index < 2 ? -SIZE * 0.92 : SIZE * 0.92,
                    ],
                    extrapolateRight: "clamp",
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedView: {
    position: "absolute",
  },
  particle: {
    position: "absolute",
  },
});

export default SuccessAnimation;
