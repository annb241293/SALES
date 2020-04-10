import React from 'react';
import { Image, View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';

// screens
import Main from '../../screens/main/Main';
import Messages from '../../screens/messenger/Messages';
import Contact from '../../screens/contact/Contact';
import TopTabNavigation from '../topTab/TopTabNavigation';
// import BottomTabNavigation from '../bottomTab/BottomTabNavigation';


const Stack = createStackNavigator();
export default ({ navigation, style }) => {
    console.log(navigation,'navigation createStackNavigator');
    
    return (
        <Animated.View style={{ flex: 1 }}>
            <Stack.Navigator
                screenOptions={{
                    headerTransparent: true,
                    headerTitle: null,
                }}>
                <Stack.Screen name="Home">{props => <TopTabNavigation {...props} />}</Stack.Screen>
                <Stack.Screen name="Messages">{props => <Messages {...props} />}</Stack.Screen>
                <Stack.Screen name="Contact">{props => <Contact {...props} />}</Stack.Screen>
            </Stack.Navigator>
        </Animated.View>
    );
};
