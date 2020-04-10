import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, AppState, Dimensions, Platform } from "react-native";

export const PopularProducts = (props) => {
    console.log("PopularProducts props ", props);
    const { data } = props;
    return (
        <View>
            {
                data.length > 0 ?
                    data.map(item => {
                        return (
                            <View key={item.ProductId} style={{ flexDirection: "row", backgroundColor: "#fff", padding: 10, borderBottomColor: "#ddd", borderBottomWidth: 1 }}>
                                <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}>
                                    <Text style={{ color: "#000" }}>{item.Name ? item.Name : ""}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                                    <Text style={{ color: "#000" }}>{item.Quantity}</Text>
                                </View>
                            </View>
                        )
                    })
                    : null
            }
        </View>
    )
}

const styles = StyleSheet.create({

});