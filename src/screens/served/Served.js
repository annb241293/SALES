import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, View, StyleSheet, Picker, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import dialogManager from '../../components/dialog/DialogManager';
import ToolBarSelectFood from './ToolBarServed';
import SelectFood from '../selectProduct/SelectFood';
import PageServed from './pageServed/PageServed';
import Topping from './Topping';

export default (props) => {

    const [numColumns, setNumColumns] = useState(1);
    const [listProducts, setListProducts] = useState([])
    const [value, setValue] = useState('');
    const [isTopping, setIsTopping] = useState(false)
    const [itemOrder, setItemOrder] = useState({})
    const [listTopping, setListTopping] = useState([])


    useEffect(() => {
        const onOrientationChange = () => {
            dialogManager.showLoading()
            switch (deviceType) {
                case 'PHONE':
                    setNumColumns(1)
                    break;
                case 'TABLET':
                    setNumColumns(4)
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

    const outputIdItemOrder = (item) => {
        setItemOrder(item)
    }

    const outputListTopping = (listTopping) => {
        setListTopping(listTopping)
    }

    return (
        <View style={{ flex: 1 }}>
            <ToolBarSelectFood navigation={props.navigation}
                outputTextSearch={outputTextSearch} />
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 6, }}>
                    <View style={{ flex: 1, }}>
                        <SelectFood
                            valueSearch={value}
                            numColumns={numColumns}
                            deviceType={deviceType}
                            orientaition={orientaition}
                            listProducts={[...listProducts]}
                            outputListProducts={outputListProducts} />
                    </View>
                    <View style={{ flex: 1  }}>
                        <Topping
                            itemOrder={{ ...itemOrder }}
                            setIsTopping={() => { setIsTopping(false) }}
                            outputListTopping={outputListTopping} />
                    </View>
                </View>
                <View style={{ flex: 4, marginLeft: 2 }}>
                    <PageServed
                        {...props}
                        setIsTopping={() => { setIsTopping(true) }}
                        listProducts={[...listProducts]}
                        outputListProducts={outputListProducts}
                        outputIdItemOrder={outputIdItemOrder}
                        listTopping={[...listTopping]} />
                </View>
            </View>
        </View>
    );
}