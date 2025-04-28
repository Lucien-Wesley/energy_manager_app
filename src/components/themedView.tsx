import { View as DefaultView, ViewProps as DefaultViewProps, useColorScheme } from 'react-native';
import {COLORS as Colors} from '@/constants';
import React from 'react';

export interface ViewProps extends DefaultViewProps {
  bg?: keyof typeof Colors;
  border?: boolean;
  borderColor?: keyof typeof Colors;
}

export function View({ style, bg = 'white', border = false, borderColor = 'gray2', ...props }: ViewProps) {
  const backgroundColor = Colors[bg];
  const borderColorValue = Colors[borderColor];

  return (
    <DefaultView
      style={[
        { backgroundColor },
        border && { borderWidth: 1, borderColor: borderColorValue },
        style,
      ]}
      {...props}
    />
  );
}