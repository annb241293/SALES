import React, { useState } from 'react';
import { ActivityIndicator, Image, View, StyleSheet, Picker, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import ToolBarSelectFood from './ToolBarSelectFood';
import SelectFood from './SelectFood';
import SelectedItem from './SelectedItem';


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