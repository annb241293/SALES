import React, { useState, useEffect, useMemo } from 'react';
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
    const [itemOrder, setItemOrder] = useState({})
    const [listTopping, setListTopping] = useState([])
    const [position, setPosition] = useState("")
    const meMoItemOrder = useMemo(() => itemOrder, [itemOrder])


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
        newList = JSON.parse(JSON.stringify(newList))
        setListProducts(newList)
        console.log(newList, 'newlist');

    }


    const outputTextSearch = (text) => {
        setValue(text)
    }

    const outputItemOrder = (item) => {
        setItemOrder(item)
    }

    const outputPosition = (position) => {
        setPosition(position)
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
                    <View style={!itemOrder.Id ? { flex: 1 } : {}}>
                        <SelectFood
                            valueSearch={value}
                            numColumns={numColumns}
                            deviceType={deviceType}
                            orientaition={orientaition}
                            listProducts={[...listProducts]}
                            outputListProducts={outputListProducts} />
                    </View>
                    <View style={itemOrder.Id ? { flex: 1 } : {}}>
                        <Topping
                            {...props}
                            position={position}
                            itemOrder={meMoItemOrder}
                            onClose={() => { setItemOrder({}) }}
                            outputListTopping={outputListTopping}
                        />
                    </View>
                </View>
                <View style={{ flex: 4, marginLeft: 2 }}>
                    <PageServed
                        {...props}
                        itemOrder={meMoItemOrder}
                        listProducts={[...listProducts]}
                        outputListProducts={outputListProducts}
                        outputItemOrder={outputItemOrder}
                        outputPosition={outputPosition}
                        listTopping={listTopping} />
                </View>
            </View>
        </View>
    );
}