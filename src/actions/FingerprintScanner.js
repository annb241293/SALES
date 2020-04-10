
import { Platform } from "react-native";
import TouchID from 'react-native-touch-id';
import { Touch_FaceID } from "../model/Object";
import I18n from "../common/language/i18n";
import { Constant } from "../common/Constant";
import {
    setFileLuuDuLieu,
    getFileDuLieuJson,
} from "../common/FileStorage";
import { encodeBase64, decodeBase64 } from "../common/Base64";
import { descEncrypt } from "../common/pcrypto/pcrypto";
import * as Keychain from 'react-native-keychain';

import { isIphoneXorAbove } from '../actions/Common'

const optionalConfigObject = {
    title: Touch_FaceID.type == 'FaceID' ? I18n.t('xac_thuc_khuan_mat') : I18n.t('xac_thuc_van_tay'), // Android
    imageColor: '#0066ff', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: I18n.t('van_tay'), // Android
    sensorErrorDescription: I18n.t('xac_thuc_khong_dung'), // Android
    sensorErrorMulti: I18n.t('xac_thuc_loi_nhieu_lan'),
    cancelText: I18n.t('dong'), // Android
    unifiedErrors: true, // use unified error messages (default false)
    fallbackLabel: null, // iOS (if empty, then label is hidden)
    passcodeFallback: false, // iOS
};

// Kiểm tra thiết bị có/không vân tay
export const storeIsFingerprintScanner = () => dispatch => {

    if (Platform.OS == 'ios') {
        // Check Touch ID IOS
        checkTouchIDIOS(dispatch);
    } else {
        // Check Touch ID Android
        checkFingerprintAndroid(dispatch);
    }
}

const checkFingerprintAndroid = (dispatch) => {
    const config = {
        unifiedErrors: true,
        passcodeFallback: false
    }
    TouchID.isSupported(config).then(biometryType => {
        if (biometryType) {
            getAuthFingerPrintScanner(dispatch);
            return dispatch({
                type: "FINGERPRINT",
                data: {
                    isDeviceTouchId: true,
                    errorDeviceFinger: false
                }
            })
        }
    }).catch(error => {
        let data = {
            isDeviceTouchId: true,
            errorDeviceFinger: error.code,
        }
        if (error.code == Constant.ERROR_NOT_PRESENT
            || error.code == Constant.ERROR_NOT_SUPPORTED) {
            data.isDeviceTouchId = false;
            saveAuthFingerPrintScanner(false);
            data['statusAuthFinger'] = false;
        }
        if (error.code == Constant.ERROR_AVAILABLE
            || error.code == Constant.ERROR_ENROLLED
            || error.code == Constant.ERROR_FALLBACK_NOT_ENROLLED
        ) {
            saveAuthFingerPrintScanner(false);
            data['statusAuthFinger'] = false;
            keyChainReset();

        }
        return dispatch({
            type: "FINGERPRINT",
            data: data
        })
    });
}


const checkTouchIDIOS = (dispatch) => {
    const config = {
        unifiedErrors: true,
        passcodeFallback: false
    }
    TouchID.isSupported(config).then(biometryType => {
        if (biometryType === 'TouchID' || biometryType === 'FaceID') {
            Touch_FaceID.type = biometryType;
            getAuthFingerPrintScanner(dispatch);
            return dispatch({
                type: "FINGERPRINT",
                data: {
                    type: biometryType,
                    isDeviceTouchId: true,
                    errorDeviceFinger: false
                }
            })
        }
    }).catch(error => {
        let isFaceID = isIphoneXorAbove();

        let data = {
            isDeviceTouchId: true,
            errorDeviceFinger: error.code,
            type: isFaceID ? 'FaceID' : 'TouchID'
        }
        if (error.code == Constant.ERROR_NOT_PRESENT
            || error.code == Constant.ERROR_NOT_SUPPORTED) {
            data.isDeviceTouchId = false;
            saveAuthFingerPrintScanner(false);
            data['statusAuthFinger'] = false;
        }
        if (error.code == Constant.ERROR_AVAILABLE
            || error.code == Constant.ERROR_ENROLLED
            || error.code == Constant.ERROR_FALLBACK_NOT_ENROLLED
        ) {
            saveAuthFingerPrintScanner(false);
            data['statusAuthFinger'] = false;
            keyChainReset();

        }
        return dispatch({
            type: "FINGERPRINT",
            data: data
        })
    });
}



// Lắng nghe xác thực vân tay
export const openListenerFingerScanner = (callback) => {
    try {
        TouchID.authenticate(I18n.t('thong_bao_quet_van_tay'), optionalConfigObject).then(success => {
            return getKeyChain(callback);
        }).catch(error => {

            if (error.code == 'LOCKOUT') {
                dialogManager.showPopupOneButton(I18n.t('thong_bao_tam_khoa_van_tay'), I18n.t('thong_bao'))
            } else if (error.code == 'LOCKOUT_PERMANENT' || error.code == 'UNKNOWN_ERROR') {
                dialogManager.showPopupOneButton(I18n.t('thong_bao_khoa_van_tay'), I18n.t('thong_bao'))
            }
        });
    } catch (error) {
        return false
    }

}


