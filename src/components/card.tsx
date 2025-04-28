import { StyleSheet, Pressable, PressableProps, useColorScheme, View } from 'react-native';
import { COLORS as Colors } from '@/constants';
import React from 'react';

interface CardProps extends PressableProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  bg?: string;
}

export default function Card({ 
  children, 
  style, 
  variant = 'elevated', 
  bg = 'card',
  ...props 
}: CardProps) {
  const borderColor = Colors.secondary;
  const shadowColor = Colors.secondaryGray;

  const variantStyle = 
    variant === 'elevated' ? styles.elevated : 
    variant === 'outlined' ? [styles.outlined, { borderColor }] : 
    styles.filled;

  const cardBg = variant === 'filled' ? 'lightGray' : bg;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        variantStyle,
        { shadowColor },
        pressed && props.onPress && styles.pressed,
        style,
      ]}
      {...props}>
      <View style={[styles.inner, { backgroundColor: cardBg }]}>
        {children}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  inner: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  elevated: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  outlined: {
    borderWidth: 1,
  },
  filled: {},
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});