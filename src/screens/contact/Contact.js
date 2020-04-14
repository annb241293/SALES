import React from 'react';
import { Image, View, StyleSheet, Button, Text } from 'react-native';
import ToolBarDefault from '../../components/toolbar/ToolBarDefault';

export default ({navigation, style }) => {
  return (
    <View>
      <ToolBarDefault navigation={navigation} />

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
      </View></View>
  );
};
