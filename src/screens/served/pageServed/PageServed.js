import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, View, StyleSheet, Picker, Text, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Modal } from 'react-native';
import { Colors, Images, Metrics } from '../../../theme';
import MenuConfirm from './MenuConfirm';


export default (props) => {

    const [tab, setTab] = useState(1)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {

    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: Colors.colorchinh, alignItems: "center", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 0 }}>
                <View style={{ flex: 1, height: 45, justifyContent: "center" }}>
                    <Text style={{ paddingHorizontal: 20 }}>C5</Text>
                </View>
                <TouchableOpacity onPress={() => { setShowModal(true) }} style={{ flex: 1, height: 45, paddingHorizontal: 20, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
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
                <CustomerOrder {...props} />
                :
                <MenuConfirm {...props} />
            }
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <TouchableWithoutFeedback
                        onPress={() => setShowModal(false)}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}>
                        <View style={[{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }, { backgroundColor: 'rgba(0,0,0,0.5)' }]}></View>

                    </TouchableWithoutFeedback>
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{
                            padding: 5,
                            backgroundColor: "#fff", borderRadius: 4, marginHorizontal: 20,
                            width: Metrics.screenWidth * 0.8
                        }}>
                            <TouchableOpacity>
                                <Text style={{ margin: 10, fontSize: 16 }}>A</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ margin: 10, fontSize: 16 }}>B</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ margin: 10, fontSize: 16 }}>C</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ margin: 10, fontSize: 16 }}>D</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    );
}

const CustomerOrder = (props) => {

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
        props.outputListProducts(lists)
    }

    return (
        <ScrollView>
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
                                        setListOrder([...list])
                                    }}>
                                        <Text style={{ borderWidth: 1, padding: 20, borderRadius: 10 }}>+</Text>
                                    </TouchableOpacity>
                                    <Text style={{ padding: 20 }}>{item.Quantity}</Text>
                                    <TouchableOpacity onPress={() => {
                                        if (item.Quantity > 1) {
                                            item.Quantity--
                                            setListOrder([...list])
                                        } else {
                                            item.Quantity--
                                            removeItem(item)
                                        }
                                    }}>
                                        <Text style={{ borderWidth: 1, padding: 20, borderRadius: 10 }}>-</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
            </View >
        </ScrollView>

    )
}