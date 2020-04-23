import React, { useState, useCallback, useEffect } from 'react';
import { Image, View, StyleSheet, Button, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import ToolBarPrintHtml from '../../../components/toolbar/ToolBarPrintHtml';
import { Images, Colors } from '../../../theme';
import { WebView } from 'react-native-webview';
import htmlDefault from '../../../data/html/htmlDefault';
import useDidMountEffect from '../../../customHook/useDidMountEffect';
import dialogManager from '../../../components/dialog/DialogManager';
import { HTTPService } from '../../../data/services/HttpService';
import { ApiPath } from '../../../data/services/ApiPath';
import ToolBarPreviewHtml from '../../../components/toolbar/ToolBarPreviewHtml';
import JsonContent from '../../../data/json/data_print_demo'

const typeHeader = "HOÁ ĐƠN TEST PRINT"
const code = "HD000000"
const number = "0000"

export default (props) => {

    const [tabType, setTabType] = useState(1);
    const [data, setData] = useState("");
    useEffect(() => {
        console.log("Preview props", props);
        setData(props.route.params.data)
        handleDataHtml(props.route.params.data)
        // dialogManager.showLoading();
    }, [])

    function handleDataHtml(html) {

        let a = html;
        let img = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSIuO5sD12YBt1kb2maush-SfeA_0dpmCC5_0o3KLdimgcvT58q&usqp=CAU";
        if (img != "") {
            a = a.replace("{Logo_Full}", img)
            a = a.replace("{Logo_Full_Check}", `style="visibility: 'unset'"`)
        } else {
            a = a.replace("{Logo_Full_Check}", `style="visibility: 'collapse'"`)
        }
        a = a.replace("{Ten_Cua_Hang}", "Pos 365 shop")
        a = a.replace("{Dia_Chi_Cua_Hang}", "88 Láng Hạ")
        a = a.replace("{Dien_Thoai_Cua_Hang}", "19005152")
        a = a.replace("{Loai_Hoa_Don}", typeHeader)
        a = a.replace("{Ma_Chung_Tu}", code)
        a = a.replace("{Ngay_Tao_Karaoke}", number)

        a = a.replace("{Ten_Phong_Ban}", JsonContent.RoomName + "[" + JsonContent.Pos + "]")
        a = a.replace("{Ten_Khach_Hang}", JsonContent.partner && JsonContent.partner.name != "" ? JsonContent.partner.name : "Khách lẻ")
        a = a.replace("{Nhan_Vien}", "Admin")

        a = a.replace("{Tong_Truoc_Chiet_Khau}", number)
        a = a.replace("{Ten_Phong_Ban}", number)
        a = a.replace("{Ten_Phong_Ban}", number)
        a = a.replace("{Ten_Phong_Ban}", number)
        a = a.replace("{Ghi_Chu}", number)

        a = a.replace("{Chan_Trang}", number)
        a = a.replace("{FOOTER_POS_365}", number)
        
        setData(a)
        return a;
    }

    function clickCheck() {
        alert("clickCheck")
    }

    function clickPrint() {
        alert("clickPrint")
    }

    return (
        <View style={{ flex: 1 }}>
            <ToolBarPreviewHtml
                navigation={props.navigation} title="HTML"
                clickPrint={() => clickPrint()}
                clickCheck={() => clickCheck()}
            />
            <WebView
                source={{ html: data }}
                style={{ marginTop: 0, flex: 1 }}
                onError={syntheticEvent => {
                    dialogManager.hiddenLoading();
                }}
                onLoadEnd={syntheticEvent => {
                    dialogManager.hiddenLoading();
                }}
            />
        </View>
    );
};
