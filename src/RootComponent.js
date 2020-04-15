/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './navigator/drawer/DrawerNavigation';
<<<<<<< HEAD
=======
import TopTabNavigation from './navigator/topTab/TopTabNavigation';
import { useDispatch } from 'react-redux';
import { Constant } from './common/Constant'
>>>>>>> 177d308e7c859bd4af2d47c1dcd4208d27481103

export default () => {

    const [deviceType, setDeviceType] = useState("");
    const [orientaition, setOrientaition] = useState("");

    const isPortrait = () => {
        const dim = Dimensions.get("screen");
        return dim.height >= dim.width ? Constant.PORTRAIT : Constant.LANDSCAPE;
    }

    const msp = (dim, limit) => {
        return (dim.scale * dim.width) >= limit || (dim.scale * dim.height) >= limit;
    }

    const isTablet = () => {
        const dim = Dimensions.get("screen");
        return ((dim.scale < 2 && msp(dim, 1000) || (dim.scale >= 2 && msp(dim, 1900)))) ? Constant.TABLET : Constant.PHONE;
    }


    const dispatch = useDispatch();

    useEffect(() => {
        setDeviceType(isTablet)
        setOrientaition(isPortrait)
        console.log("isTablet ", isTablet());
        dispatch({ type: 'TYPE_DEVICE', deviceType: isTablet()})
        dispatch({ type: 'ORIENTAITION', orientaition: isPortrait()})
    }, [])

    return (

        <NavigationContainer>
            <DrawerNavigation />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({

});

