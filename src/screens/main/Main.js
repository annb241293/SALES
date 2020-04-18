import React, { useEffect, useState, useRef, createRef } from 'react';
import { StatusBar, Image, View, StyleSheet, TouchableOpacity, Text, ScrollView, SectionList } from 'react-native';
import ToolBarDefault from '../../components/toolbar/ToolBarDefault';
import { syncServerEvent } from '../../data/DataManager'
import { useSelector } from 'react-redux';
import Images from '../../theme/Images';
import I18n from '../../common/language/i18n';
import DialogManager from '../../components/dialog/DialogManager';

const data = [
  {
    name: "tang1",
    dataTable: [{ nameTable: "ban1", status: 0 }, { nameTable: "ban12", status: 1 }, { nameTable: "ban12", status: 1 }, { nameTable: "ban12", status: 1 }, { nameTable: "ban12", status: 1 }]
  },
  {
    name: "tang2",
    dataTable: [{ nameTable: "ban1", status: 0 }, { nameTable: "ban122", status: 1 }, { nameTable: "ban13", status: 1 }]
  },
  {
    name: "tang1",
    dataTable: [{ nameTable: "ban1", status: 0 }, { nameTable: "ban12", status: 1 }, { nameTable: "ban12", status: 1 }, { nameTable: "ban12", status: 1 }, { nameTable: "ban12", status: 1 }]
  },
  {
    name: "tang1",
    dataTable: [{ nameTable: "ban1", status: 0 }, { nameTable: "ban12", status: 1 }, { nameTable: "ban12", status: 1 }, { nameTable: "ban12", status: 1 }, { nameTable: "ban12", status: 1 }]
  },
  {
    name: "tang1",
    dataTable: [{ nameTable: "ban1", status: 0 }, { nameTable: "ban12", status: 1 }, { nameTable: "ban12", status: 1 }, { nameTable: "ban12", status: 1 }, { nameTable: "ban12", status: 1 }]
  },
];
export default (props) => {

  // useEffect(() => {
  //   syncServerEvent().then(res => {
  //     alert("Sync Done")
  //   }
  //   )
  // }, [])

  const clickRightIcon = () => {
    props.navigation.openDrawer();
  }

  const clickLeftIcon = () => {
    syncServerEvent().then(res =>
      alert("Sync Done")
    )
  }

  const deviceType = useSelector(state => {
    console.log("useSelector state ", state);
    return state.Common.deviceType
  });

  const orientaition = useSelector(state => {
    console.log("useSelector state ", state);
    return state.Common.orientaition
  });

  return (
    <View style={{ flex: 1 }}>
      <ToolBarDefault
        navigation={props.navigation}
        title="Main"
        rightIcon="menu"
        clickRightIcon={clickRightIcon}
        leftIcon="refresh"
        clickLeftIcon={clickLeftIcon}
      />
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: "red" }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Image source={Images.icon_transfer_money} style={{ width: 20, height: 20 }}></Image>
          <Text>123,456</Text>
        </View>
        <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around" }}>
          <View style={{ backgroundColor: "blue", borderRadius: 5 }}>
            <Text style={{ color: "white", fontSize: 12, paddingHorizontal: 2 }}>7/40</Text>
          </View>
          <Text>{I18n.t('dang_dung')}</Text>
        </View>
        <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around" }}>
          <View style={{ backgroundColor: "white", height: 20, width: 20, borderRadius: 5 }}></View>
          <Text>{I18n.t('dang_trong')}</Text>
        </View>
      </View>
      <ScrollView>
        <View>
          {data.map((item, index) => {
            return (
              <View style={{ marginVertical: 10 }} key={index}>
                <View style={{ flexDirection: "row" }}>
                  <Image source={Images.icon_transfer_money} style={{ width: 20, height: 20 }}></Image>
                  <Text style={{ textTransform: "uppercase", fontSize: 15, }}>{item.name}</Text>
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap", }}>
                  {item.dataTable.map((item2, index2) => {
                    return (
                      <TouchableOpacity key={index2}
                        style={{ backgroundColor: item2.status == 0 ? "blue" : "white", width: "30%", height: 100, justifyContent: "center", alignItems: "center", borderRadius: 5, margin: 6 }}
                        onPress={() => { props.navigation.navigate("SelectFood") }}
                      >
                        <Text style={{}}>{item2.nameTable}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>

      <View>
        <TouchableOpacity onPress={() => {
          new DialogManager().showPopupOneButton("Nội dung thông báo", "Thông báo")
          // let dialog = new DialogManager();
          // dialog.showLoading();
          // setTimeout(() => {
          //   dialog.hiddenLoading();
          // }, 2000);
        }}
        >
          <Text>deviceType : {deviceType}</Text>
          <Text>orientaition : {orientaition}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
