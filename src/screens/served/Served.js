import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, View, StyleSheet, Picker, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import dialogManager from '../../components/dialog/DialogManager';
import ToolBarSelectFood from './ToolBarServed';
import SelectFood from '../selectProduct/SelectFood';
import PageServed from './pageServed/PageServed';
import dataManager from '../../data/DataManager';


export default (props) => {

    const [numColumns, setNumColumns] = useState(1);
    const [listProducts, setListProducts] = useState([])
    const [position, setPosition] = useState("A")
    const [value, setValue] = useState('');


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

    const { deviceType, orientaition } = useSelector(state => {
        console.log("useSelector state ", state);
        return state.Common
    });

    const outputListProducts = (newList) => {
        newList = newList.filter(item => item.Quantity > 0)
        setListProducts(newList)
        console.log(newList, 'newlist');

    }


    const outputTextSearch = (text) => {
        setValue(text)
    }

    return (
        <View style={{ flex: 1 }}>
            <ToolBarSelectFood navigation={props.navigation}
                outputTextSearch={outputTextSearch} />
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 6 }}>
                    <SelectFood
                        valueSearch={value}
                        numColumns={numColumns}
                        deviceType={deviceType}
                        orientaition={orientaition}
                        listProducts={[...listProducts]} // input
                        outputListProducts={outputListProducts} /* output */ />
                </View>
                <View style={{ flex: 4 }}>
                    <PageServed
                        {...props}
                        listProducts={[...listProducts]} // input
                        outputListProducts={outputListProducts} /* output*/ />
                </View>
            </View>
        </View>
    );
}