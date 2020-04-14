import React from 'react';
import { StatusBar, Image, View, StyleSheet, Button, Text } from 'react-native';
import ToolBarDefault from '../../components/toolbar/ToolBarDefault';

export default ({ navigation, style }) => {
  return (
    <View>
      <ToolBarDefault navigation={navigation} />
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
    </View>
  );
};
