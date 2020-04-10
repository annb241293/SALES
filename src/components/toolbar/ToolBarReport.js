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
import I18n from '../../common/language/i18n';
import ModalTemplate from "../dialog/Modal";
import { getFileDuLieuString } from "../../common/FileStorage"
import { Constant } from "../../common/Constant";

const ALL = I18n.t("tat_ca");

export default class ToolBarReport extends Component {

    constructor(props) {
        super(props);
        this.onClickBack = this.onClickBack.bind(this);
        this.state = {
            showModal: false,
            itemRoomGroup: { Id: 0, Name: ALL },
            currentBranch: {},
            listBranch: [],
        }
        this.initBranch()
    }

    setBranch(branch) {
        this.setState({ currentBranch: branch })
    }

    onClickBack = () => {
        if (this.props.onClickBack) {
            this.props.onClickBack();
        } else {
            this.props.navigation.pop();
        }
    };

    initBranch = async () => {
        let listBranch = await getFileDuLieuString(Constant.BRANCH, true);
        listBranch = JSON.parse(listBranch);
        this.setState({
            listBranch: listBranch
        })
    }

    onSubmitBranch(item) {
        console.log("onSelectBranch ", item);
        this.setState({
            showModal: false,
            currentBranch: item
        })
        this.props.outputSelectBranch(item);
    }

    renderChildModal(data) {
        console.log("renderChildModal data ", JSON.stringify(data));
        if (data.length > 0) {
            return (
                <View >
                    {
                        data ?
                            data.map(item => {
                                return (
                                    <TouchableOpacity key={item.Id} onPress={() => this.onSubmitBranch(item)} style={{ alignItems: 'center', padding: 10 }}>
                                        <Text>{item.Name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                            : null
                    }
                </View>

            )
        }
    }

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

                        <TouchableOpacity onPress={() => { this.setState({ showModal: true }) }}
                            style={{ flex: 5, flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }}>
                            <Image source={Images.icon_placeholder_white} style={{ width: 15, height: 20 }} />
                            <Text style={{ color: "white", marginLeft: 7, marginRight: 5 }}>{this.state.currentBranch.Name}</Text>
                        </TouchableOpacity>

                        {/* <View style={{ flex: 1, alignItems: "flex-end" }}>

                            {
                                this.props.rightIcon &&
                                (
                                    <IconButton icon={this.props.icon} onPress={() => this.props.onClickRightIcon} size={24} />
                                )
                            }
                        </View> */}
                    </View>
                    <View>
                        <ModalTemplate
                            // onClickOption={(item) => this.onSelectBranch(item)}
                            visible={this.state.showModal}
                            title={this.state.titleModalSelect ? this.state.titleModalSelect : ""}
                            viewChild={this.renderChildModal(this.state.listBranch)}
                            onPress={() => {
                                this.setState({ showModal: false })
                            }} />
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

ToolBarReport.propTypes = {
    showIconBack: PropTypes.bool
}

ToolBarReport.defaultProps = {
    showIconBack: true
}
