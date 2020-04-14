// import React, { Component } from "react";
// import { connect } from "react-redux";
// import {
//     NativeEventEmitter,
//     NativeModules,
//     View, Text, Image,
//     StyleSheet, TouchableOpacity, TextInput, Linking, Platform
// } from "react-native";
// import I18n from '../../common/language/i18n'
// import { Constant } from "../../common/Constant";
// import {
//     Snackbar,
// } from "react-native-paper";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { Images, Colors, Metrics } from "../../theme";
// import { ScreenList, NavigateScreen } from "../../common/ScreenList";
// import LinearGradient from 'react-native-linear-gradient';
// import { ApiPath } from "../../services/ApiPath";
// import { HTTPService, getHeaders, URL } from "../../services/HttpService";
// import { saveDeviceInfoToStore, updateStatusLogin, saveCurrentBranch, saveNotificationCount } from "../../actions/Common";
// import { getFileDuLieuString, setFileLuuDuLieu } from "../../common/FileStorage";
// import DialogManager from "../../components/dialog/DialogManager";
// import azureNotificationHub from "../configNotification/AzureNotificationHub";
// import NavigationService from "../../navigator/NavigationService";
// const { AzureHub, AzureNotificationModule, EventSendData, EventSwicthScreen } = NativeModules;

// const eventSendData = new NativeEventEmitter(EventSendData);
// const eventSwicthScreen = new NativeEventEmitter(EventSwicthScreen);

// // const subscription = calendarManagerEmitter.addListener(
// //     'EventReminder',
// //     (reminder) => alert("Info " + reminder.name)
// // );
// class Login extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             showLogin: false,
//             shop: "",
//             userName: "",
//             password: "",
//             showToast: false,
//             extraHeight: 0
//         }
//         this.error = "";
//         this.dialog = new DialogManager();
//         // this.subscription = eventSendData.addListener('sendData', this.handleDataNative);
//         // this.swicthScreen = eventSwicthScreen.addListener('sendSwicthScreen', this.handleSwitchScreen);

//         // AzureHub.setBadgeNumber("10")
//     }

//     // handleDataNative = async (reminder) => {
//     //     console.log("handleDataNative reminder = ", reminder);
//     //     if (reminder.data) {
//     //         let listNotification = await getFileDuLieuString(Constant.KEY_SAVE_NOTIFICATION, true);
//     //         if (listNotification && listNotification != "") {
//     //             listNotification = JSON.parse(listNotification);
//     //             listNotification.push(JSON.parse(reminder.data))
//     //             setFileLuuDuLieu(Constant.KEY_SAVE_NOTIFICATION, JSON.stringify(listNotification), true)
//     //             this.props.saveNotificationCount(listNotification)
//     //         } else {
//     //             listNotification = []
//     //             listNotification.push(JSON.parse(reminder.data))
//     //             setFileLuuDuLieu(Constant.KEY_SAVE_NOTIFICATION, JSON.stringify(listNotification), true)
//     //             this.props.saveNotificationCount(listNotification)
//     //             this.props.saveNotification(listNotification)
//     //         }

//     //         // alert("Info " + reminder.data)
//     //     }
//     // }

//     // handleSwitchScreen = async (event) => {
//     //     console.log("handleDataNative event = ", event);
//     //     // alert(event.data)
//     //     let data = JSON.parse(event.data)
//     //     if (data.id != undefined && data.id != 0) {
//     //         let listBranch = await getFileDuLieuString(Constant.BRANCH, true);
//     //         listBranch = JSON.parse(listBranch);
//     //         console.log("listBranch ", listBranch);
//     //         for (let i of listBranch) {
//     //             console.log("switchScreenFromAndroidNative 1", i.Id, data.id);
//     //             if (i.Id == data.branchId) {
//     //                 NavigationService.navigate(ScreenList.BillDetailComponent,
//     //                     {
//     //                         item: {
//     //                             id: data.id
//     //                         }
//     //                     })
//     //                 break;
//     //             } else {
//     //                 NavigationService.navigate(ScreenList.MainScreen)
//     //             }
//     //         }
//     //     } else {
//     //         NavigationService.navigate(ScreenList.RoomScreen)
//     //     }
//     // }

//     componentWillUnmount() {
//         // subscription.remove();
//     }

//     async componentDidMount() {

