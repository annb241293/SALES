import React, { Component } from 'react'
import FadeInView from '../animate/FadeInView'
import { Colors, Fonts, Metrics } from '../../theme'
import {
    StyleSheet, View, TouchableWithoutFeedback, Text, StatusBar
} from 'react-native'
import I18n from '../../common/language/i18n'
import { Paragraph, Dialog, Button, Subheading } from 'react-native-paper';
import color from 'color';


export default class HopThoai extends Component {


    handleClickOutside() {

        this.props.dismissOnTouchOutside ? this.props.dismiss() : null
    }

    handleClickOk() {
        if (this.props.callback) {
            this.props.callback(1)
        }

        this.props.dismiss()

    }
    handleClickCancle() {
        if (this.props.callback) {
            this.props.callback(0)
        }
        this.props.dismiss()
    }

    render() {


        return (

            <FadeInView style={[styles.container, styles.ovelap]}>
                <StatusBar animated barStyle="light-content" backgroundColor={color(Colors.colorchinh).darken(0.5).rgb().string()} />
                <TouchableWithoutFeedback
                    onPress={() => this.handleClickOutside()}
                    style={styles.ovelap}>
                    <View style={[styles.ovelap, { backgroundColor: '#000', opacity: .5 }]}></View>

                </TouchableWithoutFeedback>

                <View style={{
                    backgroundColor: "#fff", borderRadius: 4, marginHorizontal: 24,
                    minWidth: Metrics.screenWidth * 0.7
                }}>

                    <Dialog.Title>
                        {this.props.title ? this.props.title : I18n.t('thong_bao')}
                    </Dialog.Title>

                    <Dialog.Content>
                        <Paragraph style={{
                            // fontSize: Fonts.size.covuanhohon,
                            letterSpacing: 0.15, lineHeight: 24
                        }}>
                            {this.props.content}
                        </Paragraph>
                    </Dialog.Content>

                    <Dialog.Actions>
                        {/* <Icon name='close'/> */}
                        {!this.props.one ?
                            <Button
                                color={Colors.text}
                                onPress={() => this.handleClickCancle()}
                            >
                                <Text style={{
                                    fontSize: Fonts.size.mainSize,
                                }}>
                                    {this.props.label1 ?
                                        this.props.label1.toUpperCase()
                                        :
                                        I18n.t('huy').toUpperCase()
                                    }
                                </Text>
                            </Button>
                            : null
                        }
                        <Button
                            color={Colors.colorBlueText}
                            onPress={() => this.handleClickOk()}
                        >
                            <Text style={{ fontSize: Fonts.size.mainSize }}>
                                {this.props.label2 ?
                                    this.props.label2.toUpperCase()
                                    :
                                    I18n.t('dong_y').toUpperCase()
                                }
                            </Text>
                        </Button>
                    </Dialog.Actions>

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
    },
    titleTextStyle: {
        fontSize: Fonts.size.colon,
        color: Colors.colorPopupTitle,
        // fontFamily: Fonts.style.medium,
    },
    contentText: {
        paddingVertical: 24,
        fontSize: Fonts.size.covua,
        color: Colors.mainTextColor
    },
    buttonText: {
        margin: 0,
        minWidth: 60,
    },
    touchButton: {
        width: 80, height: 40,
        borderColor: Colors.mainTextColor, justifyContent: 'center', alignItems: 'center'
    }

})
