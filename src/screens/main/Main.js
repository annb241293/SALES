import React, { useEffect, useState } from 'react';
import { StatusBar, Image, View, StyleSheet, Button, Text } from 'react-native';
import ToolBarDefault from '../../components/toolbar/ToolBarDefault';
import { syncServerEvent } from '../../data/DataManager'
import { useSelector } from 'react-redux';


export default ({ navigation, style }) => {

  const deviceType = useSelector(state => {
    console.log("useSelector state ", state);
    return state.Common.deviceType
  });

  const orientaition = useSelector(state => {
    console.log("useSelector state ", state);
    return state.Common.orientaition
  });

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
      <View>

        <Text>deviceType : {deviceType}</Text>
        <Text>orientaition : {orientaition}</Text>

      </View>
    </View>
  );
};