//         this.params = this.props.navigation.state.params;
//         console.log("Login params ", this.params);
//         this.dialog.showLoading();
//         let currentAccount = await getFileDuLieuString(Constant.CURRENT_ACCOUNT, true);
//         console.log("Login currentAccount ", currentAccount);
//         if (!(this.params && this.params.MENU)) {
//             if (currentAccount && currentAccount != "") {
//                 currentAccount = JSON.parse(currentAccount);
//                 console.log("Login currentAccount 2 ", currentAccount);
//                 URL.link = "https://" + currentAccount.Link + ".pos365.vn/"
//                 this.props.saveDeviceInfo({ SessionId: currentAccount.SessionId })
//                 this.getRetailerInfoAndNavigate()
//             } else {
//                 this.dialog.hiddenLoading();
//                 this.setState({ showLogin: true })
//             }
//         } else {
//             this.dialog.hiddenLoading()
//             this.setState({ showLogin: true })
//         }
//     }

//     checkDataLogin() {
//         if (this.state.shop == '') {
//             this.error = I18n.t('quy_khach_vui_long_nhap_ten_cua_hang');
//             this.setState({ showToast: true })
//             return false;
//         } else if (this.state.userName == '') {
//             this.error = I18n.t('quy_khach_vui_long_nhap_ten_tai_khoan');
//             this.setState({ showToast: true })
//             return false;
//         } else if (this.state.password == '') {
//             this.error = I18n.t('quy_khach_vui_long_nhap_mat_khau');
//             this.setState({ showToast: true })
//             return false;
//         }
//         return true;
//     }

//     onClickLogin() {
//         if (Platform.OS == 'ios')
//             AzureHub.showNotification((value) => {
//                 console.log("handleRegister value ", value);
//             })
//         if (!this.checkDataLogin())
//             return;
//         this.dialog.showLoading();
//         URL.link = "https://" + this.state.shop + ".pos365.vn/"
//         console.log("onClickLogin URL ", URL, this.state.shop);
//         let params = { UserName: this.state.userName, Password: this.state.password };
//         new HTTPService().setPath(ApiPath.LOGIN).POST(params, getHeaders({}, true)).then((res) => {
//             console.log("onClickLogin res ", res);
//             if (res.SessionId && res.SessionId != "") {
//                 this.props.saveDeviceInfo({ SessionId: res.SessionId })
//                 this.handlerLoginSuccess(params, res);
//             }
//             if (res.status == 401) {
//                 this.dialog.hiddenLoading();
//                 this.error = I18n.t('loi_dang_nhap');
//                 this.setState({ showToast: true })
//             }
//         }).catch((e) => {
//             this.dialog.hiddenLoading();
//             this.dialog.hiddenLoading();
//             this.error = I18n.t('loi_server');
//             this.setState({ showToast: true })
//             console.log("onClickLogin err ", e);
//         })
//     }

//     async handlerLoginSuccess(params, res) {
//         this.account = {
//             SessionId: res.SessionId,
//             Link: this.state.shop
//         }
//         let listAccount = await getFileDuLieuString(Constant.LIST_ACCOUNT, true);
//         if (listAccount && listAccount != "") {
//             listAccount = JSON.parse(listAccount);
//             const result = listAccount.filter(item => item.Link == this.state.shop);
//             console.log("handlerLoginSuccess result ", result);
//             if (result.length == 0) {
//                 listAccount.push({ SessionId: res.SessionId, UserName: params.UserName, Link: this.state.shop });
//                 console.log("handlerLoginSuccess listAccount ok ", listAccount);
//                 setFileLuuDuLieu(Constant.LIST_ACCOUNT, JSON.stringify(listAccount));
//             }
//         } else {
//             let accounts = [];
//             accounts.push({ SessionId: res.SessionId, UserName: params.UserName, Link: this.state.shop })
//             setFileLuuDuLieu(Constant.LIST_ACCOUNT, JSON.stringify(accounts));
//         }
//         this.getRetailerInfoAndNavigate()
//     }

//     setAzureNotification(res) {
//         let listRetailerIdAndBranchId = []
//         if (res.Branchs && res.Branchs.length > 0) {
//             res.Branchs.forEach((item, index) => {
//                 item["isNotification"] = true;
//                 listRetailerIdAndBranchId.push(res.CurrentRetailer.Id + "_" + item.Id)
//                 return item;
//             })
//             setFileLuuDuLieu(Constant.BRANCH, JSON.stringify(res.Branchs));
//             azureNotificationHub.setAzureNotification(listRetailerIdAndBranchId)
//         }


