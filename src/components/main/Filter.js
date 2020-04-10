import React, { Component, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, AppState, Dimensions, Platform } from "react-native";
import { Images } from "../../theme";
import { Switch } from 'react-native-paper';
import I18n from '../../common/language/i18n'

export const Filter = (props) => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
            <TouchableOpacity onPress={props.onClickDate} style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <Image source={Images.icon_calendar} style={{ width: 20, height: 20 }} />
                <Text style={{ color: "#000", marginLeft: 7 }}>{I18n.t(props.date.name)}</Text>
                <Image source={Images.icon_arrow_down} style={{ width: 14, height: 14, marginLeft: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onSelectBranch} style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                <Image source={Images.icon_placeholder} style={{ width: 15, height: 24 }} />
                <Text style={{ color: "#000", marginLeft: 7 }}>{I18n.t('chon_chi_nhanh')}</Text>
            </TouchableOpacity>
        </View>
    )
}

export const FilterRoom = (props) => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
            <TouchableOpacity onPress={props.onSelectGroups} style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <Image source={Images.icon_calendar} style={{ width: 20, height: 20 }} />
                <Text style={{ color: "#000", marginLeft: 7 }}>{props.groupName}</Text>
                <Image source={Images.icon_arrow_down} style={{ width: 14, height: 14, marginLeft: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onSelectBranch} style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                <Image source={Images.icon_placeholder} style={{ width: 15, height: 24 }} />
                <Text style={{ color: "#000", marginLeft: 7 }}>{props.branchName}</Text>
            </TouchableOpacity>
        </View>
    )
}

export const FilterReport = (props) => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
            <TouchableOpacity onPress={props.onClickDate} style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <Image source={Images.icon_calendar} style={{ width: 20, height: 20 }} />
                <Text style={{ color: "#000", marginLeft: 7 }}>{I18n.t(props.date.name)}</Text>
                <Image source={Images.icon_arrow_down} style={{ width: 14, height: 14, marginLeft: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>{I18n.t("tat_ca_san_pham")}</Text>
                <Switch
                    value={props.allProduct}
                    onValueChange={props.onValueChange}
                />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({

});