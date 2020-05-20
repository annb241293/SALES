import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Colors, Metrics, Images } from '../../theme'
import realmStore from '../../data/realm/RealmStore';
import I18n from '../../common/language/i18n';
import dataManager from '../../data/DataManager';


export default (props) => {

    const [topping, setTopping] = useState([])
    const [categories, setCategories] = useState([])
    const [listCateId, setlistCateId] = useState([-1])
    const [itemOrder, setItemOrder] = useState(() => props.itemOrder)
    const [listTopping, setListTopping] = useState([])


    useEffect(() => {
        const getTopping = async () => {
            let newCategories = [{ Id: -1, Name: I18n.t('tat_ca') }]
            let newTopping = []
            let results = await realmStore.queryTopping()
            console.log(results, 'getTopping');
            results.forEach(item => {
                if (item.ExtraGroup !== '' && newCategories.filter(cate => cate.Name == item.ExtraGroup).length == 0) {
                    newCategories.push({ Id: item.Id, Name: item.ExtraGroup })
                }
                newTopping.push({ ...JSON.parse(JSON.stringify(item)), Quantity: 0 })
            })
            setCategories(newCategories)
            setTopping(newTopping)
        }
        const init = () => {
            dataManager.listTopping.forEach(item => {
                if (item.IdRoom == props.route.params.room.Id) {
                    setListTopping([...item.Data])
                }
            })
        }
        getTopping()
        init()
    }, [])

    useEffect(() => {
        setItemOrder(props.itemOrder)
    }, [props.itemOrder])

    useEffect(() => {
        console.log(props.position, 'props.position');

    }, [props.position])


    useEffect(() => {
        let exist = false
        listTopping.forEach(lt => {
            if (lt.Id == itemOrder.Id && lt.Key == props.position) {
                exist = true
                mergeTopping(lt.List)
            }
        })
        if (!exist) {
            resetTopping()
        }
    }, [itemOrder, listTopping, props.position])

    const mergeTopping = (list) => {
        resetTopping()
        console.log('mergeTopping', list);
        topping.forEach(top => {
            list.forEach(ls => {
                if (top.Id == ls.Id) {
                    top.Quantity = ls.Quantity
                }
            })
        })
        setTopping([...topping])
    }

    const resetTopping = () => {
        topping.forEach(item => {
            item.Quantity = 0
        })
        setTopping([...topping])
    }

    const onclose = () => {
        props.onClose()
    }

    const handleButtonDecrease = (item, index) => {
        topping[index].Quantity += 1;
        setTopping([...topping])
        saveListTopping()
    }

    const handleButtonIncrease = (item, index) => {
        if (item.Quantity == 0) {
            return
        }
        topping[index].Quantity -= 1;
        setTopping([...topping])
        saveListTopping()
    }

    const saveListTopping = () => {
        console.log('saveListTopping');
        let exist = false
        let ls = topping.filter(item => item.Quantity > 0)
        ls = JSON.parse(JSON.stringify(ls))
        listTopping.forEach(lt => {
            if (lt.Id == itemOrder.Id && lt.Key == props.position) {
                exist = true
                lt.List = [...ls]
                lt.Key = props.position
            }
        })
        if (!exist) {
            listTopping.push({ Id: itemOrder.Id, List: [...ls], Key: props.position })
        }
        saveData()
        props.outputListTopping(ls)

    }

    const saveData = () => {
        let exist = false
        dataManager.listTopping.forEach(data => {
            if (data.IdRoom == props.route.params.room.Id) {
                exist = true
                data.Data = listTopping
            }
        })
        if (!exist) {
            dataManager.listTopping.push({ IdRoom: props.route.params.room.Id, Data: listTopping })
        }
        console.log(dataManager.listTopping, 'dataManager.listTopping');

    }

    const renderCateItem = (item, index) => {
        let isSelected = item.Id == listCateId[0] ? "orange" : "black";
        return (
            <TouchableOpacity onPress={() => { setlistCateId([item.Id]) }}
                key={index} style={[styles.cateItem, { borderColor: isSelected }]}>
                <Text style={{ color: isSelected }}>{item.Name}</Text>
            </TouchableOpacity>
        )
    }

    const renderTopping = (item, index) => {
        return (
            <View key={item.Id} style={[styles.toppingItem, { backgroundColor: item.Quantity > 0 ? "red" : "green" }]}>
                <View style={{ flex: 3 }}>
                    <Text numberOfLines={2} style={{}}>{item.Name}</Text>
                    <Text numberOfLines={2} style={{}}>{item.Price}</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 2, justifyContent: "space-between", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => { handleButtonDecrease(item, index) }}>
                        <Text style={styles.button}>+</Text>
                    </TouchableOpacity>
                    <Text>{item.Quantity}</Text>
                    <TouchableOpacity onPress={() => { handleButtonIncrease(item, index) }}>
                        <Text style={styles.button}>-</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 45, backgroundColor: Colors.colorchinh, flexDirection: "row" }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>{itemOrder ? itemOrder.Name : ''}</Text>
                </View>
                <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
                    <Text>Topping</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                    <TouchableOpacity style={{}} onPress={() => { onclose() }}>
                        <Text style={{ fontStyle: "italic", paddingHorizontal: 5 }}>Đóng</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{}}>
                <View>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        renderItem={({ item, index }) => renderCateItem(item, index)}
                        keyExtractor={(item, index) => '' + index}
                        extraData={listCateId} />
                </View>
                <View style={{}}>
                    <FlatList
                        data={topping}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => renderTopping(item, index)}
                        keyExtractor={(item, index) => '' + index}
                        extraData={topping.Quantity} />
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    cateItem: { borderWidth: 0.5, padding: 15, margin: 5, borderRadius: 10 },
    toppingItem: { flex: 1, flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 0.5, paddingHorizontal: 10, paddingVertical: 20, alignItems: "center", },
    button: { borderWidth: 1, padding: 20, borderRadius: 10 },
})
