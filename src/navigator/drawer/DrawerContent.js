import React, { useEffect } from 'react';
import { Image, View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import {
    DrawerItem,
    DrawerContentScrollView,
  } from '@react-navigation/drawer';
import { syncServerEvent } from '../../data/DataManager'

const DrawerContent = props => {
    useEffect(()=>{
        syncServerEvent().then( res =>
            alert("Sync Done")
        )
    }
    ,[])
    return (
        <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
            <View style={{ marginTop: 30, }}>
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={{
                            uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                            height: 60,
                            width: 60,
                            scale: 0.5,
                        }}
                        resizeMode="center"
                        style={styles.avatar}
                    />
                </View>
                {/* <View style={{width: "100%"}}> */}
                <DrawerItem
                    label="Dashboard"
                    labelStyle={styles.drawerLabel}
                    style={styles.drawerItem}
                    onPress={() => props.navigation.navigate('Home')}
                //   icon={() => 
                //   <AntDesign name="dashboard" color="white" size={16} />
                // }
                />
                <DrawerItem
                    label="Messages"
                    labelStyle={styles.drawerLabel}
                    style={{ alignItems: 'flex-start', marginVertical: 0 }}
                    onPress={() => {
                        console.log("Oke props ", props);
                        props.navigation.navigate('Messages')
                    }}
                // icon={() => <AntDesign name="message1" color="white" size={16} />}
                />
                <DrawerItem
                    label="Contact us"
                    labelStyle={styles.drawerLabel}
                    style={{ alignItems: 'flex-start', marginVertical: 0 }}
                    onPress={() => props.navigation.navigate('Contact')}
                // icon={() => <AntDesign name="phone" color="white" size={16} />}
                />
                {/* </View> */}
                {/* <View style={{ flex: 1 }} flex={false}> */}
                <DrawerItem
                    label="Logout"
                    labelStyle={{ color: 'white' }}
                    // icon={() => <AntDesign name="logout" color="white" size={16} />}
                    onPress={() => alert('Are your sure to logout?')}
                />
                {/* </View> */}
            </View>
        </DrawerContentScrollView>
    );
};
export default DrawerContent;
const styles = StyleSheet.create({
    stack: {
      flex: 1,
      shadowColor: '#FFF',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 5,
      overflow: 'scroll',
      borderWidth: 1,
    },
    drawerStyles: { flex: 1, width: '80%', backgroundColor: 'transparent' },
    drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
    drawerLabel: { color: 'white', marginLeft: 0 },
    avatar: {
      borderRadius: 60,
      marginBottom: 16,
      borderColor: 'white',
      borderWidth: StyleSheet.hairlineWidth,
    },
  });