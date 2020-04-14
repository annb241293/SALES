import React, { useEffect, useState } from 'react';
import { StatusBar, Image, View, StyleSheet, Button, Text } from 'react-native';
import ToolBarDefault from '../../components/toolbar/ToolBarDefault';
import { syncServerEvent } from '../../data/DataManager'


export default ({ navigation, style }) => {

  useEffect(() => {
    syncServerEvent().then(res =>
      alert("Sync Done")
    )
  }
    , [])

  const clickRightIcon = () => {
    navigation.openDrawer();
  }

  const clickLeftIcon = () => {
    syncServerEvent().then(res =>
      alert("Sync Done")
    )
  }

  return (
    <View>
      <ToolBarDefault
        navigation={navigation}
        title="Main"
        rightIcon="menu"
        clickRightIcon={clickRightIcon}
        leftIcon="refresh"
        clickLeftIcon={clickLeftIcon}
      />
      <View></View>
    </View>
  );
};
