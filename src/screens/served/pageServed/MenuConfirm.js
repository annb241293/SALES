import React, { useEffect, useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';


export default (props) => {

    const [test, setTest] = useState("")
    const [list, setListOrder] = useState([
        {
            Id: "123242",
            Name: "Hoa quả dầm sữa chua",
            Quantity: 1,
            Price: 155000
        }
    ])

    return (
        <View>
            {
                list.map(item => {
                    return (
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", padding: 10 }}>
                            <Image style={{ width: 20, height: 20, margin: 10 }} source={Images.icon_checked} />
                            <View style={{ flexDirection: "column", flex: 1 }}>
                                <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 7 }}>{item.Name}</Text>
                                <Text>{item.Price}x</Text>
                            </View>
                            <View style={{ alignItems: "center", flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => {
                                    item.Quantity++
                                    setTest("" + item.Quantity)
                                }}>
                                    <Text style={{ borderWidth: 1, padding: 20, borderRadius: 10 }}>+</Text>
                                </TouchableOpacity>
                                <Text style={{ padding: 20 }}>{item.Quantity}</Text>
                                <TouchableOpacity onPress={() => {
                                    if (item.Quantity > 0)
                                        item.Quantity--
                                    setTest("" + item.Quantity)
                                }}>
                                    <Text style={{ borderWidth: 1, padding: 20, borderRadius: 10 }}>-</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })
            }
        </View >

    )

}