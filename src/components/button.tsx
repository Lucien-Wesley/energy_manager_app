import { Pressable, StyleSheet, PressableProps, ViewStyle, useColorScheme } from 'react-native';
import { Text } from './themedText';
import { COLORS as colors } from '@/constants';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import React from 'react';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  textColor?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
}

export default function Button({
  title,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  textColor,
  leftIcon,
  rightIcon,
  style,
  ...props
}: ButtonProps) {

  let backgroundColor;
  let borderColor;
  let labelColor;

  // Set colors based on variant
  switch (variant) {
    case 'primary':
      backgroundColor = colors.primary;
      borderColor = colors.primary;
      labelColor = '#FFFFFF';
      break;
    case 'secondary':
      backgroundColor = colors.secondary;
      borderColor = colors.secondary;
      labelColor = '#FFFFFF';
      break;
    case 'outline':
      backgroundColor = 'transparent';
      borderColor = colors.primary;
      labelColor = colors.primary;
      break;
    case 'ghost':
      backgroundColor = 'transparent';
      borderColor = 'transparent';
      labelColor = colors.primary;
      break;
  }

  // Override text color if provided
  if (textColor) {
    labelColor = textColor;
  }

  // Set size styles
  let paddingVertical;
  let paddingHorizontal;
  let textSize: 'sm' | 'md' | 'lg';

  switch (size) {
    case 'sm':
      paddingVertical = 8;
      paddingHorizontal = 12;
      textSize = 'sm';
      break;
    case 'lg':
      paddingVertical = 14;
      paddingHorizontal = 20;
      textSize = 'lg';
      break;
    default:
      paddingVertical = 12;
      paddingHorizontal = 16;
      textSize = 'md';
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: props.disabled ? [] : [{ scale: withTiming(1) }],
    };
  });

  return (
    <AnimatedPressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          borderColor,
          paddingVertical,
          paddingHorizontal,
          opacity: (pressed || props.disabled) ? 0.8 : 1,
        },
        fullWidth && styles.fullWidth,
        variant === 'outline' && styles.outline,
        props.disabled && styles.disabled,
        style,
        pressed && { transform: [{ scale: 0.98 }] },
      ]}
      {...props}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
    >
      {leftIcon}
      <Text
        style={[
          styles.text,
          leftIcon && styles.textWithLeftIcon,
          rightIcon && styles.textWithRightIcon,
        ]}
        weight="medium"
        size={textSize}
        color={props.disabled ? 'gray' : (variant === 'outline' || variant === 'ghost' ? 'primary' : undefined)}
      >
        {title}
      </Text>
      {rightIcon}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1,
  },
  outline: {
    borderWidth: 1,
  },
  text: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'regular',
  },
  textWithLeftIcon: {
    marginLeft: 8,
  },
  textWithRightIcon: {
    marginRight: 8,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});