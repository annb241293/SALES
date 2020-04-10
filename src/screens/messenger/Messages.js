import React from 'react';
import {StatusBar, Image,View, StyleSheet, Button, Text } from 'react-native';
export default ({ style }) => {
  return (
    <View
      // color="#FFC46B"
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}>
      <Text>
        Subscribe to my channel
      </Text>

    </View>
  );
};