// Bật/Tắt xác thực vân tay của App
export const changeStatusAuthFingerPrintScanner = (status, dispatch) => {
    console.log("changeStatusAuthFingerPrintScanner status ", status);
    return dispatch({
        type: "FINGERPRINT",
        data: {
            statusAuthFinger: status
        }
    })
}

// Lưu trạng thái xác thực vân tay của App
export const saveAuthFingerPrintScanner = (status) => {
    setFileLuuDuLieu(Constant.KEY_SAVE_AUTH_FINGER_PRINT_SCANNER, status, false);
}


// Lấy trạng thái xác thực vân tay của App
export const getAuthFingerPrintScanner = async (dispatch) => {
    let loadAuthFinger = await getFileDuLieuJson(Constant.KEY_SAVE_AUTH_FINGER_PRINT_SCANNER, false);
    if (loadAuthFinger == null) {
        changeStatusAuthFingerPrintScanner(false, dispatch)
    } else {
        changeStatusAuthFingerPrintScanner(loadAuthFinger, dispatch)
    }
}

// Lưu userid/password bằng keyChain
export const setKeyChain = () => (dispatch) => {
    console.log("setKeyChain");
    // let stringdata = pin
    // let passworddata = encodeBase64(stringdata)
    // Keychain.setGenericPassword("PIN_CODE", passworddata)
    //     .then(value => {
    //         console.log("setGenericPassword");
    //         saveAuthFingerPrintScanner(true)
    //         changeStatusAuthFingerPrintScanner(true, dispatch)
    //     })
    //     .catch(error => {
    //     })
    saveAuthFingerPrintScanner(true)
    changeStatusAuthFingerPrintScanner(true, dispatch)
}

// Lấy userid qua keyChain kiểm tra sau login
export const getKeyChainCheck = () => (dispatch, getState) => {
    let state = getState();
    if (state.Common.device_finger_scanner.isDeviceTouchId
        && !state.Common.device_finger_scanner.errorDeviceFinger) {
        Keychain.getGenericPassword()   // Retrieve the credentials from the keychain
            .then(credentials => {
                const { username, password } = credentials;
                console.log("getKeyChainCheck credentials", credentials);

                let decodePass = decodeBase64(password)
                console.log("getKeyChainCheck decodePass", decodePass);

                // if (username != ThongTinKhachHang.khachHangDangNhapTaiKhoan
                //     || enc_passworld != state.Auth.enc_passworld
                // ) {
                //     saveAuthFingerPrintScanner(false)
                //     changeStatusAuthFingerPrintScanner(false, dispatch)
                // }
            })
            .catch(error => {
            })
    } else return
}

// check keyChain truoc login
export const checkKeyChainBeforeLogin = () => dispatch => {
    Keychain.getGenericPassword()   // Retrieve the credentials from the keychain
        .then(credentials => {
            const { username, password } = credentials;

            // if (username == ThongTinKhachHang.khachHangDangNhapTaiKhoan) {
            //     changeStatusAuthFingerPrintScanner(true, dispatch)
            // } else {
            //     changeStatusAuthFingerPrintScanner(false, dispatch)
            // }
        })
        .catch(error => {

        })

}

// Lấy userid/password qua keyChain
export const getKeyChain = (callback) => {
    Keychain.getGenericPassword()   // Retrieve the credentials from the keychain
        .then(credentials => {
            const { username, password } = credentials;
            let decodePass = decodeBase64(password)

            data = {
                userid: username,
                passworld: decodePass,
            }
            return callback(data)
        })
        .catch(error => {

        })

}

export const setPassFromFingerScanner = (data, dispatch) => {
    // if (data.userid == ThongTinKhachHang.khachHangDangNhapTaiKhoan) {
    //     return dispatch({
    //         type: 'SET_PASS_FROM_FINGER_PRINT_SCANNER'
    //         , userid: data.userid
    //         , enc_userid: descEncrypt(data.userid)
    //         , enc_passworld: data.enc_passworld
    //         , enc_passworld2: data.enc_passworld2
    //         , loginBuyFinger: true
    //     })
    // } else {

    // }
}

export const changeLoginBuyFinger = () => (dispatch) => {
    return dispatch({
        type: 'CHANGE_LOGIN_BUY_FINGER_PRINT_SCANNER'
        , loginBuyFinger: false
    })
}

export const resetStatusTouchId = () => (dispatch) => {
    // keyChainReset();
    saveAuthFingerPrintScanner(false)
    changeStatusAuthFingerPrintScanner(false, dispatch)
}

export const keyChainReset = () => {
    Keychain.resetGenericPassword();
}