//         console.log("setAzureNotification res.Branchs ", JSON.stringify(res.Branchs));
//         setFileLuuDuLieu(Constant.STATUS_PUSH_NOTIFICATION, true);
//     }

//     getRetailerInfoAndNavigate() {
//         let inforParams = {};
//         new HTTPService().setPath(ApiPath.RETAILER_INFO).GET(inforParams, getHeaders()).then((res) => {
//             console.log("getDataRetailerInfo res ", res);
//             this.props.saveDeviceInfo({
//                 Logo: res.CurrentRetailer && res.CurrentRetailer.Logo ? res.CurrentRetailer.Logo : "",
//                 CurrentName: res.CurrentRetailer && res.CurrentUser.Name ? res.CurrentUser.Name : "",
//                 CurrentRetailerName: res.CurrentRetailer && res.CurrentRetailer.Name ? res.CurrentRetailer.Name : "",
//                 CurrentFieldId: res.CurrentRetailer && res.CurrentRetailer.FieldId ? res.CurrentRetailer.FieldId : 3,
//                 bId: res.BID ? res.BID : "",
//                 rId: res.RID ? res.RID : ""
//             })
//             if (res.Branchs && res.Branchs.length > 0)
//                 this.props.saveCurrentBranch(JSON.stringify(res.Branchs[0]))
//             this.setAzureNotification(res)
//             this.saveVendorSessionToListAccount(res)

//             if (res.CurrentUser && res.CurrentUser.IsAdmin == true)
//                 NavigateScreen(
//                     this.props.navigation,
//                     ScreenList.Home,
//                     {},
//                     true
//                 );
//             this.dialog.hiddenLoading();
//         }).catch((e) => {
//             this.dialog.hiddenLoading();
//             console.log("getDataRetailerInfo err ", e);
//         })
//     }

//     async saveVendorSessionToListAccount(data) {
//         if (data.CurrentRetailer) {
//             let logo = data.CurrentRetailer.Logo ? data.CurrentRetailer.Logo : "";
//             let CurrentRetailerId = data.CurrentRetailer.Id;
//             let branch = data.Branchs;
//             let listAccount = await getFileDuLieuString(Constant.LIST_ACCOUNT, true);
//             listAccount = JSON.parse(listAccount);
//             console.log("saveLogoToListAccount listAccount ", listAccount);
//             if (listAccount && listAccount.length > 0) {
//                 for (let element of listAccount) {
//                     if (URL.link.indexOf(element.Link) > -1) {
//                         console.log("saveLogoToListAccount indexOf")
//                         element["CurrentRetailerId"] = CurrentRetailerId ? CurrentRetailerId.toString() : "";
//                         element["Logo"] = logo.toString();
//                         element["Branch"] = JSON.stringify(branch);
//                         element["CurrentFieldId"] = data.CurrentRetailer && data.CurrentRetailer.FieldId ? data.CurrentRetailer.FieldId : 3
//                     }
//                 }
//                 setFileLuuDuLieu(Constant.LIST_ACCOUNT, JSON.stringify(listAccount));
//             }
//             this.account["CurrentRetailerId"] = CurrentRetailerId ? CurrentRetailerId.toString() : ""
//             setFileLuuDuLieu(Constant.CURRENT_ACCOUNT, JSON.stringify(this.account));
//         }
//     }

//     onChangeText(text, type) {
//         console.log("onChangeText text ", text);
//         if (type == 1) {
//             this.setState({ shop: text })
//         } else if (type == 2) {
//             this.setState({ userName: text })
//         } else if (type == 3) {
//             this.setState({ password: text })
//         }
//     }

//     actionPhone = async () => {
//         // AzureHub.getNotification((v) => {
//         //     console.log("actionPhone getNotification v1 ", v);
//         //     console.log("actionPhone getNotification v2 ", JSON.parse(v));

//         // })
//         let phone_number = "tel: " + Constant.HOTLINE;
//         Linking.openURL(phone_number);
//     }

