import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, View, StyleSheet, Picker, Text, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Modal } from 'react-native';
import { Colors, Images, Metrics } from '../../../theme';
import MenuConfirm from './MenuConfirm';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

export default (props) => {

    const [tab, setTab] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [position, setPosition] = useState("A")
    const [listOrderWithPosition, setListOrderWithPosition] = useState([])


    useEffect(() => {
        console.log("PageSeved props ", props);

    }, [])

    const selectPosition = (position) => {
        setPosition(position)
        setShowModal(false);
    }

    let _menu = null;

    const setMenuRef = ref => {
        _menu = ref;
    };

    const hideMenu = (position) => {
        _menu.hide();
        selectPosition(position)
    };

    const showMenu = () => {
        _menu.show();
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: Colors.colorchinh, alignItems: "center", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 0 }}>
                <View style={{ flex: 1, height: 45, justifyContent: "center" }}>
                    <Text style={{ paddingHorizontal: 20 }}>{props.route && props.route.params && props.route.params.room && props.route.params.room.Name ? props.route.params.room.Name : ""}</Text>
                </View>
                <TouchableOpacity onPress={showMenu} style={{ flex: 1, height: 45, paddingHorizontal: 20, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                    <Menu
                        ref={setMenuRef}
                        button={<Text onPress={showMenu}>{position}</Text>}
                    >
                        <MenuItem onPress={() => hideMenu("A")}>A</MenuItem>
                        <MenuItem onPress={() => hideMenu("B")}>B</MenuItem>
                        <MenuItem onPress={() => hideMenu("C")}>C</MenuItem>
                        <MenuItem onPress={() => hideMenu("D")}>D</MenuItem>
                    </Menu>
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
                <MenuConfirm position={position} {...props} />
            }
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
                            <TouchableOpacity onPress={() => selectPosition("A")}>
                                <Text style={{ margin: 10, fontSize: 16 }}>A</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectPosition("B")}>
                                <Text style={{ margin: 10, fontSize: 16 }}>B</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectPosition("C")}>
                                <Text style={{ margin: 10, fontSize: 16 }}>C</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectPosition("D")}>
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
    const [showModal, setShowModal] = useState(false)
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
                <Menu
                    ref={setMenuRef}
                    button={<Text onPress={showMenu}>Show menu</Text>}
                >
                    <MenuItem onPress={hideMenu}>Menu item 1</MenuItem>
                    <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
                    <MenuItem onPress={hideMenu} disabled>
                        Menu item 3
                        </MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={hideMenu}>Menu item 4</MenuItem>
                </Menu>
                <ScrollView style={{ flex: 1 }}>
                    {
                        list.map(item => {
                            return item.Quantity > 0 ? (
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", padding: 10 }}>
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
                                            // setListOrder([...list])
                                            props.outputListProducts([...list])
                                        }}>
                                            <Text style={{ borderWidth: 1, padding: 20, borderRadius: 10 }}>+</Text>
                                        </TouchableOpacity>
                                        <Text style={{ padding: 20 }}>{item.Quantity}</Text>
                                        <TouchableOpacity onPress={() => {
                                            // if (item.Quantity > 1) {
                                            //     item.Quantity--
                                            //     setListOrder([...list])
                                            // } else {
                                            //     item.Quantity--
                                            //     removeItem(item)
                                            // }
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
                        {/* <MenuItem >Giờ vào: 27/04/2020 08:00</MenuItem>
                        <MenuItem onPress={() => { }} style={{ padding: 10, backgroundColor: "green", }}>
                            <Image style={{ width: 20, height: 20 }} source={Images.icon_notification} />
                            <Text style={{ backgroundColor: "red", justifyContent: "center", paddingBottom: 10 }}>Yêu cầu thanh toán</Text>
                        </MenuItem>
                        <MenuItem onPress={() => { }} style={{ padding: 10 }}><Image style={{ width: 20, height: 20 }} source={Images.icon_notification} /> <Text style={{ alignItems: "center" }}>Gửi thông báo tới thu ngân</Text></MenuItem> */}
                         <View style={{
                            padding: 5,
                            backgroundColor: "#fff", borderRadius: 4, marginHorizontal: 20,
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
                    </Menu>
                    {/* <Image style={{ width: 24, height: 24, margin: 20 }} source={Images.icon_menu} /> */}
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