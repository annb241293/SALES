<<<<<<< HEAD
import React, { useEffect } from 'react';
import { Image, View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import {
    DrawerItem,
    DrawerContentScrollView,
  } from '@react-navigation/drawer';
import { syncServerEvent } from '../../data/DataManager'
=======
import React from 'react';
import { Image, View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import {
    DrawerItem,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

>>>>>>> 563edb33a2e0d11cf2fd5496f25f218aa729e163

const DrawerContent = props => {
    useEffect(()=>{
        syncServerEvent().then( res =>
            alert("Sync Done")
        )
    }
    ,[])
    return (
        <View style={{ flex: 1 }}>
            <View>
                <Text style={{ color: "black", height: 100, backgroundColor: "yellow" }}>header</Text>
            </View>
            <DrawerContentScrollView contentContainerStyle={{ flex: 1, marginTop: -5 }}>
                <DrawerItem
                    label="Dashboard"
                    activeTintColor="red"
                    labelStyle={styles.drawerLabel}
                    style={[styles.DrawerItem,]}
                    onPress={() => {
                        console.log("Oke props ", props);
                        props.navigation.navigate('Home')
                    }}

                    icon={() =>
                        <Icon name="home" color="black" size={30} />
                    }
                />
                <DrawerItem
                    label="Messages"
                    labelStyle={styles.drawerLabel}
                    style={styles.DrawerItem}
                    onPress={() => {
                        console.log("Oke props ", props);
                        props.navigation.navigate('Messages')
                    }}
                // icon={() => <AntDesign name="message1" color="white" size={16} />}
                />
                <DrawerItem
                    label="Contact us"
                    labelStyle={styles.drawerLabel}
                    style={styles.DrawerItem}
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
            </DrawerContentScrollView>
            <View>
                <Text>Bottom</Text>
            </View>
        </View>
        // <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{ flex: 1,bac }}>
        //     <View style={{ marginTop: 30, flex: 1 }}>
        //         <View style={{ alignItems: "center", backgroundColor:"blue" }}>
        //             <Image
        //                 source={{
        //                     uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
        //                     height: 60,
        //                     width: 60,
        //                     scale: 0.5,
        //                 }}
        //                 resizeMode="center"
        //                 style={styles.avatar}
        //             />
        //         </View>
        //         <View style={{flex: 1, backgroundColor:"red"}}>
        //             <DrawerItem
        //                 // icon={({ focused, color, size }) => <Image
        //                 //     source={{
        //                 //         uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
        //                 //         height: 30,
        //                 //         width: 30,

        //                 //     }}
        //                 //     resizeMode="center"
        //                 //     style={styles.avatar}

        //                 // />}
        //                 label="Dashboard"
        //                 activeTintColor="red"
        //                 labelStyle={styles.drawerLabel}
        //                 style={[styles.DrawerItem,]}
        //                 onPress={() => {
        //                     console.log("Oke props ", props);
        //                     props.navigation.navigate('Home')
        //                 }}

        //             //   icon={() => 
        //             //   <AntDesign name="dashboard" color="white" size={16} />
        //             // }
        //             />
        //             <DrawerItem
        //                 label="Messages"
        //                 labelStyle={styles.drawerLabel}
        //                 style={styles.DrawerItem}
        //                 onPress={() => {
        //                     console.log("Oke props ", props);
        //                     props.navigation.navigate('Messages')
        //                 }}
        //             // icon={() => <AntDesign name="message1" color="white" size={16} />}
        //             />
        //             <DrawerItem
        //                 label="Contact us"
        //                 labelStyle={styles.drawerLabel}
        //                 style={styles.DrawerItem}
        //                 onPress={() => props.navigation.navigate('Contact')}
        //             // icon={() => <AntDesign name="phone" color="white" size={16} />}
        //             />
        //             {/* </View> */}
        //             {/* <View style={{ flex: 1 }} flex={false}> */}
        //             <DrawerItem
        //                 label="Logout"
        //                 labelStyle={{ color: 'white' }}
        //                 // icon={() => <AntDesign name="logout" color="white" size={16} />}
        //                 onPress={() => alert('Are your sure to logout?')}
        //             />
        //         </View>
        //                 <View>
        //                     <Text>Hotline:</Text>
        //                 </View>
        //     </View>
        // </DrawerContentScrollView>
    );
};
export default DrawerContent;
const styles = StyleSheet.create({
    DrawerItem: { width: "100%" },
    drawerLabel: { color: "blue" }
});