//     render() {
//         return (
//             <LinearGradient
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 colors={['#FFAB40', '#FF5722']}
//                 style={{ flex: 1 }}>
//                 <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//                     {this.state.showLogin == true ?
//                         <KeyboardAwareScrollView style={{}} enableOnAndroid={true} extraHeight={this.state.extraHeight}
//                             showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
//                             <View style={{ flex: 1, height: Metrics.screenHeight - 60, justifyContent: 'center', alignItems: 'center' }}>
//                                 <Image style={{ height: 70, width: 225, marginBottom: 50 }} resizeMethod="scale" source={Images.logo_365_boss_white} />
//                                 <View style={[styles.inputtext, { flexDirection: "row", alignItems: "center" }]}>
//                                     <Image style={{ height: 24, width: 24, margin: 10 }} resizeMethod="auto" source={Images.icon_shop} />
//                                     <TextInput
//                                         onChangeText={(text => this.onChangeText(text, 1))}
//                                         value={this.state.shop}
//                                         onFocus={() => this.setState({ extraHeight: 270 })}
//                                         keyboardType={"default"}
//                                         style={{ height: 40, flex: 1, marginRight: 5 }}
//                                         placeholder={I18n.t('ten_cua_hang')} />
//                                     <Text style={{ opacity: 0.5 }}>.pos365.vn</Text>
//                                 </View>
//                                 <View style={[styles.inputtext, { flexDirection: "row", alignItems: "center" }]}>
//                                     <Image style={{ height: 24, width: 24, margin: 10 }} resizeMethod="auto" source={Images.icon_user_name} />
//                                     <TextInput
//                                         onChangeText={(text => this.onChangeText(text, 2))}
//                                         value={this.state.userName}
//                                         onFocus={() => this.setState({ extraHeight: 200 })}
//                                         keyboardType={"default"}
//                                         style={{ height: 40, flex: 1 }}
//                                         placeholder={I18n.t('ten_dang_nhap')} />
//                                 </View>
//                                 <View style={[styles.inputtext, { flexDirection: "row", alignItems: "center" }]}>
//                                     <Image style={{ height: 24, width: 24, margin: 10 }} resizeMethod="auto" source={Images.icon_password} />
//                                     <TextInput
//                                         onChangeText={(text => this.onChangeText(text, 3))}
//                                         value={this.state.password}
//                                         onFocus={() => this.setState({ extraHeight: 130 })}
//                                         keyboardType={"default"}
//                                         style={{ height: 40, margin: 0, flex: 1 }}
//                                         placeholder={I18n.t('mat_khau')}
//                                         secureTextEntry={true} />
//                                 </View>
//                                 <TouchableOpacity style={{ height: 50, width: Metrics.screenWidth - 50, marginTop: 30, borderColor: "#fff", borderWidth: 1, borderRadius: 5, justifyContent: "center", alignItems: "center" }}
//                                     onPress={() => this.onClickLogin()}>
//                                     <Text style={{ color: "#fff", fontWeight: 'bold' }}>{I18n.t("dang_nhap").toUpperCase()}</Text>
//                                 </TouchableOpacity>
//                             </View>
//                             <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 0 }}>
//                                 <Text style={{ color: "#fff" }}>{I18n.t("tong_dai_ho_tro")} 24/7</Text>
//                                 <TouchableOpacity onPress={this.actionPhone} style={{ flexDirection: "row", marginTop: 7, marginBottom: 10 }}>
//                                     <Image source={Images.icon_phone_header} style={{ width: 20, height: 20, marginRight: 7 }} />
//                                     <Text style={{ color: "#fff", fontWeight: "bold" }}>{Constant.HOTLINE}</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </KeyboardAwareScrollView>
//                         : null
//                     }

//                     <Snackbar
//                         duration={5000}
//                         visible={this.state.showToast}
//                         onDismiss={() =>
//                             this.setState({ showToast: false })
//                         }
//                     >
//                         {this.error}
//                     </Snackbar>
//                 </View>
//             </LinearGradient>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     inputtext: {
//         backgroundColor: "#FFA951",
//         margin: 10, padding: 10, borderColor: Colors.colorchinh, borderRadius: 5, borderWidth: 1, height: 50, width: Metrics.screenWidth - 50
//     }
// });

