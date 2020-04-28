import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, View, StyleSheet, Picker, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Colors, Images } from '../../../theme';
import MenuConfirm from './MenuConfirm';


export default (props) => {

    const [tab, setTab] = useState(1)

    useEffect(() => {

    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 45, backgroundColor: Colors.colorchinh, alignItems: "center", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 0 }}>
                <Text style={{ paddingHorizontal: 20 }}>C5</Text>
                <TouchableOpacity style={{ paddingHorizontal: 20, flexDirection: "row" }}>
                    <Text>A</Text>
                    <Image source={Images.arrow_down} style={{ width: 16, height: 16, marginLeft: 5 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 0, marginTop: 2 }}>
                <TouchableOpacity onPress={() => setTab(1)} style={{ flex: 1, justifyContent: "center", alignItems: "center", height: 45, backgroundColor: tab == 1 ? Colors.colorchinh : "#fff", paddingHorizontal: 20, flexDirection: "row" }}>
                    <Text>Thực đơn đã gọi</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab(2)} style={{ flex: 1, justifyContent: "center", alignItems: "center", height: 45, backgroundColor: tab == 2 ? Colors.colorchinh : "#fff", paddingHorizontal: 20, flexDirection: "row" }}>
                    <Text>Món đã xác nhận</Text>
                </TouchableOpacity>
            </View>
            {tab == 1 ?
                <Order {...props} />
                :
                <MenuConfirm {...props} />
            }
        </View >
    );
}

const Order = (props) => {

    const [test, setTest] = useState("")
    const [list, setListOrder] = useState(() => props.listProducts)

    useEffect(() => {
        setListOrder(props.listProducts)
    }, [props.listProducts])

    const removeItem = (item) => {
        console.log("removeItem item ", item);
        let lists = list.filter(el => {
            return el.Id != item.Id
        })
        console.log("removeItem lists ", lists);
        setListOrder([...lists])
    }

    return (
        <ScrollView>
            <View>
                {
                    list.map(item => {
                        return item.Quantity > 0 ? (
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", padding: 10 }}>
                                <Image style={{ width: 20, height: 20, margin: 10 }} source={Images.icon_checked} />
                                <View style={{ flexDirection: "column", flex: 1 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 7 }}>{item.Name}</Text>
                                    <Text>{item.Price}x</Text>
                                </View>
                                <View style={{ alignItems: "center", flexDirection: "row" }}>
                                    <TouchableOpacity onPress={() => {
                                        item.Quantity++
                                        setListOrder([...list])
                                        props.outputListProducts([...list])
                                    }}>
                                        <Text style={{ borderWidth: 1, padding: 20, borderRadius: 10 }}>+</Text>
                                    </TouchableOpacity>
                                    <Text style={{ padding: 20 }}>{item.Quantity}</Text>
                                    <TouchableOpacity onPress={() => {
                                        item.Quantity--
                                        setListOrder([...list])
                                        props.outputListProducts([...list])
                                    }}>
                                        <Text style={{ borderWidth: 1, padding: 20, borderRadius: 10 }}>-</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) :
                            null
                    })
                }
            </View >
        </ScrollView>

    )
}