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

export default (props) => {

    const [tabType, setTabType] = useState(1);

    return (
        <View style={{ flex: 1 }}>
            <ToolBarPrintHtml
                navigation={props.navigation} title="Print HTML"
                clickDefault={() => { setTabType(1) }}
                clickLoadOnline={() => { setTabType(2) }}
                clickShow={() => { setTabType(3) }}
            />
            {
                tabType == 1 ?
                    <DefaultComponent />
                    : (tabType == 2 ? <OnlineComponent /> : <WebviewComponent />)
            }
        </View>
    );
};

const DefaultComponent = () => {
    const [contentHtml, setContentHtml] = useState(htmlDefault);
    return (
        <ScrollView style={{ flex: 1 }}>
            <TextInput style={{
                margin: 10,
                flex: 1,
            }} multiline={true} onChangeText={text => {
                setContentHtml(text)
            }} value={contentHtml} />
        </ScrollView>
    )
}

const OnlineComponent = () => {

    const [dataHTML, setDataHTML] = useState("");
    const onClickLoadOnline = useCallback(() => {
        dialogManager.showLoading();
        let params = {};
        new HTTPService().setPath(ApiPath.PRINT_TEMPLATES).GET(params).then((res) => {
            console.log("onClickLoadOnline res ", res);
            setDataHTML(res.Content)
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
        <ScrollView style={{ flex: 1 }}>
            <TextInput style={{
                margin: 10,
                flex: 1,
            }} multiline={true} onChangeText={text => {
                setDataHTML(text)
            }} value={dataHTML} />
        </ScrollView>
    )
}

const WebviewComponent = () => {

    useEffect(() => {
        dialogManager.showLoading();
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: 'https://reactnative.dev/docs/webview.html' }}
                style={{ marginTop: 0 }}
                onError={syntheticEvent => {
                    dialogManager.hiddenLoading();
                }}
                onLoadEnd={syntheticEvent => {
                    dialogManager.hiddenLoading();
                }}
            />
        </View>
    )
}
