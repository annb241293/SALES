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
import SimpleCounter from './SimpleCounter';
import Photos from './Photo';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './navigator/drawer/DrawerNavigation';
import TopTabNavigation from './navigator/topTab/TopTabNavigation';

export default () => {
    return (
        <NavigationContainer>
            <DrawerNavigation />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({

});

