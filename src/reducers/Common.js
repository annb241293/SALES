import AsyncStorage from "@react-native-community/async-storage"
import { persistReducer } from 'redux-persist';


const initState = {
	info: {
		defaultLanguage: false,
		lang: 'vi',
		pushId: '',
		SessionId: '',
		Logo: '',
		CurrentName: '',
		CurrentRetailerName: '',
		currentAccount: "",
		notificationCount: 0
	},
	device_finger_scanner: {
		type: 'TouchID', // FaceID
		isDeviceTouchId: false,
		errorDeviceFinger: false,
		// false: Có và đang bật vân tay; 
		// ERROR_AVAILABLE: 'NOT_AVAILABLE':  Thiết bị không hỗ trợ vân tay
		// ERROR_ENROLLED: 'NOT_ENROLLED', : Thiết bị chưa cài đặt vân tay
		// ERROR_FALLBACK_NOT_ENROLLED: 'FALLBACK_NOT_ENROLLED' : Thiết bị chưa cài đặt vân tay
		statusAuthFinger: false, // false: App chưa bật xác thực vân tay; true: App đang bật xác thực vân tay,

	},
	isActiveOTP: false,
	isLogin: false,
	currentBranch: "",
	tabIndex: 0
}

const commonReducer = (state = initState, action = {}) => {
	console.log("commonReducer", action);

	switch (action.type) {
		case 'SAVE_DEVICES_INFO':
			let info = {
				...state.info,
				...action.data
			}
			return { ...state, info: info }
		case 'FINGERPRINT':
			let fingerprint = {
				...state.device_finger_scanner,
				...action.data,
			}
			return { ...state, device_finger_scanner: fingerprint }
		case "SAVE_STATE_ACTIVE_OTP":
			return {
				...state,
				isActiveOTP: action.isActive
			}
		case "SAVE_STATE_LOGIN":
			return {
				...state,
				isLogin: action.isLogin
			}
		case "SEND_MESSENGER":
			return {
				...state,
				message: action.message
			}
		case "SAVE_NOTIFICATION_COUNT":
			return {
				...state,
				notificationCount: action.notificationCount
			}
		case "SAVE_SWITCH_SCREEN":
			let switchScreen = {
				screen: action.switchScreen,
				Id: action.Id
			}
			return {
				...state,
				switchScreen: switchScreen
			}
		case "CURRENT_BRANCH_ID":
			return {
				...state,
				currentBranch: action.currentBranch
			}
		case "TAB_INDEX":
			return {
				...state,
				tabIndex: action.tabIndex
			}
		default:
			return state
	}
}


const persistConfig = {
	key: 'auth',
	storage: AsyncStorage,
	whitelist: ['isActiveOTP']
};

const Common = persistReducer(persistConfig, commonReducer)


export default Common;