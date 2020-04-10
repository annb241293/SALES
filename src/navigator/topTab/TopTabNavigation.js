import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
import Main from '../../screens/main/Main';
import Messages from '../../screens/messenger/Messages';
import Contact from '../../screens/contact/Contact';
import MyTabBar from './MyTabBar';
import Screens from '../stack/StackNavigation';


export default function MyTabs() {
    return (
        <Tab.Navigator  tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen name="Home" component={Main} />
            <Tab.Screen name="Settings" component={Messages} />
            <Tab.Screen name="Contact" component={Contact} />

        </Tab.Navigator> 
    );
} 