import React from 'react';
import { Image,View, StyleSheet, Button, Text } from 'react-native';

export default ({ style }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}>
      <Text >
        Contact me at
      </Text>
    </View>
  );
};
