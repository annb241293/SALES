import React, { useEffect, useState } from 'react';
import { StatusBar, Image, View, StyleSheet, Button, Text } from 'react-native';
import ToolBarDefault from '../../components/toolbar/ToolBarDefault';
import { syncAllDatas } from '../../data/DataManager'
import realmStore from '../../data/realm/RealmStore'
import Order from '../order/Order';


export default ({ navigation, style }) => {

  // useEffect(() => {
  //   syncServerEvent().then(res =>
  //     alert("Sync Done")
  //   )
  // }
  //   , [])

  const clickRightIcon = () => {
    navigation.openDrawer();
  }

  const clickLeftIcon = async () => {
    await syncAllDatas()
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
      <Order>
      </Order>
    </View>
  );
};
