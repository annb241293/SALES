

import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, StyleSheet,
    StatusBar, TextInput
} from 'react-native';
import { Colors, Metrics, Images } from '../../theme'
import { IconButton, Subheading } from "react-native-paper";
import Fonts from '../../theme/Fonts';
export default class ToolBarSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showIconBack: true,
            showInputSearch: false,
            text: ""
        }
        this.onClickBack = this.onClickBack.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showIconBack != undefined && !nextProps.showIconBack) {
            this.setState({ showIconBack: false })
        }
    }

    onClickBack = () => {
        if (this.props.onClickBack) {
            this.props.onClickBack();
        } else {
            this.props.navigation.pop();
        }
    };

    onClickSearch = () => {
        this.setState({ text: "", showInputSearch: true })
    }

    onChangeText(text) {
        console.log("onChangeText text ", text);
        this.setState({ text })
    }

    onSubmitEditing() {
        console.log("onSubmitEditing ", this.state.text);
        this.setState({ showInputSearch: false }, () => {
            this.props.outputTextInToolBarSearch(this.state.text)
        })
    }

    render() {
        return (
            <View style={styles.toolbarContainer}>
                <StatusBar barStyle="light-content" backgroundColor={Colors.colorchinh} />
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                >
                    <View style={{ flex: 1 }}>
                        {this.state.showIconBack && <IconButton delayPressIn={0} icon="arrow-back" onPress={this.onClickBack} size={24} />}
                    </View>
                    <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        {this.state.showInputSearch == true ?
                            <View style={{ padding: 3, flex: 1, borderRadius: 3, borderColor: "#fff", borderWidth: 1, backgroundColor: "#fff", flexDirection: "row", marginRight: 20 }}>
                                <TextInput style={{ padding: 0, flex: 1 }}
                                    placeholder={this.props.placeholder ? this.props.placeholder : ""}
                                    value={this.state.text}
                                    autoFocus={true}
                                    onSubmitEditing={() => this.onSubmitEditing()}
                                    onChangeText={(text) => this.onChangeText(text)} />
                                <IconButton delayPressIn={0} icon="close" onPress={() => this.setState({ showInputSearch: false })} size={24} style={{ margin: 0 }} />
                            </View>

                            :
                            <Subheading
                                numberOfLines={1}
                                style={{
                                    fontFamily: Fonts.style.medium,
                                    color: "white"
                                }}
                            >
                                {this.props.title}
                            </Subheading>
                        }
                    </View>
                    {this.state.showInputSearch == false ?
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            {/* <Image source={Images.icon_search} style={{width: 24, height: 24}}/> */}
                            <IconButton delayPressIn={0} icon="search" onPress={this.onClickSearch} size={24} />
                        </View>
                        : null
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    toolbarContainer: {
        height: 56,
        // flex: 1,
        backgroundColor: Colors.colorchinh,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.24,
        shadowRadius: 0.3,
    },

    image: {
        width: 20, height: 20, marginRight: 15, resizeMode: 'contain'
    }
})
