import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';

// screens
import Main from '../../screens/main/Main';
import Messages from '../../screens/messenger/Messages';
import Contact from '../../screens/contact/Contact';
import Login from '../../screens/login/LoginScreen';
import SelectFood from '../../screens/selectFood/SelectFood';
import TopTabNavigation from '../topTab/TopTabNavigation';


const Stack = createStackNavigator();
export default (props) => {
    return (
        <Animated.View style={{ flex: 1 }}>
            <Stack.Navigator
                screenOptions={{
                    headerTransparent: true,
                    headerTitle: null,
                    headerLeft: null
                }}>
                <Stack.Screen name="Login">{props => <Login {...props} />}</Stack.Screen>
                <Stack.Screen name="Home">{props => <TopTabNavigation {...props} />}</Stack.Screen>
                <Stack.Screen name="SelectFood">{props => <SelectFood {...props} />}</Stack.Screen>
                <Stack.Screen name="Messages">{props => <Messages {...props} />}</Stack.Screen>
                <Stack.Screen name="Contact">{props => <Contact {...props} />}</Stack.Screen>
            </Stack.Navigator>
        </Animated.View>
    );
};
