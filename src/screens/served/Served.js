import React, { useState } from 'react';
import { ActivityIndicator, Image, View, StyleSheet, Picker, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import ToolBarSelectFood from './ToolBarServed';
import SelectFood from '../selectProduct/SelectFood';
import SelectedItem from './pageServed/PageServed';


export default (props) => {
    return (
        <View style={{ flex: 1 }}>
            <ToolBarSelectFood />
            <View style={{ flex: 1, flexDirection: "row" }}>
                <SelectFood />
                <SelectedItem />
            </View>
        </View>
    );
}