// function mapStateToProps(state) {
//     console.log("mapStateToProps state", state);
//     return {
//         info: state.Common.info,
//     };
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         saveDeviceInfo: id => {
//             dispatch(saveDeviceInfoToStore(id));
//         },
//         updateStatusLogin: status => {
//             dispatch(updateStatusLogin(status));
//         },
//         saveCurrentBranch: branch => {
//             dispatch(saveCurrentBranch(branch))
//         },
//         saveNotificationCount: (listNotification) => {
//             dispatch(saveNotificationCount(listNotification))
//         },
//     };
// };

// export const LoginScreen = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Login);


import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
    NativeEventEmitter,
    NativeModules,
    View, Text, Image,
    StyleSheet, TouchableOpacity, TextInput, Linking, Platform
} from "react-native";
import { Snackbar, } from "react-native-paper";
import I18n from '../../common/language/i18n';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Images, Colors, Metrics } from "../../theme";
import { Constant } from "../../common/Constant";
import { ApiPath } from "../../services/ApiPath";
import { HTTPService, getHeaders, URL } from "../../services/HttpService";
import { useSelector, useDispatch } from 'react-redux';
import { saveDeviceInfoToStore, updateStatusLogin, saveCurrentBranch, saveNotificationCount } from "../../actions/Common";
import store from "../../store/configureStore";



let error = "";

