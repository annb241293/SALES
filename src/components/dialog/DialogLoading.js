import React, { Component } from 'react'
import FadeInView from '../animate/FadeInView'
import { Metrics, Images, Colors, Fonts } from "../../theme";
import {
    StyleSheet,
    View, Image
} from 'react-native'

export default class DialogLoading extends Component {
    render() {
        return (
            <FadeInView style={[styles.container, styles.ovelap]}>
                <View style={[styles.ovelap, { backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: .7, justifyContent: 'center', alignItems: 'center' }]}></View>
                <View style={{ width: 100, height: 100, backgroundColor: '#fff', borderRadius: 50, borderColor: '#fff' }}>
                    <Image source={Images.icon_load} style={{ width: 100, height: 100}} resizeMode="contain" />
                </View>
                <View style={[styles.ovelap, { justifyContent: 'center', alignItems: 'center' }]}>
                </View>
            </FadeInView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',

    },
    ovelap: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
})