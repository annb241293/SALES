

import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, StyleSheet,
    StatusBar, Keyboard, Linking, Platform, SafeAreaView
} from 'react-native';
import { Colors, Metrics, Images } from '../../theme'
import { IconButton, Subheading } from "react-native-paper";
import Fonts from '../../theme/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

export default class ToolBarDefault extends Component {

    constructor(props) {
        super(props);
        this.onClickBack = this.onClickBack.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //  console.log("ToolBarDefault componentWillReceiveProps nextProps ", nextProps);
        //  console.log("Main Platform.Version ", Platform.Version);
        // if (nextProps.showIconBack != undefined && !nextProps.showIconBack) {
        //     console.log("ToolBarDefault componentWillReceiveProps showIconBack ok");
        //     this.setState({ showIconBack: false })
        // }
    }

    onClickBack = () => {
        if (this.props.onClickBack) {
            this.props.onClickBack();
        } else {
            this.props.navigation.pop();
        }
    };

    render() {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#FFAB40', '#FF5722']}
                style={{ height: 44 }}
            >
                <View style={styles.toolbarContainer}>
                    <StatusBar barStyle="light-content" backgroundColor={Colors.colorchinh} />
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    >

                        <View style={{ flex: 1 }}>
                            {this.props.showIconBack && <IconButton delayPressIn={0} icon="arrow-back" onPress={this.onClickBack} size={24} />}
                        </View>
                        <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                            <Subheading
                                numberOfLines={1}
                                style={{
                                    fontFamily: Fonts.style.medium,
                                    color: 'white'
                                }}
                            >
                                {this.props.title}
                            </Subheading>

                        </View>

                        <View style={{ flex: 1, alignItems: "flex-end" }}>

                            {
                                this.props.rightIcon &&
                                (
                                    <IconButton icon={this.props.icon} onPress={() => this.props.onClickRightIcon} size={24} />
                                )
                            }
                        </View>
                    </View>
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({

    toolbarContainer: {
        height: 44,
        flex: 1,
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

ToolBarDefault.propTypes = {
    showIconBack: PropTypes.bool
}

ToolBarDefault.defaultProps = {
    showIconBack: true
}
