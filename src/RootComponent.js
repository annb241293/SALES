/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './navigator/drawer/DrawerNavigation';

export default () => {
    return (
        <NavigationContainer>
            <DrawerNavigation />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({

});

