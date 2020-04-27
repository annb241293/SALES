// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import Animated from 'react-native-reanimated';

// import { Constant } from "../../common/Constant";
// import Login from '../../screens/login/LoginScreen';
// import SelectFood from '../../screens/selectFood/SelectFood';
// import { useSelector, useDispatch } from 'react-redux';
// import DrawerNavigation from '../drawer/DrawerNavigation';
// import { getFileDuLieuString, setFileLuuDuLieu } from "../../data/fileStore/FileStorage";
// import Main from '../../screens/main/Main';


// const MainStack = createStackNavigator();
// export default (props) => {
//     const SessionId = useSelector(state => {
//         console.log("useSelector state ", state.Common.info.SessionId);
//         return state.Common.info.SessionId
//     });

//     const checkCurrentAccount = async () => {
//         let currentAccount = await getFileDuLieuString(Constant.CURRENT_ACCOUNT, true);
//         console.log(currentAccount, 'currentAccount');
//         if (currentAccount && currentAccount !== "") {
//             return true;
//         } else {
//             return false;
//         }
//     }


//     return (
//         <Animated.View style={{ flex: 1 }}>
//             <MainStack.Navigator
//                 screenOptions={{
//                     headerTransparent: true,
//                     headerTitle: null,
//                     // headerLeft: null
//                 }}>
//                 {!checkCurrentAccount() ?
//                     <>
//                         <MainStack.Screen name="Home">{props => <DrawerNavigation {...props} />}</MainStack.Screen>
//                         <MainStack.Screen name="SelectFood">{props => <SelectFood {...props} />}</MainStack.Screen>
//                         <MainStack.Screen name="Messages">{props => <SelectFood {...props} />}</MainStack.Screen>
//                     </>
//                     :
//                     <>
//                         <MainStack.Screen name="Login">{props => <Login {...props} />}</MainStack.Screen>
//                     </>}
//             </MainStack.Navigator>
//         </Animated.View>
//     );
// };
import React, { useState, useEffect, createRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import { Constant } from "../../common/Constant";
import Login from '../../screens/login/LoginScreen';
import WrapSelectFood from '../../screens/WrapSelectFood/WrapSelectFood';
import BottomTabNavigation from '../bottomTab/BottomTabNavigation';
import PrintHtml from '../../screens/more/printHtml/PrintHtml'
import Preview from '../../screens/more/printHtml/Preview'

const MainStack = createStackNavigator();
export const navigationRef = createRef();
export default (props) => {

    return (
        <Animated.View style={{ flex: 1 }}>
            <MainStack.Navigator
                headerMode="none"
            >
                <MainStack.Screen name="Login">{props => <Login {...props} />}</MainStack.Screen>
                {/* <MainStack.Screen name="Home">{props => <DrawerNavigation {...props} screenOptions={{ headerLeft: null }} />}</MainStack.Screen> */}
                <MainStack.Screen name="Home">{props => <BottomTabNavigation {...props} screenOptions={{ headerLeft: null }} />}</MainStack.Screen>
                <MainStack.Screen name="WrapSelectFood">{props => <WrapSelectFood {...props} />}</MainStack.Screen>
                <MainStack.Screen name="PrintHtml">{props => <PrintHtml {...props} />}</MainStack.Screen>
                <MainStack.Screen name="Preview">{props => <Preview {...props} />}</MainStack.Screen>
            </MainStack.Navigator>
        </Animated.View>
    );
};
