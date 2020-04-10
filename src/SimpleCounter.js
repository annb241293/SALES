import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const SimpleCounter = () => {
    //Get counter from counterReducer
    const counter = useSelector(state => {
        console.log("useSelector state ", state);
        return state.myCounter.counter
    });

    //Use for all the dispatch actions
    const dispatch = useDispatch();

    return (
        <View style={{ padding: 50 }}>
            <Text>Simple Counter</Text>
            <Text>{counter}</Text>
            <TouchableOpacity style={{ padding: 5 }} onPress={() => dispatch({ type: 'DOUBLE_COUNT' })}>
                <Text>x2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5 }} onPress={() => dispatch({ type: 'INCREMENT_COUNT_TEN' })}>
                <Text>+10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5 }} onPress={() => dispatch({ type: 'INCREMENT_COUNT' })}>
                <Text>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5 }} onPress={() => dispatch({ type: 'DECREMENT_COUNT' })}>
                <Text>-1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5 }} onPress={() => dispatch({ type: 'DECREMENT_COUNT_TEN' })}>
                <Text>-10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5 }} onPress={() => dispatch({ type: 'RESET_COUNT' })}>
                <Text>Reset</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SimpleCounter;