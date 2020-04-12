

import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, StyleSheet,
    StatusBar, Keyboard, Linking, Platform, SafeAreaView
} from 'react-native';
import { Colors, Metrics, Images } from '../../theme'
import { IconButton, Subheading } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from '../../theme/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

export default function ToolBarDefault(props) {

    const onClickBack = () => {
        if (props.onClickBack) {
            props.onClickBack();
        } else {
            props.navigation.pop();
        }
    };
    return (
        // <LinearGradient
        //     start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        //     colors={['#FFAB40', '#FF5722']}
        //     style={{ height: 44 }}
        // >
        //     <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => props.navigation.openDrawer()}>
        //         <Text style={{ color: "#000" }}>Menu</Text>
        //     </TouchableOpacity>
        // </LinearGradient>
        <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={['#FFAB40', '#FF5722']}
            style={{ height: 44 }}
        >
            <View style={styles.toolbarContainer}>
                <StatusBar barStyle="light-content" backgroundColor={Colors.colorchinh} />
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "center"
                }}
                >

                    <View style={{ flex: 1, alignItems: "center" }}>
                        {props.rightIcon && props.clickRightIcon ?
                            <Icon name={props.rightIcon} size={30} color="white" onPress={props.clickRightIcon} />
                            :
                            null
                        }
                    </View>
                    <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Subheading
                            numberOfLines={1}
                            style={{
                                color: 'white'
                            }}
                        >
                            {props.title}
                        </Subheading>
                    </View>

                    <View style={{ flex: 1, alignItems: "center" }}>
                        {props.leftIcon && props.clickLeftIcon ?
                            <Icon name={props.leftIcon} size={30} color="white" onPress={props.clickLeftIcon} />
                            :
                            null
                        }
                    </View>
                </View>
            </View>
        </LinearGradient>
    )

}

const styles = StyleSheet.create({

    toolbarContainer: {
        height: 44,
        flex: 1,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.24,
        shadowRadius: 0.3,
    },
})

ToolBarDefault.propTypes = {
    showIconBack: PropTypes.bool
}

ToolBarDefault.defaultProps = {
    showIconBack: true
}
