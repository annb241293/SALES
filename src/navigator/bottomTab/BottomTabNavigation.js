import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator ();
import Main from '../../screens/main/Main';
import Messages from '../../screens/messenger/Messages';
import Contact from '../../screens/contact/Contact';
import MyTabBar from './MyTabBar';

export default function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Main} />
            <Tab.Screen name="Settings" component={Messages} />
            <Tab.Screen name="Contact" component={Contact} />

        </Tab.Navigator>
    );
}