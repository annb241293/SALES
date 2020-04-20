import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity } from 'react-native';
import realmStore from '../../data/realm/RealmStore'
import { useSelector, useDispatch } from 'react-redux';
import {currencyToString } from '../../common/Utils'

const onItemPress = (item) =>{}

const renderRoom = (item) => {
    return (
        <TouchableOpacity onPress={() => { onItemPress(item) }} style={styles.room}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: "space-between" }}>
                <View style={{ justifyContent: "center", padding: 10, flex: 1 }}>
                    <Text style={{ padding: 0, fontSize: 16, textTransform: "uppercase" }}>{item.Name}</Text>
                    <Text style={{ paddingTop: 10, fontSize: 12 }}>item</Text>
                </View>

                <View style={{ justifyContent: "center", padding: 0, alignItems: "flex-end" }}>
                    <Text style={{ paddingTop: 10, color: "red", fontSize: 13 }}>{currencyToString(item.Total)}</Text>
                </View>
            </View>
        </TouchableOpacity>

    );
}

const renderRoomGroup =(item) => {
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

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        rooms = await realmStore.queryRooms()
        roomGroups = await realmStore.queryRoomGroups()
        serverEvents = await realmStore.queryServerEvents()
        serverEvents.forEach(serverEvent =>
            serverEvent.JsonContent = JSON.parse(serverEvent.JsonContent)
        )
        console.log("init: ", rooms, roomGroups, serverEvents);

        let newDatas = insertServerEvent(getDatas(rooms, roomGroups), serverEvents)
        setData(newDatas)
    }

    const getDatas = (rooms, roomGroups) => {
        let newDatas = []
        if (rooms && rooms.length > 1) rooms.sort((a, b) => a.Position - b.Position)
        if (roomGroups) {
            roomGroups.push({ Id: 0, Name: "Others" })
            roomGroups.forEach(roomGroup => {
                let roomsInside = rooms.filter(room => room.RoomGroupId == roomGroup.Id)
                if (roomsInside && roomsInside.length > 0) {
                    newDatas.push({ ...roomGroup, isGroup: true })
                    newDatas = newDatas.concat(roomsInside)
                }
            })
        }
        else
            newDatas = [...rooms]

        return newDatas
    }

    const insertServerEvent = (newDatas, serverEvents) => {
        console.log("newDatas: ", newDatas);

        newDatas.forEach(data => {
            let listFiters = serverEvents.filter(serverEvent => serverEvent.RoomId == data.Id)
            console.log("list: ", listFiters);
            if (listFiters && listFiters.length > 0)
                data.Total = listFiters.map(elm => elm.JsonContent.Total ? elm.JsonContent.Total : 0)
                    .reduce((sum, total) => total + sum)
        })
        console.log("newDatas: ", newDatas);


        return newDatas
    }

    return (
        <View>
            <ScrollView >
                <View style = {styles.containerRoom}>
                { datas ? 
                datas.map( data =>
                    data.isGroup ? renderRoomGroup(data) :renderRoom(data)
                ): null
                }
                </View>
            </ScrollView>
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
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    room: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
        alignItems: "center",
        width: 80, height: 80,
        borderBottomColor: "#ddd", borderBottomWidth: 1
    },
    roomGroup: {
        backgroundColor: "white",
        marginVertical: 8,
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