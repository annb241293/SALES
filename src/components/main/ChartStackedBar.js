import React, { Component, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, AppState, Dimensions, Platform, ScrollView } from "react-native";
import { StackedBarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'
import { Colors, Metrics } from "../../theme";
import { currencyToString, dateToString } from "../../common/Utils";
import TextTicker from 'react-native-text-ticker';
import I18n from '../../common/language/i18n'

const colors = [Colors.colorchinh, "#808080", '#a55194', 'green', Colors.primary]

export class ChartStackerBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataChartBranch: [],
            keyBranchs: [],
            times: [],
            totalBranchs: [],
            totalSaleBranchs: [],
        }
        this.response = {}
        this.listBranch = []
        this.timeFormat = "DD/MM"
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    getData(data) {
        console.log("getData data ", data);
        this.response = data.res;
        this.listBranch = JSON.parse(data.listBranch);
        if (data.showHour == true) {
            this.timeFormat = "hh:mm"
        } else {
            this.timeFormat = "DD/MM"
        }
        this.handlerData()
    }

    handlerData() {
        console.log("handlerData this.listBranch ", this.listBranch)
        if (this.listBranch && this.listBranch.length > 0) {
            let totalSaleBranchs = [];
            let keyBranchs = [];
            let totalBranchs = [0];
            let dataChartBranch = [];
            let times = [];
            this.listBranch.forEach((element, index) => {
                let sum = 0;
                for (let item of this.response) {
                    let data = item.Data;
                    if (data["b_" + element.Id] && data["b_" + element.Id] != undefined && data["b_" + element.Id] != null) {
                        sum += data["b_" + element.Id]
                    }
                }
                keyBranchs.push(element.Id.toString())
                totalSaleBranchs.push({ IsSelect: index == 0 ? true : false, Id: element.Id, Name: element.Name, total: sum })
            });
            for (let item of this.response) {
                let data = item.Data;
                let list = [];
                let sum = 0;
                let obj = {};
                this.listBranch.forEach(element => {
                    if (element.Id == this.listBranch[0].Id && data["b_" + element.Id] && data["b_" + element.Id] != undefined && data["b_" + element.Id] != null) {
                        list.push(data["b_" + element.Id]);
                        sum += data["b_" + element.Id]
                        obj[element.Id] = data["b_" + element.Id];
                    } else {
                        list.push(0);
                        obj[element.Id] = 0;
                    }
                });
                dataChartBranch.push(obj)
                totalBranchs.push((sum / 1000000))
                times.push(dateToString(item.Subject.trim(), this.timeFormat))
            }
            console.log("handlerData data ", totalBranchs, keyBranchs, dataChartBranch, totalSaleBranchs, times);
            this.setState({ totalBranchs: totalBranchs, keyBranchs: keyBranchs, dataChartBranch: dataChartBranch, totalSaleBranchs: totalSaleBranchs, times: times });
        } else {
            this.setState({ totalBranchs: [], keyBranchs: [], dataChartBranch: [], totalSaleBranchs: [], times: [] });
        }
    }

    onClickBranch(itemBranch) {
        console.log("onClickBranch " + JSON.stringify(itemBranch));
        itemBranch.IsSelect = !itemBranch.IsSelect
        let totalBranchs = [0];
        let dataChartBranch = [];
        for (let item of this.response) {
            let data = item.Data;
            let sum = 0;
            let obj = {};
            this.state.totalSaleBranchs.forEach(element => {
                if (element.IsSelect == true && data["b_" + element.Id] && data["b_" + element.Id] != undefined && data["b_" + element.Id] != null) {
                    sum += data["b_" + element.Id]
                    obj[element.Id] = data["b_" + element.Id];
                } else {
                    obj[element.Id] = 0;
                }
            });
            dataChartBranch.push(obj)
            totalBranchs.push((sum / 1000000))
        }
        this.setState({ totalBranchs: totalBranchs, dataChartBranch: dataChartBranch })
    }

    render() {
        const left = this.state.times.length < 4 ? 120 : this.state.times.length > 4 && this.state.times.length < 10 ? 85 : 75
        return (
            <View style={{ flexDirection: "column", padding: 10, paddingTop: 0, marginTop: -5, justifyContent: "center" }}>
                {this.state.dataChartBranch && this.state.dataChartBranch.length > 0 ?
                    <View style={{ flexDirection: "row" }}>
                        {this.state.totalBranchs ?
                            <YAxis
                                style={{ height: 200, width: 50 }}
                                data={this.state.totalBranchs}
                                contentInset={{ top: 10, bottom: 10 }}
                                svg={{
                                    fill: 'grey',
                                    fontSize: 10,
                                }}
                                numberOfTicks={5}
                                formatLabel={(value) => `${value} ${I18n.t("trieu")}`}
                            /> : null}

                        <StackedBarChart
                            style={{ height: 200, flex: 1 }}
                            keys={this.state.keyBranchs ? this.state.keyBranchs : []}
                            colors={colors}
                            data={this.state.dataChartBranch ? this.state.dataChartBranch : []}
                            showGrid={false}
                            contentInset={{ top: 10, bottom: 10 }}
                            listTime={this.state.times ? this.state.times : []}
                            onClickPath={(data) => onClickPath(data)}
                        ><Grid /></StackedBarChart>

                    </View>
                    : null}
                {this.state.times && this.state.times.length > 0 ?
                    <XAxis
                        style={{ marginHorizontal: 0, height: 40 }}
                        data={this.state.times}
                        formatLabel={(value, index) => {
                            return this.state.times[`${index}`]
                        }}
                        contentInset={{ left: left, right: this.state.times.length < 10 ? 10 : this.state.times.length > 10 && this.state.times.length < 20 ? 0 : -10 }}
                        svg={{
                            fontSize: 10, fill: 'black', rotation: 35, originY: 0,
                            y: this.timeFormat == "DD/MM" ? 15 : 20
                        }}
                    />
                    : null}
                <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
                    {
                        this.state.totalSaleBranchs ?
                            this.state.totalSaleBranchs.map((item, index) => {
                                return (
                                    <TouchableOpacity style={{ width: (Metrics.screenWidth - 20) / 3, paddingHorizontal: 2 }} onPress={() => this.onClickBranch(item)} key={item.Id}>
                                        <View style={{ flexDirection: "column", marginTop: 5, alignItems: 'flex-start', borderColor: colors[index], borderRadius: 25, borderWidth: 1, opacity: (item.IsSelect == true) ? 1 : .2 }}>
                                            <View style={{ marginTop: -1, paddingHorizontal: 10, backgroundColor: colors[index], borderWidth: 1, borderColor: colors[index], borderTopLeftRadius: 25, borderTopRightRadius: 25, width: "100%", alignItems: "center" }}>
                                                <TextTicker
                                                    style={{
                                                        color: (item.IsSelect == true) ? "#fff" : "#000", paddingVertical: 3, fontSize: 12, textAlign: "center",
                                                    }}
                                                    duration={6000}
                                                    bounce={false}
                                                    marqueeDelay={1000}
                                                >
                                                    {item.Name}
                                                </TextTicker>
                                            </View>
                                            <Text style={{ padding: 3, paddingHorizontal: 10, fontSize: 12, textAlign: "center", width: "100%" }}>{currencyToString(item.total)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                            : null
                    }
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

});