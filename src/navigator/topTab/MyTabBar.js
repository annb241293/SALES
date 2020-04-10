import React from 'react';
import { Image, View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

function MyTabBar(props) {
    const { state, descriptors, navigation, position } = props;
    console.log(navigation,'navigationnavigation');
    
    return (
        <View>
            <View style={{ height: 100, backgroundColor: "blue" }}>
                <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() =>{ navigation.openDrawer()}}>
                    <Text style={{ color: "#000" }}>Menu</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    const inputRange = state.routes.map((_, i) => i);
                    const opacity = Animated.interpolate(position, {
                        inputRange,
                        outputRange: inputRange.map(i => (i === index ? 1 : 0)),
                    });

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityStates={isFocused ? ['selected'] : []}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1 }}
                        >
                            <Animated.Text style={{}}>
                                {label}
                            </Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
export default MyTabBar;