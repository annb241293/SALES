

import React, { useEffect, useState } from 'react';
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

export default function ToolBarSelectFood(props) {

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={['#FFAB40', '#FF5722']}
            style={{ height: 44 }}
        >
            <View style={styles.toolbarContainer}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "center"
                }}
                >

                    <View style={{ flex: 1, alignItems: "center" }}>
                        <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                            <Icon name="keyboard-backspace" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 5, justifyContent: 'center', alignItems: 'flex-start',  }}>
                        <Subheading
                            numberOfLines={1}
                            style={{
                                color: 'white'
                            }}
                        >Select Food
                        </Subheading>
                    </View>

                    <View style={{ flex: 2, alignItems: "center", flexDirection:"row", justifyContent:"space-around" }}>
                        <TouchableOpacity onPress={() => { }} >
                            <View style={{}}>
                                <Icon name="cart-outline" size={30} color="white" style={{ marginRight: 5 }} />
                                <Text style={{ position: "absolute", top: 0, right: 0, backgroundColor: "red", color: "white", paddingHorizontal: 5, borderRadius: 50 }}>2</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} >
                            <View style={{}}>
                                <Icon name="cart-outline" size={30} color="white" style={{ marginRight: 5 }} />
                                <Text style={{ position: "absolute", top: 0, right: 0, backgroundColor: "red", color: "white", paddingHorizontal: 5, borderRadius: 50 }}>2</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} >
                            <View style={{}}>
                                <Icon name="cart-outline" size={30} color="white" style={{ marginRight: 5 }} />
                                <Text style={{ position: "absolute", top: 0, right: 0, backgroundColor: "red", color: "white", paddingHorizontal: 5, borderRadius: 50 }}>2</Text>
                            </View>
                        </TouchableOpacity>
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

ToolBarSelectFood.propTypes = {
    title: PropTypes.string,
    rightIcon: PropTypes.string,
    leftIcon: PropTypes.string,
    clickRightIcon: PropTypes.func,
    clickLeftIcon: PropTypes.func
}

ToolBarSelectFood.defaultProps = {

}
