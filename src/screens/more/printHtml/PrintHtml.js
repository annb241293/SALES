import React from 'react';
import { Image, View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import ToolBarPrintHtml from '../../../components/toolbar/ToolBarPrintHtml';
import { Images, Colors } from '../../../theme';

export default (props) => {
    return (
        <View style={{ flex: 1 }}>
            <ToolBarPrintHtml
                navigation={props.navigation} title="Print HTML"
                clickDefault={() => { alert("clickDefault") }}
                clickLoadOnline={() => { alert("clickLoadOnline") }}
                clickShow={() => { alert("clickShow") }}
            />

        </View>
    );
};

const HeaderComponent = () => {
    return (
        <View style={{ backgroundColor: Colors.colorchinh, justifyContent: "space-between", flexDirection: "row", alignItems: "center", padding: 20 }}>
            <View >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={Images.icon_person} style={[{ width: 50, height: 50, marginRight: 20 }]} />
                    <Text style={{ marginTop: 10 }}>An NB</Text>
                </View>
                <Text style={{ marginTop: 15 }}>Chi nhánh</Text>
            </View>
            <Text style={{ textDecorationLine: "underline" }}>Đăng xuất</Text>
        </View>

    )
}

const WebviewComponent = () => {
    return (
        <View style={{ padding: 20, borderBottomWidth: 0.5, borderBottomColor: "#ddd" }}>
            <Text style={{ color: Colors.colorchinh, fontSize: 18 }}>Print setup</Text>
            <TouchableOpacity onPress={() => alert("okÏ")}>
                <Text style={{ marginTop: 20 }}>HTML print</Text>
            </TouchableOpacity>
        </View>
    )
}
