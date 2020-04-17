import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
import Main from '../../screens/main/Main';
import Contact from '../../screens/contact/Contact'; 
import MyTabBar from './MyTabBar';

const data = [
    { title: "manhinh1", component: Main },
    { title: "manhinh2", component: Main },
    { title: "manhinh3", component: Main }
];
export default function MyTabs(props) {

    return (
        <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}  
        >
            <Tab.Screen name="tat ca" component={Main} />
            {data.map(item => {
                const Component = item.component;
                return (<Tab.Screen name={item.title} key={item.title.toString()}>{() => <Component someProps="someProps" {...props}/>}</Tab.Screen>);
            })}

        </Tab.Navigator>
    );
} 