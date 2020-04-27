import React from 'react';
import { ActivityIndicator, Image, View, StyleSheet, Picker, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { currencyToString } from '../../common/Utils';
import Images from '../../theme/Images';
import { useSelector } from 'react-redux';

export default (props) => {
    const { deviceType, orientaition } = useSelector(state => {
        console.log("useSelector state ", state);
        return state.Common
    });

    const onClickItem = () => {
        console.log('onClickItem');
        props.onClickProduct(props.item, props.index)
    }

    console.log('productitem render');

    return orientaition == "LANDSCAPE" ?
        (
            <TouchableOpacity onPress={onClickItem} key={props.item.Id.toString()} style={{ width: "24%", backgroundColor: "white", marginHorizontal: 3, marginBottom: 10, borderRadius: 10 }}>
                <View style={{  }}>
                    <Image
                        style={{ height: deviceType == "PHONE" ? 100 : 150, width: "100%", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                        source={JSON.parse(props.item.ProductImages).length > 0 ? { uri: JSON.parse(props.item.ProductImages)[0].ImageURL } : Images.default_food_image}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text numberOfLines={3} style={{ textTransform: "uppercase", fontWeight: "bold", paddingVertical: 5 }}>{props.item.Name}</Text>
                        <Text style={{ paddingVertical: 5, fontStyle: "italic" }}>{currencyToString(props.item.Price)}</Text>
                    </View>
                </View>
                {props.item.quantity > 0 ?
                    <Image style={{ height: 30, width: 30, position: "absolute", top: 10, right: 10 }}
                        source={Images.icon_checked} /> :
                    null}
            </TouchableOpacity>
        )
        :
        (
            <TouchableOpacity onPress={onClickItem} style={{ flex: 1, flexDirection: "row", backgroundColor: "white", paddingVertical: 10, margin: 5, borderRadius: 10 }}>
                <Image
                    style={{ height: 70, width: 70, borderRadius: 50 }}
                    source={JSON.parse(props.item.ProductImages).length > 0 ? { uri: JSON.parse(props.item.ProductImages)[0].ImageURL } : Images.default_food_image}
                />
                <View style={{ flexDirection: "column", flex: 2, marginLeft: 10, justifyContent: "center" }}>
                    <Text numberOfLines={3} style={{ textTransform: "uppercase", fontWeight: "bold" }}>{props.item.Name}</Text>
                    <Text style={{ paddingVertical: 5, fontStyle: "italic" }}>{currencyToString(props.item.Price)}</Text>
                </View>
                <View style={{ flex: 1.5, flexDirection: "row", justifyContent: "space-around", alignItems: "center", }}>

                    {props.item.quantity > 0 ?
                        <>
                            <TouchableOpacity onPress={() => { props.handleButtonIncrease(props.item, props.index) }}>
                                <Text style={[styles.button]}>+</Text>
                            </TouchableOpacity>
                            <Text>{props.item.quantity}</Text>
                            <TouchableOpacity onPress={() => { props.handleButtonDecrease(props.item, props.index) }}>
                                <Text style={[styles.button]}>-</Text>
                            </TouchableOpacity>
                        </> :
                        null}

                </View>
            </TouchableOpacity>
        );
}

const styles = StyleSheet.create({
    renderCateItem: { width: 200, height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 10, marginHorizontal: 5 },
    textRenderCateItem: { fontWeight: "bold", textTransform: "uppercase", textAlign: "center", paddingHorizontal: 5 },
    button: { borderWidth: 1, padding: 20, borderRadius: 10 },
});