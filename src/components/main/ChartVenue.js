import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, AppState, Dimensions, Platform } from "react-native";
import I18n from '../../common/language/i18n'
import { ScreenList, NavigateScreen } from "../../common/ScreenList";
import { currencyToString } from "../../common/Utils";

export const ChartVenue = (props) => {
    console.log("ChartVenue props ", props);
    const { data, navigation } = props;
    console.log("ChartVenue data ", data);

    return (
        <View style={{ flexDirection: "row", backgroundColor: "#fff", paddingVertical: 20 }}>
            <TouchableOpacity onPress={() => props.outputSelectScreen(ScreenList.BillComponent)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#0072bc", height: 95, width: 95, borderRadius: 48 }}>
                    <Text style={{ color: "#fff" }}>{I18n.t('hoa_don')}</Text>
                    <Text style={{ color: "#fff", fontWeight: "bold", marginTop: 5 }}>{data.AllOrders ? data.AllOrders : 0}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.outputSelectScreen(ScreenList.BillComponent)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#0072bc", height: 110, width: 110, borderRadius: 55 }}>
                    <Text style={{ color: "#fff" }}>{I18n.t('doanh_thu')}</Text>
                    <Text style={{ color: "#fff", fontWeight: "bold", marginTop: 5 }}>{data.AllRevenue ? data.AllRevenue / 1000000 > 1 ? `${(data.AllRevenue / 1000000).toFixed(2)} ${I18n.t("trieu")}` : `${currencyToString(data.AllRevenue / 1000)} K` : 0} </Text>
                </View>
            </TouchableOpacity>
            {
                props.showUse && props.showUse == true ?
                    <TouchableOpacity onPress={() => props.outputSelectScreen(ScreenList.RoomScreen)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#0072bc", height: 95, width: 95, borderRadius: 48 }}>
                            <Text style={{ color: "#fff" }}>{I18n.t('su_dung')}</Text>
                            <Text style={{ color: "#fff", fontWeight: "bold", marginTop: 5 }}>{data.Table ? data.Table : 0}/{data.TableCount ? data.TableCount : 0}</Text>
                        </View>
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={() => props.outputSelectScreen(ScreenList.returnGoodsComponent)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#0072bc", height: 95, width: 95, borderRadius: 48 }}>
                            <Text style={{ color: "#fff" , textAlign: "center"}}>{I18n.t('tra_hang')}</Text>
                            <Text style={{ color: "#fff", fontWeight: "bold", marginTop: 5 }}>{data.AllReturn ? data.AllReturn / 1000000 > 1 ? `${(data.AllReturn / 1000000).toFixed(2)} ${I18n.t("trieu")}` : `${currencyToString(data.AllReturn / 1000)} K` : 0}</Text>
                        </View>
                    </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({

});