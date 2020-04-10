

import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, StyleSheet,
    StatusBar, Keyboard, Linking, Platform, SafeAreaView
} from 'react-native';
import { Colors, Metrics, Images } from '../../theme'
import { NavigateScreen, ScreenList } from '../../common/ScreenList';
import { Constant } from '../../common/Constant';
import { LANGUAGE, INFORMATION } from '../../model/Object';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/Colors';

const TYPE_RESTAURANT = 3;

export default class ToolBarMain extends Component {

    constructor(props, context) {
        super(props, context);

    }

    componentWillReceiveProps(nextProps) {

    }

    // static getDerivedStateFromProps(nextProps, prevState){
    //    return null;
    //  }

    actionPhone = () => {
        Keyboard.dismiss()
        let phone_number = "tel: " + Constant.HOTLINE;
        Linking.openURL(phone_number);
    }

    actionLanguage = (type) => {
        Keyboard.dismiss()
        console.log("actionLanguage type ", type);
        this.props.onChangeLanguage(type)
    }

    actionNotifi = () => {
        this.props.actionNotifi();
    }

    render() {        
        let fontSizeNotification = 13 - (this.props.notificationCount ? this.props.notificationCount.toString.length : 0)
        return ( 
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#FFAB40', '#FF5722']}
                style={{ height: 44 }}>
                <View style={{
                    flex: 1, height: 44,
                    flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'
                }}>
                    {/* <StatusBar barStyle="light-content" backgroundColor={Colors.colorchinh} /> */}
                    {/* <TouchableOpacity onPress={this.props.menu} style={{ padding: 3 }}>
                        <Image source={Images.icon_menu} style={[styles.image, { marginLeft: 20 }]} />
                    </TouchableOpacity> */}
                    <View style={{ flex: 1, justifyContent: 'flex-start', marginLeft: 0, flexDirection: "row", alignItems: "flex-start" }}>
                        <Image source={Images.logo_365_boss_white}
                            style={{ width: 172, height: 40, resizeMode: 'contain', marginLeft: -10 }} />
                        {/* <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>POS365.VN</Text> */}
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }}>
                        {/* {
                            this.props.nn == LANGUAGE.ENGLISH ?
                                <TouchableOpacity onPress={() => this.actionLanguage(LANGUAGE.VIETNAMESE)} style={{ padding: 3 }}>
                                    <Image source={Images.icon_viet_nam} style={styles.image} />
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => this.actionLanguage(LANGUAGE.ENGLISH)} style={{ padding: 3 }}>
                                    <Image source={Images.icon_english} style={styles.image} />
                                </TouchableOpacity>
                        } */}
                        {this.props.checkType && this.props.checkType == TYPE_RESTAURANT ?
                            <TouchableOpacity onPress={this.props.outputMessage} style={{ padding: 3 }}>
                                <Image source={Images.icon_message} style={styles.image} />
                            </TouchableOpacity> :
                            null}
                        <TouchableOpacity onPress={this.actionNotifi} style={{ padding: 3 }}>
                            <Image source={Images.icon_bell} style={styles.image} />
                            {(this.props.notificationCount && this.props.notificationCount > 0) ?
                                <Text style={{ ...styles.textNotification, fontSize: fontSizeNotification }}>
                                    {this.props.notificationCount}
                                </Text>
                                : null
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 20, height: 20, marginRight: 15, resizeMode: 'contain'
    },
    textNotification: {
        position: 'absolute', textAlign: 'center', textAlignVertical: 'center', color: 'white', backgroundColor: 'red',
        borderRadius: 4, borderColor: 'white', borderWidth: 0.5, marginStart: 2, paddingStart: 1, paddingEnd: 1
    }

})
