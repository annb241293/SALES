import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';

// screens
import Main from '../../screens/main/Main';
import Messages from '../../screens/messenger/Messages';
import Contact from '../../screens/contact/Contact';
import Login from '../../screens/login/LoginScreen';
import SelectFood from '../../screens/selectFood/SelectFood';
import { useSelector, useDispatch } from 'react-redux';
import TopTabNavigation from '../topTab/TopTabNavigation';
import DrawerNavigation from '../drawer/DrawerNavigation';


const MainStack = createStackNavigator();
export default (props) => {
    const SessionId = useSelector(state => {
        console.log("useSelector state ", state.Common.info.SessionId);
        return state.Common.info.SessionId
    });

    const checkCurrentAccount = async () => {
        let currentAccount = await getFileDuLieuString(Constant.CURRENT_ACCOUNT, true);
        console.log(currentAccount, 'currentAccount');
        if (currentAccount && currentAccount != "") {
            return true;
        } else {
            return false;
        }
    }

    return (
        <Animated.View style={{ flex: 1 }}>
            <MainStack.Navigator
                screenOptions={{
                    headerTransparent: true,
                    headerTitle: null,
                    headerLeft: null
                }}>
                {!checkCurrentAccount() ?
                    <>
                        <MainStack.Screen name="Login">{props => <Login {...props} />}</MainStack.Screen>
                    </> :
                    <>
                        <MainStack.Screen name="Home">{props => <DrawerNavigation {...props} />}</MainStack.Screen>
                        <MainStack.Screen name="SelectFood">{props => <SelectFood {...props} />}</MainStack.Screen>
                    </>}
            </MainStack.Navigator>
        </Animated.View>
    );
};
