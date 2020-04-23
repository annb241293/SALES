import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import Images from '../../theme/Images';
import I18n from '../../common/language/i18n';
import realmStore from '../../data/realm/RealmStore'
import { useSelector, useDispatch } from 'react-redux';
import { currencyToString, dateUTCToMoment, momentToDateUTC } from '../../common/Utils'
import moment from "moment";

const onItemPress = (item) => { }

const renderRoom = (item, widthRoom) => {
    return item.isEmpty ?
        (<View style={{ width: widthRoom - 8 }}></View>)
        :
        (<TouchableOpacity onPress={() => { onItemPress(item) }}
            style={[styles.room, { width: widthRoom - 8, height: widthRoom, backgroundColor: item.IsActive ? 'blue' : 'white' }]}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: "space-between" }}>
                <View style={{ justifyContent: "center", padding: 4, flex: 1 }}>
                    <Text style={{ fontSize: 14, textTransform: "uppercase", color: item.IsActive ? 'white' : 'black' }}>{item.Name}</Text>
                    <Text style={{ paddingTop: 10, fontSize: 12, color: item.IsActive ? 'white' : 'black' }}>{item.RoomMoment && item.IsActive ? moment(item.RoomMoment._i).fromNow() : ""}</Text>
                </View>

                <View style={{ justifyContent: "center", padding: 0, alignItems: "flex-end" }}>
                    <Text style={{ paddingTop: 10, color: "red", fontSize: 13 }}>{currencyToString(item.Total)}</Text>
                </View>
            </View>
        </TouchableOpacity>
        );
}

const renderRoomGroup = (item) => {
    return (
        <View style={styles.roomGroup}>
            <Text style={{ padding: 0, fontSize: 16, textTransform: "uppercase" }}>{item.Name}</Text>
        </View>
    )
}

export default (props) => {
    let rooms = []
    let roomGroups = []
    let serverEvents = []
    const [datas, setData] = useState([])
    const [valueAll, setValueAll] = useState({})
    const widthRoom = Dimensions.get('screen').width / props.numberColumn;

    useEffect(() => {
        init()
        return () => {
            realmStore.removeAllListener()
        }
    }, [])

    const init = async () => {
        rooms = await realmStore.queryRooms()
        roomGroups = await realmStore.queryRoomGroups()
        serverEvents = await realmStore.queryServerEvents()
        console.log("init: ", rooms, roomGroups, serverEvents);

        let newDatas = insertServerEvent(getDatas(rooms, roomGroups), serverEvents)
        setData(newDatas)
        serverEvents.addListener((collection, changes) => {
            if (changes.insertions.length || changes.modifications.length) {
                let newDatas = insertServerEvent(getDatas(rooms, roomGroups), serverEvents)
                setData(newDatas)
            }
        })
    }

    const getDatas = (rooms, roomGroups) => {
        let newDatas = []
        if (rooms && rooms.length > 1) rooms.sorted('Position')
        if (roomGroups) {
            roomGroups.forEach(roomGroup => {
                let roomsInside = rooms.filtered(`RoomGroupId == ${roomGroup.Id}`)
                let lengthRoomsInside = roomsInside.length
                if (roomsInside && lengthRoomsInside > 0) {
                    roomGroup.isGroup = true
                    newDatas.push(roomGroup)
                    newDatas = newDatas.concat(roomsInside.slice())
                    let itemEmty = (lengthRoomsInside % props.numberColumn == 0) ? 0
                        : props.numberColumn - lengthRoomsInside % props.numberColumn

                    for (let i = 1; i <= itemEmty; i++) newDatas.push({ isEmpty: true })
                }
            })

            let otherGroup = { Id: 0, Name: 'Other', isGroup: true }
            let roomsInside = rooms.filtered(`RoomGroupId == ${otherGroup.Id}`)
            let lengthRoomsInside = roomsInside.length
            if (roomsInside && lengthRoomsInside > 0) {
                newDatas.push(otherGroup)
                newDatas = newDatas.concat(roomsInside.slice())
                let itemEmty = (lengthRoomsInside % props.numberColumn == 0) ? 0
                    : props.numberColumn - lengthRoomsInside % props.numberColumn

                for (let i = 1; i <= itemEmty; i++) newDatas.push({ isEmpty: true })
            }
        }
        else
            newDatas = rooms

        console.log("getDatas", newDatas);

        return newDatas
    }

    const insertServerEvent = (newDatas, serverEvents) => {
        let totalCash = 0
        let totalUse = 0
        newDatas.forEach(data => {
            if (data.Id != undefined) {
                let listFiters = serverEvents.filtered(`RoomId == ${data.Id}`)
                if (listFiters && listFiters.length > 0) {
                    let Total = 0
                    let RoomMoment = ""
                    let IsActive = false
                    listFiters.forEach(elm => {
                        let JsonContentJS = JSON.parse(elm.JsonContent)
                        Total += JsonContentJS.Total ? JsonContentJS.Total : 0
                        if (JsonContentJS.ActiveDate) {
                            let ActiveMoment = dateUTCToMoment(JsonContentJS.ActiveDate)
                            if (!RoomMoment) RoomMoment = ActiveMoment
                            else if (ActiveMoment.isBefore(RoomMoment)) RoomMoment = ActiveMoment
                        }
                        if (JsonContentJS.OrderDetails && JsonContentJS.OrderDetails.length) IsActive = true
                    })
                    data.Total = Total
                    totalCash += Total
                    data.RoomMoment = RoomMoment
                    data.IsActive = IsActive
                    if (IsActive) totalUse++
                }
            }
        })
        console.log("insertServerEvent: ", newDatas);

        setValueAll({ cash: totalCash, use: totalUse, room: rooms.length })

        return newDatas
    }

    return (
        <View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: "red" }}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <Image source={Images.icon_transfer_money} style={{ width: 20, height: 20 }}></Image>
                    <Text>{currencyToString(valueAll.cash)}</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around" }}>
                    <View style={{ backgroundColor: "blue", borderRadius: 5 }}>
                        <Text style={{ color: "white", fontSize: 12, paddingHorizontal: 2 }}>{valueAll.use}/{valueAll.room}</Text>
                    </View>
                    <Text>{I18n.t('dang_dung')}</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around" }}>
                    <View style={{ backgroundColor: "white", height: 20, width: 20, borderRadius: 5 }}></View>
                    <Text>{I18n.t('dang_trong')}</Text>
                </View>
            </View>
            <View>
                <ScrollView >
                    <View style={styles.containerRoom}>
                        {datas ?
                            datas.map(data =>
                                data.isGroup ? renderRoomGroup(data) : renderRoom(data, widthRoom)
                            ) : null
                        }
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16
    },
    containerRoom: {
        flexDirection: 'row',
        flexWrap: 'wrap', alignContent: 'flex-start',
        justifyContent: 'space-evenly'
    },
    room: {
        justifyContent: "center",
        marginVertical: 4,
    },
    roomGroup: {
        backgroundColor: "white",
        marginVertical: 4,
        flexDirection: "row", alignItems: "center",
        width: "100%",
        borderBottomColor: "#ddd", borderBottomWidth: 1
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    }
});