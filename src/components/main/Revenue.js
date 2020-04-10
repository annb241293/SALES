import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, AppState, Dimensions, Platform } from "react-native";
import { currencyToString } from "../../common/Utils";
import I18n from '../../common/language/i18n';


export const ReVenue = (obj) => {
    console.log("ReVenue obj ", obj);
    const { data } = obj;
    console.log("ReVenue data ", data);
    return (
        <View style={{ marginBottom: 30 }}>
            <View style={{ flexDirection: "row", backgroundColor: "#fff", padding: 10, borderBottomColor: "#ddd", borderBottomWidth: 1 }}>
                <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}>
                    <Text style={{ color: "#000", fontWeight: "bold" }}>{I18n.t("tong_doanh_thu")}</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                    <Text style={{ color: "#000", fontWeight: "bold" }}>{currencyToString(data.AllRevenue)}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", backgroundColor: "#fff", padding: 10, borderBottomColor: "#ddd", borderBottomWidth: 1 }}>
                <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}>
                    <Text style={{ color: "#000" }}>{I18n.t("tien_mat")}</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                    <Text style={{ color: "#000" }}>{currencyToString(data.AllCash)}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", backgroundColor: "#fff", padding: 10, borderBottomColor: "#ddd", borderBottomWidth: 1 }}>
                <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}>
                    <Text style={{ color: "#000" }}>{I18n.t("the_ghi_no")}</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                    <Text style={{ color: "#000" }}>{currencyToString(data.AllDebt)}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", backgroundColor: "#fff", padding: 10, borderBottomColor: "#ddd", borderBottomWidth: 1 }}>
                <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}>
                    <Text style={{ color: "#000" }}>{I18n.t("tai_khoan_khac")}</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                    <Text style={{ color: "#000" }}>{currencyToString(data.AllOther)}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

});