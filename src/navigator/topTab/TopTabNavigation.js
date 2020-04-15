import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
import Main from '../../screens/main/Main';
import Messages from '../../screens/messenger/Messages';
import Contact from '../../screens/contact/Contact';
import MyTabBar from './MyTabBar';


export default function MyTabs() {
    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}
        >
            <Tab.Screen name="Contact1" component={Main} />
            <Tab.Screen name="Contact2" component={Contact} />
            <Tab.Screen name="Contact3" component={Contact} />
            <Tab.Screen name="Contac4t" component={Contact} />
            <Tab.Screen name="Cont3act" component={Contact} />
            <Tab.Screen name="Cont5act" component={Contact} />


        </Tab.Navigator>
    );
} 