export default (props) => {
    const [extraHeight, setExtraHeight] = useState(0);
    const [shop, setShop] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [logIn, setLogIn] = useState(false);
    const isFirstRun = useRef(true);
    const dispatch = useDispatch();


    // const onClickLogin = useCallback(() => {
    //     if (logIn)
    //         return;
    //     // this.dialog.showLoading();
    //     setLogIn(true)
    //     URL.link = "https://" + shop + ".pos365.vn/"
    //     console.log("onClickLogin URL ", URL, shop);
    //     let params = { UserName: userName, Password: password };
    //     new HTTPService().setPath(ApiPath.LOGIN).POST(params, getHeaders({}, true)).then((res) => {
    //         console.log("onClickLogin res ", res);
    //         // if (res.SessionId && res.SessionId != "") {
    //         //     this.props.saveDeviceInfo({ SessionId: res.SessionId })
    //         //     this.handlerLoginSuccess(params, res);
    //         // }
    //         // if (res.status == 401) {
    //         //     this.dialog.hiddenLoading();
    //         //     this.error = I18n.t('loi_dang_nhap');
    //         //     this.setState({ showToast: true })
    //         // }
    //         setLogIn(false)
    //     }).catch((e) => {
    //         // this.dialog.hiddenLoading();
    //         setLogIn(false)
    //         error = I18n.t('loi_server');
    //         setShowToast(true);
    //         console.log("onClickLogin err ", e);
    //     })
    // },[logIn])



    useEffect(() => {
        const onClickLogin = () => {
            if (!checkDataLogin())
                return;
            // this.dialog.showLoading();
            URL.link = "https://" + shop + ".pos365.vn/"
            console.log("onClickLogin URL ", URL, shop);
            let params = { UserName: userName, Password: password };
            new HTTPService().setPath(ApiPath.LOGIN).POST(params, getHeaders({}, true)).then((res) => {
                console.log("onClickLogin res ", res);
                if (res.SessionId && res.SessionId != "") {
                    // this.props.saveDeviceInfo({ SessionId: res.SessionId })
                    // this.handlerLoginSuccess(params, res);
                    dispatch(saveDeviceInfoToStore({ SessionId: res.SessionId }))
                }
                if (res.status == 401) {
                    // this.dialog.hiddenLoading();
                    error = I18n.t('loi_dang_nhap');
                    setShowToast(true)
                }
            }).catch((e) => {
                // this.dialog.hiddenLoading();
                error = I18n.t('loi_server');
                setShowToast(true);
                console.log("onClickLogin err ", e);
            })
        }
        if (isFirstRun.current) {
            isFirstRun.current = false
            return
        }
        onClickLogin();
    }, [logIn])

    // const counter = useSelector(state => {
    //     console.log("useSelector state ", state);
    //     return state
    // });

    const onChangeText = (text, type) => {
        console.log("onChangeText text ", text);
        if (type == 1) {
            setShop(text)
        } else if (type == 2) {
            setUserName(text)
        } else if (type == 3) {
            setPassword(text)
        }
    }


    const checkDataLogin = () => {
        if (shop == '') {
            error = I18n.t('quy_khach_vui_long_nhap_ten_cua_hang');
            setShowToast(true)
            return false;
        } else if (userName == '') {
            error = I18n.t('quy_khach_vui_long_nhap_ten_tai_khoan');
            setShowToast(true)
            return false;
        } else if (password == '') {
            error = I18n.t('quy_khach_vui_long_nhap_mat_khau');
            setShowToast(true)
            return false;
        }
        return true;
    }


    return (
        <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={['#FFAB40', '#FF5722']}
            style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                <KeyboardAwareScrollView style={{}} enableOnAndroid={true} extraHeight={extraHeight}
                    showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <View style={{ flex: 1, height: Metrics.screenHeight - 60, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 70, width: 225, marginBottom: 50 }} resizeMethod="scale" source={Images.logo_365_boss_white} />
                        <View style={[styles.inputtext, { flexDirection: "row", alignItems: "center" }]}>
                            <Image style={{ height: 24, width: 24, margin: 10 }} resizeMethod="auto" source={Images.icon_shop} />
                            <TextInput
                                onChangeText={text => onChangeText(text, 1)}
                                value={shop}
                                onFocus={() => { setExtraHeight(270) }}
                                keyboardType={"default"}
                                style={{ height: 40, flex: 1, marginRight: 5 }}
                                placeholder={I18n.t('ten_cua_hang')} />
                            <Text style={{ opacity: 0.5 }}>.pos365.vn</Text>
                        </View>
                        <View style={[styles.inputtext, { flexDirection: "row", alignItems: "center" }]}>
                            <Image style={{ height: 24, width: 24, margin: 10 }} resizeMethod="auto" source={Images.icon_user_name} />
                            <TextInput
                                onChangeText={text => onChangeText(text, 2)}
                                value={userName}
                                // onFocus={() => this.setState({ extraHeight: 200 })}
                                keyboardType={"default"}
                                style={{ height: 40, flex: 1 }}
                                placeholder={I18n.t('ten_dang_nhap')} />
                        </View>
                        <View style={[styles.inputtext, { flexDirection: "row", alignItems: "center" }]}>
                            <Image style={{ height: 24, width: 24, margin: 10 }} resizeMethod="auto" source={Images.icon_password} />
                            <TextInput
                                onChangeText={text => onChangeText(text, 3)}
                                value={password}
                                // onFocus={() => this.setState({ extraHeight: 130 })}
                                keyboardType={"default"}
                                style={{ height: 40, margin: 0, flex: 1 }}
                                placeholder={I18n.t('mat_khau')}
                                secureTextEntry={true} />
                        </View>
                        <View style={{}}>
                            <TouchableOpacity style={{ height: 50, width: Metrics.screenWidth - 50, marginTop: 30, borderColor: "#fff", borderWidth: 1, borderRadius: 5, justifyContent: "center", alignItems: "center" }}
                                onPress={() => { setLogIn(!logIn) }}>
                                <Text style={{ color: "#fff", fontWeight: 'bold' }}>{I18n.t("man_hinh_thu_ngan").toUpperCase()}</Text>
                            </TouchableOpacity><TouchableOpacity style={{ height: 50, width: Metrics.screenWidth - 50, marginTop: 15, borderColor: "#fff", borderWidth: 1, borderRadius: 5, justifyContent: "center", alignItems: "center" }}
                                onPress={() => { }}>
                                <Text style={{ color: "#fff", fontWeight: 'bold' }}>{I18n.t("nhan_vien_order").toUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 0 }}>
                        <Text style={{ color: "#fff" }}>{I18n.t("tong_dai_ho_tro")} 24/7</Text>
                        <TouchableOpacity onPress={() => { }} style={{ flexDirection: "row", marginTop: 7, marginBottom: 10 }}>
                            <Image source={Images.icon_phone_header} style={{ width: 20, height: 20, marginRight: 7 }} />
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>{Constant.HOTLINE}</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>

                <Snackbar
                    duration={5000}
                    visible={showToast}
                    onDismiss={() => setShowToast(false)}
                >
                    {error}
                </Snackbar>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    inputtext: {
        backgroundColor: "#FFA951",
        margin: 10, padding: 10, borderColor: Colors.colorchinh, borderRadius: 5, borderWidth: 1, height: 50, width: Metrics.screenWidth - 50
    }
});