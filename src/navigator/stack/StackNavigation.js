import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';

// screens
import Main from '../../screens/main/Main';
import Messages from '../../screens/messenger/Messages';
import Contact from '../../screens/contact/Contact';
import TopTabNavigation from '../topTab/TopTabNavigation';



const Stack = createStackNavigator();
export default ({ navigation, style }) => {

    return (
        <Animated.View style={{ flex: 1 }}>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerTransparent: true,
                    headerTitle: null,
                    headerLeft: null
                }}>
                <Stack.Screen name="Home">{props => <Main {...props} />}</Stack.Screen>
                <Stack.Screen name="Messages">{props => <Messages {...props} />}</Stack.Screen>
                <Stack.Screen name="Contact">{props => <Contact {...props} />}</Stack.Screen>
            </Stack.Navigator>
        </Animated.View>
    );
};
