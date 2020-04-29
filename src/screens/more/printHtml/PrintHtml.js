import React, { useState, useCallback, useEffect } from 'react';
import { Image, View, StyleSheet, Button, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import ToolBarPrintHtml from '../../../components/toolbar/ToolBarPrintHtml';
import { Images, Colors, Metrics } from '../../../theme';
import { WebView } from 'react-native-webview';
import HtmlDefault from '../../../data/html/HtmlDefault';
import useDidMountEffect from '../../../customHook/useDidMountEffect';
import dialogManager from '../../../components/dialog/DialogManager';
import { HTTPService } from '../../../data/services/HttpService';
import { ApiPath } from '../../../data/services/ApiPath';

export default (props) => {

    const [tabType, setTabType] = useState(1);
    const [dataDefault, setDataDefault] = useState("");
    const [dataOnline, setDataOnline] = useState("");

    return (
        <View style={{ flex: 1 }}>
            <ToolBarPrintHtml
                navigation={props.navigation} title="Print HTML"
                clickDefault={() => { setTabType(1) }}
                clickLoadOnline={() => { setTabType(2) }}
                clickShow={() => { props.navigation.navigate("Preview", { data: tabType == 1 ? dataDefault : dataOnline }) }}
            />
            {
                tabType == 1 ?
                    <DefaultComponent output={(text) => setDataDefault(text)} />
                    : <OnlineComponent output={(text) => setDataOnline(text)} />
            }
        </View>
    );
};

const DefaultComponent = (props) => {
    const [contentHtml, setContentHtml] = useState(HtmlDefault);

    useEffect(() => {
        props.output(contentHtml)
    }, [])

    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <TextInput style={{
                margin: 10,
                flex: 1,
                width: Metrics.screenWidth - 5,
                height: Metrics.screenHeight - 50
            }} multiline={true} onChangeText={text => {
                props.output(text)
                setContentHtml(text)
            }} value={contentHtml} />
        </ScrollView>
    )
}

const OnlineComponent = (props) => {

    const [dataHTML, setDataHTML] = useState("");
    const onClickLoadOnline = useCallback(() => {
        dialogManager.showLoading();
        let params = {};
        new HTTPService().setPath(ApiPath.PRINT_TEMPLATES + "/10").GET(params).then((res) => {
            console.log("onClickLoadOnline res ", res);
            setDataHTML(res.Content)
            props.output(res.Content)
            dialogManager.hiddenLoading()
        }).catch((e) => {
            console.log("onClickLoadOnline err ", e);
            dialogManager.hiddenLoading()
        })
    }, [])

    useEffect(() => {
        onClickLoadOnline()
    }, [])

    return (
        <View style={{ flex: 1 }} >
            <TextInput style={{
                margin: 10,
                flex: 1,
                width: Metrics.screenWidth - 5,
                height: Metrics.screenHeight - 50
            }} multiline={true} onChangeText={text => {
                props.output(text)
                setDataHTML(text)
            }} value={dataHTML} />
        </View>
    )
}
