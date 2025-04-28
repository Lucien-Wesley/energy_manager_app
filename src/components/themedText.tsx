import { Text as DefaultText, StyleSheet, TextProps as DefaultTextProps, useColorScheme } from 'react-native';
import { COLORS as Colors } from '@/constants';
import React from 'react';

export interface TextProps extends DefaultTextProps {
  color?: keyof typeof Colors;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export function Text({ style, color = 'black', size = 'md', weight = 'normal', ...props }: TextProps) {
  const textColor = Colors[color];

  let fontSize = styles.md.fontSize;
  if (size === 'xs') fontSize = styles.xs.fontSize;
  if (size === 'sm') fontSize = styles.sm.fontSize;
  if (size === 'lg') fontSize = styles.lg.fontSize;
  if (size === 'xl') fontSize = styles.xl.fontSize;
  if (size === '2xl') fontSize = styles.xxl.fontSize;
  if (size === '3xl') fontSize = styles.xxxl.fontSize;

  let fontFamily = 'Inter-Regular';
  if (weight === 'medium') fontFamily = 'Inter-Medium';
  if (weight === 'semibold') fontFamily = 'Inter-SemiBold';
  if (weight === 'bold') fontFamily = 'Inter-Bold';

  return (
    <DefaultText
      style={[
        { color: textColor, fontSize, fontFamily },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  xs: { fontSize: 12 },
  sm: { fontSize: 14 },
  md: { fontSize: 16 },
  lg: { fontSize: 18 },
  xl: { fontSize: 20 },
  xxl: { fontSize: 24 },
  xxxl: { fontSize: 30 },
});