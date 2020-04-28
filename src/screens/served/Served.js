import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, View, StyleSheet, Picker, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import dialogManager from '../../components/dialog/DialogManager';
import ToolBarSelectFood from './ToolBarServed';
import SelectFood from '../selectProduct/SelectFood';
import SelectedItem from './pageServed/PageServed';


export default (props) => {

    console.log(props, 'Served screen');


    const [numColumns, setNumColumns] = useState(1);
    const [listProducts, setListProducts] = useState([{ Name: 'lẩu 3112', Id: 881790, Quantity: 2 }])

    const { deviceType, orientaition } = useSelector(state => {
        console.log("useSelector state ", state);
        return state.Common
    });

    const outputListProducts = (newList) => {
        setListProducts(newList)
        console.log(newList, 'newlist');

    }

    useEffect(() => {
        const onOrientationChange = () => {
            dialogManager.showLoading()
            switch (deviceType) {
                case 'PHONE':
                    setNumColumns(1)
                    break;
                case 'TABLET':
                    setNumColumns(3)
                    break;
                default:
                    break;
            }
            dialogManager.hiddenLoading()
        }
        onOrientationChange()
    }, [deviceType])
    return (
        <View style={{ flex: 1 }}>
            <ToolBarSelectFood />
            <View style={{ flex: 1, flexDirection: "row" }}>
                <SelectFood style={{ flex: 6 }}
                    numColumns={numColumns}
                    deviceType={deviceType}
                    orientaition={orientaition}
                    listProducts={[...listProducts]}
                    outputListProducts={outputListProducts} />
                <SelectedItem style={{ flex: 4 }}
                    listProducts={[...listProducts]}
                    outputListProducts={outputListProducts} />
            </View>
        </View>
    );
}