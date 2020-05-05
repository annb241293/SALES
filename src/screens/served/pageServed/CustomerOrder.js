import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, Image, View, StyleSheet, Picker, Text, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Modal } from 'react-native';
import { Colors, Images, Metrics } from '../../../theme';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import dataManager from '../../../data/DataManager';
import { usePrevious } from '../../../customHook/usePrevious';

export default (props) => {

    const listPosition = useRef([])
    const [showModal, setShowModal] = useState(false)
    const [list, setListOrder] = useState(() => props.listProducts)
    const prevPosition = usePrevious(props.position)

    useEffect(() => {
        console.log("CustomerOrder props ", props);
        setListOrder(props.listProducts)
        // checkPosition();
    }, [props.listProducts])

    useEffect(() => {
        let exist = false
        listPosition.current.forEach(element => {
            if (element.key == props.position) {
                exist = true
                syncListProducts(element.list)
            }
        })
        if (!exist) {
            listPosition.current.push({ key: prevPosition, list: list })
            syncListProducts([])
        }
        console.log('listPosition', listPosition.current);
    }, [props.position])

    const syncListProducts = (listProducts) => {
        setListOrder([listProducts])
        props.outputListProducts(listProducts)
    }

    const backupPosition = (position) => {

    }

    // const checkPosition = () => {
    //     console.log("checkPosition start listPosition ", listPosition);
    //     if (listPosition.length > 0) {
    //         let check = false;
    //         listPosition.forEach(element => {
    //             if (element.key == props.position) {
    //                 check = true;
    //                 element.list = props.listProducts;
    //             }
    //         });

    //         if (check == false) {
    //             listPosition.push({ key: props.position, list: props.listProducts })
    //         }
    //     } else {
    //         listPosition.push({ key: props.position, list: props.listProducts })
    //     }

    //     if (dataManager.dataChoosing.length > 0) {
    //         let check = false;
    //         dataManager.dataChoosing.forEach(element => {
    //             if (element.Id == props.route.params.room.Id) {
    //                 check = true;
    //                 element.list = listPosition;
    //             }
    //         });

    //         if (check == false) {
    //             dataManager.dataChoosing.push({ Id: props.route.params.room.Id, list: listPosition })
    //         }
    //     } else {
    //         dataManager.dataChoosing.push({ Id: props.route.params.room.Id, list: listPosition })
    //     }
    //     console.log("checkPosition listPosition ", listPosition);
    //     console.log("checkPosition dataManager.dataChoosing ", dataManager.dataChoosing);
    // }

    const removeItem = (item) => {
        console.log("removeItem item ", item);
        let lists = list.filter(el => {
            return el.Id != item.Id
        })
        console.log("removeItem lists ", lists);
        setListOrder([...lists])
    }

    const sendOrder = () => {
        console.log("sendOrder");
    }

    let _menu = null;

    const setMenuRef = ref => {
        _menu = ref;
    };

    const hideMenu = () => {
        _menu.hide();
    };

    const showMenu = () => {
        _menu.show();
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    {
                        list.map(item => {
                            return item.Quantity > 0 ? (
                                <View key={item.Id} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", padding: 10 }}>
                                    <TouchableOpacity onPress={() => {
                                        item.Quantity = 0
                                        setListOrder([...list])
                                        props.outputListProducts([...list])
                                    }}>
                                        <Image style={{ width: 20, height: 20, margin: 20 }} source={Images.icon_checked} />
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: "column", flex: 1 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 7 }}>{item.Name}</Text>
                                        <Text>{item.Price}x</Text>
                                    </View>
                                    <View style={{ alignItems: "center", flexDirection: "row" }}>
                                        <TouchableOpacity onPress={() => {
                                            item.Quantity++
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
                </ScrollView>
            </View>
            <View style={{ height: 50, flexDirection: "row", backgroundColor: "#0072bc", alignItems: "center" }}>
                <TouchableOpacity onPress={showMenu}>
                    <Menu
                        ref={setMenuRef}
                        button={<Image style={{ width: 24, height: 24, margin: 20 }} source={Images.icon_menu} />}
                    >
                        <View style={{
                            padding: 5,
                            backgroundColor: "#fff", borderRadius: 4, marginHorizontal: 20,
                        }}>
                            <Text style={{ margin: 15, fontSize: 16 }}>Giờ vào: 27/04/2020 08:00</Text>
                            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => _menu.hide()}>
                                <Image style={{ width: 20, height: 20 }} source={Images.icon_notification} />
                                <Text style={{ margin: 15, fontSize: 16 }}>Yêu cầu thanh toán</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => _menu.hide()}>
                                <Image style={{ width: 20, height: 20 }} source={Images.icon_notification} />
                                <Text style={{ margin: 15, fontSize: 16 }}>Gửi thông báo tới thu ngân</Text>
                            </TouchableOpacity>
                        </View>
                    </Menu>
                </TouchableOpacity>
                <TouchableOpacity onPress={sendOrder} style={{ flex: 1, justifyContent: "center", alignItems: "center", borderLeftColor: "#fff", borderLeftWidth: 2, height: "100%" }}>
                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Gửi thực đơn</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                supportedOrientations={['portrait', 'landscape']}
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
                            <Text style={{ margin: 10 }}>Giờ vào: 27/04/2020 08:00</Text>
                            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => setShowModal(false)}>
                                <Image style={{ width: 20, height: 20 }} source={Images.icon_notification} />
                                <Text style={{ margin: 10, fontSize: 16 }}>Yêu cầu thanh toán</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => setShowModal(false)}>
                                <Image style={{ width: 20, height: 20 }} source={Images.icon_notification} />
                                <Text style={{ margin: 10, fontSize: 16 }}>Gửi thông báo tới thu ngân</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}